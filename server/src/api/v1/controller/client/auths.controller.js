const md5 = require('md5');
const Users = require('../../model/user');
const sendEmail = require('../../../../helper/sendEmail')
const generalOtp = require('../../../../helper/generateRandomString');
const VertifyEmail = require('../../model/vertify-email');


// [POST] api/v1/auth/register
module.exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExits = await Users.findOne({
            email: email,
            deleted: false
        })

        if (emailExits) {
            res.status(409).json({ message: "Email is Exits", code: 401 })
        } else {
            req.body.password = md5(req.body.password)
            const user = new Users(req.body)
            await user.save();
            res.status(201).json({
                message: "Register successfully",
                userId: user.id,
                code: 201
            })
            const otp = generalOtp.generateOtp(6);
            const objVrtify = {
                email: email,
                otp: otp,
                "expireAt": Date.now()
            }
            const vertifyEmail = new VertifyEmail(objVrtify);
            await vertifyEmail.save();

            const subject = "Your One-Time Password (OTP) for Account Verification";
            const html = `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                        color: #333;
                                        background-color: #f9f9f9;
                                        padding: 20px;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background: #ffffff;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .email-header {
                                        background: #4caf50;
                                        color: #ffffff;
                                        text-align: center;
                                        padding: 20px;
                                        font-size: 24px;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        text-align: left;
                                    }
                                    .email-body h3 {
                                        color: #4caf50;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 10px;
                                        background: #f1f1f1;
                                        color: #555;
                                        font-size: 12px;
                                    }
                                    .otp {
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #333;
                                        background: #f4f4f4;
                                        padding: 10px;
                                        border-radius: 8px;
                                        display: inline-block;
                                        margin: 10px 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="email-header">
                                        Account Verification
                                    </div>
                                    <div class="email-body">
                                        <p>Dear User,</p>
                                        <p>To complete the verification process for your account, please use the following One-Time Password (OTP):</p>
                                        <h3 class="otp">${otp}</h3>
                                        <p>This OTP is valid for the next <strong>3 minutes</strong>. For your security, please do not share this OTP with anyone.</p>
                                        <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                                        <p>Thank you,<br>The BoBeoFood Team</p>
                                    </div>
                                    <div class="email-footer">
                                        © 2025 BoBeoFood. All rights reserved.
                                    </div>
                                </div>
                            </body>
                            </html>
                            `;
            sendEmail.sendEmail(email, subject, html)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//[POST] api/v1/auth/login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            email,
            deleted: false
        })
        if (!user) {
            return res.status(400).json({ code: 400, message: "Email Not Correct" })
        }
        if (md5(password) !== user.password) {
            return res.status(401).json({ code: 401, message: "Password Not Correct" })
        }
        if (user.status === "inactive") return res.status(402).json({ code: 402, message: "Account Need Vertify Email" })

        res.status(200).json({
            token: user.token,
            code: 200,
            message: "Login Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/v1/auth/vertify-email
module.exports.vertifyEmail = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const optCorrect = await VertifyEmail.findOne({
            otp: otp
        })
        if (!optCorrect) {
            return res.status(400).json({ message: "OTP Not Correct" })
        }
        await Users.updateOne({
            email: email
        }, {
            status: "active"
        })
        res.status(201).json({
            code: 200,
            message: "Vertify Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/v1/auth/resend-otp
module.exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const vertifyExits = await VertifyEmail.findOne({
            email: email
        })
        if (vertifyExits) {
            return res.code(401).json({
                message: "Account is Vertify"
            })
        }
        const otp = generalOtp.generateOtp(6);
        const objVrtify = {
            email: email,
            otp: otp,
            "expireAt": Date.now()
        }
        const vertifyEmail = new VertifyEmail(objVrtify);
        await vertifyEmail.save();

        const subject = "Your One-Time Password (OTP) for Account Verification";
        const html = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #333;
                                    background-color: #f9f9f9;
                                    padding: 20px;
                                }
                                .email-container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background: #ffffff;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    overflow: hidden;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                }
                                .email-header {
                                    background: #4caf50;
                                    color: #ffffff;
                                    text-align: center;
                                    padding: 20px;
                                    font-size: 24px;
                                }
                                .email-body {
                                    padding: 20px;
                                    text-align: left;
                                }
                                .email-body h3 {
                                    color: #4caf50;
                                }
                                .email-footer {
                                    text-align: center;
                                    padding: 10px;
                                    background: #f1f1f1;
                                    color: #555;
                                    font-size: 12px;
                                }
                                .otp {
                                    font-size: 24px;
                                    font-weight: bold;
                                    color: #333;
                                    background: #f4f4f4;
                                    padding: 10px;
                                    border-radius: 8px;
                                    display: inline-block;
                                    margin: 10px 0;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="email-header">
                                    Account Verification
                                </div>
                                <div class="email-body">
                                    <p>Dear User,</p>
                                    <p>To complete the verification process for your account, please use the following One-Time Password (OTP):</p>
                                    <h3 class="otp">${otp}</h3>
                                    <p>This OTP is valid for the next <strong>3 minutes</strong>. For your security, please do not share this OTP with anyone.</p>
                                    <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                                    <p>Thank you,<br>The BoBeoFood Team</p>
                                </div>
                                <div class="email-footer">
                                    © 2025 BoBeoFood. All rights reserved.
                                </div>
                            </div>
                        </body>
                        </html>
                        `;
        sendEmail.sendEmail(email, subject, html)
        res.status(200).json({
            code: 200,
            message: "Resend Otp Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[POST] api/v1/auth/forgot-password
module.exports.forgot = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({
            email: email,
            status: "active"
        })
        if (!user) {
            return res.status(401).json({
                message: "Email Not Exits"
            })
        }
        res.status(200).json({ email, message: "Email is correct" })
        const otp = generalOtp.generateOtp(6);
        const objVrtify = {
            email: email,
            otp: otp,
            "expireAt": Date.now()
        }
        const vertifyEmail = new VertifyEmail(objVrtify);
        await vertifyEmail.save();
        const subject = "Your One-Time Password (OTP) for Account Verification";
        const html = `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                        color: #333;
                                        background-color: #f9f9f9;
                                        padding: 20px;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background: #ffffff;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .email-header {
                                        background: #4caf50;
                                        color: #ffffff;
                                        text-align: center;
                                        padding: 20px;
                                        font-size: 24px;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        text-align: left;
                                    }
                                    .email-body h3 {
                                        color: #4caf50;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 10px;
                                        background: #f1f1f1;
                                        color: #555;
                                        font-size: 12px;
                                    }
                                    .otp {
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #333;
                                        background: #f4f4f4;
                                        padding: 10px;
                                        border-radius: 8px;
                                        display: inline-block;
                                        margin: 10px 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="email-header">
                                        Account Verification
                                    </div>
                                    <div class="email-body">
                                        <p>Dear User,</p>
                                        <p>To complete the verification process for your account, please use the following One-Time Password (OTP):</p>
                                        <h3 class="otp">${otp}</h3>
                                        <p>This OTP is valid for the next <strong>3 minutes</strong>. For your security, please do not share this OTP with anyone.</p>
                                        <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                                        <p>Thank you,<br>The BoBeoFood Team</p>
                                    </div>
                                    <div class="email-footer">
                                        © 2025 BoBeoFood. All rights reserved.
                                    </div>
                                </div>
                            </body>
                            </html>
                    `;
        sendEmail.sendEmail(email, subject, html)
    } catch (error) {
        res.status(500).json(error)
    }
}

//[POST] api/v1/auth/otp-forgot
module.exports.otp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpExits = await VertifyEmail.findOne({
            email: email,
            otp: otp
        })
        if (!otpExits) {
            return res.status(400).json({ message: "OTP Not Correct" })
        }
        const user = await Users.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json({ message: "Email Not Correct" })
        }
        res.status(200).json({
            token: user.token,
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/v1/auth/reset
module.exports.reset = async (req, res) => {
    const token = req.body.token;
    const newPassword = md5(req.body.password);
    if (!token) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }
    await Users.updateOne({ token: token }, { password: newPassword })
    res.status(200).json({
        message: "Reset Password Successfully"
    })
}

//[GET] api/v1/auth/profile
module.exports.profile = async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const user = await Users.findOne({
            token: token
        }).select("email userName")
        res.status(200).json({
            code: 200,
            user,
            message: "Get Profile Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


