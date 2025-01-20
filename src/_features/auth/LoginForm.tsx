import React from 'react'
import {
  Button
} from '@headlessui/react'
import {
  Form,
  Field,
  FormTitle,
} from "@/_components/Form";
import Logo from "@/_assets/Logo";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormMessage, { FormMessageProps } from '@/_components/Form/FormMessage';

type LoginFormProps = {
  onSuccess: ()=>void
}

const LoginForm = ({
  onSuccess
}: LoginFormProps) => {

  return (
    <div>
      <Form
        onSubmit={async (data, setError) => {
          try {
            await new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error("Incorrect Email or Password!"));
              }, 1000);
            });
          } catch (error: any) {
            setError("root", {
              type: "error" as "success" | "error",
              message: error.message
            })
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
          <FormTitle
            className="mb-10"
          >
            <div className="mb-2">
          <Logo
            mode="dark"
            width={64}
            height={64}
          />
            </div>
            <h3 className="text-4xl font-semibold tracking-wider mb-4">Login</h3>
            <p className="text-gray-500">
          Don't have an account?
          <Link
            href="/auth/signup"
            className="ml-2 font-semibold underline text-primary-500 hover:text-primary-400"
          >
            Sign Up
          </Link>
            </p>
          </FormTitle>
          {formState.errors['root'] &&
            <FormMessage
              {...formState.errors['root'] as FormMessageProps}
            />
          }
          <div
            className="mb-10"
          >
            <Field 
          label="Email"
          type="email"
          error={formState.errors['email']}
          registration={register('email', {
            required: "This field is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
            />
            <Field 
          label="Password"
          type="password"
          error={formState.errors['password']}
          registration={register('password', {
            required: "This field is required",
            pattern: /.{8,}/
          })}
            />
          </div>
          <Button
            type="submit"
            className="w-full transition duration-200 linear p-3 text-lg font-semibold tracking-wider rounded text-white bg-primary-500 data-[hover]:bg-primary-600"
          >
            Login
          </Button>
        </>
          )

        }}
      </Form>
      <div className="w-full relative mb-6">
        <div className="flex justify-center absolute inset-0 items-center">
          <div className="w-full border-t border-solid border-gray-500"></div>
        </div>
        <div className="flex justify-center relative">
          <span className="text-gray-500 bg-white ps-2 pe-2">Or continue with</span>
        </div>
      </div>
      <div className="flex">
        <Button
          className="flex-1 flex gap-2 justify-center items-center border border-solid border-gray-500 rounded p-2 font-semibold transition duration-200 linear hover:bg-gray-100"
        >
          <FcGoogle
            size={32}
          />
          Google
        </Button>
      </div>
    </div>
  )
}

export default LoginForm