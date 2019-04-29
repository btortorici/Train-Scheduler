

   // submitting data from firebase
   var config = {
            apiKey: "AIzaSyCBHOBLcr_az8wV27ICH6qodLFOmvx7ZnI",
            authDomain: "train-scheduler-d0bf9.firebaseapp.com",
            databaseURL: "https://train-scheduler-d0bf9.firebaseio.com",
            projectId: "train-scheduler-d0bf9",
            storageBucket: "train-scheduler-d0bf9.appspot.com",
            messagingSenderId: "108476038309"
  };
  
  firebase.initializeApp(config);
  
  var trainData = firebase.database();
  
  $("#submitButton").on("click", function () {
    var trainName = $("#trainName").val().trim(); //stores value that on page
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim(); //"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequency").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    }
  
    trainData.ref().push(newTrain); //pushes to firebase
  
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  
    return false;
  })
  
  trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var trainTime = snapshot.val().trainTime;
    // var timeArray = trainTime.split(":");
    // var processTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    // var maxValue =  moment.max(moment(), trainTime);
    // var remainder = moment.unix(trainTime).diff(moment(),"minutes")%frequency;
    // var minutes = frequency - remainder;
    // var arrival = moment().add(minutes,"m").format("hh:mm A");
    // if (maxValue === processTime) {
    //   arrival = processTime.format("hh:mm A");
    //   minutes = processTime.diff(moment(),"minutes");
  
    }
  
    var timeArray = trainTime.split(":");
    var processTime = moment()
      .hours(timeArray[0])
      .minutes(timeArray[1]);
    var maxMoment = moment.max(moment(), processTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === processTime) {
      tArrival = processTime.format("hh:mm A");
      tMinutes = processTime.diff(moment(), "minutes");
    }
  
    else {
      
      var differenceTimes = moment().diff(processTime, "minutes");
      var tRemainder = differenceTimes % frequency;
      tMinutes = frequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
  
  
    $("#timeTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>")
  });
  
  //assemble object with variables
  // use firebase to push to 