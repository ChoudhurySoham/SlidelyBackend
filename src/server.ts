import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.resolve(__dirname, 'db.json');

app.use(express.json());

// Endpoint to check if the server is running
app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

// Endpoint to submit form data
app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required.');
    }

    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database file.');
        }

        const submissions = data ? JSON.parse(data) : [];
        submissions.push(newSubmission);

        fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to database file.');
            }

            res.status(200).send('Submission successful.');
        });
    });
});

// Endpoint to read a specific submission by index
app.get('/read', (req: Request, res: Response) => {
    const { index } = req.query;

    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Invalid index.');
    }

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database file.');
        }

        const submissions = data ? JSON.parse(data) : [];
        const submissionIndex = Number(index);

        if (submissionIndex < 0 || submissionIndex >= submissions.length) {
            return res.status(404).send('Submission not found.');
        }

        res.status(200).json(submissions[submissionIndex]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
