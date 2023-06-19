const mongoose = require("mongoose")

const FavsSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Types.ObjectId,
      require: true
    },
    repositoriosId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    }]
  },
  {
    timestamps:true,
    versionKey:false,
  }
)



module.exports = mongoose.model("favs", FavsSchema)