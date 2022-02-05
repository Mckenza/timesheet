import react from "react";
import FieldForData from "./FieldForData";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./CalendarPage";

export default () => {

    return (
        <div className="main_content">
            <Routes>
                <Route path='/input' element={<FieldForData />} />
                <Route path='/calendar/:id' element = {<CalendarPage/>}/>
            </Routes>

        </div>
    )
}