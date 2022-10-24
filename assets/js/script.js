// Search form
var searchFormEl = $('#search-form');
var searchListEl = $('#search-list');

// create function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
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
searchFormEl.on('submit', handleFormSubmit);


// Weather API
var resonseText = document.getElementById('search-result');
console.log(resonseText);
var baseURLforWeather = "api.openweathermap.org/data/2.5/forecast?q=";
var baseURLforForecast = "";
var APIKey = "&appid=32619d7f41f3ca078999d4f3af06871e";
var searchItem = $('input[name="search-input"]').val();
var queryURL = baseURLforWeather + searchItem + APIKey;

function weatherSearch(searchItem) {  
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
    displayWeather(data);
    displayForecast(data);
  });

  function displayWeather(data) {

      var city = data.name;
      var date = moment().format("MM/DD/YYYY");
        date.textContent = city + "(" + date + ")";
      var temprature = document.createElement('p');
        temprature = "Temp:" + data.main.temp + "F";
      var wind = document.createElement('p');
        widn = "Wind:" + data.wind.speed + "mph";
      var humidity = document.createElement('p');
        humidity = "Humidity:" + data.main.humidity + "%";

  }


}
