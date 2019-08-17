$(function(){
    //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');

    var jokeLoader = $('#joke-loader');
    var fetchLoader = $('#fetch');
    var statusContainer = $('#status-container');
    var maxJokeMessage = 'RESET';
    var resetJoke = "MAKE ME LAUGH";
    var count = 0;
    var maxJoke = 5;

    jokeLoader.hide();
    jokeResetButton.hide();
  

    jokeButton.on('click', function(e){
    makeJoke();
    });
  
    jokeResetButton.on('click', function(){
      removeAllJoke();
    });
    
    async function makeJoke(){
      try{
        jokeButtonDisabled(true);
        jokeLoader.show();
        var randomJoke = await getRandomJoke();

        await makeJokeList(randomJoke);
        
        jokeLoader.hide();
		count++;
        if(count != 5){
          jokeButtonDisabled(false);
		
        }
        if(count == 5){
          jokeButtonDisabled(true);
		  jokeButton.hide();
          check();

        }

        console.log(count);
      } catch(err){
        alert(err);
        jokeButtonDisabled(false);
        jokeLoader.hide();
      }
    }

    function jokeButtonDisabled(val){
      jokeButton.attr("disabled", val);
    }

    function getRandomJoke(){
      return JOKE_SERVICE.get();
    }

    function makeJokeList(joke){
      var list = `<li>
                    <p>${joke}</p>
                  </li>`;
      jokesList.append(list);
    }

    function check(){
	
        jokeResetButton.show();
        jokeButton.text(maxJokeMessage);

    }

    function removeAllJoke(){
      count = 0;
      jokeButton.text(resetJoke);
      jokeButtonDisabled(false);
      jokesList.empty();
      statusContainer.css("height", "10vh");
      jokeResetButton.hide();
	  jokeButton.show();
    }

  })