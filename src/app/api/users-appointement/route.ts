import { connectWithDb } from "@/config/database";
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";


connectWithDb()
export const POST = async (request: NextRequest) => {
    try {
        const { userId } = await request.json();
        console.log(userId);
        const appointments = await User.findById(userId).populate({
            path: "appointments",
            populate: {
                path: "patientId",
                model: "User",
            },
            options: { sort: { createdAt: -1 } },
        });
        
        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Failed to fetch appointments:", error);
        return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
    }
};
