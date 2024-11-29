const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value => /^[A-Za-z]+$/.test(value),
      message: props => `${props.value} is not valid; only alphabetic characters are allowed.`,
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value => /^[A-Za-z]+$/.test(value),
      message: props => `${props.value} is not valid; only alphabetic characters are allowed.`,
    },
  },
  vehicleInfo: {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["auto", "car", "bike"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: value => {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        throw new Error("Email is not valid.");
      }
    },
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    validate:function(value){
        if(!["active", "inactive"].includes(value)){
            throw new Error('value must be either active or inactive')
        }
    },
    default: "inactive"
  },
}, { timestamps: true });

module.exports = mongoose.model("Captain" ,captainSchema);