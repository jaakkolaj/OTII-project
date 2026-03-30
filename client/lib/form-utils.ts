export type FormState<T = Record<string, any>> = {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<keyof T, string | string[]>>;
  data?: T;
  fields?: T;
} | null;



