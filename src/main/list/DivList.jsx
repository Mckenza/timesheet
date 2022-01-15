import react, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import ItemList from "./ItemList";
import ManageList from "./ManageList";

function getDataFromLocalStorage(){
    return JSON.parse(localStorage.getItem('arrayData'));
}

export default () => {
    const appContext = useContext(AppContext);
    const divList = useRef(null);
    const [list, setList] = useState([]);

    let divMain = null;

    useEffect(() => {
        setList(getDataFromLocalStorage());
    }, [])

    useEffect(() => {
        divMain = document.querySelector('.main_content');
    }, [list])

    appContext.updateList(
        function updateList(data) {
            setList(prev => {
                return prev.concat(data);
            })
        }
    )

    function changeViewList(manageDiv) {
        divList.current.classList.toggle('view_list');
        divMain.classList.toggle('view_list');
        if (divList.current.classList.contains('view_list')) {
            manageDiv.lastElementChild.innerHTML = '&rArr;';
        } else {
            manageDiv.lastElementChild.innerHTML = '&lArr;';
        }
    }

    return (
        <div ref={divList} className="list_employees">
            <ManageList divlistView={changeViewList} />
            <div className="list_empls_wrap">
                <div className="item_list">
                    <span className="item_list_name">Буяк Евгений Иванович</span>
                    <span className="item_list_position">Администратолр сети</span>
                    <span className="itel_list_date">Дата рождения: 17.12.1996</span>
                </div>
                {
                    list.map((item, index) => {
                        return <ItemList data={item} key={item.id} />
                    })
                }
            </div>

        </div>
    )
}