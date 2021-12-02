import React from 'react';
import './App.css';
import CountriesList from './components/CountriesList';
import Home from './components/Home';
import CountrySingle from './components/CountrySingle';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';

const RouteWrapper = (props) => {
  const params = useParams();
  return <CountrySingle params={params}{...props}/>
};


const App = () => {
  return (
    <BrowserRouter>
      
      <Header/>
       
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/countries" element={<CountriesList/>}/>
        <Route path="/countries/:name" element={<RouteWrapper/>}/>
      </Routes>
     
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
