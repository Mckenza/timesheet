import react, { useEffect, useState } from "react";

function getFio(id){
    const arrayDataFromLocalStorage = JSON.parse(localStorage.getItem('arrayData'));
    let fio = {};

    for(let value of arrayDataFromLocalStorage){
        if(Number(value.id) === Number(id)){
            fio.fio = value.fio;
            fio.position = value.position;
            break;
        }
    }

    return fio;
}

export default ({ setMonth, setYear, setType, setTime, personInfo }) => {
    // personInfo - объект: месяц, год, фио, должность

    const [fio, setFio] = useState(() => getFio(personInfo.id));

    useEffect(() => {
        setFio(getFio(personInfo.id));
    }, [personInfo.id])

    return (
        <div className="manage_calendar_wrap">
            <div className="manage_calendar">
                <div className="change_date_for_calendar">
                    <span>Месяц:</span>
                    <select value={personInfo.month} onChange={(e) => { setMonth(Number(e.target.value)) }}>
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
                    <input type="number" onChange={(e) => { setYear(Number(e.target.value)) }} value={personInfo.year}></input>
                </div>
                <div className="buttons_manage_calendar">
                    <div className="value_buttons">
                        <input onClick={() => { setType('mainwork') }} type='radio' name="type_day" id="main_work" />
                        <label htmlFor="main_work">Основная деятельность</label>
                        <input onClick={() => { setType('addwork') }} type='radio' name="type_day" id="add_work"></input>
                        <label htmlFor="add_work">Заместительство</label>
                        <input onClick={() => { setType('nightwork') }} type='radio' name="type_day" id="night_work"></input>
                        <label htmlFor="night_work">Ночное время</label>
                    </div>

                    <div className="value_time_work">
                        <span>Время работы</span>
                        <div className="block_1_time_work">
                            <label htmlFor="time_start_start">С</label>
                            <input onChange={(e) => { setTime('hoursStart', e.target.value) }} type="number" id="time_start_start"></input>
                            <label htmlFor="time_start_end">:</label>
                            <input onChange={(e) => { setTime('minutsStart', e.target.value) }} type="number" id="time_start_end"></input>
                        </div>
                        <div className="block_2_time_work">
                            <label htmlFor="time_end_start">До</label>
                            <input onChange={(e) => { setTime('hoursFinish', e.target.value) }} type="number" id="time_end_start"></input>
                            <label htmlFor="time_end_end">:</label>
                            <input onChange={(e) => { setTime('minutsFinish', e.target.value) }} type="number" id="time_end_end"></input>
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
                    <span className="fio_info_person">{fio.fio}</span>
                    <span className="position_info_person">{fio.position}</span>
                </div>
            </div>
        </div>
    )
}