import { NextResponse, NextRequest } from "next/server";
import use
const BASE_URL = "https://api.spotify.com/v1/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("username");

  try {
    const res = await fetch(
      `${BASE_URL}?method=tag.getsimilar&tag=${tag}&api_key=${apiKey}&format=json&limit=15`,
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
