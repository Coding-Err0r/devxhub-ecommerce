import { SIGNIN_MUTATION } from "@/graphql/query";
import client from "@/services/apolloClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const { data } = await client.mutate({
      mutation: SIGNIN_MUTATION,
      variables: { email, password },
    });

    return NextResponse.json(
      {
        message: "Login successful",
        access_token: data?.login.access_token,
        refresh_token: data?.login.refresh_token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
