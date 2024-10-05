import { ADD_USER } from "@/graphql/query";
import client from "@/services/apolloClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password, avatar } = await request.json();

  try {
    const { data } = await client.mutate({
      mutation: ADD_USER,
      variables: { name, email, password, avatar },
    });

    return NextResponse.json({ user: data.addUser });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
