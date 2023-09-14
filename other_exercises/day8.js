/*
Last question
---
The new music streaming platform just has the right to include 50 songs to platform.
Currently, This platform provide song streaming, Favorite song functionality to the user as a MVP version (Minimum viable product) which open for 100 limited users.
When user open the song list. On each music will show how many like received from the users and there are no dislike.
Apart from that, Users able to see what song they like so they can listen only what they love.
The platform has been received event from the activity of users for favorite/like. Users able to like and unlike the song but user cannot unlike if user doesn't like the song before and there is no multiple like.
The platform plan to open just 1 month to collect which song need to be reconsider for the business and will start to collect from 1st until last day of testing.
---
Could you help design how the platform can fulfill this requirements?
---
Note:
You can assume platform has opened since 1 Sep 2023 until 30 Sep 2023
*/

const userLimit = 100;
class User {
  static userCount = 0;
  constructor(name) {
    if (User.userCount >= userLimit) {
      console.log("user limit reached, create user failed");
      return null;
    }
    this.name = name;
    this.likedList = [];
    User.userCount++;
  }
  //should take id instead
  addLike(Song) {
    if (this.likedList.indexOf(Song) === -1) {
      this.likedList.push(Song);
      Song.addLike(this);
    }
  }
  //should take id instead
  removeLike(Song) {
    const deleteIndex = this.likedList.indexOf(Song);
    if (deleteIndex !== -1) {
      this.likedList.splice(deleteIndex, 1);
      Song.removeLike(this);
    }
  }
}

const songLimit = 50;
class Song {
  static songCount = 0;
  static songList = [];
  constructor(name) {
    if (Song.songCount >= songLimit) {
      console.log("song limit reached, add song failed");
      return null;
    }
    this.name = name;
    this.likedBy = [];
    Song.songCount++;
    Song.songList.push(this);
  }
  addLike(User) {
    //should be id instead
    this.likedBy.push(User);
  }
  removeLike(User) {
    //should be id instead
    const deleteIndex = this.likedBy.indexOf(User);
    if (deleteIndex !== -1) {
      this.likedBy.splice(deleteIndex, 1);
    }
  }
  get like() {
    return this.likedBy.length;
  }
  static getTopSong() {
    const sortedList = Song.songList.sort((a, b) => b.like - a.like);
    //return this way to not flood output
    return sortedList.map((song) => `${song.name}: ${song.like} like(s)`);
  }
}

// const user1 = new User("me");
// const song1 = new Song("song1");
// user1.addLike(song1);
// console.log(song1.like);
// console.log(Song.getTopSong());

// const user2 = new User("user2");
// const song2 = new Song("song2");
// user1.addLike(song2);
// user2.addLike(song2);
// const song3 = new Song("song3");
// console.log(song1);
// console.log(song2);
// user1.removeLike(song2);
// console.log(song2);

// for (let i = 0; i < 53; i++) {
//   const song = new Song("test" + i);
// }
// console.log(Song.songList);

// console.log(Song.getTopSong());
