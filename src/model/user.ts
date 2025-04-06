
import mongoose, { Schema, model, models } from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewAppointment",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);


const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  birthDate: Date,
  gender: String,
  address: String,
  occupation: String,
  emergencyContactName: String,
  emergencyContactNumber: String,
  primaryPhysician: String,
  insuranceProvider: String,
  insurancePolicyNumber: String,
  allergies: String,
  currentMedication: String,
  familyMedicalHistory: String,
  pastMedicalHistory: String,
  treatmentConsent: Boolean,
  disclosureConsent: Boolean,
  privacyConsent: Boolean,
  identificationType: String,
  identificationNumber: String,
  identificationDocument: [String], // array of file URLs or file names
}, {
  timestamps: true,
});

const newAppointmentSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  appointmentDate: Date,
  appointmentTime: String,
  primaryPhysician: String,
  appointmentStatus: String,
  schedule: String,
  reason: String,
  note: String,
  status: String,
  cancellationReason: String,
});



const Patient = models.Patient || model("Patient", PatientSchema);
const NewAppointment = models.NewAppointment || model("NewAppointment", newAppointmentSchema);
export { Patient, NewAppointment };
