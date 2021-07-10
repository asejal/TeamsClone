const socket = io("/");

// get elements from room.ejs for use
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const messages = document.querySelector(".messages");
const userList = document.getElementById("users");
myVideo.muted = true;

//define new peer
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
});

//get userName from user
var user = prompt("Enter your name");
//set user to Anonymous if no name specified in prompt
if (user === null || user.length === 0) {
  user = "Anonymous";
}

//keep record of users who joined room after this user
const peers = {};

//start video stream
let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", ({ userID, users }) => {
      setTimeout(function () {
        connectToNewUser(userID, stream, users);
      }, 2500);
    });

    //create message from bot
    socket.on("mssg", (mssgtext) => {
      console.log(mssgtext);
      messages.innerHTML =
        messages.innerHTML +
        `<div class="bot__message">
            <b><i class="far fa-user-circle"></i></b>
            <span>${mssgtext}</span>
        </div>`;
    });

    socket.on("user-disconnected", (userID) => {
      console.log("New User Disconnected");
      //close peer connection
      if (peers[userID]) {
        console.log("Closing peer connection");
        peers[userID].close();
      }
    });

    //output room users
    socket.on("roomUsers", ({ roomID, users }) => {
      outputUsers(users);
    });

    //create message when user presses enter
    let text = $("input");
    $("html").keydown((e) => {
      if (e.which == 13 && text.val().length !== 0) {
        console.log(text.val());
        socket.emit("message", text.val());
        text.val("");
      }
    });

    $(document).ready(function () {
      //toggle between light and dark modes on button click
      $("button.mode-switch").click(function () {
        $("body").toggleClass("dark");
      });

      //toggle between pause/play EasyTalk mode which hides/unhides main meeting controls
      $("button.easyTalk-switch").click(function () {
        $("body").toggleClass("easyTalk");
      });
    });

    //create user message in formatted manner
    socket.on("createMessage", (message) => {
      const div = document.createElement("div");
      div.classList.add("message");
      div.innerHTML = `<p class="meta">${
        message.userName === user ? "me" : message.userName
      }<span>${message.time}</span></p><p class = "text">${message.text}</p>`;
      messages.appendChild(div);
      scrollToBottom();
    });
  });

//join room when peer connection is opened
peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, user);
});

const connectToNewUser = (userID, stream, users) => {
  const call = peer.call(userID, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    console.log("In close call of connectToNewUser");
    video.remove();
  });
  peers[userID] = call;
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

//scroll chat to bottom
const scrollToBottom = () => {
  let d = $(".main__chat_window");
  d.scrollTop(d.prop("scrollHeight"));
};

/*leave call after confirmation
---------------------------------------------
                    BUG
---------------------------------------------

DESCRIPTION
----------
Due to current implementation, peers array only stores information for users who joined after current user
As a result, when peer connection is closed, the users who joined before current user who is leaving still show
the frozen video after this user has left

EXPLANATION
-----------
Due to implementation similar to this tutorial:
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/End_a_call
The warning towards the end of this page also applies here. 
The peers array does not have information for users who joined before current user and thus on leaving the call,
they still show the frozen video as their videos could not be removed.

Suppose user A joins a room followed by user B followed by user C
When user B leaves the call, user C shows 2 videos : their own and that of user A
However, user A still shows 3 videos : their own, that of user C and frozen video of user B who has already left

Works when all users leave in the order that they joined
*/
const leaveCall = () => {
  if (confirm("Are you sure you want to leave this call?")) {
    console.log("Leaving call");
    window.location.href = "/";
  }
};

//mute/unmute user
const muteUnmute = () => {
  console.log(user);
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

//change UI on mute for good UX
const setMuteButton = () => {
  const html = `<i class="fas fa-microphone"></i><span>Mute</span>`;
  document.querySelector(".main__mute_button").innerHTML = html;
};

//change UI on unmute for good UX
const setUnmuteButton = () => {
  const html = `<i class="unmute fas fa-microphone-slash"></i><span>Unmute</span>`;
  document.querySelector(".main__mute_button").innerHTML = html;
};

//switch user's video on or off
const playStop = () => {
  let vidOn = myVideoStream.getVideoTracks()[0].enabled;
  if (vidOn) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

//change UI on play video for good UX
const setPlayVideo = () => {
  const html = `<i class="stop fas fa-video-slash"></i><span>Play Video</span>`;
  document.querySelector(".main__video_button").innerHTML = html;
};

//change UI on stop video for good UX
const setStopVideo = () => {
  const html = `<i class="fas fa-video"></i><span>Stop Video</span>`;
  document.querySelector(".main__video_button").innerHTML = html;
};

//invite more people to call using rooom link
const inviteToCall = () => {
  const room_url = window.location.href;
  copyToClipboard(room_url);
  alert(
    "Room Link Copied to Clipboard!\nShare copied URL to Invite More People\nURL: " +
      room_url
  );
};

//copy room link to clipboard
const copyToClipboard = (textt) => {
  var tbox = document.createElement("textarea");
  document.body.appendChild(tbox);
  tbox.value = textt;
  tbox.select();
  document.execCommand("copy");
  document.body.removeChild(tbox);
};

//show current participants in call
const showParticipants = () => {
  const list = document.getElementsByClassName("participant-sidebar")[0];
  if (list.style.display === "none") {
    list.style.display = "flex";
  } else {
    list.style.display = "none";
  }
};

//show chat and chat messages in call
const chatShow = () => {
  const chat = document.getElementsByClassName("main__right")[0];
  console.log(chat);
  if (chat.style.display === "none") {
    chat.style.display = "flex";
  } else {
    chat.style.display = "none";
  }
};

//hide/unhide Main Controls for EasyTalk Mode
const controlShow = () => {
  const chat = document.getElementsByClassName("main__controls")[0];
  if (chat.style.display === "none") {
    chat.style.display = "flex";
  } else {
    chat.style.display = "none";
  }
};

//List usernames of users in call in participant area
const outputUsers = (users) => {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.userName}</li>`)
    .join("")}`;
};

//function to send email invite to person simply by entering their gmail address when prompted
const emailInvite = () => {
  var receiverGmail = prompt(
    "Enter gmail ID for the person you want to invite to this call:"
  );
  console.log(user);
  socket.emit("sendInvite", receiverGmail, window.location.href, user);
};
