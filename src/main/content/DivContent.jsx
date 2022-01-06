import react from "react";
import FieldForData from "./FieldForData";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "./Calendar";

export default () => {

    return (
        <div className="main_content">
            <Calendar/>
            <Routes>
                <Route path='/input' element={<FieldForData />} />
            </Routes>

        </div>
    )
}