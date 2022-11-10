const axios = require('axios').default;
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const ACES_KEY = '30502638-8236fb6cc30a79f817dee13c3';

const getEl = element => document.querySelector(element);
const form = getEl('#search-form');

let searchQuery = '';

form.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  return fetchFromUser(searchQuery);
}

function fetchFromUser(searchQuery) {
  return axios
    .get(`${BASE_URL}`, {
      params: {
        key: ACES_KEY,
        q: `${searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 50,
      },
    })
    .then(response => {
      return response.data;
    })
    .then(result => {
      Notiflix.Notify.info(`"Hooray! We found ${result.totalHits} images." `);
      return result.hits;
    })
    .then(r => {
      console.log(r);
    });
}

// fetchFromUser()
//   .then(res => res.json()).then(data => console.log(data))

// fetchFromUser('cat');
// fetchFromUser('dog');
// fetchFromUser('sun');

function makeCardElement(element) {
  const cardMarkup = `<div class="photo-card">
                    <img src="" alt="" loading="lazy" />
                    <div class="info">
                    <p class="info-item">
                        <b>Likes </b>
                    </p>
                    <p class="info-item">
                      <b>Views:</b>
                    </p>
                    <p class="info-item">
                      <b>Comments:</b>
                    </p>
                    <p class="info-item">
                      <b>Downloads: </b>
                    </p>
                    </div>
                    </div>`;
  document
    .querySelector('.gallery')
    .insertAdjacentElement('beforeend', cardMarkup);
}
