import React from 'react'
import {
  Field,
  Label,
  Input,
  Button
} from '@headlessui/react'
import {
  Form,
  FormTitle,
  FormGroup,
  FormSubmit
} from "@/_components/common/Form";
import Logo from "@/_assets/Logo";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {login as loginData} from '@/data/login'

type LoginFormProps = {
  onSuccess: ()=>void
}

const LoginForm = ({
  onSuccess
}: LoginFormProps) => {

  const getData = async () => {
    return new Promise((resolve, reject) => {
      resolve(loginData);
      reject({ error: "Can't get data"})
    });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement

    const values: any = {};

    target.querySelectorAll('input').forEach(
      item => {
        values[item.name] = item.value
      }
    )

    getData().then((data) => {
      console.log(data, values);
    });
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="mb-16"
      >
        <FormTitle
          className="mb-8"
        >
          <div className="mb-4">
            <Logo
              mode="dark"
              width={64}
              height={64}
            />
          </div>
          <h3 className="text-4xl font-semibold tracking-wider mb-4">Log in to your account</h3>
          <p className="text-gray-500">
            Don't have an account?
            <Link
              href="/identity/signup"
              className="ml-2 font-semibold underline text-primary-500 hover:text-primary-400"
            >
              Sign Up
            </Link>
          </p>
        </FormTitle>
        <FormGroup
          className="mb-10"
        >
          <Field className="mb-6">
            <Label className="block mb-2">Email</Label>
            <Input
              name="email"
              type="email"
              className="block w-full p-2 border border-solid border-gray-400 rounded"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block mb-2">Password</Label>
            <Input
              name="password"
              type="password"
              className="block w-full p-2 border border-solid border-gray-400 rounded"
            />
          </Field>
        </FormGroup>
        <FormSubmit
          type="submit"
          className="w-full transition duration-200 linear p-3 text-lg font-semibold tracking-wider rounded text-white bg-primary-500 data-[hover]:bg-primary-600"
        >
          Login
        </FormSubmit>
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