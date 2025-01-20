import React from 'react'
import { Input } from '@headlessui/react'
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type FieldProps = 
FieldWrapperPassThroughProps &
React.InputHTMLAttributes<HTMLInputElement> &
{
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

const Field = ({
  className,
  error,
  label,
  type,
  registration,
}: FieldProps) => {
  return (
    <FieldWrapper
      label={label}
      error={error}
    >
      <Input
        type={type}
        {...registration}
        className="block w-full mb-2 p-2 border border-solid border-gray-400 rounded"
      />
    </FieldWrapper>
  )
}

export default Field