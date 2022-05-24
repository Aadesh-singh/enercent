const mongoose = require("mongoose");

/**
 * Give a list clean user
 * @param {mongoose.Model} flagContentModel flagContentModel
 * @param {mongoose.Model} flagUserModel    flagUserModel
 * @param {String} username - req.decode.username
 * @returns {Array<Array>}  [flagedContent,flagedUser]
 */
const filterFeed = async (flagContentModel, flagUserModel, username) => {
  const flagedContentArray = [];
  const blockedUserArray = [];

  //Fetching the the reported/flagged content by the user
  const [flagedContent,flagedUser] = await Promise.all([flagContentModel
    .find({ flaggerUsername: username }, "post_id")
    .lean() , flagUserModel
    .find({ flaggerUsername: username }, "user_id")
    .lean() ])
  // const flagedContent = await flagContentModel
  //   .find({ flaggerUsername: username }, "post_id")
  //   .lean();
  if (flagedContent.length > 0) {
    for (content of flagedContent) {
      flagedContentArray.push(String(content.post_id));
    }
  }

  //Fetching the the blocked users by the user
  // const flagedUser = await flagUserModel
  //   .find({ flaggerUsername: username }, "user_id")
  //   .lean();
  if (flagedUser.length > 0) {
    for (user of flagedUser) {
      blockedUserArray.push(String(user.user_id));
    }
  }

  return [flagedContentArray, blockedUserArray];
};


/**
 * Function to check if the provided category for a post is a valid category.
 * @param {string} category 
 * @returns {boolean} boolean value true is exists
 */
function checkForCategory(category) {
  category = category.toLowerCase()
  const categories = [
    "funny",
    "pets",
    "arts",
    "sports",
    "news",
    "all",
    "others",
  ];
  return categories.includes(category);
}


/**
 * Give a list of following user
 * @param {mongoose.Model} UserDetailsModel UserDetailsModel
 * @param {String} username - req.decoded.username
 * @returns {Array<Array> | null }  followingUser 
 */
const filterFollowings = async (Model,username) =>{
  const userDetails = await Model.findOne({username});
  if(userDetails)
  {
    const usersFollowing = [];
    
    userDetails.following.forEach((followingAccount) => {
      usersFollowing.push(followingAccount.toString());
    });
    return usersFollowing;
  }
  return null;
}

module.exports = { filterFeed, checkForCategory, filterFollowings };
