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

  document.querySelector('.gallery').innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value;

  fetchFromUser(searchQuery).then(data => renderMarkup(data));
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
      if (result.totalHits === 0) {
        Notiflix.Notify.warning('eeerr');
      } else {
        Notiflix.Notify.info(`"Hooray! We found ${result.totalHits} images." `);
      }
      return result.hits;
    })
    .then(hits => {
      console.log(hits);
      return hits;
    });
}

function renderMarkup(data) {
  const markup = data
    .map(item => {
      const {
        webformatURL,
        tags,
        likes,
        largeImageURL,
        views,
        comments,
        downloads,
      } = item;
      return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__img"/>
    <div class="info">
    <p class="info-item">
        <b>Likes: ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
    </div>
    </div>`;
    })
    .join('');
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
}
