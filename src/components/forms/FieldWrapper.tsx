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

export interface FieldWrapperPassThroughProps extends Omit<FieldWrapperProps, "className" | "children"> { }
/**
 * @component
 * @description
 * Renders a field wrapper with label, children, and error message.
 *
 * @param {string} label - Label for the field.
 * @param {string} error - Error message for the field.
 * @param {ReactNode} children - Children elements to render inside the field wrapper.
 * @returns {React.ReactNode} - Rendered field wrapper.
 */
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