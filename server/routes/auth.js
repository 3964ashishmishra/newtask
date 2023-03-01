const express = require('express');
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT;


router.get("/", (req, res) => {
    res.json({
        name: "Ashish",
        roll_no: 11
    })
})

router.post('/register', (req, res) => {

    const {
        email,
        name,
        username,
        password
    } = req.body;

    if (!email || !name || !username || !password) {
        res.status(422).json({
            msg: "Please fill all the fields"
        })
    }

    User.findOne({
        $or: [{
            email: email
        }, {
            username: username
        }]
    }).then((userSaved) => {

        if (userSaved) {
            return res.json({
                msg: "User already registered"
            });
        }

        bcrypt.hash(password, 10).then((hashedpassword) => {
            const user = new User({
                email,
                name,
                username,
                password: hashedpassword
            })

            user.save()
                .then(
                    res.status(200).json({
                        msg: "User registeres sucessfully"
                    })
                )
                .catch((err) => {
                    console.log(err)
                })
        })


    })




})

router.post('/login', async (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(422).json({
            msg: "Please fill all the fields"
        });
    }

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        return res.status(422).json({
            msg: "User not registered till yet"
        });
    }

    const saveduser = await bcrypt.compare(password, user.password);

    if (!saveduser) {
        return res.status(200).json({
            msg: "Password not matched"
        });
    } else {
        const token = jwt.sign({
            _id: saveduser._id
        }, jwt_secret);
        return res.status(200).json({
            "jwtToken": token,
            msg: "User login sucessfully"
        });
    }

})


module.exports = router;