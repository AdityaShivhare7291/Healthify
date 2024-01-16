const mongoose = require("mongoose");

const { Schema } = mongoose;

const CoachSchema = new Schema({
 TrainingTypes:[String],

 qualification:[String],

});

module.exports = mongoose.model("Coach", CoachSchema);