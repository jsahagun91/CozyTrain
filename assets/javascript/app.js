  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAVvmYrtKKhcq1_dwXfMvqn7dH-DhtqQDY",
    authDomain: "cozytrain-292e6.firebaseapp.com",
    databaseURL: "https://cozytrain-292e6.firebaseio.com",
    projectId: "cozytrain-292e6",
    storageBucket: "cozytrain-292e6.appspot.com",
    messagingSenderId: "904740569044"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    // Alert
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("hh:mm a");
  
    // // Calculate Next Arrival
    // // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    // console.log(empMonths);

    var diffTime = moment().diff(moment.unix(trainStart), "minutes");
		var timeRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFreq ;
		var minutes = trainFreq - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 

    // var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  
    // // Calculate the minutes away
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFreq + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>");
  });

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume train start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case