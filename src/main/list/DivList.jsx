import react, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import ItemList from "./ItemList";
import ManageList from "./ManageList";

export default () => {
    console.log(1);
    const appContext = useContext(AppContext);
    const divList = useRef(null);
    const [list, setList] = useState([]);

    let divMain = null;

    useEffect(() => {
        divMain = document.querySelector('.main_content');
        console.log(divMain)
    }, [list])

    appContext.updateList(
        function updateList(data){
            setList(prev => {
                return prev.concat(data);
            })
        }
    )

    function changeViewList(manageDiv) {
        divList.current.classList.toggle('view_list');
        divMain.classList.toggle('view_list');
        if(divList.current.classList.contains('view_list')){
            manageDiv.lastElementChild.innerHTML = '&rArr;';
        } else {
            manageDiv.lastElementChild.innerHTML = '&lArr;';
        }
    }

    return (
        <div ref = {divList} className="list_employees">
            <ManageList divlistView = {changeViewList}/>
            {
                list.map((item, index) => {
                    return <ItemList data = {item} key={index}/>
                })
            }
        </div>
    )
}