const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34148011-b6bf1d49a4c6d649ffa711e50';

export const pixabay = async (value, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(new Error(`There is no picture with ${value}`));
};
