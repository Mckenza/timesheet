import react from "react";

export default ({data}) => {
    const {date, fio, position} = data;

    return (
        <div className="item_list">
            <span>{fio}</span>
            <span>{position}</span>
            <span>{date}</span>
        </div>
    )
}