import react, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
/* Сделать список по месяцам и года */

function createCalendar(month, year){
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(daysInMonth);

}

export default () => {
    const [month, setMonth] = useState(() => new Date().getMonth());
    const [year, setYear] = useState(() => new Date().getFullYear());
    
    useEffect(() => {
        console.log(month);
        console.log(year);
        createCalendar(month, year);
    }, [month, year]);


    return (
        <div className="wrap_calendar">
            <div className="manage_calendar">
                <select onChange={(e) => {setMonth(Number(e.target.value))} }>
                    <option disabled selected>Выбор месяца</option>
                    <option value="0">Январь</option>
                    <option value="1">Февраль</option>
                    <option value="2">Март</option>
                    <option value="3">Апрель</option>
                    <option value="4">Май</option>
                    <option value="5">Июнь</option>
                    <option value="6">Июль</option>
                    <option value="7">Август</option>
                    <option value="8">Сентябрь</option>
                    <option value="9">Октябрь</option>
                    <option value="10">Ноябрь</option>
                    <option value="11">Декабрь</option>
                </select>
                <input type="number" onChange={(e) => {setYear(Number(e.target.value))}}></input>
            </div>
            <div className="calendar">
                
            </div>
        </div>
    )
}