import { connectWithDb } from "@/config/database";
import { Patient} from "@/model/user"; 
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

// Ensure DB is connected when this file loads
connectWithDb();

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      birthDate,
      gender,
      address,
      occupation,
      emergencyContactName,
      emergencyContactNumber,
      primaryPhysician,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      currentMedication,
      familyMedicalHistory,
      pastMedicalHistory,
      treatmentConsent,
      disclosureConsent,
      privacyConsent,
      identificationType,
      identificationNumber,
      identificationDocument,
      userId,
    } = body;

    const newPatient = await Patient.create({
      name,
      email,
      phone,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      gender,
      address,
      occupation,
      emergencyContactName,
      emergencyContactNumber,
      primaryPhysician,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      currentMedication,
      familyMedicalHistory,
      pastMedicalHistory,
      treatmentConsent,
      disclosureConsent,
      privacyConsent,
      identificationType,
      identificationNumber,
      identificationDocument,
    });

    await User.findByIdAndUpdate(userId, {  patientId: newPatient._id  }, { new: true });
   

    return NextResponse.json({ success: true, data: newPatient }, { status: 201 });

  } catch (error) {
    console.error("Patient creation error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
};
