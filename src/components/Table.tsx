import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {getBreedImages, getRandomCats} from "../api/api.ts";
import toast from "react-hot-toast";
import {FilterContext} from "../utils/FilterContext.tsx";
import {ICat} from "../interfaces/interface-cat.ts";
import {FaRegHeart, FaHeart} from "react-icons/fa";

const Table = () => {
    const {selectedBreed, showFavorites} = useContext(FilterContext)!;
    const [page, setPage] = useState<number>(0)
    const [breedPage, setBreedPage] = useState<number>(0)
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [favoriteCats, setFavoriteCats] = useState<ICat[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoritesCats") || "[]") as ICat[];
        setFavoriteCats(storedFavorites);
    }, []);

    useEffect(() => {
        setBreedPage(0);
        setPage(0);
        setCurrentPage(0);
        setHasNextPage(true);
        console.log(selectedBreed)

        setFavoriteCats(() => {
            const storedFavorites = JSON.parse(localStorage.getItem('favoritesCats') || '[]') as ICat[];
            if (selectedBreed === 'random') {
                return storedFavorites;
            }
            return storedFavorites.filter(
                (favCat) =>
                    favCat.breeds &&
                    favCat.breeds[0]?.id?.toLowerCase() === selectedBreed.toLowerCase()
            );
        });
    }, [selectedBreed]);

    const fetchData = async (): Promise<ICat[]> => {
        return (selectedBreed && !(selectedBreed === 'random'))
            ? await getBreedImages(selectedBreed, breedPage)
            : await getRandomCats(page);
    };

    const {data, isError, isLoading, isFetching} = useQuery<ICat[]>({
        queryKey: ['cats', selectedBreed, page, breedPage],
        queryFn: () => fetchData(),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 60 * 24, // 24h
    })

    const changePage = (direction: "next" | "back") => {
        if (direction === "next") {
            setCurrentPage((p) => p + 1);
            selectedBreed ? setBreedPage((p) => p + 1) : setPage((p) => p + 1);
        } else {
            setCurrentPage((p) => Math.max(0, p - 1));
            selectedBreed ? setBreedPage((p) => Math.max(0, p - 1)) : setPage((p) => Math.max(0, p - 1));
        }
    };

    const handleFavorite = (cat: ICat) => {
        setFavoriteCats((prevFavorites) => {
            const exists = prevFavorites.some((favCat) => favCat.id === cat.id);

            const updatedFavorites = exists
                ? prevFavorites.filter((favCat) => favCat.id !== cat.id)
                : [...prevFavorites, cat];

            localStorage.setItem("favoritesCats", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const checkFavorite = (cat_id: string): boolean => {
        return favoriteCats.some((favCat) => favCat.id === cat_id);
    };

    useEffect(() => {
        if (data) {
            setHasNextPage(data.length === 12);
        }
    }, [data]);

    useEffect(() => {
        toast.remove();

        if (isFetching) {
            toast.loading("Loading...");
        } else if (!isLoading && !isError && data) {
            if (showFavorites) {
                const hasFavorites = favoriteCats.length > 0;
                if (!hasFavorites) {
                    toast.error("No favorite cats found! 🐾");
                    return;
                }
            }
            toast.success(
                `Cats successfully uploaded! ${selectedBreed ? "🐱" : "🐾"}`
            );
        } else if (isError) {
            toast.error("Failed to load cats. Please try again! 😿");
        }
    }, [isFetching, isLoading, isError, data, selectedBreed, showFavorites, favoriteCats.length]);

    return (
        <>
            {(!isLoading || !isFetching || !isError) &&
                <div className='container p-3.5 m-auto transition-all ease-in-out delay-100 duration-300'>
                    {(showFavorites && favoriteCats.length === 0) &&
                        <p className="py-5 text-3xl text-center font-bold">
                            You haven't got favorite cats yet...
                        </p>}
                    <ul className='grid gap-5 transition-all ease-in-out delay-100 duration-300 justify-items-center sm:grid-cols-2 xl:grid-cols-3 '>
                        {(showFavorites ? favoriteCats : data)?.map((cat: ICat) => (
                            <li key={cat.id} className='w-full'>
                                <img src={cat.url}
                                     className='object-cover w-full max-w-[400px] h-[300px] rounded-t-[8px] transition-all duration-300 xm:h-[350px] lg:h-[450px] lg:max-w-full'
                                     alt={cat.id}/>
                                {!(selectedBreed && !(selectedBreed === 'random')) &&
                                    <div
                                        className='flex items-center justify-between bg-gray-100 py-3 px-4 rounded-b-[8px]'>
                                        <p className='text-black font-semibold text-xl '>Breed name: <span
                                            className='font-normal'>{cat?.breeds[0]?.name}</span></p>
                                        <button
                                            onClick={() => handleFavorite(cat)}
                                            className="w-5 h-5"
                                        >
                                            {checkFavorite(cat.id) ? (
                                                <FaHeart color={"red"} size={20}/>
                                            ) : (
                                                <FaRegHeart size={20}/>
                                            )}
                                        </button>

                                    </div>}
                            </li>
                        ))}</ul>

                    {!showFavorites && (currentPage > 0 || hasNextPage) && (
                        !isFetching ? (
                            <div className="flex justify-center gap-5 mt-5">
                                <button
                                    className={`w-[100px] p-2 bg-blue-500 text-amber-50 rounded-md transition ease-in-out delay-100 relative ${
                                        currentPage > 0 ? "hover:bg-blue-600 hover:top-[0.5px]" : "cursor-not-allowed bg-gray-300 opacity-50 text-black"
                                    }`}
                                    onClick={() => changePage("back")}
                                    disabled={currentPage === 0}
                                >
                                    Back
                                </button>

                                <button
                                    className={`w-[100px] p-2 bg-blue-500 text-amber-50 rounded-md transition ease-in-out delay-100 relative ${
                                        hasNextPage ? "hover:bg-blue-600 hover:top-[0.5px]" : "cursor-not-allowed bg-gray-300 opacity-50 text-black"
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
                        )
                    )}
                </div>}
        </>
    )
}
export default Table
