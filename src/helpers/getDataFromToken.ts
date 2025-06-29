import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define the expected shape of the token payload
interface DecodedToken {
  id: string;
  // Add other fields if your token includes them, e.g., email, role, etc.
}

export async function getDataFromToken(request: NextRequest): Promise<string> {
  try {
    const token = request.cookies.get("testtoken")?.value || "";

    // Type assertion to tell TypeScript the shape of the decoded token
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;

    console.log(decodedToken.id);
    return decodedToken.id;
  } catch (error: unknown) {
    // Properly type the caught error as unknown and narrow it
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred while verifying token");
    }
  }
}
