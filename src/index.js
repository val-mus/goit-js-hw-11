const axios = require('axios').default;
import Notiflix from 'notiflix';
const ACES_KEY = '30502638-8236fb6cc30a79f817dee13c3';

function fetchFromUser() {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: ACES_KEY,
        q: 'cat',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    })
    .then(response => {
      return response.data;
    })
    .then(result => result.hits);
}

fetchFromUser()
  .then(function destr(res) {
    res.forEach(element => console.log(element));
  })
  

// function makeCardElement(element) {
//   const cardMarkup = `<div class="photo-card">
//                     <img src="" alt="" loading="lazy" />
//                     <div class="info">
//                     <p class="info-item">
//                         <b>Likes </b>
//                     </p>
//                     <p class="info-item">
//                       <b>Views:</b>
//                     </p>
//                     <p class="info-item">
//                       <b>Comments:</b>
//                     </p>
//                     <p class="info-item">
//                       <b>Downloads: </b>
//                     </p>
//                     </div>
//                     </div>`;
 
// }
