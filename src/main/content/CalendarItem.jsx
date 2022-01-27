import react, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

export default ({ data, saveData, dateTime }) => {

    const [times, setTimes] = useState({
        normal: 0,
        add: 0,
        night: 0,
    })

    // временно считаем время тут - поместить эту функция потом в компонент выше

    function setTime() {
        console.log(dateTime)

        const { hoursStart, minutsStart, hoursFinish, minutsFinish } = dateTime.timeWork;
        let hours = hoursFinish - hoursStart;
        let minut;
        if(minutsFinish < minutsStart){
            hours--;
            minut = 60 - Number(minutsStart) + Number(minutsFinish);
        } else {
            minut = minutsFinish - minutsStart;
        }

        switch(dateTime.typeWork){
            case 'addwork':
                setTimes(prev => ({
                    ...prev,
                    add: `${hours}:${minut}`,
                }));
            break;
            case 'mainwork':
                setTimes(prev => ({
                    ...prev,
                    normal: `${hours}:${minut}`,
                }));
            break;
            case 'nightwork':
                setTimes(prev => ({
                    ...prev,
                    night: `${hours}:${minut}`,
                }));
            break;
        }
    }

    useEffect(() => {
        saveData({
            day: data.numberDay,
            info: {
                ...times,
            }
        })
    }, [times])

    return (
        <div className="item_calendar">
            <button className="setup_item_calendar" onClick={() => { setTime() }}></button>
            <span className="number_day">{data.numberDay}</span>
            <span>Нормал {times.normal} </span>
            <span>Зам {times.add} </span>
            <span>Ночь {times.night} </span>
        </div>
    )
}