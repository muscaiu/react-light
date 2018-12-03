const admin = require('firebase-admin');

var serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore()

var docRef = db.collection('tests');

//Get single
var getDoc = docRef.doc('test').get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

//Get multipe
// db.collection('tests').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });

//Set
// var setAda = docRef.doc('test').set({
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815
//   });

//Add
// var setAda = docRef.add({
//     first: 'Ada',
//     last: 'Lovelaceqqq',
//     born: 1815
//   });

//Update
// var setAda = docRef.doc('test').update({
//     first: 'update'
//   });

//Delete
// var setAda = docRef.doc('test').delete();

// Delete specific value in a document
// var FieldValue = require('firebase-admin').firestore.FieldValue;
// var docRef = db.collection('tests').doc('test');
// var removeBorn = docRef.update({
//   born: FieldValue.delete()
// });

//Listen realtime updates
// var observer = docRef.doc('test').onSnapshot(docSnapshot => {
//     console.log(`Received doc snapshot: ${docSnapshot}`);
//   }, err => {
//     console.log(`Encountered error: ${err}`);
//   });

//Listen to multiple documents in a collection
// var query = db.collection('tests').where('added', '==', 'foo')
// var observer = query.onSnapshot(querySnapshot => {
//     console.log(`Received query snapshot of size ${querySnapshot.size}`);
//   }, err => {
//     console.log(`Encountered error: ${err}`);
//   });

