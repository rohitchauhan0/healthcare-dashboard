"use client";

import Image from "next/image";
import Link from "next/link";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { StatCard } from "@/components/StatCard";
import { useEffect, useState } from "react";
import { apiconnector } from "@/config/api-connector";

interface Appointment {
  cancellationReason: string;
  user: any;
  _id: string;
  patientId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  primaryPhysician: string;
  reason: string;
  schedule: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentResponse {
  allAppointments: Appointment[];
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
}


const Page = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await apiconnector<AppointmentResponse>("GET", "/api/new-appointment");
        const data = response.data;
        setAppointments(data.allAppointments);
        setScheduledCount(data.scheduledCount);
        setPendingCount(data.pendingCount);
        setCancelledCount(data.cancelledCount);
      } catch (error) {
        console.log(error);
      }
    };

    getAppointments();
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-[#0D0F10] px-[5%] py-5 shadow-lg xl:px-12">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-1">
        <section className="w-full space-y-4">
          <h1 className="text-7xl font-semibold">Welcome 👋</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns(true)} data={appointments.map(appointment => ({
          ...appointment,
          schedule: new Date(appointment.schedule),
          name: appointment.user?.name || '',
          note: appointment.user?.note || '',
          userId: appointment.user?.id || '',
          cancellationReason: appointment.cancellationReason || '',
          isAdmin: appointment.user?.isAdmin || false
        }))} />
      </main>
    </div>
  );
}

export default Page;
