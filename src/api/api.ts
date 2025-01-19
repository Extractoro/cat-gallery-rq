import apiClient from "./api-client.ts";
import { ICat } from "../interfaces/cat.ts";
import { IAllBreeds } from "../interfaces/all-breeds.ts";
import toast from "react-hot-toast";

export const getRandomCats = async (page: number) => {
  try {
    const response = await apiClient.get<ICat[]>("/images/search", {
      params: {
        limit: 12,
        mime_types: "jpg",
        has_breeds: true,
        page,
        size: "med",
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Error getting random cats.");
    throw new Error(`Could not fetch random cats. Please try again later. ${err}`);
  }
};

export const getBreeds = async () => {
  try {
    const response = await apiClient.get<IAllBreeds[]>("/breeds");
    return response.data;
  } catch (err) {
    toast.error("Error getting cats' breeds.");
    throw new Error(`Could not fetch getting breeds. Please try again later. ${err}`);
  }
};

export const getBreedImages = async (breed_id: string, page: number) => {
  try {
    const response = await apiClient.get<ICat[]>("/images/search", {
      params: {
        breed_ids: breed_id,
        limit: 12,
        page,
        order: "ASC",
        size: "med",
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Error getting breed images.");
    throw new Error(`Could not fetch getting breed images. Please try again later. ${err}`);
  }
};
