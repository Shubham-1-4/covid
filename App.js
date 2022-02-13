import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import './App.css';
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";



function App() {

  const [countries, setCountries] = useState( [] );
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState( {} );
  const [tableData, setTableData] = useState( [] );
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
  : `http://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url)
  .then(response => response.json())
  .then(data => {
    setCountry(countryCode);
    setCountryInfo(data);
  });

  };
  console.log("COUNTRY INFO >>", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
      <div className="app__header">
      <h1> COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </div>
      <div className='app__stats'>
        <InfoBox 
        onClick={e => setCasesType("cases")}
        title="Coronaviru Cases"
        active={casesType === "cases"} 
        cases={prettyPrintStat(countryInfo.todayCases)} 
        total={prettyPrintStat(countryInfo.cases)} 
        />
        <InfoBox 
        onClick={e => setCasesType("recovered")}
        title="Recovered" 
        active={casesType === "recovered"}
        cases={prettyPrintStat(countryInfo.todayRecovered)} 
        total={prettyPrintStat(countryInfo.recovered)} 
        />
        <InfoBox 
        onClick={e => setCasesType("deaths")}
        title="Deaths" 
        active={casesType === "deaths"}
        cases={prettyPrintStat(countryInfo.todayDeaths)} 
        total={prettyPrintStat(countryInfo.deaths)} 
        />
      </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
      
    
    </div>
  );
}

export default App;
