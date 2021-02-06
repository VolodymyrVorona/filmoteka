async function getMovies(URL, page = 1) {
  try {
    const responsee = await fetch(URL);
    const data = await responsee.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default getMovies;
