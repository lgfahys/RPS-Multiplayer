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
    var numTurns = 1;

    var choices = ["Rock", "Paper", "Scissors"];

    //display setup on initial page load
    $("#sign-out").hide();
    $("#instructions").text("Enter your name to begin playing");
    $("#user-one-div").hide();
    $("#user-two-div").hide();
    $("#user-input").hide();
    $("#user-choices").hide()
    $("#opponent-choices").hide()

    // //when player submits their name
    $("#add-info").on("click", function (event) {
        event.preventDefault();
        //making sure a blank name is not input & checking if there is not player one or two
        if (($("#name-input").val().trim() !== "")) {
            if ((playerOne === null) && (playerTwo === null)) {
                thisPlayer = $("#name-input").val().trim();

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
        $("#user-input").hide();
    });

    database.ref("/players/").on("value", function (snapshot) {


        if (snapshot.child("playerOne").exists()) {
            var sv = snapshot.val();
            playerOne = sv.playerOne;
            playerOneName = playerOne.name;
            console.log("Player One: " + playerOneName);
            $("#instructions").text("Waiting for Player Two");
            $("#user-input").hide();
            $("#user-one-div").show();
            $("#user-two-div").show();
            $("#user-one-name").text("Player One: " + playerOneName);
            //ensuring user one choice div does not repeat text when player 2 is added
            $("#user-one-div").empty();
            //appending all player one info
            $("#user-one-div").append(playerOneName);
            $("#user-one-div").append("<br>");
            $("#user-one-div").append("Wins: " + playerOne.wins);
            $("#user-one-div").append("<br>");
            $("#user-one-div").append("Losses: " + playerOne.losses);
            $("#user-one-div").append("<br>");
            $("#user-one-div").append("Ties: " + playerOne.ties);
            $("#user-one-div").append("<br>");
        } else {
            $("#user-input").show();
            playerOne = null;
            playerOneName = "";
            $("#instructions").text("Waiting for Player One");
        }

        if (snapshot.child("playerTwo").exists()) {
            var sv = snapshot.val();
            playerTwo = sv.playerTwo;
            playerTwoName = playerTwo.name;
            console.log("Player Two: " + playerTwoName);
            $("#instructions").text("Player One's turn");
            $("#user-input").hide();
            $("#user-two-name").text("Player Two: " + playerTwoName);
            //ensuring user one choice div does not repeat text when player 2 is added
            $("#user-two-div").empty();
            //appending all player two info
            $("#user-two-div").append(playerTwoName);
            $("#user-two-div").append("<br>");
            $("#user-two-div").append("Wins: " + playerTwo.wins);
            $("#user-two-div").append("<br>");
            $("#user-two-div").append("Losses: " + playerTwo.losses);
            $("#user-two-div").append("<br>");
            $("#user-two-div").append("Ties: " + playerTwo.ties);
            $("#user-two-div").append("<br>");
        } else {
            $("#user-input").show();
            playerTwo = null;
            playerTwoName = "";
            $("#instructions").text("Enter your name to begin playing");
        }

        if (playerOne && playerTwo) {
            $("#user-one-div").css("border", "1px solid #3acbe8");
            $("#instructions").text("Player 1's turn");
        }
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    database.ref("/numTurns/").on("value", function (snapshot) {
        if (snapshot.val() === 1) {
            numTurns = 1;

            if (playerOne && playerTwo) {
                $("#user-one-div").css("border", "1px solid #3acbe8");
                $("#user-two-div").css("border", "none");
                $("#user-choices").show();
                $("#opponent-choices").hide();
                $("#instructions").text("Waiting on player 1 to choose");
            }
        } else if (snapshot.val() === 2) {
            numTurns = 2;

            if (playerOne && playerTwo) {
                $("#user-two-div").css("border", "1px solid #3acbe8");
                $("#user-one-div").css("border", "none");
                $("#opponent-choices").show();
                $("#user-choices").hide();
                $("#instructions").text("Waiting on player 2 to choose");
            }
        }
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    //get users choice on click & track it in the db
    $("#user-choices").on("click", ".choices", function (event) {

        if ((numTurns === 1)) {
            var choice = $(this).attr("data-name");
            playerOneChoice = choice;
            $("#user-one-choice").text("You chose: " + playerOneChoice);
            console.log("Player One Choice: " + playerOneChoice)
            database.ref().child("/players/playerOne/choice").set(playerOneChoice);
            numTurns = 2;
            console.log(numTurns);
            //setting numTurns to 2 in the db
            database.ref().child("/numTurns").set(2);
        }

    });


    //get opponents choice on click & track it in the db
    $("#opponent-choices").on("click", ".choices", function (event) {

        if ((numTurns === 2)) {
            var choice = $(this).attr("data-name");
            playerTwoChoice = choice;
            $("#user-two-choice").text("You chose: " + playerTwoChoice);
            console.log("Player Two Choice: " + playerTwoChoice)
            database.ref().child("/players/playerTwo/choice").set(playerTwoChoice);
            numTurns = 1;
            console.log(numTurns);
            //setting numTurns to 1 in the db
            database.ref().child("/numTurns").set(1);
            whoWins();
        }

    });

    function whoWins() {

    }

    //creating buttons for all items in the choices array
    function renderButtons() {

        //looping through the array of choices
        for (var i = 0; i < choices.length; i++) {
            //dynamically creating buttons with jquery for all choices
            btn = $("<button>");
            btn.addClass("choices");
            btn.attr("data-name", choices[i]);
            btn.text(choices[i]);
            $(btn).clone().appendTo("#opponent-choices");
            $(btn).clone().appendTo("#user-choices");
        }
    }

    //clearing the database when a user signs out
    $("#sign-out").on("click", function (event) {
        database.ref().remove(thisPlayer);
    });

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

        // // creating a function to clear the database to be used when users sign out or time out
        // function clearFirebase () {
        //     database.ref().remove();
        // }


