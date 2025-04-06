"use client";

import React, { useEffect, useState } from "react";
import { Appointment, columns } from "@/components/table/columns";
import { apiconnector } from "@/config/api-connector";
import { formatDateTime } from "@/lib/utils";
import { DataTable } from "@/components/table/DataTable";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Page = ({ params: { userId } }: SearchParamProps) => {
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

      {/* {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="rounded-lg border p-4 shadow-sm space-y-1"
            >
              <p><strong>Patient:</strong> {appointment.patientId.name}</p>
              <p>
                <strong>Schedule:</strong>{" "}
                {formatDateTime(appointment.schedule)}
              </p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <p><strong>Doctor:</strong> Dr. {appointment.primaryPhysician}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
              <p><strong>Note:</strong> {appointment.note || "N/A"}</p>
              {appointment.cancellationReason && (
                <p className="text-red-500">
                  <strong>Cancellation Reason:</strong>{" "}
                  {appointment.cancellationReason}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )} */}

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
