import React,{useState,useEffect} from 'react';
import { 
  MenuItem,
  Card,
  FormControl,
  Select,
  CardContent,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import './App.css';
import "leaflet/dist/leaflet.css"
import  {sortData}  from './utill';


function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo,setcountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries]=useState([])
  // const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((responce)=> responce.json())
      .then((data)=>{
        setcountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((responce)=> responce.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country, //engalnd , portugal ...
          value: country.countryInfo.iso2 //UK, POR
        }))
        const sortedData=sortData(data);
        setTableData(sortedData); 
        setMapCountries(data)
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])

  console.log(mapZoom)

  const onCountryChange = async (event)=>{
    const countryCode=event.target.value;

    const url=countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setcountryInfo(data);
        setMapCenter([ data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__header">
          <h1>Covid</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value='worldwide'>World Wide</MenuItem>
              {
                countries.map( (country)=>
                <MenuItem value={country.value}>{country.name}</MenuItem>
                )
              }   
            </Select>
          </FormControl>
        </div>

      <div className="app__stats">
        {/* infoBoxs title="corona virus cases" */}
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

        {/* InfoBoxs title="Recovery" */}
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

        {/* infoBoxs */}
        <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

        {/* Map */}

        <Map casesType="cases" countries={mapCountries} center = {mapCenter} zoom = {mapZoom} />
      
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          {/* Graph */} 
          <LineGraph/>
        </CardContent>
      </Card>
      </div>
  )}

export default App;
