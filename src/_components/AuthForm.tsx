import React, { ReactNode } from "react";
import { Button } from "@headlessui/react";
import {
  Form,
  Field,
  FormTitle,
} from "@/_components";
import Logo from "@/_assets/Logo";
import Link from "next/link";
import FormMessage, { FormMessageProps } from "./Form/FormMessage";
import { FieldValues, UseFormRegisterReturn } from "react-hook-form";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  validation: {
    required?: string;
    pattern?: RegExp;
    minLength?: {
      value: number;
      message: string;
    };
    validate?: (value: string) => boolean | string;
  };
}

export interface AuthFormProps {
  title: string;
  submitButtonText: string;
  onSubmit: (data: FieldValues, setError: any) => Promise<void>;
  onSuccess: () => void;
  fields: FieldConfig[];
  alternateAuth: {
    text: string;
    link: string;
    linkText: string;
  };
  showExternalAuth?: boolean;
  externalAuthOptions?: {
    icon: ReactNode;
    name: string;
    className?: string;
    onClick?: () => void;
  }[];
  logoProps?: {
    mode?: "light" | "dark";
    width?: number;
    height?: number;
  };
  children?: ReactNode;
}

const AuthForm = ({
  title,
  submitButtonText,
  onSubmit,
  onSuccess,
  fields,
  alternateAuth,
  showExternalAuth = true,
  externalAuthOptions = [],
  logoProps = {
    mode: "dark",
    width: 64,
    height: 64
  },
  children
}: AuthFormProps) => {
  return (
    <div>
      <Form
        onSubmit={async (data, setError) => {
          try {
            await onSubmit(data, setError);
            onSuccess();
          } catch (error: any) {
            setError("root", {
              type: "error",
              message: error.message || "An error occurred"
            });
          }
        }}
        options={{
          mode: "onSubmit",
        }}
        className="mb-16"
      >
        {({ register, formState }) => {
          return (
            <>
              <FormTitle className="mb-10">
                <div className="mb-2">
                  <Logo
                    mode={logoProps.mode}
                    width={logoProps.width}
                    height={logoProps.height}
                  />
                </div>
                <h3 className="text-4xl text-text font-semibold tracking-wider mb-4">{title}</h3>
                <p className="text-text-muted">
                  {alternateAuth.text}
                  <Link
                    href={alternateAuth.link}
                    className="ml-2 font-semibold underline text-primary-500 hover:text-primary-400"
                  >
                    {alternateAuth.linkText}
                  </Link>
                </p>
              </FormTitle>

              {formState.errors['root'] && (
                <FormMessage
                  {...formState.errors['root'] as FormMessageProps}
                />
              )}

              <div className="mb-10">
                {fields.map((field) => (
                  <Field
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    error={formState.errors[field.name]}
                    registration={register(field.name, field.validation) as Partial<UseFormRegisterReturn>}
                  />
                ))}
                {children}
              </div>

              <Button
                type="submit"
                className="w-full transition duration-200 linear p-3 text-lg font-semibold tracking-wider rounded text-white bg-primary-500 data-[hover]:bg-primary-600"
              >
                {submitButtonText}
              </Button>
            </>
          );
        }}
      </Form>

      {showExternalAuth && (
        <>
          <div className="w-full relative mb-6">
            <div className="flex justify-center absolute inset-0 items-center">
              <div className="w-full border-t border-solid border-gray-500"></div>
            </div>
            <div className="flex justify-center relative">
              <span className="text-gray-500 bg-white ps-2 pe-2">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-1">
            {externalAuthOptions.map((option, index) => (
              <Button
                key={index}
                onClick={option.onClick}
                className={`${option.className} external-auth-btn`}
              >
                {option.icon}
                {option.name}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;