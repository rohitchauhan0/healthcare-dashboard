import { connectWithDb } from "@/config/database";
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectWithDb(); // ✅ Await the DB connection

    const { name, email, phone } = await req.json();
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ user: existingUser, newUser: false }, { status: 200 });
    }

    const newUser = await User.create({ name, email, phone });
    return NextResponse.json({ user: newUser, newUser: true }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};
