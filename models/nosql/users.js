const mongoose = require("mongoose");
const moongosePaginate = require("mongoose-paginate-v2")

const UserScheme = new mongoose.Schema(
  {

    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
      require: true,
    },
    name: {
      type: String,
      default: null,
      require: true,
    },
    lastName: {
      type: String,
      default: null,
      require: true,
    },
    photo: {
      type: String,
      default: null,
      require: true,
    },
    work: {
      type: String,
      default: null,
      require: true,
    },
    country: {
      type: String,
      default: null,
      require: true,
    },
    modality: {
      type: String,
      default: null,
      require: true,
    },
    experience: {
      type: String,
      default: null,
      require: true,
    },
    portfolio: {
      type: String,
      default: null,
      require: true,
    },
    favorites: [{
      type: mongoose.Types.ObjectId,
      default: null,
      require: true,
    }],
    has_badge: {
      type: Boolean,
      default: null,
      require: true,
    },
    social_media: {
      linkedin: {
        type: String,
        default: null,
        require: true,
      },
      git_hub: {
        type: String,
        default: null,
        require: true,
      },
      twitter: {
        type: String,
        default: null,
        require: true,
      },
    },
    skills: [Object],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(moongosePaginate)

module.exports = mongoose.model("users", UserScheme);
