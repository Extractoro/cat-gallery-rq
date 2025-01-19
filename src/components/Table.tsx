import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getBreedImages, getRandomCats } from "../api/api.ts";
import toast from "react-hot-toast";
import { Context } from "../utils/filter-context/context.ts";
import { ICat } from "../interfaces/cat.ts";
import Card from "./Card.tsx";

const Table = () => {
  const { selectedBreed, showFavorites } = useContext(Context)!;
  const [page, setPage] = useState<number>(0);
  const [favoriteCats, setFavoriteCats] = useState<ICat[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoritesCats") || "[]"
    ) as ICat[];
    setFavoriteCats(storedFavorites);
  }, []);

  const filteredFavorites = selectedBreed === "random"
      ? favoriteCats
      : favoriteCats.filter(
          (favCat) =>
              favCat.breeds &&
              favCat.breeds[0]?.id?.toLowerCase() === selectedBreed.toLowerCase()
      );

  const fetchData = async (): Promise<ICat[]> => {
    return selectedBreed && !(selectedBreed === "random")
      ? await getBreedImages(selectedBreed, page)
      : await getRandomCats(page);
  };

  const { data, isError, isLoading, isFetching } = useQuery<ICat[]>({
    queryKey: ["cats", selectedBreed, page],
    queryFn: () => fetchData(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  const hasNextPage = data?.length === 12;

  const changePage = (direction: "next" | "back") => {
    setPage((prev) => Math.max(0, prev + (direction === "next" ? 1 : -1)));
  };

  useEffect(() => {
    setPage(0);
  }, [selectedBreed]);

  useEffect(() => {
    toast.remove();
    if (isFetching) {
      toast.loading("Loading...");
    } else if (isError) {
      toast.error("Failed to load cats. Please try again!");
    } else if (!isLoading && data) {
      if (showFavorites && filteredFavorites.length === 0) {
        toast.error("No favorite cats found! 🐾");
      } else {
        toast.success("Cats successfully updated! 🐾");
      }
    }
  }, [isFetching, isError, isLoading, data, showFavorites, filteredFavorites]);

  const renderCats = showFavorites ? filteredFavorites : data || [];

  return (
    <>
      {(!isLoading || !isFetching || !isError) && (
        <div className="container p-3.5 m-auto transition-all ease-in-out delay-100 duration-300">
          {showFavorites && filteredFavorites.length === 0 && (
            <p className="py-5 text-3xl text-center font-bold">
              You haven't got favorite cats yet...
            </p>
          )}
          <ul className="grid gap-5 transition-all ease-in-out delay-100 duration-300 justify-items-center sm:grid-cols-2 xl:grid-cols-3 ">
            {renderCats?.map((cat: ICat) => (
              <Card
                key={cat.id}
                cat={cat}
                favoriteCats={favoriteCats}
                setFavoriteCats={setFavoriteCats}
              />
            ))}
          </ul>

          {!showFavorites &&
            (!isFetching ? (
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className={`w-[100px] p-2 bg-blue-500 text-amber-50 rounded-md transition ease-in-out delay-100 relative ${
                    page > 0
                      ? "hover:bg-blue-600 hover:top-[0.5px]"
                      : "cursor-not-allowed bg-gray-300 opacity-50 text-black"
                  }`}
                  onClick={() => changePage("back")}
                  disabled={page === 0}
                >
                  Back
                </button>

                <button
                  className={`w-[100px] p-2 bg-blue-500 text-amber-50 rounded-md transition ease-in-out delay-100 relative ${
                    hasNextPage
                      ? "hover:bg-blue-600 hover:top-[0.5px]"
                      : "cursor-not-allowed bg-gray-300 opacity-50 text-black"
                  }`}
                  onClick={() => changePage("next")}
                  disabled={!hasNextPage}
                >
                  Next
                </button>
              </div>
            ) : (
              <p className="py-5 text-3xl text-center font-bold">
                Getting new kitties...
              </p>
            ))}
        </div>
      )}
    </>
  );
};
export default Table;
