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

  // print to the page
  searchListEl.append('<li>' + searchItem + '</li>');

  // clear the form input element
  $('input[name="search-input"]').val('');
}

// Create a submit event listener on the form element
searchFormEl.on('submit', handleFormSubmit);
