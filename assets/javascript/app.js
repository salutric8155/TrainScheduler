 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIRAtLUVgkiCcnL6TGqIRbjLkr8Jf_i_g",
    authDomain: "my-project-2f65d.firebaseapp.com",
    databaseURL: "https://my-project-2f65d.firebaseio.com",
    projectId: "my-project-2f65d",
    storageBucket: "my-project-2f65d.appspot.com",
    messagingSenderId: "226702354354"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //initial values
  /*var currentTrains = 0;
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
    console.log(time);
    $("#time").html("Current time: " + time);*/
    function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
        time = now.getHours() + ':' + now.getMinutes() + ":" + now.getSeconds();
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    document.getElementById('time').innerHTML = [date, time].join(' / ');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call


$("#submit").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

var trainName = $("#train-name").val().trim();
var destination = $("#destination").val().trim();
var firstTrain = $("#first-train").val().trim();
var frequency = $("#frequency").val().trim();

database.ref().set({
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency
})

/*$("#addedTrain").html(trainName + ":" + " " + destination + " " + "at" + " " + firstTrain + " " + frequency);*/
});