
var admin = require("firebase-admin");
var fs = require('fs');

var serviceAccount = require("./elevatenv-dev-firebase-adminsdk-mwnnt-619c643194.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var postUrlList = {postList: ['/', '/contact', '/dispensary-finder', '/about-us', '/subscribe', '/topic/dispensary', '/topic/industry-connect', '/topic/trends', '/topic/the-grow', '/topic/cooking-with-cannabis', '/topic/medicine', '/topic/conversation', '/topic/blog']}
db.collection('posts').get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          data = doc.data();
          //console.log(data.shortname)
          postUrlList.postList.push('/post/'+ data.shortname)
        });
    })
    .then(function(data) {
      toFile = JSON.stringify(postUrlList);
      fs.writeFile("D:/webdev/elevateNV/elevatenv/build/postList.json", toFile, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    })
    .catch(function(err) {
        console.log('Error getting documents', err);
    });
