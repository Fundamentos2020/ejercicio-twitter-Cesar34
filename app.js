//variable
const listaTweets = document.getElementById('lista-tweets');

// Evento listeners
eventListeners();

function eventListeners() {
	//Cuando se envia el formulario
	document.querySelector('#formulario').addEventListener('submit',agregarTweet);

	//Borrar tweet
	listaTweets.addEventListener('click',borrarTweet);
	
	//Contenido cargado
	document.addEventListener('DOMContentLoaded', localStorageListo);
}

//funciones

//añador tweet del formulario.
function agregarTweet(e){
	e.preventDefault();
	// leer el valor del textarea
	const tweet = document.getElementById('tweet').value;
	//crear boton de eliminar
	const botonBorrar = document.createElement('a');
	botonBorrar.classList = 'borrar-tweet';
	botonBorrar.innerText = 'X';
	
	//crear elemento y añadir el elemento a la lista 
	const li = document.createElement('li');
	li.innerText = tweet;
	//Añade el boton de borrar al tweet
	li.appendChild(botonBorrar);
	//añade el tweet a la lista
	listaTweets.appendChild(li);
	
	//Agregar a local storage
	agregarTweetLocalStorage(tweet);
}

function borrarTweet(e){
	e.preventDefault();
	if(e.target.className === 'borrar-tweet'){
		e.target.parentElement.remove();
		borrarTweetLocalStorage(e.target.parentElement.innerText);
		//alert('Tweet eliminado');		
	}
}

//Mostrar datos de local storage en la lista
function localStorageListo(){
	let tweets;
	
	tweets = obtenerTweetsLocalStorage();
	
	tweets.forEach(function(tweet){
		//crear boton de eliminar
		const botonBorrar = document.createElement('a');
		botonBorrar.classList = 'borrar-tweet';
		botonBorrar.innerText = 'X';
		
		//crear elemento y añadir el elemento a la lista 
		const li = document.createElement('li');
		li.innerText = tweet;
		//Añade el boton de borrar al tweet
		li.appendChild(botonBorrar);
		//añade el tweet a la lista
		listaTweets.appendChild(li);
	});

	
}


function agregarTweetLocalStorage(tweet){
	let tweets;
	tweets = obtenerTweetsLocalStorage();
	
	//añadir el nuevo tweets
	tweets.push(tweet);
	//Convertir de string a arreglo de local storage
	localStorage.setItem('tweets', JSON.stringify(tweets));
	/*//añade a local storage
	localStorage.setItem('tweets', tweet);*/
}

// Se encarga de comprobar que haya elemntos en localStorage, retorna un areglo
function obtenerTweetsLocalStorage(){
	let tweets;
	
	//revisamos los valores de local storage
	if(localStorage.getItem('tweets') === null){
		tweets = [];
	}else{
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}
	return tweets;
}

//Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
	let tweets, tweetBorrar;
	//elimina la x del tweet
	tweetBorrar = tweet.substring(0, tweet.length - 1);
	
	tweets = obtenerTweetsLocalStorage();
	
	tweets.forEach(function(tweet, index){
		if(tweetBorrar === tweet){
			tweets.splice(index, 1);
		}
	});
	
	localStorage.setItem('tweets', JSON.stringify(tweets));
}






