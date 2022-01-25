import react from "react";
import { Link } from "react-router-dom";

export default ({data, deleteMeth}) => {
    const {date, fio, position, id} = data;

    return (
        <div className="item_list">
            <button className="del_item" onClick={() => {deleteMeth(id)}}>&#10006;</button>
            <Link to={`/calendar/${id}`} className="open_calendar"/>
            <span className="item_list_name">{fio}</span>
            <span className="item_list_position">{position}</span>
            <span className="itel_list_date">Дата рождения: {date}</span>
        </div>
    )
}