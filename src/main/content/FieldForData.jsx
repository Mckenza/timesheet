import react, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

export default () => {
    const appContext = useContext(AppContext);

    const [info, setInfo] = useState({
        fio: '',
        position: '',
        date: '',
    });

    function saveData(e) {
        setInfo(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }
    
    function sendData(){
        appContext.createItemList(info);
    }

    useEffect(() => {
        console.log(info);
    })

    return (
        <div className="input_data_about_person">
            {console.log(2)}
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
                onChange={saveData}/>
            <button onClick={() => { sendData() }}>Добавить</button>
        </div>
    )
}