import localStorageService from './service';

function getSavedItems(key) {
  let itemsList = localStorageService.getOut(key);

  return !itemsList ? (itemsList = []) : itemsList;
}

export default getSavedItems;
