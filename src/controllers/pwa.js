'use strict';
const webpush = require('web-push');

const Subscription = require('../models/subscription');

exports.subscription = (req, res, next) => {
  const subscription = new Subscription({
    subscriber: req.body
  });
  subscription.save()
    .then(data => {
      res.status(200);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.notification = (req, res, next) => {
  const notificationPayload = {
    notification: {
      title: 'Blogial new post',
      body: req.body.title,
      icon: 'assets/icons/icon-512x512.png'
    }
  };
  Subscription.find()
    .then(subscriptions => {
      const promises = [];
      subscriptions.forEach(subscription => {
        promises.push(
          webpush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload))
        );
      });
      Promise.all(promises).then(() => res.sendStatus(200));
    }).catch(error => {
      res.status(500).json(error);
    });
};
