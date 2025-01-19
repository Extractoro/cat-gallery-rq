import axios from "axios";
import { ICat } from "../interfaces/interface-cat.ts";
import { IAllBreeds } from "../interfaces/allBreeds.ts";

const DEFAULT_URL: string = "https://api.thecatapi.com/v1";
const API_KEY: string = import.meta.env.VITE_API_KEY;

export const getRandomCats = async (page: number) => {
  return (
    await axios.get<ICat[]>(`${DEFAULT_URL}/images/search`, {
      params: {
        limit: 12,
        mime_types: "jpg",
        has_breeds: true,
        page: page,
        size: "med",
      },
      headers: {
        "x-api-key": API_KEY,
      },
    })
  ).data;
};

export const getBreeds = async () => {
  return (
    await axios.get<IAllBreeds[]>(`${DEFAULT_URL}/breeds`, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
  ).data;
};

export const getBreedImages = async (breed_id: string, page: number) => {
  return (
    await axios.get<ICat[]>(`${DEFAULT_URL}/images/search`, {
      params: {
        breed_ids: breed_id,
        limit: 12,
        page,
        order: "ASC",
        size: "med",
      },
      headers: {
        "x-api-key": API_KEY,
      },
    })
  ).data;
};
