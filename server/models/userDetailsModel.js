const { NullTemplateVisitor } = require("@angular/compiler");
var mongoose = require("mongoose");

var userDetailsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "normal"
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      default: "Not available",
    },
    nationality: {
      type: String,
      default: "Not available",
    },
    country_residence: {
      type: String,
      default: "Not available",
    },
    age: {
      type: Number,
      default: 0,
    },
    profile_picture: {
      type: String,
      default: "NA",
    },
    user_status: {
      type: String,
      default: "Hey there, I am using Joyn!",
    },
    passbase: {
      type: Boolean,
      default: false,
    },
    hederaAccountId: {
      type: String,
    },
    privateKey: {
      type: String,
    },
    token: {
      type: Number,
      default: 0,
    },
    passbaseID: {
      type: String,
      default: "No passbase ID found",
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
      },
    ],
    saved_playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    currentWallpaper: {
      type: String,
    },
    currentHomebutton: {
      type: String,
    },
    currentIcon: {
      type: String,
    },
    currentMusic:{
      type: String,
    },
    currentMusicWallpaper:{
      type: String,
    },
    currentMusicName:{
      type: String,
      default:""
    },
    stripeToken:{
      type: String,
    },
    stripeCurrency:{
      type: String,
    },
    stripeAmount:{
      type:Number,
    },
    purchasedWallpapers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    ],
    purchasedHomebuttons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    ],
    nftTokens: [
      {
        token: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NftToken",
        },
        amount: {
          type: Number,
          default: 0,
        },
      },
    ],
    propertyTokens: [
      {
        token: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PropertyNft",
        },
        name: {
          type: String,
          required: true
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


// userDetailsSchema.statics.nftPath = const UPLOAD_PATH = path.join('/uploads');
module.exports = mongoose.model("UserDetails", userDetailsSchema);
