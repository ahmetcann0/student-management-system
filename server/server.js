const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5010;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'students',
    password: '', 
    port: 5432,
});



// Test the connection 
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected', res.rows[0]);
    }
});

// Endpoint to add a user
app.post('/add_user', async (req, res) => {
    const { name, email, age, gender } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO student_details (name, email, age, gender) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, age, gender]
        );
        res.json({ success: 'Student added successfully', student: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Something unexpected has occurred: ' + err.message });
    }
});

// Endpoint to get all students
app.get('/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM student_details');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// Endpoint to get a student according to id
app.get('/get_student/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM student_details WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); 
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Endpoint to update a student
app.put('/update_student/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, age, gender } = req.body;
    try {
        const result = await pool.query(
            'UPDATE student_details SET name = $1, email = $2, age = $3, gender = $4 WHERE id = $5 RETURNING *',
            [name, email, age, gender, id]
        );
        if (result.rows.length > 0) {
            res.json({ success: 'Student updated successfully', student: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// Endpoint to add a user
app.delete('/delete_user/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM student_details WHERE id = $1 RETURNING *',
            [id]
        );
        res.json({ success: 'Student deleted successfully', student: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Something unexpected has occurred: ' + err.message });
    }
});






app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
