import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Por favor, introduce un email válido']
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory'],
        minLength: [6, 'Password must have at least 6 letters']
    },
    name: {
        type: String,
        trim: true,
        maxLength: [50, 'The name cannot exceed 50 letters']
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model('user', userSchema);

export default User;

