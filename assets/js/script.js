// Search form
var searchFormEl = $('#search-form');
var searchListEl = $('#search-list');
var weatherinfo = $('.weatherinfo');

// create function to handle form submission
function handleFormSubmit() {
  // select form element by its `name` attribute and get its value
  var searchItem = $('input[name="search-input"]').val();
  // if there's nothing in the form entered, don't print to the page
  if (!searchItem) {
    console.log('No search item filled out in form!');
    return;
  }
  console.log(searchItem);
  // print to the page
  searchListEl.append(searchItem + "<br>");
  // clear the form input element
  $('input[name="search-input"]').val('');
}

// Create a submit event listener on the form element
searchFormEl.on('submit', weatherSearch);


// Weather API
var resonseText = document.getElementById('search-result');
var futureforWeather = "https://api.openweathermap.org/data/2.5/forecast?q=";
var mid = "&appid="
var APIKey = "32619d7f41f3ca078999d4f3af06871e&units=imperial";



function weatherSearch(event) {  
  event.preventDefault();

  var searchItem = $('input[name="search-input"]').val();
  console.log(searchItem);
  var queryURL = futureforWeather + searchItem + mid + APIKey;
  
  handleFormSubmit() 

  fetch(queryURL) 
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
        throw new Error ("City is not found");
        return;
    }
  })

  .then(function(data) {

    // use lon and lat then pass to second api
    // get forecat from second api

    displayWeather(data);
    // call second api
  });

  //5 day forecast //
  function displayWeather(data) {

    console.log(data);
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;

    for(let i=0; i<data.list.length; i+=8)
    {
      document.getElementById("future").innerHTML +=
      `
        <div id="card" style="width: 10rem;">
        <div id="card-body" class="indigo">
          <p> ${data.list[i].dt_txt.substring(0, 10)}</p>
          <p> Icon: </p>
          <p> Wind: ${data.list[i].wind.speed} mph</p>
          <p> Humidity: ${data.list[i].main.humidity} %</p>
        </div>
        </div>
      `
    }


  // Current weather forecast 
    var currentforWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    fetch(currentforWeather).then(res => res.json()).then( result =>{
      console.log(result);

      var city = result.name;
      var date = moment().format("MM/DD/YYYY");
      var wind = document.createElement('p');
      var weather = document.createElement('p');
      var temperature = document.createElement('p');
      var humidity = document.createElement('p');
      
      document.getElementById('weatherinfo').innerHTML +=
      `
      <h2>Search result:</h2>
      <div class="card">
      <div class="card-body">
      <p> <b>${result.name} (${date}) </b></p>
      <p> Temp: ${result.main.temp} °F </p>
      <p> Wind:  ${result.wind.speed} mph </p>
      <p> Humidity: ${result.main.humidity} % </p>
      </div>
      </div>
      <br>
      <h2>5-day forecast:</h2>
      `
    })
  }

}