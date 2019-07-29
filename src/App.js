import React, {Component} from 'react';
import axios from 'axios';
//import {BrowserRouter as Router, Route, Link} from "react-router-component";
import DaysBar from './components/days'
import GraphBar from './components/graph'
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
        }

        this.response = '';
        // this.handleForm = this.handleForm.bind(this);
        // this.query = this.query.bind(this);
    }

    componentDidMount() {
        console.log('component did mount here!!');
        this.setState({
            isLoading: true
        })
        if (window.localStorage.getItem('days') !== null) {
            this.setState({
                data: JSON.parse(window.localStorage.getItem('days')),
                isLoading: 'a'
            })
        } else {
            axios(API)
                .then(response => {
                    this.setState({
                        //data,
                        data: response.data,
                        isLoading: 'b'
                    });
                    window.localStorage.setItem('days', JSON.stringify(response.data))
                })
                .catch(error => this.setState({
                        error,
                        isLoading: 'c'
                    },
                    console.log('this.state.error: ', this.state.error)
                ));
            //console.log(window.localStorage.getItem('days'))
        }
    }


    render() {
        if (this.state.data !== null && this.state.data !== undefined) {
            return (
                <section>
                    <div className="container">
                        <div className="app">
                            <DaysBar data={this.state.data}/>
                            <GraphBar data={this.state.data}/>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <section>
                    <div className="container">
                        <div className="app">
                            Wait...
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default App;
