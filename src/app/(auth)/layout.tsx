import { Slide, ToastContainer } from "react-toastify";
// ----------------------------------

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        icon={false}
        transition={Slide}
        closeButton={false}
      />
    </>
  );
}
