import mongoose, { Schema, model, models } from "mongoose";

const FavouritesSchema = new Schema({
    property_listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyListing',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   
});

// Create Mongoose model
const Favourites = models.Favourites || model('Favourites', FavouritesSchema);

export default Favourites