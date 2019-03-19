$(document).ready(function () {

//initializing firebase
var config = {
    apiKey: "AIzaSyC5mKilH9BwCWjw9wEXFKNMyOZ7OFFvzdQ",
    authDomain: "rps-multiplayer-d0c83.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d0c83.firebaseio.com",
    projectId: "rps-multiplayer-d0c83",
    storageBucket: "rps-multiplayer-d0c83.appspot.com",
    messagingSenderId: "340963260873"
};

firebase.initializeApp(config);

//setting global variables
var database = firebase.database();

var userOne = {
    name: "",
    wins: 0,
    losses: 0,
    choice: "",
}

var userTwo = {
    name: "",
    wins: 0,
    losses: 0,
    choice: "",
}

//when user clicks a key
$(document).keyup(function () {

    if (((userOneGuess === "r") || (userOneGuess === "p") || (userOneGuess === "s"))
        && ((userTwoGuess === "r") || (userTwoGuess === "p") || (userTwoGuess === "s"))) {

        if ((userOneGuess === "r" && userTwoGuess === "s") ||
            (userOneGuess === "s" && userTwoGuess === "p") ||
            (userOneGuess === "p" && userTwoGuess === "r")) {
            userOne.wins++ && userTwo.losses--;
        } else if (userOneGuess === userTwoGuess) {
            userOne.ties++ && userTwo.ties++;
        } else {
            userOne.losses++ && userTwo.wins++;
        }
    }
    alert("yo");
});

});
