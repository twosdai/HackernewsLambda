const firebase = require('firebase')

module.exports.firebaseQuery = async () =>{
    firebase.initializeApp( {  appName : "HN News Feed",
    databaseURL: 'https://hacker-news.firebaseio.com/'})
  // Get a database reference to our posts
  const hackernewsCarrerPostings =   (currentItem)=>{
   const jobPosting =   firebase.app().database().ref("v0/item/" + currentItem.toString()).once("value")
    return jobPosting
  };
    const hackernewsJobIds = firebase.app().database().ref("v0/jobstories");
     const snap = await hackernewsJobIds.once("value")
    let arr = []
    const jobIds = {list:  snap.val()};
     for(let i = 0; i<jobIds.list.length;i++){
      const posting = await hackernewsCarrerPostings(jobIds.list[i])
      arr.push(posting.val())
    }
    return Promise.all(arr)
}