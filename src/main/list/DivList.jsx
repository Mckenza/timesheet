import react, { useEffect, useRef, useState } from "react";
import ManageList from "./ManageList";

export default () => {
    const divList = useRef(null);

    let divMain = null;

    useEffect(() => {
        divMain = document.querySelector('.main_content');
        console.log(divMain)
    }, [])

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
        </div>
    )
}