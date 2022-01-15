import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar";

/* Сделать список по месяцам и года */

function createCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar = [];

    let countBlanksStart = new Date(year, month, 1).getDay();
    let countBlancksEnd = new Date(year, month, daysInMonth).getDay();

    countBlanksStart = countBlanksStart ? countBlanksStart : 7;

    for (let j = countBlanksStart; j > 1; j--) {
        calendar.push({ type: 'blank' });
    }

    for (let j = 1; j < daysInMonth + 1; j++) {
        let day = '';
        switch (new Date(year, month, j).getDay()) {
            case 0:
                day = 'Воскресенье';
                break;
            case 1:
                day = 'Понедельник';
                break;
            case 2:
                day = 'Вторник';
                break;
            case 3:
                day = 'Среда';
                break;
            case 4:
                day = 'Четверг';
                break;
            case 5:
                day = 'Пятница';
                break;
            case 6:
                day = 'Суббота';
                break;
        }
        calendar.push({ type: 'normal', day, numberDay: j });
    }
    countBlancksEnd = countBlancksEnd ? countBlancksEnd : 7;
    for (let j = 0; j < 7 - countBlancksEnd; j++) {
        calendar.push({ type: 'blank' });
    }

    return calendar;
}

function dataFromStorage(id){
    const allInfo = JSON.parse(localStorage.getItem('arrayData'));

    for(let buf of allInfo){
        if(Number(buf.id) === Number(id)){
            return buf;
        }
    }
}

export default () => {

    const idUser = useParams();
    if(!localStorage.getItem(`empl_data_${idUser.id}`)){
        localStorage.setItem(`empl_data_${idUser.id}`, JSON.stringify({}));
    }

    const [month, setMonth] = useState(() => new Date().getMonth());
    const [year, setYear] = useState(() => new Date().getFullYear());
    const [calendarData, setCalendarData] = useState([]);
    const [dataEmpl, setDataEmpl] = useState({});

    useEffect(() => {
        console.log(month);
        console.log(year);
        setCalendarData(createCalendar(month, year));
        console.log(calendarData);
    }, [month, year]);

    useEffect(() => {
        setDataEmpl(prev => {
            return {
                ...prev,
                ...dataFromStorage(idUser.id),
            }
        });
    }, [idUser.id])

    useEffect(() => {
        console.log(dataEmpl);
    })

    return (
        <div className="wrap_calendar">
            <div className="manage_calendar_wrap">
                <div className="manage_calendar">
                    <select value={month} onChange={(e) => { setMonth(Number(e.target.value)) }}>
                        
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
                    <input type="number" onChange={(e) => { setYear(Number(e.target.value)) }}></input>
                </div>
                <div className="data_about_person">
                    <div className="info_person">
                        <span className="fio_info_person">{dataEmpl.fio}</span>
                        <span className="position_info_person">{dataEmpl.position}</span>
                    </div>
                </div>
            </div>
            <div className="calendar">
                <div className="table_calendar">
                    <ul>
                        <li>Понедельник</li>
                        <li>Вторник</li>
                        <li>Среда</li>
                        <li>Четверг</li>
                        <li>Пятница</li>
                        <li>Суббота</li>
                        <li>Воскресенье</li>
                    </ul>
                </div>
                <Calendar yearMonth = {{year, month}} data={calendarData} idUserProp = {idUser}/>
            </div>
        </div>
    )
}