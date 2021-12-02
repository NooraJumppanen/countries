import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'


function getCountry(capital){
    return axios.get(`https://restcountries.com/v2/capital/${capital}`);
}

function getWeather(capital){
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`);
}

class CountrySingle extends Component {
    state = {
        country: [],
        weather: [],
        isLoading: true,  
    };

    componentDidMount() {
        Promise.all([getCountry(this.props.params.name), getWeather(this.props.params.name)]).then((res) => {
            this.setState({country: res[0].data[0], weather: res[1].data, isLoading: false})
        });
    }

    render() {
        
        if (this.state.isLoading){
            return <div className="loadingIcon"><FontAwesomeIcon icon={faSpinner} pulse size="6x"/></div>
          }
      
        if(!this.state.isLoading){
        return (
            <>
            <div className="countrySingleWrapper">
            <div className="countrySingle">
                <h2>{this.state.country.name}</h2>
                <p>The weather in capital <strong>{this.state.country.capital}</strong> at the moment: </p>
                <div className="weatherWrapper">

                <div className="smallWeatherWrapper">
                <span className="temperature"> {this.state.weather.main.temp} </span>&#8451;</div>

                <div className="smallWeatherWrapper">
                <img src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`} alt={this.state.weather.weather[0].description} className="weatherImg"/>
                </div>

                </div>
                
            </div>
            </div>

            <div className="buttonWrapper">
            <Link to="/countries">Back to Countries</Link>
            </div>
            </>
        );
    }
}}

export default CountrySingle;