const mongoose = require("mongoose");

const { Schema } = mongoose;

const CustomerSchema = new Schema({
 bodyParts:[String], //parts to be work on
 
 timeAllocation:{
    type:Number,
    required:true
 },// time in minutes

 foodType:[String],
 
 disease:[String],

 description: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);