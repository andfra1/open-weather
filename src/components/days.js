import React from 'react';

const dayName = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota'
]

const EachDay = (props) => (
    <div className={props.index === 0 ? "day day--selected" : "day"}>
        <div className="day__name">
            {props.dt}
        </div>
        <div className="day__temp temp">
            <div className="temp__high">
                {props.tempmax}&deg;C
            </div>
            <div className="temp__low">
                {props.tempmin}&deg;C
            </div>
        </div>
        <div className="day__icon">

        </div>
    </div>
);

const DaysBar = (props) => {
    return (
        <div className="days">
            {/*{console.log(props.data)}*/}
            {props.data.list.map((val, i) => (
                i % 8 === 0 ?
                    <EachDay dt={dayName[new Date(val.dt_txt).getDay()]}
                             tempmax={Math.round(val.main.temp_max)}
                             tempmin={Math.round(val.main.temp_min)}
                             key={val.dt} index={i}/>
                    : false
            ))}
        </div>
    )
}

export default DaysBar;