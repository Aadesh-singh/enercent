var mongoose    =  require("mongoose");

var userAuthSchema = new  mongoose.Schema({
email                   :   {
                                type:String,
                                unique:true
                            },
username                :   {
                                type:String,
                                unique:true
                            },
password                :   String,
timestamp               :   String
});

module.exports = mongoose.model("UserAuth",userAuthSchema);
