const mongoose = require("mongoose");

const { Schema } = mongoose;

const AdminSchema = new Schema({
 access:{
    type:Boolean,
    default:true,
 }
});

module.exports = mongoose.model("Admin", AdminSchema);