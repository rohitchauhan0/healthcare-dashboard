import { connectWithDb } from "@/config/database";
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";



connectWithDb();
export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();
 
  try {
      const user = await User.findById(userId)
    return NextResponse.json({ user: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get user" });
  }
};
