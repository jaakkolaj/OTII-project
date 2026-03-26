/* // src/hooks/use-form-error.ts
import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api';

interface FieldError {
  [key: string]: string;
}

export function useFormError() {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

   const setError = useCallback((error: ApiError) => {
    // Jos on kentän kohtaiset virheet
    if (error.errors && error.errors.length > 0) {
      const errors: FieldError = {};
      error.errors.forEach(({ field, message }) => {
        errors[field] = message;
      });
      setFieldErrors(errors);
      setGeneralError(null);
    } else {
      // Yleinen virhe
      setGeneralError(error.message);
      setFieldErrors({});
    }
  }, []); 

  const clearError = useCallback(() => {
    setGeneralError(null);
    setFieldErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const getFieldError = useCallback(
    (field: string) => fieldErrors[field] || null,
    [fieldErrors]
  );

  return {
    generalError,
    fieldErrors,
    setError,
    clearError,
    clearFieldError,
    getFieldError,
    hasErrors: generalError !== null || Object.keys(fieldErrors).length > 0,
  };
} */