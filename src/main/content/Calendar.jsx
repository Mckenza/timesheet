import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import CalendarItem from "./CalendarItem"


export default ({yearMonth, data, idUserProp, dateTime}) => {
    /**
     * yearMoth - год и месяц
     * data - данные для построения правильного месяца (пустые и не пустые ячейки)
     * idUserProp - id из списка
     * dateTime - настройки для календаря
    */

    let trigger = false;

    const [fromLocalTable, setMonthInfo] = useState(JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`)));
    console.log(fromLocalTable)

    const {year, month} = yearMonth;
    console.log(yearMonth)

    /* Если нет ни каких данных о работнике, создать пустой объект этого месяца */
    //const fromLocalTable = JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`));
    if(!([`${yearMonth.year}-${yearMonth.month}`] in fromLocalTable)){
        setMonthInfo(prev => {
            return {
                ...prev,
                [`${yearMonth.year}-${yearMonth.month}`]: {},
            }
        })
        
        trigger = true;
        //fromLocalTable[`${yearMonth.year}-${yearMonth.month}`] = {};
        //localStorage.setItem(`empl_data_${idUserProp.id}`, JSON.stringify(fromLocalTable));
    }

    if(trigger){
        return <div>Test</div>
    }

    /* метод добавления/изменения дня (при редактировании) */
    function infoDay(info, numberDay){
        //let localData = JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`));

        //localData[`${year}-${month}`][`day_${numberDay}`] = info;

        setMonthInfo(prev => {
            return {
                ...prev,
                [`${year}-${month}`]: {
                    ...prev[`${year}-${month}`],
                    [`day_${numberDay}`]: info,
                }
            }
        })

        //localStorage.setItem(`empl_data_${idUserProp.id}`, JSON.stringify(localData));
    }

    useEffect(() => {
        localStorage.setItem(`empl_data_${idUserProp.id}`, JSON.stringify(fromLocalTable));
    }, [fromLocalTable])

    return (
        <div className="calendar_content">
            {
                data.map((value, index) => {
                    if(value.type === 'blank'){
                        return <div className="blank_item_calendar" key={index}>
                        </div>
                    } else {
                        return <CalendarItem saveData = {infoDay} dateTime = {dateTime} monthData = {fromLocalTable[`${year}-${month}`][`day_${value.numberDay}`]} data = {value} key={index}/>
                    }
                })
            }
        </div>
    )
} 