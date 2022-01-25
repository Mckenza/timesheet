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

function dataFromStorage(id) {
    const allInfo = JSON.parse(localStorage.getItem('arrayData'));

    for (let buf of allInfo) {
        if (Number(buf.id) === Number(id)) {
            return buf;
        }
    }
}

export default () => {

    const idUser = useParams();
    if (!localStorage.getItem(`empl_data_${idUser.id}`)) {
        localStorage.setItem(`empl_data_${idUser.id}`, JSON.stringify({}));
    }

    const [month, setMonth] = useState(() => new Date().getMonth());
    const [year, setYear] = useState(() => new Date().getFullYear());
    const [calendarData, setCalendarData] = useState([]);
    const [dataEmpl, setDataEmpl] = useState({});
    const [timeForCalendar, setTimeForCalendar] = useState({
        hoursStart: 'none',
        minutsStart: 'none',
        hoursFinish: 'none',
        minutsFinish: 'none',
        type: 'none',
    })

    function setTime(type, time){
        setTimeForCalendar(prev => {
            return {
                ...prev,
                /* !!!!!!!!!! */
            }

        })
    }
    // type - zamest - Заместительство
    // type - mainwork - основная работа
    // type - nightwork - ночное время

    useEffect(() => {
        setCalendarData(createCalendar(month, year));
    }, [month, year]);

    useEffect(() => {
        setDataEmpl(prev => {
            return {
                ...prev,
                ...dataFromStorage(idUser.id),
            }
        });
    }, [idUser.id])

    return (
        <div className="wrap_calendar">
            <div className="manage_calendar_wrap">
                <div className="manage_calendar">
                    <div className="change_date_for_calendar">
                        <span>Месяц:</span>
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
                        <span>Год:</span>
                        <input type="number" onChange={(e) => { setYear(Number(e.target.value)) }} value = {year}></input>
                    </div>
                    <div className="buttons_manage_calendar">
                        <div className="value_buttons">
                            <input value='mainwork' onClick={(e) => {console.log(e.target.value)}} type='radio' name="type_day" id="main_work" />
                            <label for="main_work">Основная деятельность</label>
                            <input type='radio' name="type_day" id="add_work"></input>
                            <label for="add_work">Заместительство</label>
                            <input type='radio' name="type_day" id="night_work"></input>
                            <label for="night_work">Ночное время</label>
                        </div>

                        <div className="value_time_work">
                            <span>Время работы</span>
                            <div className="block_1_time_work">
                                <label for="time_start_start">С</label>
                                <input type="number" id="time_start_start"></input>
                                <label for="time_start_end">:</label>
                                <input type="number" id="time_start_end"></input>
                            </div>
                            <div className="block_2_time_work">
                                <label for="time_end_start">До</label>
                                <input type="number" id="time_end_start"></input>
                                <label for="time_end_end">:</label>
                                <input type="number" id="time_end_end"></input>
                            </div>

                            <div className="button_save">
                                <button className="start_edit_calendar view_button_">Редактировать</button>
                                <button className="apply_changes_calendar view_button_">Применить</button>
                                <button className="save_changes_calendar view_button_">Сохранить</button>
                            </div>
                        </div>
                    </div>
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
                <Calendar yearMonth={{ year, month }} data={calendarData} idUserProp={idUser} />
            </div>
        </div>
    )
}