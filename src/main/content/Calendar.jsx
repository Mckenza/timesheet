import CalendarItem from "./CalendarItem"


export default ({data}) => {

    return (
        <div className="calendar_content">
            {
                data.map((value, index) => {
                    if(value.type === 'blank'){
                        return <div className="blank_item_calendar" key={index}>
                        </div>
                    } else {
                        return <CalendarItem data = {value} key={index}/>
                    }
                })
            }
        </div>
    )
} 