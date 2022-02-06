import { useRef, useState } from "react";
import CalendarItem from "./CalendarItem"


export default ({dataEpmlLocal, data, dateTime, save}) => {
    /*
     * dataEpmlLocal - объект с данными текущей даты
     * data - данные для построения правильного месяца (пустые и не пустые ячейки)
     * dateTime - настройки для календаря
    */

    function saveInfoDay(data){
        save(data.hours, data.numberDay);
    }

    return (
        <div className="calendar_content">
            {
                data.map((value, index) => {

                    if(value.type === 'blank'){
                        return <div className="blank_item_calendar" key={index}>
                        </div>
                    } else {
                        let infoDay = 'blank';
                        if(`day_${value.numberDay}` in dataEpmlLocal){
                            infoDay = dataEpmlLocal[`day_${value.numberDay}`];
                        }
                        return <CalendarItem infoDay = {infoDay} saveData = {saveInfoDay} data = {value} dateTime = {dateTime} key={index}/>
                    }
                })
            }
        </div>
    )
} 