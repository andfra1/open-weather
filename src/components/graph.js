import React from 'react';

let tHigh = [];
let tMin = [];

const GraphItem = (props) => {
    let barStyle = {bottom: props.tempprechigh + '%', height: 'calc('+props.tempprecmin + '% + 2px'};

    return(
        <div className="graph__item item">
            <div className="item__hour">
                {props.dt}
            </div>
            <div className="item__box">
                <div className="item__box__bar" style={barStyle}>
                    <div className="item__box__bar-temp">
                        {props.tempmax}
                    </div>
                    <div className="item__box__bar-temp">
                        {props.tempmin}
                    </div>
                </div>
            </div>
        </div>
    )
};


const GraphBar = (props) => {
    function getTime(params) {
        let hour = new Date(params).getHours() < 10 ? '0' + new Date(params).getHours() : new Date(params).getHours();
        let min = new Date(params).getMinutes() < 10 ? '0' + new Date(params).getMinutes() : new Date(params).getMinutes();
        return hour + ':' + min;
    }

    function drawGraph(props) {
        let tempMax = [];

        let tMax;
        Object.keys(props.data.list).forEach((index) => {
            //if (index < 8) {
                tempMax.push(Math.round(props.data.list[index].main.temp_max));
            //}
        });
        tMax = Math.max(...tempMax);

        Object.keys(props.data.list).forEach((index) => {
            //if (index < 8) {
                tHigh.push(Math.round(
                    Math.round(props.data.list[index].main.temp_max) * 80 / tMax));
                tMin.push((Math.round(props.data.list[index].main.temp_max) * 80 / tMax) -
                    ((Math.round(props.data.list[index].main.temp_min)) * 80 / tMax));
            //}
        });
        return tHigh, tMin;
    }

    drawGraph(props);

    return (
        <div className="graph">
            {props.data.list.map((val, i) => (
                //i < 8 ?
                    <GraphItem dt={getTime(val.dt_txt)}
                               tempmax={Math.round(val.main.temp_max)}
                               tempmin={Math.round(val.main.temp_min)}
                               tempprechigh={tHigh[i]}
                               tempprecmin={tMin[i]}
                               key={val.dt} index={i}/>
                  //  : false
            ))}
        </div>
    )
}

export default GraphBar;