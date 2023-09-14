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
let id = 0;
const userLimit = 100;
class User {
  static userCount = 0;
  constructor(name) {
    if (User.userCount >= userLimit) {
      console.log("user limit reached, create user failed");
      return null;
    }
    this.id = "user" + id++;
    this.name = name;
    this.likedList = [];
    User.userCount++;
  }
  addLike(Song) {
    if (this.likedList.indexOf(Song) === -1) {
      this.likedList.push(Song);
      Song.addLike(this);
    }
  }
  removeLike(Song) {
    const deleteIndex = this.likedList.indexOf(Song);
    if (deleteIndex !== -1) {
      this.likedList.splice(deleteIndex, 1);
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
    Song.songcount++;
    Song.songList.push(this.name);
  }
  addLike(User) {
    this.likedBy.push(User.id);
  }
  get like() {
    return this.likedBy.length;
  }
  static getTopSong() {
    return Song.songList.sort((a, b) => b.like - a.like);
  }
}

// const user = new User("me");
// const song1 = new Song("song1");
// user.addLike(song1);
// console.log(song1.like);
// console.log(Song.getTopSong());
