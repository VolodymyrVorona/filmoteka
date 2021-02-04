function setItemsPerPage(filmsData = []) {
  let moviesPerPage;
  let visiblePaginationPages;
  let newFilmsData = [];
  const viewportWidth = document.documentElement.clientWidth;

  if (viewportWidth < 768) {
    moviesPerPage = 4;
    visiblePaginationPages = 3;
    newFilmsData = filmsData.slice(0, 4);
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
    moviesPerPage = 8;
    visiblePaginationPages = 8;
    newFilmsData = filmsData.slice(0, 8);
  } else if (viewportWidth >= 1024) {
    moviesPerPage = 9;
    visiblePaginationPages = 8;
    newFilmsData = filmsData.slice(0, 9);
  }
  return { moviesPerPage, visiblePaginationPages, newFilmsData };
}

export default setItemsPerPage;
