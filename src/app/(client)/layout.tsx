import { Footer, Header } from "@/components/layout";
import { Slide, ToastContainer } from "react-toastify";
// --------------------------------

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastContainer
        icon={false}
        transition={Slide}
        closeButton={false}
      />
    </>
  );
}
