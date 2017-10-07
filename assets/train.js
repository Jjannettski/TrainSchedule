$(document).ready(function() {
// initializing the firebase project

var config = {
      apiKey: "AIzaSyCNEf1pgcYzJ5fbbXpeRtFlGtaXCWUYUM8",
      authDomain: "train-schedule-c1ea6.firebaseapp.com",
      databaseURL: "https://train-schedule-c1ea6.firebaseio.com/",
      storageBucket: "train-schedule-c1ea6.appspot.com"
    };

 firebase.initializeApp(config);

var database = firebase.database();

var trainName = ""; //The name of the train entered by the user
var destination = ""; //Where the train is going
var firstTrain = ""; //this is the time of the first train
var frequency = 0; //how often the trains come

//var NextArrival = ""; // the next train that's arriving



    // When the submit button is clicked

    $("#add-train").on("click", function(event) {

   
      event.preventDefault();


//getting the values from each user input field
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain = $("#firstTrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();

// Creating a <th> tag and nesting each above variable inside of it
        


//Apeending the user input to the train schedule panel along with the calculated next arrival and minutes away
    

// Pushes the value into the firebase database
      database.ref().push({
        trainName: trainName, //name of the train
        destination: destination, //where the train is going
        firstTrain: firstTrain, //this is the time of the first train
        frequency: frequency, //how often the train comes
        dateAdded: firebase.database.ServerValue.TIMESTAMP //the date when the user entered in the above values
      });

    });

   database.ref().orderByChild("dateAdded"). limitToLast(7).on("child_added", function(childSnapshot){
      var firstTrainConverted = moment(childSnapshot.val().firstTrain, "hh:mm");
      var currentTime = moment();

      console.log ("Current Time: " + moment(currentTime).format("hh:mm a"));

      var nextTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("Difference In Time " + nextTime);

      var timeAppart = nextTime % childSnapshot.val().frequency;
      console.log(timeAppart);

      var timeTillNext = childSnapshot.val().frequency - timeAppart;
      console.log("Minutes Till Train: " + timeTillNext);

      var nextTrain = moment().add(timeTillNext, "minutes");
      var nexTrainConverted = moment(nextTrain).format("hh:mm");

      $("#train-info").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + moment(nextTime).format("hh:mm a") + "</td><td>" + nexTrainConverted + "</td></tr>");
      console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

var i;

for (i = 0; i < 1; i++) {


  var tableRow = $("<tr>");
  tableRow.addClass("info-display");
  var test = $("<td>" + trainName + "</td>");
  var test2 = $("<td>" + destination + "</td>");
  var test3 = $("<td>" + frequency + "</td>");
  var test4 = $("<td>" + nexTrainConverted + "AM" + "<br>" + "</td>");
  var test5 = $("<td>" + timeTillNext + "</td>");


  tableRow.append(test);
  tableRow.append(test2);
  tableRow.append(test3);
  tableRow.append(test4);
  tableRow.append(test5);

console.log("Hello");

}

      
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }); 

 });

      // var test = $("<th>" + trainName + "</th>");
      // var test2 = $("<th>" + destination + "</th>");
      // var test3 = $("<th>" + frequency + "</th>");
      // var test4 = $("<th>" + nexTrainConverted + "AM" + "<br>" + "</th>");
      // var test5 = $("<th>" + timeTillNext + "</th>");


      // $(".info-display").append(test);
      // $(".info-display").append(test2);
      // $(".info-display").append(test3);
      // $(".info-display").append(test4);
      // $(".info-display").append(test5);