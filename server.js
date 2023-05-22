const express = require('express');
const admin = require('firebase-admin');

const app = express();

const serviceAccount = require('./chat-app-d751d-firebase-adminsdk-v2raf-65241eb122.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/users', (req, res) => {
    const usersRef = db.collection('users');
    
    usersRef.get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        res.json(users);
      })
      .catch((error) => {
        console.log('Error getting users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
      });
  });

  app.get('/chat', (req, res) => {
    const chatRef = db.collection('chat');
    
    chatRef.get()
      .then((snapshot) => {
        const chats = [];
        snapshot.forEach((doc) => {
          chats.push({ id: doc.id, ...doc.data() });
        });
        res.json(chats);
      })
      .catch((error) => {
        console.log('Error getting Chats:', error);
        res.status(500).json({ error: 'Failed to retrieve chats' });
      });
  });

    const PORT = 8000; // Change the port number as needed

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

