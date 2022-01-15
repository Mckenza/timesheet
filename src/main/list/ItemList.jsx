import react from "react";
import { Link } from "react-router-dom";

export default ({data}) => {
    const {date, fio, position, id} = data;

    return (
        <div className="item_list">
            <Link to={`/calendar/${id}`} className="open_calendar"/>
            <span className="item_list_name">{fio}</span>
            <span className="item_list_position">{position}</span>
            <span className="itel_list_date">Дата рождения: {date}</span>
        </div>
    )
}