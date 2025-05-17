"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import AuthForm, { FieldConfig } from "@/_components/AuthForm";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const router = useRouter();

  const signupFields: FieldConfig[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      validation: {
        required: 'Full name is required'
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: {
        required: 'Email is required',
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        }
      }
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      validation: {
        required: 'Please confirm your password',
        validate: (value: string) => {
          const password = document.querySelector('input[name="password"]') as HTMLInputElement;
          return value === password?.value || 'Passwords do not match';
        }
      }
    }
  ];

  const handleSubmit = async (data: any, setError: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo validation - in real app, this would be an API call
    if (data.email === 'taken@example.com') {
      throw new Error('This email is already registered');
    }

    // Success - would normally create user account here
    console.log('Signup successful', data);
  };

  return (
    <main className="w-screen h-screen bg-white">
      <div className="flex h-full">
        <div className="basis-1/3 p-12">
          <div className="w-full">
            <AuthForm
              title="Create Account"
              submitButtonText="Sign Up"
              onSubmit={handleSubmit}
              onSuccess={() => {
                router.replace('/dashboard')
              }}
              fields={signupFields}
              alternateAuth={{
                text: "Already have an account?",
                link: "/auth/login",
                linkText: "Login"
              }}
              externalAuthOptions={[
                {
                  icon: <FcGoogle />,
                  name: "Google",
                  onClick: () => console.log('Google signup clicked')
                }
              ]}
            />
          </div>
        </div>
        <div className="basis-2/3">
          <div className="relative w-full h-full brightness-50">
            <Image
              src="/placeholder-asset-1.avif"
              alt="placeholder img"
              fill={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
