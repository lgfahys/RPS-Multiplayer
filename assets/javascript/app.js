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

    // var playerTwo = {
    //     name: "",
    //     email: "",
    //     wins: 0,
    //     losses: 0,
    //     choice: "",
    // }

    // var playerTwo = {
    //     name: "",
    //     email: "",
    //     wins: 0,
    //     losses: 0,
    //     choice: "",
    // }
    var numPlayers = 0;
    var playerOne = "";
    var playerTwo = "";
    var name= "";
    var email= "";

    var choices = ["Rock", "Paper", "Scissors"];

    $("#add-info").on("click", function (event) {
        event.preventDefault();
        //making sure a blank info is not input
        if ($("#name-input").val() && $("#email-input").val() !== "") {
        //grabbing what the user input as their name & email
        name = $("#name-input").val().trim();
        email = $("#email-input").val().trim();
        $("#user-name").text("Hello, " + name);
        numPlayers ++;
        console.log (numPlayers);
        } else {
            alert ("Please input your name & e-mail to begin");
        }
    });

    $("#sign-out").on("click", function (event) {
        //sign out function
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
        var choice = $(this).attr("data-name");
        console.log(choice);
        $("#user-one-choice").text("You chose: " + choice);
        database.ref().push({
            name: name,
            email: email,
            choice: choice,
        });
    }

    function pairUsers() {
        
    }

    $(document).on("click", ".choices", getUserChoice);

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val().name);
        console.log(snapshot.val().email);
        console.log(snapshot.val().choice);
        $("#user-name").text("Hello, " + snapshot.val().name);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    renderButtons();

    // function login() {
    //     const name= $("#name-input").val();
    //     const mail= $("#email-input").val();
    //     const auth= firebase.auth();
    //     const promise= auth.signInWithCustomToken(name, mail);
    //     promise.catch(e => window.alert(e.message));
    // }

    // firebase.auth().onAuthStateChanged(function(user) {
    //     // Once authenticated, instantiate Firechat with the logged in user
    //     if (user) {
    //     // window.open("chat.html");
    //     // window.alert("logged in");
    //     // console.log("logged in");
    //       initChat(user);
    //     }
    //   });
      
    //   firebase.auth().signInWithCustomToken("#name-input").catch(function(error) {
    //     console.log("Error authenticating user:", error);
    //   });

    //   function initChat(user) {
    //     // Get a Firebase Database ref
    //     var chatRef = firebase.database().ref("chat");

    //     // Create a Firechat instance
    //     var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

    //     // Set the Firechat user
    //     chat.setUser(user.name, user.email);
    //   }

    //   login();
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
