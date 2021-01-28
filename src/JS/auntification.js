function registerPasswordUser(email, displayName, password, photoURL) {
  var user = null;
  for (var i = 0; i < arguments.length; i++) {
    arguments[i] = arguments[i] ? arguments[i] : null;
  }
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      user = auth.currentUser;
      user.sendEmailVerification();
    })
    .then(function () {
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });
    })
    .catch(function (error) {
      console.log(error.message, 7000);
    });
  console.log('Validation link was sent to ' + email + '.');
}
