import mongoose, { Schema, model, models } from "mongoose";
import EnquirySchema from "./schema/EnquirySchema";

const EnquiryModel = new Schema({
    property_listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyListing',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => EnquirySchema.parse({ phone: value }),
            message: (props) => props.reason.errors[0].message,
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => EnquirySchema.parse({ email: value }),
            message: (props) => props.reason.errors[0].message,
        },
    },
    description: {
        type: String,
        validate: {
            validator: (value) => {
                if (!value) return true;
                return EnquirySchema.parse({ description: value });
            },
            message: (props) => props.reason.errors[0].message,
        },
    },
});

// Create Mongoose model
const Enquiry = models.Enquiry || model('Enquiry', EnquiryModel);

export default Enquiry