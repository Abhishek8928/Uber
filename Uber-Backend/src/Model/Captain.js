const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt')

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
  role:{
    type:Number,
    default:1
  },
  password:{
    type:String,
  },
  vehicleInfo: {
    number: {
      type: String,
      unique: true,
    },
    color: {
      type: String,
    },
    type: {
      type: String,
      enum: ["auto", "car", "bike"],
    },
    capacity: {
      type: Number,
      min: 1,
      max: 7
    },
  },
  emailId: {
    type: String,
    required: true,
    unique:true,
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


captainSchema.methods.generateToken = function () {
  const captainId = this._id;
  const token = jwt.sign(
    {
      captainId,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
};

captainSchema.methods.encryptPassword = async function () {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(this.password, saltRounds);

  return hashedPassword;
};
captainSchema.methods.verifyPassword = async function (
  captainInputPassword,
  storedPassword
) {

 
  const isValid = await bcrypt.compare(captainInputPassword, storedPassword);

  return isValid;
};

module.exports = mongoose.model("Captain" ,captainSchema);