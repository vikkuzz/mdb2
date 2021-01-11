export default class Api {
  baseAddress = `https://api.themoviedb.org/3/`;

  apiKey = `a7e5001cd9584cae4607d9bc812bcbd1`;

  getResource = async (request, page = 1) => {
    const result = await fetch(`${this.baseAddress}search/movie?api_key=${this.apiKey}&query=${request}&page=${page}`);
    const resultJson = await result.json();

    return resultJson.results;
  };

  getGuestSession = async () => {
    const result = await fetch(`${this.baseAddress}authentication/guest_session/new?api_key=${this.apiKey}`);
    const resultToJson = await result.json();
    console.log(resultToJson.guest_session_id);
    return resultToJson.guest_session_id;
  };

  async getGenres() {
    const res = await fetch(`${this.baseAddress}genre/movie/list?api_key=${this.apiKey}&language=en-US`);

    if (!res.ok) {
      throw new Error(`Cold not fetch, received ${res.status}`);
    }
    const result = await res.json();

    return result.genres;
  }

  async sendRate(id, stars, sessionId) {
    const body = {
      value: stars,
    };

    const res = await fetch(
      `${this.baseAddress}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();

    return result;
  }

  async getRatedMovies(sessionId) {
    const ratedMovies = await fetch(
      `${this.baseAddress}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );

    const result = await ratedMovies.json();

    return result;
  }
}
