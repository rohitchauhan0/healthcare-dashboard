"use client";

import React, { useEffect, useState } from "react";
import { Appointment, columns } from "@/components/table/columns";
import { apiconnector } from "@/config/api-connector";
import { DataTable } from "@/components/table/DataTable";
import { useParams } from "next/navigation";




const Page =() => {
  const params = useParams() as { userId: string };
  const { userId } = params;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await apiconnector<{ appointments: Appointment[] }>(
          "POST",
          "/api/users-appointement",
          { userId }
        );
        console.log(res.data.appointments);
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className=" max-w-screen-xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Appointments</h1>


      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <DataTable columns={columns(false)} data={appointments} />
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Page;
