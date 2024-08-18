const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { CreateSuccess } = require("../utils/success.js");
const { CreateError } = require("../utils/error.js");
const jwtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserToken = require("../models/UserToken.model.js");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body.credentials;
        const user = await User.findOne({ email });

        if (!user) return next(CreateError(404, "User not found"));

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return next(CreateError(400, "Wrong password"));

        const token = jwtoken.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        user.token = token;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: "Login successful",
            data: { user }
        });
    } catch (error) {
        next(CreateError(500, error.message));
    }
};


const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return next(CreateError(400, "User already exists"));

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(CreateSuccess(201, "User created successfully", newUser));
    } catch (error) {
        next(CreateError(500, error.message));
    }
};

const sendEmail = async (req, res, next) => {
 const email = req.body.email;
 const user = await User.findOne({ email: {$regex: '^' + email + '$', $options: 'i'} });
 if (!user) return next(CreateError(404, "User not found"));
 const payload = {
     email : user.email
 } 
 const expiryTime = 300;
 const token =jwtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});
 const newToken = new UserToken(
    {
        userId: user._id,
        token: token,
    }
 );
 const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
 });
 let mailDetails = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Link",
    html: `
    <table border="0" cellpadding="0" cellspacing="0" width="560" align="center" style="font-family: sans-serif, Arial, Tahoma; background: white; border: 1px solid rgb(232, 233, 234);">
    <tbody>
    <tr>
    <td style="text-align: center; vertical-align: middle; height: 80px; border-bottom: 1px solid rgb(232, 233, 234);" valign="middle">
     <a href="${process.env.LIVE_URL}" target="_blank">
     <img src="https://drive.google.com/file/d/1JqP2S9Mvx7KvCyYrcMfeimwGgrf68o1S/view?usp=sharing" border="0" class="CToWUd" data-bit="iit">
     </a> 
     </td>
     </tr>
     <tr>
     <td valign="top" style="padding: 40px; font-family: sans-serif, Arial, Tahoma; font-size: 13px; color: rgb(82, 82, 82); line-height: 18px;"><div style="font-size: 21px; line-height: normal; margin: 0px 0px 10px; color: black;"> 
     Réinitialiser votre mot de passe</div> Vous recevez cet e-mail parce que vous avez demandé une réinitialisation de mot de passe pour votre compte Hotjar.
     <br><br> Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe&nbsp;:<br> 
     <span class="gmail-notranslate">
     <a href="${process.env.LIVE_URL}/reset-password/${token}" target="_blank">
     Click here to reset your password
     </a>
     </span>
     <br><br> Salutations,<br> 
     </td>
     </tr>
     </tbody>
    </table>    
    `,
 }

 emailTransporter.sendMail(mailDetails,async(err, data) => {
    if (err) {
     return next(CreateError(500, "Error sending email"));
    } else {
     await newToken.save();
      return res.status(200).json(CreateSuccess(200, "Email sent successfully"));

    }
 })
}

const resetPassword= async (req, res, next) => {
    console.log("reseting password", req.body.token, req.body.password);
const token = req.body.token;
const newPassword = req.body.password;
jwtoken.verify(token, process.env.JWT_SECRET, async(err, data) => {
    if(err) {
        return next(CreateError(500, "Reset link is expired"));
    } else {
        const response = data; 
        console.log("response", response);
        const user = await User.findOne({email : {$regex: '^' + response.email + '$', $options: 'i'}});
        if(!user) return next(CreateError(404, "User not found"));
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        try {
            user.password = hashedPassword;
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { password: hashedPassword },
                { new: true }
            );
            return res.status(200).json(CreateSuccess(200, "Password reset successfully"));
        } catch (error) {
            return next(CreateError(500, "somthing went wrong while updateing password"));
        }
    }
});
}

  module.exports = {
    login,
    register,
    sendEmail,
    resetPassword
  }