import mongoose, { Schema, model, models } from "mongoose";

// Define Mongoose schema
const PropertyListingSchema = new Schema({
  // Add link to the user creating the post
  // same as foreign key in sql
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  property_title: {
    type: String,
    minlength: 5,
    required: true
  },
  property_description: {
    type: String,
    minlength: 30,
    required: true
  },
  listing_type: {
    label: String,
    value: String
  },
  property_type: {
    label: String,
    value: String
  },
  amenities: [{
    label: String,
    value: String
  }],
  furnished_status: {
    label: String,
    value: String
  },
  bathrooms: {
    type: Number,
    min: 0,
    max: 10
  },
  bedrooms: {
    type: Number,
    min: 0,
    max: 15
  },
  halls: {
    type: Number,
    min: 0,
    max: 3
  },
  construction_date: {
    type: Date,
    validate: {
      validator: function (date) {
        return !isNaN(new Date(date).getTime());
      },
      message: 'Please provide a valid date.'
    }
  },
  location: {
    coordinates: {
      type: [Number],
      validate: {
        validator: function (coords) {
          return coords.length === 2;
        },
        message: 'Please provide your location coordinates.'
      }
    },
    address: {
      type: Object
    }
  },
  media: {
    thumbnail: {
      type: String
    },
    images: {
      type: [String], // Adjust as per your file storage mechanism
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: 'Please provide at least one image.'
      }
    }
  },
  area: {
    type: Number,
    min: 50,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: function (phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
      },
      message: 'Invalid phone number format'
    }
  },
  price: {
    type: Number,
    min: 5000,
    required: true
  }
});

// Create Mongoose model
const PropertyListing = models.PropertyListing || model('PropertyListing', PropertyListingSchema);

export default PropertyListing
