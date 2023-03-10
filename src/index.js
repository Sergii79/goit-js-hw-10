import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const r = fetch('https://pokeapi.co/api/v2/pokemon/2/');
console.log(r);

fetch('https://pokeapi.co/api/v2/pokemon/2/')
    .then(response => {
        return response.json();    
    })
    .then(pokemon => {
        console.log(pokemon);
    })
    .catch(error => {
        console.log(error);
    })

