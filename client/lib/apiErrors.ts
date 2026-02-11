// frontend/lib/utils/apiErrors.ts
// Utility for parsing backend API errors into user-friendly messages

interface ApiErrorResponse {
  status?: string;
  statusCode?: number;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly originalError: any;

  constructor(statusCode: number, message: string, originalError?: any) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Parse error from axios/API response into user-friendly message
 */
export const parseApiError = (error: any): ApiError => {
  // Axios error with response
  if (error.response?.data) {
    const data: ApiErrorResponse = error.response.data;
    const statusCode = error.response.status || 500;
    const message = data.message || data.error || 'An error occurred';
    
    return new ApiError(statusCode, message, error);
  }

  // Network error
  if (error.request) {
    return new ApiError(
      503,
      'Unable to connect to server. Please check your internet connection.',
      error
    );
  }

  // Other errors
  return new ApiError(
    500,
    error.message || 'An unexpected error occurred',
    error
  );
};

/**
 * Get user-friendly error message based on error type
 */
export const getUserFriendlyMessage = (error: ApiError): string => {
  const { statusCode, message } = error;

  // Custom messages for common scenarios
  const errorMessages: Record<number, Record<string, string>> = {
    400: {
      'Invalid email or password!': 'Invalid email or password. Please try again.',
      'Validation error': 'Please check your input and try again.',
    },
    401: {
      'Authentication failed': 'Your session has expired. Please login again.',
    },
    409: {
      'email already exists': 'An account with this email already exists.',
    },
    404: {
      'Resource not found': 'The requested resource was not found.',
    },
    500: {
      'Internal server error': 'Something went wrong on our end. Please try again later.',
    },
  };

  // Check for exact match
  if (errorMessages[statusCode]?.[message]) {
    return errorMessages[statusCode][message];
  }

  // Check for partial match (e.g., "email already exists")
  if (errorMessages[statusCode]) {
    for (const [key, value] of Object.entries(errorMessages[statusCode])) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
  }

  // Return original message if no custom mapping found
  return message;
};