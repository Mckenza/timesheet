import react from "react";

export default ({data}) => {

    return (
        <div className="item_calendar">
            <span>{data.numberDay}</span>
            <span>{data.day}</span>
        </div>
    )
}