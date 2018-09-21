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

const triggerPushMsg = (subscription, dataToSend) => {
  let subscriber = JSON.parse(subscription.subscriber);
  return webpush.sendNotification(subscriber, JSON.stringify(dataToSend))
    .catch((err) => {
      if (err.statusCode === 410) {
        return Subscription.findOneAndRemove({ _id: subscription._id});
      } else {
        console.log('Subscription is no longer valid: ', err);
      }
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
    .then((subscriptions) => {
      let promiseChain = Promise.resolve();
      for (let i = 0; i < subscriptions.length; i++) {
        let subscription = subscriptions[i];
        promiseChain = promiseChain.then(() => {
          return triggerPushMsg(subscription, notificationPayload);
        });
      }
      return promiseChain;
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
