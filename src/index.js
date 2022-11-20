import axionFetchFromUser from './axionFetch';
import renderMarkup from './renderMarkup';

const BASE_URL = 'https://pixabay.com/api/';
const ACES_KEY = '30502638-8236fb6cc30a79f817dee13c3';

const getEl = element => document.querySelector(element);
const form = getEl('#search-form');

let searchQuery = '';

form.addEventListener('submit', onSubmitClick);

async function onSubmitClick(e) {
  e.preventDefault();
  document.querySelector('.gallery').innerHTML = '';

  searchQuery = e.currentTarget.elements.searchQuery.value;
  const inputField = e.currentTarget.elements.searchQuery;
  inputField.addEventListener('change', () => {
    currentPage = 1;
  });

  const markupData = await axionFetchFromUser(searchQuery, BASE_URL, ACES_KEY);
  renderMarkup(markupData);

  e.target.reset();
}

window.addEventListener('scroll', async () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop === scrollHeight - clientHeight) {
    const markupData = await axionFetchFromUser(
      searchQuery,
      BASE_URL,
      ACES_KEY
    );
    renderMarkup(markupData);
  }
});
