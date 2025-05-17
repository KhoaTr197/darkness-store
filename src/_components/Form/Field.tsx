import React from 'react'
import { Input } from '@headlessui/react'
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface FieldProps extends
  FieldWrapperPassThroughProps,
  React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
}

const Field = ({
  className,
  error,
  label,
  type,
  registration,
  ...rest
}: FieldProps) => {
  return (
    <FieldWrapper
      label={label}
      error={error}
    >
      <Input
        type={type}
        {...registration}
        {...rest}
        className="block text-text w-full mb-2 p-2 border border-solid border-text-muted rounded"
      />
    </FieldWrapper>
  )
}

export default Field