import React from "react";
import { Input } from "@headlessui/react";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface FieldProps extends FieldWrapperPassThroughProps, React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
}
/**
 * @component
 * @description
 * Renders a form field with label, input, and error message.
 *
 * @param {string} className - Class name for the field.
 * @param {string} error - Error message for the field.
 * @param {string} label - Label for the field.
 * @param {string} type - Type of the field.
 * @param {string} registration - Registration object from react-hook-form.
 * @param {InputHTMLAttributes<HTMLInputElement>} rest - Rest of the input attributes.
 * @returns {React.ReactNode} - Rendered field.
 */
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
        className="block text-text w-full mb-2 p-2 border border-solid border-text-muted rounded-sm"
      />
    </FieldWrapper>
  );
};

export default Field;
