const express = require ('express');
const cors = require('cors');


const sequelize = require('./config/config.js');
const bodyParser = require('body-parser');
const userrouter = require('./Router/userrouter.js');
const path = require('path');
const app =express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  

// Serve static files from the "uploads/images" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.authenticate()
.then(()=>{console.log("Database connected successfully")})
.catch(error=>{
    console.log("failed to connect")
});

const port=8081
app.listen(port,()=>{
    console.log("server is running on :",port);
})

app.use('/api/v1/admin', userrouter);
