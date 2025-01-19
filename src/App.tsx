import "./App.css"
import Table from "./components/Table.tsx";
import {Toaster} from "react-hot-toast";
import Filter from "./components/Filter.tsx";

function App() {
    return (
        <>
                <Filter/>
                <Table/>
                <Toaster/>
        </>
    )
}

export default App
