import CalendarItem from "./CalendarItem"


export default ({yearMonth, data, idUserProp}) => {

    const {year, month} = yearMonth;
    const days = [];
    /*
        info = {day: 14, 
            info: {.....}}
    */

    function infoDay(info){
        let localData = JSON.parse(localStorage.getItem(`empl_data_${idUserProp.id}`));
        days.push({[`day_${info.day}`]: info.info})
        localData = {
            ...localData,
            [`${year}-${month}`]: days,
        };

        localStorage.setItem(`empl_data_${idUserProp.id}`, JSON.stringify(localData));
    }

    return (
        <div className="calendar_content">
            {
                data.map((value, index) => {
                    if(value.type === 'blank'){
                        return <div className="blank_item_calendar" key={index}>
                        </div>
                    } else {
                        return <CalendarItem saveData = {infoDay} data = {value} key={index}/>
                    }
                })
            }
        </div>
    )
} 