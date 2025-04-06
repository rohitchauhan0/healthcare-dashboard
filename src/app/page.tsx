import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "../components/PasskeyModal";
import { PatientForm } from "@/components/PatientForm";
import "./globals.css";

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const Home = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const isAdmin = Array.isArray(params?.admin)
    ? params.admin.includes("true")
    : params?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] px-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
