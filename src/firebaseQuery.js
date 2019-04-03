const firebase = require('firebase')

module.exports.firebaseQuery = async () =>{
    firebase.initializeApp( {  appName : "HN News Feed",
    databaseURL: 'https://hacker-news.firebaseio.com/'})
  // Get a database reference to our posts based on an id
  const hackernewsCarrerPostings =   (currentItem)=>{
   const jobPosting =   firebase.app().database().ref("v0/item/" + currentItem.toString()).once("value")
    return jobPosting
  };
  // Get the id we need for job postings
    const hackernewsJobIds = firebase.app().database().ref("v0/jobstories");
     const snap = await hackernewsJobIds.once("value")
    let arr = []
    const jobIds = {list:  snap.val()};
    //Loop over each posting with the value
     for(let i = 0; i<jobIds.list.length;i++){
      const posting = await hackernewsCarrerPostings(jobIds.list[i])
      //Push results to an array each time
      arr.push(posting.val())
    }
    return Promise.all(arr)
}