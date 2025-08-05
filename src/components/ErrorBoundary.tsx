'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        error_type: 'react_error_boundary',
        error_message: error.message,
        error_stack: error.stack,
        event_category: 'error',
        event_label: 'react_error_boundary'
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                We encountered an error while loading your credit score information. 
                This might be due to a temporary issue with the data.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Don't worry, your data is safe. This is just a display issue.
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Refresh Page
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-600 font-medium">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-xs text-gray-800 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 