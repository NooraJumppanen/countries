import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    data: [],
    searchInput:"",
    isLoading: true,
  }

  componentDidMount(){
    axios
    .get("https://restcountries.com/v2/all?fields=name,capital,population,languages,flags").then(res => {this.setState({data: res.data, isLoading: false})
  });
  }

  searchHandler = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
    console.log(this.state.searchInput);
  };

  render() {
    if (this.state.isLoading){
      return <div className="loadingIcon"><FontAwesomeIcon icon={faSpinner} pulse size="6x"/></div>
    }

    if(!this.state.isLoading){
    return (
  <>
  <div className="header">
<h1>Countries</h1>
  <input type="text" name="search" placeholder="search by country name" onChange={this.searchHandler}/>
  </div>

  <div className="countries">
    {this.state.data
    .filter(c => {
      return c.name
      .toLowerCase()
      .includes(this.state.searchInput.toLowerCase());
    })
    .map(c =>
    <div className="country"
      key={c.name}>
      <h2>{c.name}</h2>
      <p><strong>Capital:</strong> {c.capital}</p>
      <p><strong>Population:</strong> <NumberFormat value={c.population} displayType={"text"} thousandSeparator={true}/></p> 
      <p><strong>Language(s):</strong>{c.languages.map((lang, i) => (<span key={i}> {lang.name} </span>))}</p>
      <img src={c.flags.svg} alt={c.name} className="flag"/>
    </div>
    )}
    </div>
  </>
    )}
  }}


export default App;