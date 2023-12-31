const facultyData = require("../models/faculty");
const studentData = require("../models/student");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");
const saltRounds = 12;
const TPCRC = 2001;
const admin = 1001;

const login = async (req, res) => {
    try {
        const emailid = req.body.email;
        const password = req.body.password;

        // if (emailid === "tprc") {
        //     if (password === "tprc") {
        //         token = createSecretToken(TPCRC);
        //         console.log(token);
        //         return res.status(200).json({
        //             msg: "TPRC login successfull",
        //             token: token,
        //             success: true,
        //         });
        //     } else {
        //         return res.status(403).json({ msg: "Incorrect Password" });
        //     }
        // }
        // if (emailid === "admin") {
        //     if (password === "admin") {
        //         token = createSecretToken(admin);
        //         console.log(token);
        //         return res.status(200).json({
        //             msg: "Admin login successfull",
        //             token: token,
        //             success: true,
        //         });
        //     } else {
        //         return res.status(403).json({ msg: "Incorrect Password" });
        //     }
        // }

        const facultyuser = await facultyData.findOne({ email: emailid });
        const studentuser = await studentData.findOne({ email: emailid });
        if (!(studentuser || facultyuser)) {
            return res.status(404).json({ msg: "User Not Found" });
        }
        const pass = req.body.password;
        let user;
        let token;
        if (studentuser) {
            user = studentuser;
            token = createSecretToken(studentuser._id);
        }
        if (facultyuser) {
            user = facultyuser;
            token = createSecretToken(facultyuser._id);
        }
        const hash = user.password;
        bcrypt.compare(pass, hash).then(function (result) {
            if (!result) {
                return res.status(403).json({ msg: "Invalid Password" });
            }
        });
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({
            user: user,
            token: token,
            message: "User logged in successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = { login };
