import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const BASE_URL = "api.genius.com";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get("artist");
  const apiKey = process.env.GENIUS_API_KEY;

  try {
    const searchResponse = await axios.get(
      `https://${BASE_URL}/search?q=${artist}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );

    const songs = searchResponse.data.response.hits.filter(
      (song: any) =>
        song.result.primary_artist.name.toLowerCase() === artist?.toLowerCase(),
    );

    const artistId = songs[0].result.primary_artist.id;
    const artistResponse = await axios.get(
      `https://${BASE_URL}/artists/${artistId}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );

    const artistObject = artistResponse.data.response.artist;

    return NextResponse.json(artistObject);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
