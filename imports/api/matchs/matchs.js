import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Matchs = new Mongo.Collection('matchs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tmatchs that are public or belong to the current user
  Meteor.publish('matchs', function matchsPublication() {
    return Matchs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'matchs.insert'(scoredOne, scoredTwo, round , time , day , timeTwo) {
    check(scoredOne, String);
    check(scoredTwo, String);
    check(round , String);
    check(time , String);
    check(day , String)
    check(timeTwo, String);


    // Make sure the user is logged in before inserting a tmatch


    Matchs.insert({
      scoredOne,
      scoredTwo,
      round,
      time,
      day,
      timeTwo,
      createdAt: new Date(),
      owner: this.userId,
    });
  },


  'matchs.setPrivate'(matchId, setToPrivate) {
    check(matchId, String);
    check(setToPrivate, Boolean);

    const match = Matchs.findOne(matchId);

    // Make sure only the tmatch owner can make a tmatch private
    Matchs.update(matchId, { $set: { private: setToPrivate } });
  },
'matchs.remove'(matchId) {
    check(matchId, String);
    const match = Matchs.findOne(matchId);
    Matchs.remove(matchId);
  },

});
