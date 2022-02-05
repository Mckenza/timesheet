import { useRef, useState } from "react";
import CalendarItem from "./CalendarItem"


export default ({dataEpmlLocal, data, dateTime}) => {
    /*
     * dataEpmlLocal - объект с данными текущей даты
     * data - данные для построения правильного месяца (пустые и не пустые ячейки)
     * dateTime - настройки для календаря
    */

    // все накапливается тут и по кнопке сохранить - сохранит в локале в родительском компоненте
    const daysInfo = useRef({...dataEpmlLocal});

    function saveInfoDay(data){
        daysInfo.current = {
            ...daysInfo.current,
            [`day_${data.numberDay}`]: {
                ...daysInfo.current[`day_${data.numberDay}`],
                ...data.hours,
            }
        }
        console.log(daysInfo.current)
    }





    //let trigger = false;

    //const [fromLocalTable, setMonthInfo] = useState(JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`)));

    //const {year, month} = yearMonth;

    /* Если нет ни каких данных о работнике, создать пустой объект этого месяца */
    //const fromLocalTable = JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`));
    /*
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
    /*function infoDay(info, numberDay){
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
    }*/
/*
    useEffect(() => {
        localStorage.setItem(`empl_data_${idUserProp.id}`, JSON.stringify(fromLocalTable));
    }, [fromLocalTable])

    */

    return (
        <div className="calendar_content">
            {
                data.map((value, index) => {
                    if(value.type === 'blank'){
                        return <div className="blank_item_calendar" key={index}>
                        </div>
                    } else {
                        return <CalendarItem saveData = {saveInfoDay} data = {value} dateTime = {dateTime} key={index}/>
                    }
                })
            }
        </div>
    )
} 