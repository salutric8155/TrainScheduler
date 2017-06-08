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

database.ref().on("value", function(snapshot) {
    $("#time").val();
});

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
      var arrival = $("#arrival").val().trim();
      var frequency = $("#frequency").val().trim();
      /*var minutesAway = $("#time").val().trim() - $("#arrival").val().trim();*/
      /*var myTime = $("#time").val().trim();*/
      var myTime = new moment().format("HH:mm:ss");
      console.log(myTime);

          var firstTimeConverted = moment(arrival, "hh:mm").subtract(1, "years");
          var currentTime = moment();
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          var theRemainder = diffTime % frequency;
          var minutesAway = frequency - theRemainder;
          var nextTrain = moment().add(minutesAway, "minutes");
          var nextTrainFormatted = moment(nextTrain).format("hh:mm");

      database.ref().push({
        trainName: trainName,
        destination: destination,
        arrival: arrival,
        frequency: frequency,
        minutesAway: minutesAway
      })
     /*var minutesAway = current_time */
     /* console.log(moment(moment.duration(myTime.diff(arrival))).format("hh:mm:ss")).toString();*/
     /* $("#addedTrain").append(trainName + ":" + " " + destination + " " + "at" + " " + arrival + " " + frequency);
*/ 
      var newRow = "<tr> \
         <td>" + trainName + "</td> \
         <td>" + destination + "</td> \
         <td>" + arrival + "</td> \
         <td>" + frequency + "</td> \
         <td>" + minutesAway + "</td> \
         </tr>";
//<td>" + minutesAway + "</td> \
         $(".table--trains tbody").append(newRow);

         $("form")[0].reset();
});

database.ref().on("child_added", function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().arrival);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().minutesAway);
      // Change the HTML to reflect
      /* $("#train-name").html(snapshot.val().trainName);
       $("#destination").html(snapshot.val().destination);
       $("#arrival").html(snapshot.val().arrival);
       $("#frequency").html(snapshot.val().frequency);*/

      // // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });