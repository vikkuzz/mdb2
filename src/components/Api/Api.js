export default class Api {
  baseAddress = `https://api.themoviedb.org/3/`;

  apiKey = `a7e5001cd9584cae4607d9bc812bcbd1`;

  authentication = `authentication`;

  query = `return`;

  page = 1;

  getResource = async () => {
    const result = await fetch(
      `${this.baseAddress}search/movie?api_key=${this.apiKey}&query=${this.query}&page=${this.page}`
    );
    const resultToJson = await result.json();
    console.log(resultToJson.results);
    return resultToJson.results;
  };

  getGuestSession = async () => {
    const result = await fetch(`${this.baseAddress}authentication/guest_session/new?api_key=${this.apiKey}`);
    const resultToJson = await result.json();
    console.log(resultToJson.guest_session_id);
    return resultToJson.guest_session_id;
  };
}
