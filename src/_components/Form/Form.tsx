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
* 
* @param {FormProps} props
* @returns
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
  )
}
export default Form