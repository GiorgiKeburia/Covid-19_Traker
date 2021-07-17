import './App.css';
import React,{useState,useEffect} from 'react';
import { 
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';


function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');

  useEffect(() => {
    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries').
      then((responce)=> responce.json()).
      then((data)=>{
        const countries = data.map((country)=>({
          name: country.country, //engalnd , portugal ...
          value: country.countryInfo.iso2 //UK, POR
        }))

        setCountries(countries)
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange =  (event)=>{
    const countryCode=event.target.value;
    console.log(`Hello  -------->  "${countryCode}`)
    setCountry(event.target.value)
    
  }

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country} >
            <MenuItem value='worldWide'>World Wide</MenuItem>
            {
              countries.map( (country)=>
              <MenuItem value={country.value}>{country.name}</MenuItem>
              )
            }   
          </Select>
        </FormControl>
      </div>


      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* infoBoxs */}
      {/* InfoBoxs */}
      {/* infoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
      </div>
  )}

export default App;
