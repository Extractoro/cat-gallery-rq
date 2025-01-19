import { FaHeart, FaRegHeart } from "react-icons/fa";
import React from "react";
import { ICat } from "../interfaces/cat.ts";
import defaultImage from '../assets/default_image.jpg'

interface CardProps {
  cat: ICat;
  favoriteCats: ICat[];
  setFavoriteCats: (cats: ICat[]) => void;
}

const Card: React.FC<CardProps> = ({ cat, favoriteCats, setFavoriteCats }) => {
  const handleFavorite = (cat: ICat) => {
    const isFavorite = favoriteCats.some((favCat) => favCat.id === cat.id);
    const updatedFavorites = isFavorite
        ? favoriteCats.filter((favCat) => favCat.id !== cat.id)
        : [...favoriteCats, cat];

    localStorage.setItem("favoritesCats", JSON.stringify(updatedFavorites));
    setFavoriteCats(updatedFavorites);
  };

  const checkFavorite = (cat_id: string): boolean => {
    return favoriteCats.some((favCat) => favCat.id === cat_id);
  };

  return (
    <li key={cat.id} className="w-full">
      <img
        src={cat.url || defaultImage}
        className="object-cover w-full max-w-[400px] h-[300px] rounded-t-[8px] transition-all duration-300 xm:h-[350px] lg:h-[450px] lg:max-w-full"
        alt={cat.id || "Default Cat"}
      />

      <div className="flex items-center justify-between bg-gray-100 py-3 px-4 rounded-b-[8px]">
        <p className="text-black font-semibold text-xl ">
          Breed name:{" "}
          <span className="font-normal">{cat?.breeds[0]?.name}</span>
        </p>
        <button onClick={() => handleFavorite(cat)} className="w-5 h-5 hover:scale-110 transition-transform">
          {checkFavorite(cat.id) ? (
            <FaHeart color={"red"} size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
      </div>
    </li>
  );
};
export default Card;
