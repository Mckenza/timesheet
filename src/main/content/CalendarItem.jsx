import react from "react";
import { useEffect } from "react/cjs/react.development";

export default ({data, saveData}) => {

    console.log(data);

    useEffect(() => {
        
    })

    function setTime(){
        saveData({
            day: data.numberDay,
            info: {
                normal: 4,
                zam: 4,
                night: 6,
            }
        })
    }

    return (
        <div className="item_calendar">
            <button className="setup_item_calendar"></button>
            <span className="number_day">{data.numberDay}</span>
            
        </div>
    )
}