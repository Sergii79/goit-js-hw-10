import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';
console.log(fetchCountries);

import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

// const r = fetch('https://pokeapi.co/api/v2/pokemon/2/');
// console.log(r);

// fetch('https://pokeapi.co/api/v2/pokemon/2/')
//     .then(response => {
//         return response.json();    
//     })
//     .then(pokemon => {
//         console.log(pokemon);
//     })
//     .catch(error => {
//         console.log(error);
//     })



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
}

function resetSearch(ref) {
  if (ref.children.length) {
    ref.innerHTML = '';
  }
  return;
}
    
// console.log(inputHandler);
// const inputHandler = event => {

// }