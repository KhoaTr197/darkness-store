import React from "react";
import { Field as HeadlessUiField, Label } from "@headlessui/react";
import { FieldError as ReactHookFormFieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import FieldError from "./FieldError";

export interface FieldWrapperProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: ReactHookFormFieldError | undefined | Merge<ReactHookFormFieldError, FieldErrorsImpl<any>>;
}

export interface FieldWrapperPassThroughProps extends Omit<FieldWrapperProps, 'className' | 'children'> { }

export const FieldWrapper = ({
  label,
  error,
  children,
}: FieldWrapperProps) => {

  return (
    <HeadlessUiField className="mb-6">
      <Label className="block mb-2 text-text">{label}</Label>
      {children}
      <FieldError message={error?.message as string} />
    </HeadlessUiField>
  );
};