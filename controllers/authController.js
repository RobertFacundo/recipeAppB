import User from "../models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message:'Please, write an email and a password'});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:'User already exists with this email'});
        }

        const user = await User.create({
            name, 
            email,
            password
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'Success... you can now log in.'
            });
        }else{
            res.statsus(400).json({message:'Invalid user data'});
        }
    } catch (error){
        res.status(500).json({
            message:'server error',
            error: error.message
        });
    }
}