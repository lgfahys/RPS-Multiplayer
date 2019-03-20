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

    //referencing the database
    var database = firebase.database();

    //setting global variables

    // var userOne = {
    //     name: "",
    //     wins: 0,
    //     losses: 0,
    //     choice: "",
    // }

    // var userTwo = {
    //     name: "",
    //     wins: 0,
    //     losses: 0,
    //     choice: "",
    // }

    var choices = ["Rock", "Paper", "Scissors"];

    $("#add-name").on("click", function (event) {
        event.preventDefault();
        //making sure a blank name is not input
        if ($("#name-input").val() !== "") {
        //grabbing what the user input as their name
        name = $("#name-input").val().trim();
        $("#user-name").text("Hello, " + name);
        //set name value in database
        database.ref().push({
            name: name,
        });
        } else {
            alert ("Please input your name to begin");
        }
    });


    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val().name);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    function renderButtons() {

        //looping through the array of choices
        for (var i = 0; i < choices.length; i++) {
            //dynamically creating buttons with jquery for all choices
            var btn = $("<button>");
            btn.addClass("choices");
            btn.attr("data-name", choices[i]);
            btn.text(choices[i]);
            $("#user-choices").append(btn);
        }
    }

    //capturing user choice by data attribute
    function getUserChoice() {
        var userChoice = $(this).attr("data-name");
        console.log(userChoice);
        $("#user-one-choice").text("You chose: " + userChoice);
        database.ref().ref({
            userChoice: userChoice,
        });
    }

    $(document).on("click", ".choices", getUserChoice);


    renderButtons();
});

    // //when user clicks a key
    // $(document).keyup(function () {

    //     // if (((userOneGuess === "r") || (userOneGuess === "p") || (userOneGuess === "s"))
    //     //     && ((userTwoGuess === "r") || (userTwoGuess === "p") || (userTwoGuess === "s"))) {

    //     //     if ((userOneGuess === "r" && userTwoGuess === "s") ||
    //     //         (userOneGuess === "s" && userTwoGuess === "p") ||
    //     //         (userOneGuess === "p" && userTwoGuess === "r")) {
    //     //         userOne.wins++ && userTwo.losses--;
    //     //     } else if (userOneGuess === userTwoGuess) {
    //     //         userOne.ties++ && userTwo.ties++;
    //     //     } else {
    //     //         userOne.losses++ && userTwo.wins++;
    //     //     }
    //     // }

    // });
