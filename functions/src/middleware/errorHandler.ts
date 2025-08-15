import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { Logger } from '../utils/Logger';
import { corsMiddleware } from './cors';

const logger = new Logger('ErrorHandler');

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode: number;
  details?: any;
  timestamp: string;
  path?: string;
  method?: string;
}

export function errorHandler(error: any, req: Request, res: Response): void {
  // Apply CORS headers first
  corsMiddleware(req, res);

  let statusCode = 500;
  let message = 'Internal server error';
  let details: any = undefined;

  // Handle ApiError instances
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  }
  // Handle Firebase Auth errors
  else if (error.code === 'auth/unauthorized') {
    statusCode = 401;
    message = 'Unauthorized';
  }
  // Handle Firestore errors
  else if (error.code === 'permission-denied') {
    statusCode = 403;
    message = 'Permission denied';
  }
  else if (error.code === 'not-found') {
    statusCode = 404;
    message = 'Resource not found';
  }
  // Handle validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = error.details;
  }
  // Handle Zod validation errors
  else if (error.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation failed';
    details = error.errors;
  }
  // Handle other known errors
  else if (error.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Service unavailable';
  }
  else if (error.code === 'ETIMEDOUT') {
    statusCode = 408;
    message = 'Request timeout';
  }

  // Log the error
  logger.error('API Error', {
    statusCode,
    message: error.message || message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    details
  });

  // Prepare error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  };

  // Add details if available
  if (details) {
    errorResponse.details = details;
  }

  // Add additional message if different from error
  if (error.message && error.message !== message) {
    errorResponse.message = error.message;
  }

  // Set response headers
  res.set('Content-Type', 'application/json');
  res.status(statusCode);

  // Send error response
  res.json(errorResponse);
}

export function asyncHandler(fn: Function) {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
} 