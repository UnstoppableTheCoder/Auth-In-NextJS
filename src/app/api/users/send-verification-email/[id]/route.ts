import sendEmail from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
    }

    await sendEmail({ email: user.email, emailType: "VERIFY", userId: id });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
