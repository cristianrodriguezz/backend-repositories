const mongoose = require("mongoose")

const RepositoriesScheme = new mongoose.Schema(
  {
    name:{
      type: String,
      require: true
    },
    lastName:{
      type:String,
      require: true
    },
    photo:{
      type:String,
      require: true
    },
    work:{
      type:String,
      require: true
    },
    country:{
      type:String,
      require: true
    },
    modality:{
      type:String,
      require: true
    },
    experience:{
      type:String,
      require: true
    },
    portfolio:{
      type:String,
      require: true
    },
    favorite:{
      type:Boolean,
      require: true
    },
    has_badge:{
      type:Boolean,
      require: true
    },
    social_media:{
      linkedin:{
        type: String,
        require: true
      },
      git_hub:{
        type: String,
        require: true
      },
      twitter:{
        type: String,
        require: true
      },
    },
    skills:[String],
    userId:{
      type: mongoose.Types.ObjectId,
    }

  },
  {
    timestamps:true,
    versionKey:false,
  }
)



module.exports = mongoose.model("repositories", RepositoriesScheme)