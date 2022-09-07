const admin = require('firebase-admin')

pushNotificationToTopic = async (req, res, next) => {
  const notificationTitle = req.body.title
  const notificationDescription = req.body.body
  const topic = req.body.topic

  try {
    const message = {
      notification: {
        title: notificationTitle,
        body: notificationDescription,
      },
      android: {
        notification: {
          imageUrl: 'https://foo.bar.pizza-monster.png'
        }
      },
      data: {
        type: 'warning',
        content: 'A new weather warning has been created!',
      },
      topic: topic,
    }
    await admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', response)
        res.json(response)
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
  } catch (e) {
    res.send('Notification sent failed')
  }
}

pushNotificationToSpecificDevice = async (req, res, next) => {
  const device_token =
    'epV-HYxrT5mzw9AMOkLS42:APA91bF2rlH-yhxKK92staalDl07NePJ_6IZCFLh5BOaR7ZCOSAnTTjkNKyOjC0o7wQ22NYZ-0zpIQi9qekIKU3HvWgEtA_yd2hKkUm02ajzJ8rAbMLIfGjn-0ekk3AnhiyaxqDx-Jh2'
  const device_token_2 =
    'dI95-L6aRBqG57g2Bu55jU:APA91bEYCus8G3rVLHKCcbgThUQ7ViuhWF4yUDTsAQ6kq4M66M0GJO5KFTyI-QUjyFvq4vsXUuYEynCnvc0RaspS9_OHOrHGujnF_ilVjEycb2UDZoIjM0bJmML2GdVTdpyR3YCySD-n'
  const message = {
    tokens: [device_token, device_token_2],
    notification: {
      title: 'Hello notification!',
      body: 'Coming successfully',
      imageUrl: 'https://my-cdn.com/extreme-weather.png',
    },
    apns: {
      payload: {
        aps: {
          'mutable-content': 1
        }
      },
      fcm_options: {
        image: 'https://foo.bar.pizza-monster.png'
      }
    },
    webpush: {
      headers: {
        image: 'https://foo.bar.pizza-monster.png'
      }
    }, 
    data: {
      type: 'warning',
      content: 'A new weather warning has been created!',
    },
  }
  await admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      console.log('Successfully sent message:', response)
      res.json(response)
    })
    .catch((error) => {
      console.log('Error sending message:', error)
    })
}

module.exports = { pushNotificationToTopic, pushNotificationToSpecificDevice }
