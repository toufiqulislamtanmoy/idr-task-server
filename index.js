const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
app.use(cors());
const port = 3001;

const db = new sqlite3.Database('./dua_main.sqlite');

app.get("/", (req, res) => {
    res.send("Sqlite is running")
})

app.get('/api/category', (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(rows);
    });
});
app.get('/api/sub-category/:cat_id', (req, res) => {
    const cat_id = req.params.cat_id;
    db.all(`SELECT * FROM sub_category WHERE cat_id = ?`, [cat_id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(rows);
    });
});

app.get('/api/dua/:cat_id', (req, res) => {
    const cat_id = req.params.cat_id;
    db.all(`SELECT * FROM dua WHERE cat_id = ?`, [cat_id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(rows);
    });
});


app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});