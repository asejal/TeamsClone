//make users array to keep track of all users currently using Teams Clone
const users = [];

//save data (userID, userName and room ID) for user who just joined
const userJoined = (userID, userName, roomID) => {
  const user = { userID, userName, roomID };
  users.push(user);
  return user;
};

//remove user leaving from users array
const userLeaving = (userID) => {
  const index = users.findIndex((user) => user.userID === userID);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

//get all users in room with given roomID
const getRoomUsers = (roomID) => {
  return users.filter((user) => user.roomID === roomID);
};

//export functions for use in server
module.exports = {
  userJoined,
  userLeaving,
  getRoomUsers,
};
