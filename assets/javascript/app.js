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

    var numPlayers = 0;
    var playerOne = "";
    var playerTwo = "";
    var name = "";

    var choices = ["Rock", "Paper", "Scissors"];

    //hiding until user enters their information
    function startGame() {
        $("#sign-out").hide();
        $("#user-one-choice").hide();
        $("#user-two-choice").hide();
        $("#user-choices").hide();
        $("#opponent-choices").hide();
        clearFirebase();
    }

    $("#add-info").on("click", function (event) {
        event.preventDefault();
        numPlayers++;
        //making sure a blank info is not input
        if ($("#name-input").val() !== "") {
            //grabbing what the user input as their name
            name = $("#name-input").val().trim();
            $("#user-name").text("Hello, " + name);
            $("#user-input").hide();
            $("#instructions").text("Select rock, paper or scissors");
            $("#sign-out").show();
            $("#user-one-choice").show();
            $("#user-two-choice").show();
            $("#user-choices").show();
        } else {
            alert("Please input your name to begin");
        }
    });

    $("#sign-out").on("click", function (event) {
        startGame();
    });

    function renderButtons() {

        //looping through the array of choices
        for (var i = 0; i < choices.length; i++) {
            //dynamically creating buttons with jquery for all choices
            btn = $("<button>");
            btn.addClass("choices");
            btn.attr("data-name", choices[i]);
            btn.text(choices[i]);
            $("#user-choices").append(btn);
        }
    }

    //capturing user choice by data attribute
    function getUserChoice() {
        var choice = $(this).attr("data-name");
        $("#user-one-choice").text("You chose: " + choice);
        console.log(numPlayers);
        if (numPlayers === 1) {
            playerValue = 1;
        } else {
            playerValue = 2;
        }
        database.ref().push({
            name: name,
            choice: choice,
            playerValue: playerValue,
        });
    }

    function pairUsers() {

    }

    $(document).on("click", ".choices", getUserChoice);

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val().name);
        console.log(snapshot.val().choice);
        console.log(snapshot.val().playerValue);
        $("#user-name").text("Hello, " + snapshot.val().name);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    renderButtons();

    // creating a function to clear the database to be used when users sign out or time out
    function clearFirebase () {
        database.ref().remove();
    }

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
