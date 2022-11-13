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

  fetchFromUser(searchQuery).then(data => {
    console.log(data);
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
  });
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
    .then(hits => {
      console.log(hits);
      return hits;
    });
}

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

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
