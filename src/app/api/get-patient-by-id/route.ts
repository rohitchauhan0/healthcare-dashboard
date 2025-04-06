import { connectWithDb } from "@/config/database";
import { Patient } from "@/model/user"; 
import { NextRequest, NextResponse } from "next/server";

connectWithDb();

export const POST = async (req: NextRequest) => {
  try {
    const { patientId } = await req.json();
    console.log(patientId);
    
    const patient = await Patient.findById({userId: patientId});
    return NextResponse.json(patient);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch patient" }, { status: 500 });
  }
};