import {useQuery} from "@tanstack/react-query";
import {getBreeds} from "../api/api.ts";
import {useContext} from "react";
import {FilterContext} from "../utils/FilterContext";

const Filter = () => {
    const {selectedBreed, setSelectedBreed, showFavorites, setShowFavorites} = useContext(FilterContext)!;

    const {data: breeds} = useQuery({
        queryKey: ['breeds'],
        queryFn: getBreeds,
        staleTime: 1000 * 60 * 60 * 24,
    })

    return (
        <>
            <div className='container flex gap-6 p-3.5 m-auto transition-all ease-in-out delay-100 duration-300'>
                <div>
                    <select name="breed" id="breed" value={selectedBreed}
                            onChange={(e) => setSelectedBreed(e.target.value)}>
                        <option value="random">Random breeds</option>
                        {breeds?.map(breed => (
                            <option key={breed.id} value={breed.id}>{breed.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='favoriteCats' className='flex gap-3'>
                        Show my favorite cats:
                        <input id="favoriteCats" type='checkbox' checked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)}/>
                    </label>
                </div>
            </div>
        </>
    )
}
export default Filter
