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
  searchListEl.append('<li>' + searchItem + '</li>');
  // clear the form input element
  $('input[name="search-input"]').val('');
}

// Create a submit event listener on the form element
searchFormEl.on('submit', weatherSearch);


// Weather API
var resonseText = document.getElementById('search-result');
var baseURLforWeather = "https://api.openweathermap.org/data/2.5/forecast?q=";
var APIKey = "&appid=32619d7f41f3ca078999d4f3af06871e&units=imperial";



function weatherSearch(event) {  
  event.preventDefault();

  var searchItem = $('input[name="search-input"]').val();
  console.log(searchItem);
  var queryURL = baseURLforWeather + searchItem + APIKey;
  
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
    displayForecast(data);
    // call second api
  });

  function displayWeather(data) {

    console.log(data);

    var todaydiv = document.createElement('div');

      var city = data.name;
      var date = moment().format("MM/DD/YYYY");
        date.textContent = city + "(" + date + ")";
      var wind = document.createElement('p');
        wind = "Wind:" + data.list[0].wind.speed + "mph";
      var weather = document.createElement('p');
        weather = data.list[0].weather[0].description;
      var temperature = document.createElement('p');
        temperature = "Temp:" + data.list[0].main.temp + "°F";
      

      wind.setAttribute("class", "weatherinfo");
      weather.setAttribute("class", "weatherinfo");
      temperature.setAttribute("class", "weatherinfo");
      wind.setAttribute("class", "weatherinfo");

      document.getElementById('weatherinfo').innerHTML=
      `${date}
      ${weather}
      ${temperature}
      ${wind}
      `


  }

  function displayForecast(data) {

    console.log(data);

/* day, icon, temp, wind, humidity*/

      var city = data.name;
      var temperature = document.createElement('p');
      temperature = "Temp:" + data.list[0].main.temp + "°F";
      var wind = document.createElement('p');
      wind = "Wind:" + data.list[0].wind.speed + "mph";
      var weather = document.createElement('p');
      weather = data.list[0].weather[0].description;

    //not coded yet
  }



}
