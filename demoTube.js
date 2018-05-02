// ENDPOINT
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
// KEY FROM YOUTUBE
const API_Key = 'AIzaSyAvP72iKM_28ZqspOljeDYcptuPY-PXuUg';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    q: searchTerm,
    key:  API_Key,
    maxResults: 5,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  console.log(query);
}

function renderResult(result) {
  return `
  <main role="main" aria-live="assertive">
    <div class="center">
      <h2></h2>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
        <img class="thumbnail" src="${result.snippet.thumbnails.medium.url}" aria-label="${result.snippet.channelTitle}">
      </a>
        <br></br>
      <a class="js-result-name">${result.snippet.title}</a> 
        by <a class="js-user-name" href="" target="_blank">${result.snippet.channelTitle}</a></h2>
      <p> Description: <span class="js-watchers-count">${result.snippet.description}</span></p>
      <button id="prevResult" type="submit"> Previous </button>
      <button id="nextResult" type="submit"> Next </button>
    </div>
  </main>
  `;
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
