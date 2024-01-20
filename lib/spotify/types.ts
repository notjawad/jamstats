export type User = {
  display_name: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: any[];
  type: string;
  uri: string;
  followers: {
    href: null;
    total: number;
  };
  email: string;
};

export type Artist = {
  external_urls: { spotify: string };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Image = {
  height: number;
  url: string;
  width: number;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Tag = {
  tag: {
    name: string;
    total: number;
    reach: number;
    wiki: { summary: string; content: string };
  };
};

export type TagArtist = {
  name: string;
  mbid: string;
  url: string;
  streamable: string;
  image: { "#text": string; size: string }[];
  "@attr": { rank: string };
};
