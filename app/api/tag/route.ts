import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const apiKey = process.env.LASTFM_API_KEY;

  try {
    const res = await fetch(
      `${BASE_URL}?method=tag.getInfo&tag=${tag}&api_key=${apiKey}&format=json`,
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
