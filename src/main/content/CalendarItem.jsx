import react, { useState, useEffect } from "react";

function update(obj){
    if(obj === 'blank'){
        return {
            add: 0,
            night: 0,
            normal: 0,
        }
    } else {
        return {
            add: 0,
            night: 0,
            normal: 0,
            ...obj,
        }
    }
}

export default ({infoDay, data, saveData, dateTime }) => {

    console.log(infoDay);

    const [hours, setHours] = useState(update(infoDay));

    useEffect(() => {
        setHours(update(infoDay));
    }, [infoDay])

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
                    numberDay: data.numberDay,
                    hours: {
                        add: `${hours}:${minut}`,
                    }
                });

                setHours(prev => ({
                    ...prev,
                    add: `${hours}:${minut}`,
                }));
                break;
            case 'mainwork':
                saveData({
                    numberDay: data.numberDay,
                    hours: {
                        normal: `${hours}:${minut}`,
                    }
                });

                setHours(prev => ({
                    ...prev,
                    normal: `${hours}:${minut}`,
                }));
                break;
            case 'nightwork':
                saveData({
                    numberDay: data.numberDay,
                    hours: {
                        night: `${hours}:${minut}`,
                    }
                });

                setHours(prev => ({
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
            <span>Основная {hours.normal} </span>
            <span>Заместительство {hours.add} </span>
            <span>Ночное время {hours.night} </span>

        </div>
    )
}