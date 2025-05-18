"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthForm, { FieldConfig } from "@/components/forms/AuthForm";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
// --------------------------------------------

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();

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

  const onSubmit = async (data: any, setError: any) => {
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      setError("root", {
        type: "error",
        message: "Invalid credentials"
      });
    }
  };

  return (
    <main className="w-screen h-screen bg-white">
      <div className="flex h-full">
        <div className="basis-1/3 p-12">
          <div className="w-full">
            <AuthForm
              title="Login"
              submitButtonText="Log in"
              isLoading={isLoading}
              onSubmit={onSubmit}
              fields={loginFields}
              alternateAuth={{
                text: "Don't have an account?",
                link: "signup",
                linkText: "Sign Up"
              }}
              externalAuth={{
                show: true,
                text: "Or continue with",
                options: [
                  {
                    icon: <FcGoogle />,
                    name: "Google",
                    className: "bg-white text-gray-800 border-gray-300",
                    onClick: () => alert('Google login clicked')
                  },
                  {
                    icon: <FaFacebook className='fill-white' />,
                    name: "Facebook",
                    className: "bg-blue-500 text-white border-blue-500",
                    onClick: () => alert('Facebook login clicked')
                  }
                ]
              }}
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