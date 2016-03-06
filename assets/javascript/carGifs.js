var cars = ['volkswagen', 'toyota', 'honda', 'ford', 'bmw', 'kia'];


// ADD BUTTONS
function appendNewButton(car){ 
	    var a = $('<button>')
	    a.addClass('car btn btn-default');
	    a.attr('data-car', car);
	    a.text(car);
	    $('#buttonHolder').append(a);
	}

function renderButtons(){ 
		for (var i = 0; i < cars.length; i++){
		    appendNewButton(cars[i]);
		}
	}

renderButtons();

$('#addCar').on('click', function(){

		var car = $('#carInput').val().trim();

		cars.push(car);
		
		appendNewButton(car);

		return false;
	});



$(document).on('click', '.car', function() {
	$('#searchResults').empty();

	 
	var car = $(this).data('car');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + car + "&limit=20&rating=pg&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {

			console.log(queryURL);
			console.log(response);


	var results = response.data;

	for (var i = 0; i <= results.length; i++) {
		var carDiv = $('<div>');

		var p = $('<p>').text('Rating: ' + results[i].rating);

		var carGif = $('<img>');
		carGif.attr('src', results[i].images.fixed_height.url);
		carGif.addClass('img-rounded');
		
		carDiv.append(p);
		carDiv.append(carGif);

		$('#searchResults').append(carDiv);

	};
		

// var state = results[i].images.fixed_height_still.url

// 		if (state == results[i].images.fixed_height_still.url) {

// 		};


		})
});


 	