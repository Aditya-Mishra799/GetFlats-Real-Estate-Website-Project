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
        // validate: {
        //     validator: (value) => EnquirySchema.pick({phone: true}).parse({ phone: value }),
        //     message: (props) => props.reason.errors[0].message,
        // },
    },
    email: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value) => EnquirySchema.pick({email: true}).parse({ email: value }),
        //     message: (props) => props.reason.errors[0].message,
        // },
    },
    description: {
        type: String,
        // validate: {
        //     validator: (value) => {
        //         if (!value) return true;
        //         return EnquirySchema.pick({description: true}).parse({ description: value });
        //     },
        //     message: (props) => props.reason.errors[0].message,
        // },
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

// Create Mongoose model
const Enquiry = models.Enquiry || model('Enquiry', EnquiryModel);

export default Enquiry