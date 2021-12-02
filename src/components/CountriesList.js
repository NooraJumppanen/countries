import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import CountryCard from './CountryCard';

class CountriesList extends Component {
    state = {
        data: [],
        searchInput: "",
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
      };
    
      render() {
        if (this.state.isLoading){
          return <div className="loadingIcon"><FontAwesomeIcon icon={faSpinner} pulse size="6x"/></div>
        }
    
        if(!this.state.isLoading){
        return (
        <main>

        <div className="header">
        <h1>Countries</h1>
        <input type="text" name="search" placeholder="search by country name" onChange={this.searchHandler}/>
        <p>Click a country card to get weather infomation for the country's capital.</p>
        </div>
    
        <div className="countries">
        {this.state.data
        .filter(c => {
          return c.name
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase());
        })
        .map(c => (<CountryCard {...c} key={c.name} />
        ))};
        </div>
        
        </main>
    )}
    }
    }
      

export default CountriesList;