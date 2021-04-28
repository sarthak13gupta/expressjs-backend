const express = require("express");
const path = require('path');
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set static folder
app.use(express.static('public'));

//get
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});


//post
app.post('/user', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const number = req.body.number;
    const subject = req.body.subject;
    const nameRegexp = /^[a-zA-Z ]+$/;
    //console.log(nameRegexp.test(name));
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //console.log(emailRegexp.test(email));
    const numberRegexp = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    //console.log(numberRegexp.test(number));

    if (!nameRegexp.test(name))
        res.status(400).send('invalid name');
    else if (!numberRegexp.test(number))
        res.status(400).send('invalid contact no.');
    else if (!emailRegexp.test(email))
        res.status(400).send('invalid email');
    else
        res.status(200).send(
            `<b>Name: </b>${name}<br>
        <b>Email: </b>${email}<br>
        <b>Gender:</b>${gender}<br>
        <b>Contact No.:</b>${number}<br>
        <b>Subject:</b>${subject}`);
});

app.listen(3000, () => console.log("server is running on port 3000"));