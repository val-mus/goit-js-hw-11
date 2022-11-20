import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default function renderMarkup(data) {
  if (!data) {
    return;
  }
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
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__img"/>
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
      </div></a>`;
    })
    .join('');
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.5,
    behavior: 'smooth',
  });

  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  docClose: true,
  uniqueImages: true,
});
