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

exports.protect = asyncErrorHandler(async (req, res, next) => {
    // 1. Read the token and check if it exists
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith("Bearer")) {  // Ensure capitalization matches
        token = testToken.split(" ")[1];
    }

    // console.log(token);
    if (!token) {
        return next(new CustomError("You're Not Logged In", 401));
    }

    // 2. Validate the token
    let decodedToken;
    try {
        decodedToken = await jsonwebtoken.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return next(new CustomError("Invalid token. Please log in again.", 401));
    }

    // console.log(decodedToken);

    // 3. If the user exists
    const user = await usermodel.findById(decodedToken.id);
    if (!user) {
        const error = new CustomError("The User With Given Token Is Not Exist",401);
        next(error);
    }
    // 4. If the user changed password after the token is issued
    const isChanged = await user.isPasswordChanged(decodedToken.iat);
    if(isChanged){
        return next(new CustomError("The Password Is Changed Recently",401));
    }
    // 5. Allow user to access route
    req.user = user;
    next();
});

exports.restrict = (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            return next(new CustomError("You Do Not Have Permission To Perform aAn Action"),403);
        }
        next();
    }
};

exports.forgotpassword = asyncErrorHandler(async(req,res,next) =>{
    // 1. GET user based on posteed email
    const user = await usermodel.findOne({email:req.body.email});
    if(!user)
    {
        next(new CustomError("We could't find the user with given email"),404);
    }
    // 2.Generte a random reset token
    const restToken = user.createRestPassword();
    await user.save({validateBeforeSave:false});
    // 3. Send the token back to the user email
})

exports.passwordRest = (req,res,next) =>{

}