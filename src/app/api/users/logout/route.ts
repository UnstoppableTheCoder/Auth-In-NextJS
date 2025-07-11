import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("testtoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
