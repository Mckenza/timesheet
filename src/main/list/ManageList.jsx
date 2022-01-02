import react, { useRef } from "react";


export default ({divlistView}) => {
    const refManage = useRef(null);

    return (
        <div ref = {refManage} className="manage_buttons_list">
            <button onClick={() => console.log('234')}>Добавить</button>
            <button onClick={() => {divlistView(refManage.current)}}>&lArr;</button>
        </div>
    )
}