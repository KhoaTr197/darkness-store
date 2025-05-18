import React, { ReactNode } from "react";
import { Button } from "@headlessui/react";
import {
  Form,
  Field,
  FormTitle,
} from "@/components/ui";
import Logo from "@/assets/Logo";
import Link from "next/link";
import FormMessage, { FormMessageProps } from "./FormMessage";
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
  externalAuth?: {
    show: boolean;
    text: string;
    options: {
      icon: ReactNode;
      name: string;
      className?: string;
      onClick?: () => void;
    }[];
  };
  logoProps?: {
    mode?: "light" | "dark";
    width?: number;
    height?: number;
  };
  children?: ReactNode;
}

/**
 * Renders a customizable authentication form for login, registration, or password reset.
 *
 * Handles form rendering, validation, error display, and optional external authentication providers.
 *
 * @component
 * @param {Object}   props
 * @param {string}   props.title                - Title displayed at the top of the form.
 * @param {string}   props.submitButtonText     - Text for the submit button.
 * @param {function} props.onSubmit             - Async function called on form submit. Receives form data and setError callback.
 * @param {function} props.onSuccess            - Callback after successful submission.
 * @param {Array}    props.fields               - Array of field configs ({ name, label, type, validation }).
 * @param {Object}   props.alternateAuth        - Alternate auth link ({ text, link, linkText }).
 * @param {Object}   [props.externalAuth]       - External auth options ({ show, text, options }).
 * @param {boolean}  [props.externalAuth.show]  - Show external auth section (default: true).
 * @param {string}   [props.externalAuth.text]  - Text above external auth buttons.
 * @param {Array}    [props.externalAuth.options] - Array of external auth options ({ icon, name, className, onClick }).
 * @param {Object}   [props.logoProps]          - Logo config ({ mode, width, height }).
 * @param {ReactNode}[props.children]           - Optional children rendered below fields.
 *
 * @example
 * <AuthForm
 *   title="Sign Up"
 *   submitButtonText="Create Account"
 *   onSubmit={async (data, setError) => { ... }}
 *   onSuccess={() => { ... }}
 *   fields={[
 *     { name: 'username', label: 'Username', type: 'text', validation: { required: 'Username is required' } },
 *     { name: 'email', label: 'Email', type: 'email', validation: { required: 'Email is required', pattern: /.../ } },
 *     { name: 'password', label: 'Password', type: 'password', validation: { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } } },
 *   ]}
 *   alternateAuth={{ text: 'Already have an account?', link: '/login', linkText: 'Log In' }}
 *   externalAuth={{
 *     show: true,
 *     text: 'Or sign up with',
 *     options: [
 *       { icon: <svg />, name: 'Google', onClick: () => console.log('Sign up with Google') },
 *       { icon: <svg />, name: 'Facebook', className: 'bg-blue-500 text-white', onClick: () => console.log('Sign up with Facebook') },
 *     ],
 *   }}
 *   logoProps={{ mode: 'light', width: 80, height: 80 }}
 * >
 *   <p className="text-sm text-gray-600 mt-4">By signing up, you agree to our terms.</p>
 * </AuthForm>
 */
const AuthForm = ({
  title,
  submitButtonText,
  onSubmit,
  onSuccess,
  fields,
  alternateAuth,
  externalAuth = {
    show: true,
    text: "Or continue with",
    options: []
  },
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
                className="w-full transition duration-200 linear p-3 text-lg font-semibold tracking-wider rounded-sm text-white bg-primary-500 data-hover:bg-primary-600"
              >
                {submitButtonText}
              </Button>
            </>
          );
        }}
      </Form>

      {externalAuth.show && (
        <>
          <div className="w-full relative mb-6">
            <div className="flex justify-center absolute inset-0 items-center">
              <div className="w-full border-t border-solid border-gray-500"></div>
            </div>
            <div className="flex justify-center relative">
              <span className="text-gray-500 bg-white ps-2 pe-2">{externalAuth.text}</span>
            </div>
          </div>

          <div className="flex gap-1">
            {externalAuth.options.map((option, index) => (
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