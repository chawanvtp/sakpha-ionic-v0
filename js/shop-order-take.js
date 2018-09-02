
var config = {
	  apiKey: "AIzaSyDcKPDYBjWpmnB3HO2k30mTcicxoTkty0I",
	  authDomain: "sakpha-793a9.firebaseapp.com",
	  databaseURL: "https://sakpha-793a9.firebaseio.com",
	  projectId: "sakpha-793a9",
	  storageBucket: "sakpha-793a9.appspot.com",
	  messagingSenderId: "654158830966"
	};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$("#confirmOrderBtn").click(function(e) {
    alert( "Handler for .submit() called." );
  
});

// Call UID of user
/**
firebase.auth().onAuthStateChanged(function(user) {
 	alert(user.uid);
});

var orderRef = firebase.database().ref('items');

orderRef.on('child_added', function(data) {
  alert(data.key);
  alert(data.val());
});

orderRef.on('child_changed', function(data) {
  alert(data.val());
});
*/