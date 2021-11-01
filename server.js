const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '노원구청',
        'content': '주민등록증',
        'date': '2021.05.05',
        'expire': '2023.5.6'
        },
        {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '도로교통공단',
        'content': '운전면허증',
        'date': '2021.06.04',
        'expire': '2024.2.9'
        },
        {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '서울여자대학교',
        'content': '학생증',
        'date': '2021.10.10',
        'expire': '2025.3.5'
        }
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));