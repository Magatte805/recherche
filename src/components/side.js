import React, { useState } from 'react';
import axios from 'axios';
import '../style/sidebar.css';

function Sidebar() {
  const [searchCity, setSearchCity] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [savedData, setSavedData] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryInfo, setSelectedHistoryInfo] = useState(null);
  const [showCityList, setShowCityList] = useState(true);
  


  // fonction de recherche des communes 
  const handleSearch = async () => {
    if (searchCity.length > 0) {
      try {
        const response = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            searchCity
          )}&type=municipality&limit=30`
        );
        const { features } = response.data;
  
        if (features.length > 0) {
          const searchData = features.map((feature) => ({
            city: feature.properties.city,
            department: feature.properties.context,
            code_INSEE: feature.properties.citycode,
            Long: feature.properties.x,
            Lat: feature.properties.y,
          }));
  
          setSavedData(searchData);
          setSelectedInfo(null);
          setShowSaveButton(false);
          setShowCityList(true);
          setShowHistory(false); // Masquer l'historique des communes
        } else {
          setSavedData([]);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
  };
  

//gestion de clic sur une commune
  const handleCityClick = (location) => {
    setSelectedInfo(location);
    setShowSaveButton(true);
  };


  // fonction qui permet de sauvegarder la commune selectionnée dans l'historique 
  const handleSaveToHistory = () => {
    if (selectedInfo) {
      const isAlreadySaved = history.some(
        (data) => data.city === selectedInfo.city
      );

      if (!isAlreadySaved) {
        setHistory([...history, selectedInfo]);
      }

      setSelectedInfo(null);
      setShowSaveButton(false);
    }
  };

  // fonction qui permet d'afficher les communes qui sont dans l'historique 
  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setSelectedHistoryInfo(null);
    setShowCityList(false); // Masquer la liste des communes
  };

  // fct qui permet d'afficher les informations d'une commune
  const handleCommuneClick = (commune) => {
    const selectedCommune = history.find((data) => data.city === commune);
    setSelectedHistoryInfo(selectedCommune);
  };

  return (
    <div className="menu">
      <h1>Geobardi</h1>
      <input type="checkbox" id="burger-shower" className="burger-shower" />
      <label htmlFor="burger-shower" className="hamburger">
        <hr />
        <hr />
        <hr />
      </label>
      <ul className="burger-menu">
        <li className="rechercheCommune">
          <input
            type="text"
            placeholder="Nom commune"
            name="search"
            className="form-control"
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
          />
          <button onClick={handleSearch}>Rechercher</button>
        </li>
        <br />
        <br />

        {showCityList && (
          <div className="city-list">
            {savedData.map((data, index) => (
              <div
                key={index}
                className={`city-card ${
                  selectedInfo === data ? 'selected' : ''
                }`}
                onClick={() => handleCityClick(data)}
              >
                <div className="city">
                  <div>
                    <strong>Nom de la commune:</strong> {data.city}
                  </div>
                  <div>
                    <strong>Nom du département:</strong> {data.department}
                  </div>
                  <div>
                    <strong>Code INSEE:</strong> {data.code_INSEE}
                  </div>
                  <div>
                    <strong>LONG:</strong> {data.Long}
                  </div>
                  <div>
                    <strong>LAT:</strong> {data.Lat}
                  </div>
                </div>
                {selectedInfo === data && showSaveButton && (
                  <button className="button" onClick={handleSaveToHistory}>
                    Valider
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="button" onClick={toggleHistory}>
          Historique
        </button> <br/>

        {showHistory && (
          <div className="history history-city-overflow">
            {history.map((data, index) => (
              <div
                key={index}
                className="history-image"
                onClick={() => handleCommuneClick(data.city)}
              >
                <div
                  className="history-city-image"
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <div className="history-city-name">{data.city}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedHistoryInfo && (
          <div className="history-city-details">
            <div>
              <strong>Nom de la commune:</strong> {selectedHistoryInfo.city}
            </div>
            <div>
              <strong>Nom du département:</strong>{' '}
              {selectedHistoryInfo.department}
            </div>
            <div>
              <strong>Code INSEE:</strong> {selectedHistoryInfo.code_INSEE}
            </div>
            <div>
              <strong>LONG:</strong> {selectedHistoryInfo.Long}
            </div>
            <div>
              <strong>LAT:</strong> {selectedHistoryInfo.Lat}
            </div>
          </div>
        )}

       
      </ul>
    </div>
  );
}

export default Sidebar;
