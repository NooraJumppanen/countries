import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount(){
    axios
    .get("https://restcountries.com/v3.1/all").then(res => {this.setState({data: res.data});
    });
  }

  render() {
    return (
      <>
      <div className="countries">
        {this.state.data.map(c =>
        <div className="country"
          key={c.name.common}>
          <h2>{c.name.common}</h2>
          <p><strong>Capital:</strong> {c.capital}</p>
          <p><strong>Population:</strong> {c.population}</p> 
          <img src={c.flags.svg} alt="flag" className="flag"/>
      </div>
      )}
      </div>
      </>
    );
  }
}

export default App;