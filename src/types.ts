export interface Image {
  id: string;
  alt_description: string | null;
  urls: { regular: string; small: string };
  user: { name: string };
  likes: number;
}

export interface UnsplashUser {
  name: string;
}
