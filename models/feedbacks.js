import mongoose, { Schema, model, models } from "mongoose";

const FeedBackScehma = new Schema({
  property_listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyListing",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  feedback: {
    type: String,
    required: true,
    validate: { validator: (feedback) => feedback.length > 3 },
  },
});

// Create Mongoose model
const Feedbacks = models.Feedbacks || model("Feedbacks", FeedBackScehma);

export default Feedbacks;
