var mongoose = require('mongoose');


var notificationSchema = new mongoose.Schema({
    poster_username         :   {
                                    type:String,
                                    default:'NA',
                                    required:true
                                },
    interactor_username     :   {
                                    type:String,
                                    default:'NA',
                                    required:true
                                },
    interactor_profilePic   :   {
                                    type:String,
                                    default:'NA',
                                    required:true
                                },
    interaction_type        :   {
                                    type:String,
                                    default:'NA',
                                    required:true
                                },
    notificationViewed      :   {
                                    type:Boolean,
                                    default:false
                                },
    timestamp       :   {
                            type:String,
                            default:'NA',
                            required:true
                        },
    postId          :   {
                            type:String,
                            default:'NA'
                        },
    postDescription :   {
                            type:String,
                            default:'NA'
                        },
    taggedUsername :   {
                            type:String,
                            default:'NA'
                        }
});

module.exports = mongoose.model("notifications",notificationSchema)