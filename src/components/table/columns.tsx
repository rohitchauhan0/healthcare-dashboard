"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { AppointmentModal } from "@/components/AppointmentModal";
import { StatusBadge } from "../StatusBadge";
declare type Status = "pending" | "scheduled" | "cancelled";

export interface Appointment {
  _id: string;
  patientId: {
    _id: string;
    name: string;
  };
  name: string;
  schedule: Date;
  status: string;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
  isAdmin: boolean;
}

export const columns: (isAdmin: boolean) => ColumnDef<Appointment>[] = (isAdmin) => [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patientId.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status as Status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule)}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = Doctors.find(
        (doc) => doc.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || "/assets/icons/avatar.svg"}
            alt="doctor"
            width={100}
            height={100}
            className="size-8 rounded-full object-cover"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          {
            isAdmin && (
              <AppointmentModal
              patientId={appointment.patientId._id}
              userId={appointment.userId}
              appointment={{
              ...appointment,
              patient: appointment.patientId
            }}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          )
          }
          <AppointmentModal
            patientId={appointment.patientId._id}
            userId={appointment.userId}
            appointment={{
              ...appointment,
              patient: appointment.patientId,
              _id: appointment._id
            }}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];
