export default {
  saveIn(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
  },

  getOut(key) {
    const elemList = localStorage.getItem(key);
    const parsedElemList = JSON.parse(elemList);
    return parsedElemList;
  },

  clear(key) {
    localStorage.removeItem(key);
  },
};
