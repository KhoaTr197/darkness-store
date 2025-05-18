import React from "react";
import { FieldValues, SubmitHandler, useForm, UseFormProps, UseFormReturn, UseFormSetError } from "react-hook-form";

export interface FormProps {
  id?: string;
  className?: string;
  method?: "post" | "get";
  options?: UseFormProps<FieldValues>;
  children: (props: UseFormReturn<FieldValues>) => React.ReactNode;
  onSubmit: (data: FieldValues, setError: UseFormSetError<FieldValues>, event?: React.BaseSyntheticEvent) => void;
  onError?: SubmitHandler<FieldValues>;
}
/**
 * @component
 * @description
 * Renders a form with children rendered inside it.
 *
 * @param {string} id - ID for the form.
 * @param {string} className - Class name for the form.
 * @param {string} method - Method for the form (default: "post").
 * @param {UseFormProps<FieldValues>} options - Options for the form.
 * @param {function} onSubmit - Function to handle form submission.
 * @param {function} onError - Function to handle form submission errors.
 * @param {function} children - Function to render children inside the form.
 * @returns {React.ReactNode} - Rendered form.
 */
const Form = ({
  id,
  className,
  method = "post",
  options,
  onSubmit,
  onError,
  children,
}: FormProps) => {
  const form = useForm({ ...options });

  const RehandleSubmit: SubmitHandler<FieldValues> = (data, e) => {
    onSubmit(data, form.setError, e);
  };

  return (
    <form
      id={id}
      className={className}
      onSubmit={form.handleSubmit(RehandleSubmit)}
      method={method}
    >
      {children(form)}
    </form>
  );
};
export default Form;
