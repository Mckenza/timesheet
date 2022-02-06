import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar";
import ManageCalendar from "./ManageCalendar";

/* Сделать список по месяцам и года */

function createCalendar(month, year, id) {
    //const monthData = JSON.parse(localStorage.getItem(`empl_data_${id}`));

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

function checkDate(year, month, id){
    const objLocal = JSON.parse(localStorage.getItem(`empl_data_${id}`));
    if(!(`${year}-${month}` in objLocal)){
        objLocal[`${year}-${month}`] = {};
        localStorage.setItem(`empl_data_${id}`, JSON.stringify(objLocal));
    }

    return objLocal;
}


export default () => {
    
    const idUser = useParams();

    const [month, setMonth] = useState(new Date().getMonth());        // текущий месяц
    const [year, setYear] = useState(new Date().getFullYear());       // текущий год
    const [calendarData, setCalendarData] = useState(createCalendar(month, year));                   // для постраения правильного календаря
    const [dataEmpl, setDataEmpl] = useState(() => checkDate(year, month, idUser.id));                       
    const [typeWork, setTypeWork] = useState('none');                       // стейт для типа работы
    const [timeWork, setTimeWork] = useState({                              // стейт для времени начала и конца
        hoursStart: 'none',
        minutsStart: 'none',
        hoursFinish: 'none',
        minutsFinish: 'none',
    });
    
    // смена ссылки - смена даты и года
    useEffect(() => {
        setMonth(new Date().getMonth());
        setYear(new Date().getFullYear());
        setDataEmpl(() => checkDate(year, month, idUser.id));
    }, [idUser.id]);

    // построение календаря с пробелами
    useEffect(() => {
        checkDate(year, month, idUser.id);
        setCalendarData(createCalendar(month, year));
        setDataEmpl(checkDate(year, month, idUser.id));
    }, [month, year]);

    // выбор типа работы
    function setType(type) {
        setTypeWork(type);
    }

    // сохранение времени
    function setTime(value, time) {
        setTimeWork(prev => {
            return {
                ...prev,
                [value]: time,
            }
        })
    }

    
    useEffect(() => {
        console.log(typeWork, timeWork);
    }, [typeWork, timeWork])

    // Сохранить время 
    function saveHoursLocal(data, numberDay){
        const objLocal = JSON.parse(localStorage.getItem(`empl_data_${idUser.id}`));
        objLocal[`${year}-${month}`][`day_${numberDay}`] = {
            ...objLocal[`${year}-${month}`][`day_${numberDay}`],
            ...data,
        }
      
        localStorage.setItem(`empl_data_${idUser.id}`, JSON.stringify(objLocal))     
    }

    
    // type - addwork - Заместительство
    // type - mainwork - основная работа
    // type - nightwork - ночное время


    return (
        <div className="wrap_calendar">
            <ManageCalendar setMonth = {setMonth} setYear = {setYear} setType = {setType} setTime = {setTime} personInfo = {{year, month, id: idUser.id}}/>
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
                {dataEmpl[`${year}-${month}`] ? <Calendar dataEpmlLocal = {dataEmpl[`${year}-${month}`]} dateTime={{ typeWork, timeWork }} save = {saveHoursLocal} data={calendarData}/> : <></> }
                
            </div>
        </div>
        
    )
}