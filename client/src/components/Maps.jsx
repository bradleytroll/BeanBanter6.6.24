import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import SearchBar from './SearchBar'; // Assuming SearchBar.jsx is in the same directory
const containerStyle = {
  width: '70%',
  height: '400px'
};
const center = {
  lat: -3.745,
  lng: -38.523
};
const libraries = ['places'];
const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDLxAFQEwVWNrZWmxtAQt61YuM5jXVMwAk', // Replace 'YOUR_API_KEY' with your actual API key
    libraries,
  });
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded.');
      return;
    }
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch({
      query: query,
      location: center,
      radius: 10000, // Search radius in meters, adjust as needed
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const coffeeShops = results.filter(result => result.types.includes('cafe'));
        console.log('Found coffee shops:', coffeeShops);
        setSearchResults(coffeeShops);
      } else {
        console.error('Search failed:', status);
      }
    });
  };

  return isLoaded ? (
    <div>
      <SearchBar className="searchBar" onSearch={handleSearch} />
      <GoogleMap className="map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {searchResults && searchResults.map((result, index) => (
          <Marker
            key={`result-${index}`}
            position={result.geometry.location}
            onClick={() => setSelectedShop(result)}
          />
        ))}
        {selectedShop && (
          <InfoWindow
            position={selectedShop.geometry.location}
            onCloseClick={() => setSelectedShop(null)}
          >
            <div>
              <h3>{selectedShop.name}</h3>
              <p>{selectedShop.formatted_address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((shop, index) => (
            <li key={`shop-${index}`}>
              <h3>{shop.name}</h3>
              <p>{shop.formatted_address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : <></>;
};
export default Maps;