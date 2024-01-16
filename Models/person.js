const mongoose = require("mongoose");

const { Schema } = mongoose;

const Person = new Schema({
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  name: {
    type:String,
    required:true
  },

  age: {
    type: Number,
    required: true,
  },

  address: 
    {
      house_no: {
        type: String,
        required: true,
      },
      Street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  

  userType: Number,// 1-coach and 2-customer & 3-admin

  contactDetails: [String],

  gender: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: true, //true means person is active & playing its role.
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  Coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
  },

  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },

  Admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
});

module.exports = mongoose.model("person", Person);
