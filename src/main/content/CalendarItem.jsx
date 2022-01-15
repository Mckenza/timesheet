import react from "react";
import { useEffect } from "react/cjs/react.development";

export default ({data, saveData}) => {

    useEffect(() => {
        saveData({
            day: data.numberDay,
            info: {
                normal: 4,
                zam: 4,
                night: 6,
            }
        })
    })

    return (
        <div className="item_calendar">
            <span>{data.numberDay}</span>
            <span>{data.day}</span>
        </div>
    )
}