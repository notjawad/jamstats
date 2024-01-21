export interface Artist {
  alternate_names: string[];
  description: {
    dom: {};
  };
  facebook_name: string;
  followers_count: number;
  header_image_url: string;
  id: number;
  image_url: string;
  instagram_name: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  translation_artist: boolean;
  twitter_name: string;
  url: string;
  current_user_metadata: {
    permissions: string[];
    excluded_permissions: string[];
    interactions: {
      following: boolean;
    };
  };
  iq: number;
  description_annotation: {
    _type: string;
    annotator_id: number;
    annotator_login: string;
    api_path: string;
    classification: string;
    fragment: string;
    id: number;
    is_description: boolean;
    path: string;
    range: {
      content: string;
    };
    song_id: null;
    url: string;
    verified_annotator_ids: any[];
    annotatable: {
      api_path: string;
      context: null;
      id: number;
      image_url: string;
      link_title: string;
      title: string;
      type: string;
      url: string;
    };
    annotations: {
      api_path: string;
      body: {
        dom: {
          tag: string;
          children: {
            tag: string;
            children:
              | string[]
              | {
                  tag: string;
                  attributes?: {
                    href: string;
                    rel: string;
                  };
                  data?: {
                    api_path: string;
                  };
                  children: string[];
                }[];
          }[];
        };
      };
      comment_count: number;
      community: boolean;
      custom_preview: null;
      has_voters: boolean;
      id: number;
      pinned: boolean;
      share_url: string;
      source: null;
      state: string;
      url: string;
      verified: boolean;
      votes_total: number;
      current_user_metadata: {
        permissions: string[];
        excluded_permissions: string[];
        interactions: {
          cosign: boolean;
          pyong: boolean;
          vote: null;
        };
        iq_by_action: {
          accept: {
            primary: {
              multiplier: number;
              base: number;
              applicable: boolean;
            };
          };
          reject: {
            primary: {
              multiplier: number;
              base: number;
              applicable: boolean;
            };
          };
          delete: {
            primary: {
              multiplier: number;
              base: number;
              applicable: boolean;
            };
          };
        };
      };
      authors: {
        attribution: number;
        pinned_role: null;
        user: {
          api_path: string;
          avatar: {
            tiny: {
              url: string;
              bounding_box: {
                width: number;
                height: number;
              };
            };
            thumb: {
              url: string;
              bounding_box: {
                width: number;
                height: number;
              };
            };
            small: {
              url: string;
              bounding_box: {
                width: number;
                height: number;
              };
            };
            medium: {
              url: string;
              bounding_box: {
                width: number;
                height: number;
              };
            };
          };
          header_image_url: string;
          human_readable_role_for_display: string;
          id: number;
          iq: number;
          login: string;
          name: string;
          role_for_display: string;
          url: string;
          current_user_metadata: {
            permissions: string[];
            excluded_permissions: string[];
            interactions: {
              following: boolean;
            };
          };
        };
      }[];
      cosigned_by: any[];
      rejection_comment: null;
      verified_by: null;
    }[];
  };
  user: {
    api_path: string;
    avatar: {
      tiny: {
        url: string;
        bounding_box: {
          width: number;
          height: number;
        };
      };
      thumb: {
        url: string;
        bounding_box: {
          width: number;
          height: number;
        };
      };
      small: {
        url: string;
        bounding_box: {
          width: number;
          height: number;
        };
      };
      medium: {
        url: string;
        bounding_box: {
          width: number;
          height: number;
        };
      };
    };
    header_image_url: string;
    human_readable_role_for_display: string;
    id: number;
    iq: number;
    login: string;
    name: string;
    role_for_display: string;
    url: string;
    current_user_metadata: {
      permissions: string[];
      excluded_permissions: string[];
      interactions: {
        following: boolean;
      };
    };
  };
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: ArtistElement[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifyAlbum {
  album_type: string;
  artists: ArtistElement[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_playable: boolean;
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ArtistElement {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
