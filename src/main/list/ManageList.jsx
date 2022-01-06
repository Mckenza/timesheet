import react, { useRef } from "react";
import { Link } from "react-router-dom";


export default ({divlistView}) => {
    const refManage = useRef(null);

    return (
        <div ref = {refManage} className="manage_buttons_list">
            <Link to='/input'>
                Добавить
            </Link>
            <button onClick={() => {divlistView(refManage.current)}}>&lArr;</button>
        </div>
    )
}