const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: true }));

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email, password, mobile, address } = req.body;

    const query = `INSERT INTO users (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, email, password, mobile, address], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Registration successful. You may login now.' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});