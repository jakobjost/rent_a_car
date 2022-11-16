const User = require("./userModel");

exports.registerNewUser = async (req, res) => {
    try {
        let uporabnik = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email
        })
        uporabnik.password = await uporabnik.hashPassword(req.body.password);
        let createdUser = await uporabnik.save();
        res.status(200).json({
            msg: "Nov uporabnik registriran v bazo!",
            data: createdUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.loginUser = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let uporabnik = await User.findOne({
            email: login.email
        });
        //check if user exit
        if (!uporabnik) {
            res.status(400).json({
                type: "Not Found",
                msg: "Napačno vnešeni podatki!"
            })
        }
        let ujemanje = await uporabnik.compareUserPassword(login.password, uporabnik.password);
        if (ujemanje) {
            let token = await uporabnik.generateJwtToken({
                user: uporabnik
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: uporabnik
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Napačno vnešeni podatki!"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.defineDummyData = async (req, res) => {
    res.json({
        message: "Pozdrav iz user-data!"
    })
}