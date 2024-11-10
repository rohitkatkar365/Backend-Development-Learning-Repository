const usermodel = require("./../model/UserModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jsonwebtoken = require("jsonwebtoken");
const CustomError = require("./../Utils/CustomeError");

const signToken = (id) => {
    return jsonwebtoken.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.LOGIN_EXPIRE,
    });
};

exports.login = asyncErrorHandler(async (req, res, next) => {
    console.log("Login request received with:", req.body);
    
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Missing email or password");
        return next(new CustomError("Please enter email and password", 400));
    }

    const data = await usermodel.findOne({ email }).select('+password');
    if (!data) {
        console.log("No user found with this email");
        return next(new CustomError("Incorrect email or password", 400));
    }

    const isMatch = await data.comparePassword(password, data.password);
    if (!isMatch) {
        console.log("Incorrect password");
        return next(new CustomError("Incorrect email or password", 400));
    }

    const token = signToken(data._id);
    console.log("Login successful, token generated");
    res.json({
        status: "success",
        token,
        // data: { data },
    });
});

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await usermodel.create(req.body);
    const token = signToken(newUser._id);
    res.status(200).json({
        status: "success",
        token,
        data: { newUser },
    });
});

exports.getdata = asyncErrorHandler(async (req, res, next) => {
    const data = await usermodel.find();
    res.status(200).json({
        status: "success",
        data: { data },
    });
});

exports.deleteuser = asyncErrorHandler(async (req, res, next) => {
    const deletedData = await usermodel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        data: { deletedData },
    });
});
