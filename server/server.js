
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host: 
//     user: 
//     password: 
//     database: 
// });

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
