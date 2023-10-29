const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const record = await User.findOne({ email });

    if (!record || record.password !== password) {
        return res.status(400).json({ success: false, message: 'Invalid Creadentials' });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: record._id, email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return res.status(200).json({ success: true, token })
}

exports.logOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Signout success",
    });
};

exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body
    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(409).json({ success: false, message: "Email Already Exits.Please use other." })
    }
    const record = new User({ name, email, password, phone });

    await record.save();

    return res.status(200).json({ sucess: true, message: 'User Regestered Successfuly' })


};

exports.authMiddleware = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    console.log('auth', authorizationHeader, req.headers)
    if (authorizationHeader) {
        // The 'Authorization' header typically contains the token in the format "Bearer <token>"
        const token = authorizationHeader.split(' ')[1]; // Extract the token part
        console.log('token', token)
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) return res.status(403).json({ sucess: false, message: 'Token Expired.Login Again' });
            const user = await User.findById(data._id);
            console.log('user', user)
            req.profile = user;
            next();
        });

    }

};