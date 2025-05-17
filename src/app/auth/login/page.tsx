'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthForm, { FieldConfig } from "@/_components/AuthForm";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();

  const loginFields: FieldConfig[] = [
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
    }
  ];

  const handleSubmit = async (data: any, setError: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo validation - in real app, this would be an API call
    if (data.email !== 'demo@example.com' || data.password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    // Success - would normally set auth tokens/cookies here
    console.log('Login successful', data);
  };

  return (
    <main className="w-screen h-screen bg-white">
      <div className="flex h-full">
        <div className="basis-1/3 p-12">
          <div className="w-full">
            <AuthForm
              title="Login"
              submitButtonText="Sign In"
              onSubmit={handleSubmit}
              onSuccess={() => {
                alert('Login successful! Redirecting...');
                router.push('/dashboard');
              }}
              fields={loginFields}
              alternateAuth={{
                text: "Don't have an account?",
                link: "/demo/signup",
                linkText: "Sign Up"
              }}
              externalAuthOptions={[
                {
                  icon: <FcGoogle />,
                  name: "Google",
                  onClick: () => alert('Google login clicked')
                },
                {
                  icon: <FaFacebook className='fill-white' />,
                  name: "Facebook",
                  className: "bg-blue-500 text-white!",
                  onClick: () => alert('Facebook login clicked')
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
export default LoginPage