'use strict';
const webpush = require('web-push');

const Subscription = require('../models/subscription');

exports.subscription = (req, res, next) => {
  const body = JSON.stringify(req.body);
  const subscription = new Subscription({
    subscriber: body
  });
  subscription.save()
    .then(data => {
      res.status(200).json(data);
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
      for (var i = 0, len = subscriptions.length; i < len; i++) {
        let subscription = subscriptions[i].subscriber;
        let pushSubscription = JSON.parse(subscription);
        promises.push(
          webpush.sendNotification(
            {
              endpoint: pushSubscription.endpoint,
              keys: pushSubscription.keys
            },
            JSON.stringify(notificationPayload))
            .then((response) => response)
        );
      }
      /*subscriptions.forEach(subscription => {
        const subscriber = JSON.parse(subscription).subscriber;
        console.log('subscriber',subscriber);
        promises.push(
          webpush.sendNotification(
            JSON.parse(subscription),
            JSON.stringify(notificationPayload))
            .then((response) => response)
            .catch(err=>console.log(err))
        );
      });*/
      return Promise.all(promises);
    }).then((response) => {
      res.status(200).json(response);
    }).catch(error => {
      res.status(500).json(error);
    });
};
