import React from 'react'
import { Field, Label } from '@headlessui/react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { InputError } from './';

export type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined | Merge<FieldError, FieldErrorsImpl<any>>;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = ({
  label,
  error,
  children
}: FieldWrapperProps) => {

  return (
    <Field className="mb-6">
      <Label className="block mb-2">{label}</Label>
      {children}
      <InputError message={error?.message as string} />
    </Field>
  )
}