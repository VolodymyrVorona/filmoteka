import localStorageService from './service';
import getSavedItems from './getSavedItems';

function saveItem(item, key, btnRef) {
  btnRef.addEventListener('click', () => {
    const savedItems = getSavedItems(key);
    isInSaved(item, savedItems, key, btnRef);

    if (btnRef.textContent === `add to ${key}`) {
      savedItems.push(item);
      localStorageService.saveIn(key, savedItems);

      btnRef.textContent = `clear from ${key}`;
    } else if (btnRef.textContent === `clear from ${key}`) {
      const itemsIdList = savedItems.map(elem => elem.id);
      const itemIndex = itemsIdList.indexOf(item.id);

      savedItems.splice(itemIndex, 1);
      localStorageService.saveIn(key, savedItems);
      btnRef.textContent = `add to ${key}`;
    }
  });
}

function isInSaved(item, array, key, btnRef) {
  const isInList = array.some(el => el.id === item.id);

  !isInList
    ? (btnRef.textContent = `add to ${key}`)
    : (btnRef.textContent = `clear from ${key}`);
}

export { saveItem, isInSaved };
