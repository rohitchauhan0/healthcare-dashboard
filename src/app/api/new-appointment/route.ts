import Appointment from "@/app/patients/[userId]/new-appointment/page";
import { connectWithDb } from "@/config/database";
import { NewAppointment } from "@/model/user";
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

connectWithDb();

export const POST = async (req: NextRequest) => {
  const {   appointmentDate, appointmentTime, primaryPhysician, appointmentStatus, userId, schedule, reason, note, status } = await req.json();

  
  const newAppointment = await NewAppointment.create({  patientId: userId, appointmentDate, appointmentTime, schedule, reason, note, status, primaryPhysician, appointmentStatus });
  await User.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } });
  return NextResponse.json(newAppointment);
};


export const GET = async (req: NextRequest) => {
  try {
    const allAppointments = await NewAppointment.find().populate("patientId").sort({ createdAt: -1 }).exec();
    const [scheduledCount, pendingCount, cancelledCount] = await Promise.all([
      NewAppointment.countDocuments({status: "scheduled" }),
      NewAppointment.countDocuments({ status: "pending" }),
      NewAppointment.countDocuments({ status: "cancelled" }),
    ]);
    return NextResponse.json({ allAppointments, scheduledCount, pendingCount, cancelledCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
  
};


export const PUT = async (req: NextRequest) => {
  try {
    const { appointmentId, status, primaryPhysician, schedule, cancellationReason } = await req.json();
    const updatedAppointment = await NewAppointment.findByIdAndUpdate(appointmentId, { status, primaryPhysician, schedule, cancellationReason }, { new: true });
    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { appointmentId } = await req.json();

  await NewAppointment.findByIdAndDelete(appointmentId);
  return NextResponse.json({ message: "Appointment deleted successfully" });
};
