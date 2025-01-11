'use client';

import { useRouter } from "next/navigation";
import LoginForm from "@/_components/pages/identity/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();

  return (
    <main className="w-screen h-screen bg-white">
      <div className="flex h-full">
        <div className="basis-1/3 p-12">
          <div className="w-full">
            <LoginForm
              onSuccess={() => {
                router.replace('/dashboard')
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