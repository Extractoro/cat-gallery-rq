import "./App.css"
import Table from "./components/Table.tsx";
import {Toaster} from "react-hot-toast";
import Filter from "./components/Filter.tsx";
import {FilterProvider} from "./utils/FilterContext.tsx";

function App() {
    return (
        <>
            <FilterProvider>
                <Filter/>
                <Table/>
                <Toaster/>
            </FilterProvider>
        </>
    )
}

export default App
