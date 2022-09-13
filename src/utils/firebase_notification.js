const admin = require('firebase-admin')

sendNotificationToTopic = async (title, description, topic) => {
  try {
    const message = {
      notification: {
        title: title,
        body: description,
      },
      android: {
        notification: {
          imageUrl: 'https://foo.bar.pizza-monster.png',
        },
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
        return response
      })
  } catch (error) {}
}

module.exports = { sendNotificationToTopic }
