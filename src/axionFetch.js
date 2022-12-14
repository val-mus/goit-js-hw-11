
import axios from 'axios';
import Notiflix from 'notiflix';

let currentPage = 1;

export default async function axionFetchFromUser(
  searchQuery,
  BASE_URL,
  ACES_KEY
) {
  try {
    const fetchResponse = await axios.get(`${BASE_URL}`, {
      params: {
        key: ACES_KEY,
        q: `${searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 50,
        page: `${currentPage}`,
      },
    });

    const dataCollection = await fetchResponse.data;

    if (fetchResponse.data.totalHits !== 0) {
      if (currentPage === 1) {
        Notiflix.Notify.info(
          `"Hooray! We found ${fetchResponse.data.totalHits} images." `
        );
      }
      currentPage += 1;
    } else {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const collection = await dataCollection.hits;
    return collection;
  } catch {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
}
