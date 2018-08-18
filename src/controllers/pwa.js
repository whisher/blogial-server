'use strict';
const webpush = require('web-push');
const fakeDatabase = [];

exports.subscription = (req, res, next) => {
  const subscription = req.body;
  const len = fakeDatabase.push(subscription);
  res.status(200).json(fakeDatabase[len - 1]);
};

exports.notification = (req, res, next) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png'
    }
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload))
    );
  });
  Promise.all(promises).then(() => res.sendStatus(200));
};
