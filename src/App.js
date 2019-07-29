import React, {Component} from 'react';
//import {BrowserRouter as Router, Route, Link} from "react-router-component";
import DaysBar from './components/days'
import Graph from './components/graph'
import './App.css';

const apikey = '5404b91a6bddc968b714487791906104';
const API = 'http://api.openweathermap.org/data/2.5/forecast?q=Poznan&lang=pl&units=metric&APPID=' + apikey;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,
            data: null,
            dateNow: new Date().getTime(),
            dayNumber: new Date().getDay()
        }

        // this.handleForm = this.handleForm.bind(this);
        // this.query = this.query.bind(this);
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
        if (window.localStorage.getItem('days') !== null) {
            this.setState({
                data: JSON.parse(window.localStorage.getItem('days')),
                isLoading: false
            })
        } else {
            fetch(API)
                .then(response => {
                    this.setState({
                        isLoading: false
                    })
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('err', response);
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(
                    data => this.setState({
                            data
                        },
                        window.localStorage.setItem('days', JSON.stringify(data)),
                    ))
                .catch(error => this.setState({
                    error,
                    isLoading: false
                },
                    console.log('this.state.error', this.state.error)
                ));
            //console.log(window.localStorage.getItem('days'))
        }
    }

    render() {

        const {
            data,
            dayNumber
        } = this.state;
        return (
            <section>
                <div className="container">
                    <div className="app">
                        <DaysBar data={data} daynumber={dayNumber}/>
                        <Graph/>
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
