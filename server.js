// Importing dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// Configuring environment variables
dotenv.config();

// Creating a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Testing the connection
db.connect((err) => {
    if (err) {
        return console.log("Error connecting to the database: ", err)
    }
    console.log("Successfully connected to MySQL:", db.threadId)
})

// View engine setup - to use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Retrieve all patients from the patients table
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM Patients";
    db.query(getPatients, (err, data) => {
        if (err) {
            return res.status(500).send("Failed to get patients");
        }
        // Render the 'patients.ejs' file and pass 'patients' data
        res.render('patients', { patients: data });
    })
})

// Retrieve all providers from the providers table
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM Providers";
    db.query(getProviders, (err, data) => {
        if (err) {
            return res.status(500).send("Failed to get providers");
        }
        res.render('providers', { providers: data });
    });
});

// Filter patients by First Name
app.get('/get-patients-by-name', (req, res) => {
    const getPatientsByName = "SELECT first_name FROM Patients";
    db.query(getPatientsByName, (err, data) => {
        if (err) {
            return res.status(500).send("Failed to get patients by name");
        }
        // Render the 'patients-by-name.ejs' file and pass 'patients' data
        res.render('patients-by-name', { patients: data });
    })
})

// Retrieve all providers by their specialty
app.get('/get-providers-by-specialty', (req, res) => {
    const getProvidersBySpecialty = "SELECT provider_speciality FROM Providers";
    db.query(getProvidersBySpecialty, (err, data) => {
        if (err) {
            return res.status(500).send("Failed to get providers");
        }
        // Render the 'providers-by-specialty.ejs' file and pass 'providers' data
        res.render('providers-by-specialty', { providers: data });
    })
})

// Listen to the server
app.listen(3300, () => {
    console.log(`Server is running on http://localhost:3300`)
})
