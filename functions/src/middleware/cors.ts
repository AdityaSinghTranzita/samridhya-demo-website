import { Request, Response } from 'express';

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    // Production domains - configure via environment variables
    process.env.ALLOWED_ORIGIN_1 || 'https://your-domain-1.com',
    process.env.ALLOWED_ORIGIN_2 || 'https://your-domain-2.com',
    process.env.ALLOWED_ORIGIN_3 || 'https://your-domain-3.com',
    process.env.ALLOWED_ORIGIN_4 || 'https://your-domain-4.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  credentials: true,
  maxAge: 86400 // 24 hours
};

export function corsMiddleware(req: Request, res: Response, next?: () => void) {
  const origin = req.headers.origin;
  
  // Check if origin is allowed
  if (origin && corsOptions.origin.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  } else if (corsOptions.origin.includes('*')) {
    res.set('Access-Control-Allow-Origin', '*');
  }

  // Set other CORS headers
  res.set('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
  res.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '));
  res.set('Access-Control-Allow-Credentials', corsOptions.credentials.toString());
  res.set('Access-Control-Max-Age', corsOptions.maxAge.toString());

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Continue to next middleware if provided
  if (next) {
    next();
  }
}

// Wrapper function for Firebase Functions
export function withCors(handler: (req: any, res: any) => void | Promise<void>) {
  return (req: any, res: any) => {
    corsMiddleware(req, res, () => {
      handler(req, res);
    });
  };
} 