//mongodb+srv://xyzysh:<8B44C1Lm7MHABcrP>@asdf.apay7je.mongodb.net/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/forum')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/posts', posts);
app.use('/users', users);

app.post('/posts', auth, posts); // 로그인 확인 미들웨어 적용

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
