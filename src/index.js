import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';
console.log(fetchCountries);

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputElement = document.getElementById('search-box');
const listElement = document.querySelector('.country-list');
const infoElement = document.querySelector('.country-info');

inputElement.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(event) {
    event.preventDefault();
    const textInput = event.target.value.trim();

      console.log(textInput);

    if (!textInput) {
        resetSearch(listElement);
        resetSearch(infoElement);
        return;
      
    }
  
    fetchCountries(textInput)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );

        resetSearch(listElement);
        resetSearch(infoElement);

        return;
      }

      if (response.length >= 2 && response.length <= 10) {
        resetSearch(infoElement);
        setSearch(infoElement, countryListSearch(response));

        return;
      }

      if (response.length === 1) {
        resetSearch(listElement);
        setSearch(infoElement, countryInfoSearch(response));

        return;
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      resetSearch(listElement);
      resetSearch(infoElement);
    });
  
}

function resetSearch(ref) {
  if (ref.children.length) {
    ref.innerHTML = '';
  }
  return;
}
// function resetSearch(ref) {
//   return ref.innerHTML = '';
// }
   
function setSearch(ref, search) {
  ref.innerHTML = search;
}

function countryListSearch(countries) {
  return countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="${country.name.common} flag" width="50" height="25"></img> <p>${country.name.official}</p>
              </li>`;
    })
    .join('');
}

function countryInfoSearch(countries) {
  return countries
    .map(country => {
      return `<img 
    src="${country.flags.svg}" alt="${country.name.common}" 
    width="50" height="25" />
    <h1>${country.name.common}</h1>
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
    })
    .join('');
}

