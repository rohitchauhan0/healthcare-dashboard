"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiconnector } from "@/config/api-connector";
import RegisterForm from "@/components/RegisterForm";

type SearchParamProps = {
  params: {
    userId: string;
  };
};

const Register = ({ params: { userId } }: SearchParamProps) => {
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiconnector<{ user: { _id: string; name: string; email: string; phone: string } }>(
          "POST",
          "/api/get-user-by-id",
          { userId },
          {}
        );
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {user && (
            <RegisterForm
              user={{
                name: user.name,
                email: user.email,
                phone: user.phone,
                user: [user._id],
              }}
            />
          )}

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[390px]"
      />
    </div>
  );
};

export default Register;
