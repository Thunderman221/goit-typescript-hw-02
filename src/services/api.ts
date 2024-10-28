import axios from "axios";
import { Image, UnsplashUser } from "../types";

const ACCESS_KEY = "LR1rSDe2-ILjSKqcE30lBZuQfEXqnVEDmhuxhh-1WNI";

interface UnsplashImageResponse {
  id: string;
  alt_description: string | null;
  urls: { small: string; regular: string };
  user: UnsplashUser;
  likes: number;
}

interface FetchImagesResponse {
  results: Image[];
  total: number;
}

interface UnsplashAPIResponse {
  results: UnsplashImageResponse[];
  total: number;
}

export const fetchImages = async (
  query: string,
  page: number,
  perPage: number
): Promise<FetchImagesResponse> => {
  try {
    const response = await axios.get<UnsplashAPIResponse>(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: query,
          client_id: ACCESS_KEY,
          page: page,
          per_page: perPage,
        },
      }
    );

    const results: Image[] = response.data.results.map((item) => ({
      id: item.id,
      alt_description: item.alt_description,
      urls: {
        small: item.urls.small,
        regular: item.urls.regular,
      },
      user: {
        name: item.user.name,
      },
      likes: item.likes,
    }));

    return {
      results,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
};
