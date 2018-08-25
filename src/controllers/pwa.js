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
      subscriptions.forEach(subscription => {
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload))
          .then((response) => {
            console.log('Status : ' + response.statusCode);
            console.log('Headers : ' + response.headers);
            console.log('Body : ' + JSON.stringify(response.body));
          })
          .catch((error) => {
            console.log('Status : ' + error.statusCode);
            console.log('Headers : ' + JSON.stringify(error.headers));
            console.log('Body : ' + JSON.stringify(error.body));
          });
      });
    }).catch(error => {
      res.status(500).json(error);
    });
};
