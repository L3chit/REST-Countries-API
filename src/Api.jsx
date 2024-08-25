import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export default function Api() {
    const url = 'data.json';
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleBackClick = () => {
        setSelectedCountry(null);
    };

    const filteredData = data.filter(item => {
        return (
            item.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (selectedRegion === '' || item.region === selectedRegion)
        );
    });

    return (
        <section>
            {selectedCountry ? (
                <>
                    <div className='country-details'>
                        <button onClick={handleBackClick} className='backBtn'><FontAwesomeIcon icon={faArrowLeftLong} fixedWidth /> Back</button>
                        <div className='countryDetail'>
                            <div className="countryFlag">
                                <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} />
                            </div>
                            <div className="countryInfo">
                                <div className="countryName">
                                    <h2>{selectedCountry.name}</h2>
                                </div>
                                <div className="countryDetails">
                                    <div>
                                        <p><strong>Native Name: </strong>{selectedCountry.nativeName}</p>
                                        <p><strong>Population: </strong>{selectedCountry.population}</p>
                                        <p><strong>Region: </strong>{selectedCountry.region}</p>
                                        <p><strong>Sub Region: </strong>{selectedCountry.subregion}</p>
                                        <p><strong>Capital: </strong>{selectedCountry.capital}</p>
                                    </div>
                                    <div>
                                        <p><strong>Top Level Domain: </strong>{selectedCountry.topLevelDomain}</p>
                                        <p><strong>Currencies: </strong>{selectedCountry.currencies.map(currency => currency.name).join(', ')}</p>
                                        <p><strong>Languages: </strong>{selectedCountry.languages.map(language => language.name).join(', ')}</p>
                                    </div>
                                </div>
                                {selectedCountry.borders?.length > 0 && (
                                    <div className="borderCountries">
                                        <p><strong>Border Countries: </strong></p>
                                        <div>
                                            {selectedCountry.borders.map(border => {
                                                const country = data.find(item => item.alpha3Code === border);
                                                return (
                                                    <button key={border} className='borderBtn' onClick={() => handleCountryClick(country)}>{country.name}</button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <section className='searchFilter'>
                        <div className="search-container">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" fixedWidth />
                            <input
                                type="text"
                                id='search-input'
                                placeholder='Search for a country...'
                                value={searchText}
                                onChange={handleSearchTextChange}
                            />
                        </div>
                        <div className="filter-container">
                            <FontAwesomeIcon icon={faFilter} className="filter-icon" fixedWidth />
                            <select
                                name="region"
                                id="region"
                                value={selectedRegion}
                                onChange={handleRegionChange}
                            >
                                <option value="">Filter by Region</option>
                                <option value="Africa">Africa</option>
                                <option value="Americas">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </div>
                    </section>
                    <div className='countries'>
                        {filteredData.map((item) => (
                            <div key={item.name} className='elements' onClick={() => handleCountryClick(item)}>
                                <div className='elementsFlag'>
                                    <img src={item.flag} alt={`Flag of ${item.name}`} />
                                </div>
                                <div className='elementsDetails'>
                                    <h2>{item.name}</h2>
                                    <div>
                                        <p><strong>Population: </strong>{item.population}</p>
                                        <p><strong>Region: </strong>{item.region}</p>
                                        <p><strong>Capital: </strong>{item.capital}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}