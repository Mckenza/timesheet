import react, { useState, useEffect } from "react";



export default ({ data, saveData, dateTime, monthData }) => {

    function checkBlank(obj) {
        if (!obj) {
            return {
                add: 0,
                night: 0,
                normal: 0,
            }
    
        } else {
            return {
                ...obj,
            }
        }
    }

    const [times, setTimes] = useState(() => checkBlank(monthData))

    // временно считаем время тут - поместить эту функция потом в компонент выше

    function setTime() {
        const { hoursStart, minutsStart, hoursFinish, minutsFinish } = dateTime.timeWork;
        let hours = hoursFinish - hoursStart;
        let minut;
        if (minutsFinish < minutsStart) {
            hours--;
            minut = 60 - Number(minutsStart) + Number(minutsFinish);
        } else {
            minut = minutsFinish - minutsStart;
        }

        switch (dateTime.typeWork) {
            case 'addwork':
                saveData({
                    ...times,
                    add: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    add: `${hours}:${minut}`,
                }));
                break;
            case 'mainwork':
                saveData({
                    ...times,
                    normal: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    normal: `${hours}:${minut}`,
                }));
                break;
            case 'nightwork':
                saveData({
                    ...times,
                    night: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    night: `${hours}:${minut}`,
                }));
                break;
        }
    }

    return (
        <div className="item_calendar">
            <button className="setup_item_calendar" onClick={() => { setTime() }}></button>
            <span className="number_day">{data.numberDay}</span>
            <span>Нормал {monthData ? monthData.normal : 0} </span>
            <span>Зам {monthData ? monthData.add : 0} </span>
            <span>Ночь {monthData ? monthData.night : 0} </span>
            
        </div>
    )
}


/*
function setTime() {
        const { hoursStart, minutsStart, hoursFinish, minutsFinish } = dateTime.timeWork;
        let hours = hoursFinish - hoursStart;
        let minut;
        if (minutsFinish < minutsStart) {
            hours--;
            minut = 60 - Number(minutsStart) + Number(minutsFinish);
        } else {
            minut = minutsFinish - minutsStart;
        }

        switch (dateTime.typeWork) {
            case 'addwork':
                saveData({
                    ...times,
                    add: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    add: `${hours}:${minut}`,
                }));
                break;
            case 'mainwork':
                saveData({
                    ...times,
                    normal: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    normal: `${hours}:${minut}`,
                }));
                break;
            case 'nightwork':
                saveData({
                    ...times,
                    night: `${hours}:${minut}`,
                }, data.numberDay);

                setTimes(prev => ({
                    ...prev,
                    night: `${hours}:${minut}`,
                }));
                break;
        }
    }
*/

/*
<span>Нормал {monthData ? monthData.normal : 0} </span>
            <span>Зам {monthData ? monthData.add : 0} </span>
            <span>Ночь {monthData ? monthData.night : 0} </span>
*/