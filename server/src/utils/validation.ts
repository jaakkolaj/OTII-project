// Email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

// More strict email validation (RFC 5322 simplified)
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmailStrict = (email: string): boolean => {
    return STRICT_EMAIL_REGEX.test(email);
};
