  var config = {
    apiKey: "AIzaSyBTZt07hdrrP0kTEclzCgc4euA2f-wm9Iw",
    authDomain: "train-aa5fa.firebaseapp.com",
    databaseURL: "https://train-aa5fa.firebaseio.com",
    projectId: "train-aa5fa",
    storageBucket: "train-aa5fa.appspot.com",
    messagingSenderId: "289577914075"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click",function () {

  		var trainName = $("#train").val().trim()
  		var destination = $("#destination").val().trim()
  		var time = $("#time").val().trim()
  		var frequency = $("#frequency").val().trim()


  		var newInfo = {

  			trainName: trainName,
  			destination: destination,
  			time: time,
  			frequency: frequency,
  			info: [trainName,destination,frequency,"",""]



  		};

  		database.ref().push(newInfo)

  });

database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());

      console.log(snapshot.val().trainName);

      console.log(snapshot.val().destination);

      console.log(snapshot.val().time);

      console.log(snapshot.val().frequency);

      var newRow = $("<tr>");

  	  var tFrequency = snapshot.val().frequency
  	  var firstTime = snapshot.val().time

  	  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years")
  	  console.log(firstTimeConverted)

  	  var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"))

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




      var newArray = snapshot.val().info;
      newArray[3] = moment(nextTrain).format("hh:mm");
      newArray[4] = tMinutesTillTrain
      console.log(newArray);
      


      for (var i = 0; i < 5; i++) {

      var newData = $("<td>");
      newData.append(newArray[i]);
      newRow.append(newData);




}
    $("#my-table").append(newRow);

    });
