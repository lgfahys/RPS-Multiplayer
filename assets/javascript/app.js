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

    var playerOne = "";
    var playerTwo = "";
    var playerOneName = "";
    var playerTwoName = "";
    var thisPlayer = "";
    var numTurns = 0;

    var choices = ["Rock", "Paper", "Scissors"];

    //hiding stuff on initial page load (update this to hidden only if thisPlayer does not exist)
    $("#sign-out").hide();
    $("#user-one-choice").hide();
    $("#user-two-choice").hide();

    // //when player submits their name
    $("#add-info").on("click", function (event) {
        event.preventDefault();
        //making sure a blank name is not input & checking if there is not player one or two
        if (($("#name-input").val().trim() !== "")) {
            if ((playerOne === null) && (playerTwo === null)) {
                thisPlayer = $("#name-input").val().trim();
                $("#user-name").text("Hello, " + thisPlayer);

                playerOne = {
                    name: thisPlayer,
                    choice: "",
                    wins: 0,
                    losses: 0,
                    ties: 0,
                };

                //setting player info in the database
                database.ref().child("/players/playerOne").set(playerOne);
                //if player one exists and player two does not
            } else if ((playerOne !== null) && (playerTwo === null)) {
                thisPlayer = $("#name-input").val().trim();
                $("#user-name").text("Hello, " + thisPlayer);

                playerTwo = {
                    name: thisPlayer,
                    choice: "",
                    wins: 0,
                    losses: 0,
                    ties: 0,
                };

                //setting player info in the database
                database.ref().child("/players/playerTwo").set(playerTwo);
            }
        }

        $("#name-input").val("");
    });

    database.ref("/players/").on("value", function (snapshot) {

        // $("#user-name").text(snapshot.val().thisPlayer);

        if (snapshot.child("playerOne").exists()) {
            playerOne = snapshot.val().playerOne;
            playerOneName = playerOne.name;
            console.log("Player One: " + playerOneName);
            $("#user-one-choice").append(playerOneName);
            $("#user-one-choice").append("Wins: " + playerOne.wins + "Losses " + playerOne.losses + "Tie " + playerOne.ties);
        } else {
            playerOne = null;
            playerOneName = "";
            $("#instructions").text("Waiting for player 1");
        }

        if (snapshot.child("playerTwo").exists()) {
            playerTwo = snapshot.val().playerTwo;
            playerTwoName = playerTwo.name;
            console.log("Player Two: " + playerTwoName);
            $("#user-two-choice").append(playerTwoName);
            $("#user-two-choice").append("Wins: " + playerTwo.wins + "Losses " + playerTwo.losses + "Tie " + playerTwo.ties);
        } else {
            playerTwo = null;
            playerTwoName = "";
            $("#instructions").text("Waiting for player 2");
        }

        if (playerOne && playerTwo) {
            $("#user-one-choice").css("border-color", "#ffffff", "border-weight", "1px", "border-style", "solid");
            $("#instructions").text("Player 1's turn")
        }
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    //clearing the database when a user signs out
    $("#sign-out").on("click", function (event) {
        database.ref().remove(thisPlayer);
    });


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


        // $("#sign-out").on("click", function (event) {
        //     startGame();
        // });

        // function renderButtons() {

        //     //looping through the array of choices
        //     for (var i = 0; i < choices.length; i++) {
        //         //dynamically creating buttons with jquery for all choices
        //         btn = $("<button>");
        //         btn.addClass("choices");
        //         btn.attr("data-name", choices[i]);
        //         btn.text(choices[i]);
        //         $("#user-choices").append(btn);
        //     }
        // }

        // //capturing user choice by data attribute
        // function getUserChoice() {
        //     var choice = $(this).attr("data-name");
        //     $("#user-one-choice").append("You chose: " + choice);
        // }

        // //getting user choice on choice button click
        // $(document).on("click", ".choices", getUserChoice);

        // database.ref().on("value", function (snapshot) {
        //     // console.log(snapshot.val().name);
        //     // console.log(snapshot.val().choice);
        //     $("#user-name").text("Hello, " + snapshot.val().thisPlayer);

        // }, function (errorObject) {
        //     console.log("Errors handled: " + errorObject.code);
        // });

        // renderButtons();

        // // creating a function to clear the database to be used when users sign out or time out
        // function clearFirebase () {
        //     database.ref().remove();
        // }


