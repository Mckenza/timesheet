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

    function deleteItemFromList(id){
        localStorage.removeItem(`empl_data_${id}`);
        let arrayData = JSON.parse(localStorage.getItem('arrayData'));
        arrayData = arrayData.filter(item => item.id !== id);
        localStorage.setItem('arrayData', JSON.stringify(arrayData));
        setList(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        })

    }
   
    function changeViewList(manageDiv) {
        divList.current.classList.toggle('view_list');
        divMain.classList.toggle('view_list');
        if (divList.current.classList.contains('view_list')) {
            manageDiv.lastElementChild.innerHTML = '&rArr;';
            manageDiv.querySelector('[href="/input"]').innerHTML = '';
        } else {
            manageDiv.lastElementChild.innerHTML = '&lArr;';
            manageDiv.querySelector('[href="/input"]').innerHTML = 'Добавить';
        }
    }

    return (
        <div ref={divList} className="list_employees">
            <ManageList divlistView={changeViewList} />
            <div className="list_empls_wrap">
                {
                    list.map((item, index) => {
                        return <ItemList deleteMeth = {deleteItemFromList} data={item} key={item.id} />
                    })
                }
            </div>

        </div>
    )
}