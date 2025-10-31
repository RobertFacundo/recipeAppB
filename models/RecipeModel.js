import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    externalId: {
        type: String,
        required: [true, 'External ID is mandatory'],
        unique: false
    },
    title: {
        type: String,
        required: [true, 'Recipe Title is mandatory']
    },
    imageUrl: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

