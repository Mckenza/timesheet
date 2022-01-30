import react, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

export default () => {
    const appContext = useContext(AppContext);

    const [info, setInfo] = useState({
        fio: '',
        position: '',
        date: '',
        id: 0,
    });

    function saveData(e) {
        setInfo(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    function sendData() {
        const copyState = {
            ...info,
            id: Number(JSON.parse(localStorage.getItem('current_Id'))),
        }
        console.log(copyState.id)
        const dataFromStorage = JSON.parse(localStorage.getItem('arrayData'));
        dataFromStorage.push(copyState);
        localStorage.setItem('arrayData', JSON.stringify(dataFromStorage));
        const currentId = JSON.parse(localStorage.getItem('current_Id'));
        localStorage.setItem('current_Id', JSON.stringify(currentId + 1));

        appContext.createItemList(copyState);
    }

    return (
        <div className="input_data_about_person">
            <div className="input_data_wrap">
                <h3>Добавление нового сотрудника</h3>
                <input
                    type='text'
                    placeholder='ФИО'
                    id='input_name_about'
                    name="fio"
                    onChange={saveData}
                    value={info.fio} />
                <input
                    type='text'
                    placeholder="Должность"
                    id='input_position_about'
                    value={info.position}
                    onChange={saveData}
                    name="position" />
                <input
                    type='text'
                    placeholder='Дата рождения'
                    id='input_date_born_about'
                    value={info.date}
                    name="date"
                    onChange={saveData} />
                <button onClick={() => { sendData() }}>Добавить</button>
            </div>
        </div>
    )
}