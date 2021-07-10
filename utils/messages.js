//load moment.js module to format time at which message was sent
const moment = require("moment");

/*format metadata of message:
    1. userName of user who sent the message
    2. text content of the message
    3. time at which message was sent
*/
const formatMessage = (userName, text) => {
  return {
    userName,
    text,
    time: moment().format(" dddd, D MMMM'YY [at] h:mm a"),
  };
};

//export function for use in server
module.exports = formatMessage;
