var mongoose    =  require("mongoose");

var transactionSchema = new mongoose.Schema({
type                    :   {
                                type:String,
                                enum:["CREDIT","DEBIT"],
                            },
username               :{
                                type:String,
                                index:true,
                                required:true
                            },
transactionId          :   {
                                type:String,
                                default:"Not available"
                            },
token                   :   {
                                type:Number,
                                default:0
                            },
message                 :   {
                                type:String,
                                default:"Not available"
                            },
itemType                :   {
                                type:String,
                                default:"Not available"
                            },
itemId                  :   {
                                type:String,
                                default:"Not available"
                            },
date                    :  {
                                type:Date,
                                default:"Not available"
},
},{
    versionKey: false,
    timestamps: true,
  });

module.exports = mongoose.model("Transactions",transactionSchema);
