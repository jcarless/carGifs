var cars = ['volkswagen', 'toyota', 'honda', 'ford', 'bmw', 'kia'];

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

// add button
$('#addCar').on('click', function(){

		var car = $('#carInput').val().trim();

		cars.push(car);
		
		appendNewButton(car);
		$('#carInput').val('');

		return false;
	});

$(document).on('click', '.car', function() {
	$('#searchResults').empty();
	 
	var car = $(this).data('car');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=car+" + car + "&limit=20&rating=pg&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {

	var results = response.data;


	for (var i = 0; i <= results.length; i++) {
		var carDiv = $('<div class="carDiv">');

		var p = $('<p>').text('Rating: ' + results[i].rating);

		var carGif = $('<img>');
		carGif.attr('src', results[i].images.fixed_height.url);
		carGif.attr('data-still', results[i].images.fixed_height_still.url);
		carGif.attr('data-animate', results[i].images.fixed_height.url);
		carGif.attr('data-state', 'animate');
		carGif.addClass('img-rounded gif'); //pause would not work with img0rounded class so i added gif class
		
		carDiv.append(p);
		carDiv.append(carGif);

		$('#searchResults').append(carDiv);

	}; //for loop

		}) //.done

}); //.car click

// Pause images
$('#searchResults').on('click', '.gif', function() {
	var state = $(this).attr('data-state');

		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}else{
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
}); //pause
 	