navigator.webkitGetUserMedia(
  {
    video: true,
    audio: false
  },
  function(stream) {
    var Peer = require("simple-peer");
    var peer = new Peer({
      initiator: location.hash === "#init",
      trickle: false,
      stream: stream
    });

    peer.on("signal", function(data) {
      document.getElementById("yourId").value = JSON.stringify(data);
    });

    document.getElementById("connect").addEventListener("click", function() {
      var otherID = JSON.parse(document.getElementById("otherID").value);
      peer.signal(otherID);
    });

    document.getElementById("send").addEventListener("click", function() {
      if (document.getElementById("message"))
        var Message = document.getElementById("message").value;
      peer.send(Message);
    });

    peer.on("data", function(data) {
      document.getElementById("messages").textContent += data + "\n";
    });

    peer.on("stream", function(stream) {
      var video = document.createElement("video");
      document.body.appendChild(video);
      video.srcObject = stream;
      video.play();
    });
  },
  function(err) {
    console.log(err);
  }
);
