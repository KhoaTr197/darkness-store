import React from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormProps, UseFormReturn, UseFormSetError } from 'react-hook-form'

export type FormProps = {
  id?: string;
  className?: string;
  options?: UseFormProps<FieldValues>;
  children: (props: UseFormReturn<FieldValues>) => React.ReactNode;
  onSubmit: (data: FieldValues, setError: UseFormSetError<FieldValues>, event?: React.BaseSyntheticEvent)=>void;
  onError?: SubmitHandler<FieldValues>;
}

const Form = ({
  id,
  className,
  options,
  onSubmit,
  onError,
  children
}: FormProps) => {
  const form = useForm({...options})

  const RehandleSubmit: SubmitHandler<FieldValues> = (data, e) => {
    onSubmit(data, form.setError, e)
  }

  return (
    <form
      id={id}
      className={className} 
      onSubmit={form.handleSubmit(RehandleSubmit)} 
      method="post"
    >
      {children(form)}
    </form>
  )
}
export default Form