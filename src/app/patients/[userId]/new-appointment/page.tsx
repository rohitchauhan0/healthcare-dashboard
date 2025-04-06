"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiconnector } from "@/config/api-connector";
import { AppointmentForm } from "@/components/AppointmentForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Appointment = ({ params: { userId } }: SearchParamProps) => {
  const [userData, setUserData] = useState<{
    _id: string;
    patientId: string;
  } | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await apiconnector<{ user: { _id: string; patientId: string } }>(
          "POST",
          "/api/get-user-by-id",
          { userId }
        );
        setUserData(res.data.user);

      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchPatient();
  }, [userId]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className=" w-full flex items-center justify-between mb-12">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className=" h-10 w-fit"
          />
          <Link href={`/patients/${userId}/my-appointments`}>
            <Button variant="outline" className=" bg-green-500 text-white">
              My Appointments
            </Button>
          </Link>
          </div>

          {userData && (
            <AppointmentForm
              patientId={userData.patientId}
              userId={userId}
              type="create"
            />
          )}

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
