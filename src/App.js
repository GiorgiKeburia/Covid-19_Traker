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
import  {prettyPrintStat, sortData}  from './utill';


function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo,setcountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries]=useState([]);
  const [casesType, setCasesType]=useState('cases')

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
        setMapCountries(data);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])


  const onCountryChange = async (event)=>{
    const countryCode=event.target.value;

    const url=countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setcountryInfo(data);
        setMapCenter([ data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(6);
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__header">
          <h1>Covid-19 <span className="header__span" >Data Base</span></h1>
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
        <InfoBox 
            active={casesType==="cases"}
           onClick={e=> setCasesType('cases')}
           title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>

        {/* InfoBoxs title="Recovery" */}
        <InfoBox active={casesType==="recovered"} onClick={e=> setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>

        {/* infoBoxs */}
        <InfoBox active={casesType==="deaths"} onClick={e=> setCasesType('deaths')} title="Death" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
      </div>

        {/* Map */}

        <Map casesType={casesType} countries={mapCountries} center = {mapCenter} zoom = {mapZoom} />
      
      </div>
      <Card className="app__right">
        <CardContent className="Right--box">
          <h3 className="Table header_names">Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          <h3 className="LineGraph header_names">Worldwide new {casesType}</h3>
          {/* Graph */} 
          <LineGraph className="app__graph" casesType={ casesType}/>
        </CardContent>
      </Card>
      </div>
  )}

export default App;
