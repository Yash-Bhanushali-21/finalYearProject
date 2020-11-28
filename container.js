import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles.css";

function download(blob) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = URL.createObjectURL(blob);
  console.log(a.href);
  a.download = "test.wav";
  a.click();
}
async function sendAudioFile(file) {
  const formData = new FormData();
  formData.append('audio-file', file);
  const response = await fetch('http://localhost:3000/audioUpload', {
    method: 'POST',
    data: formData
  })
}
function MicContainer(props) {
  const handleRecord = (e) => {
    var device = navigator.mediaDevices.getUserMedia({ audio: true });
    var items = [];
    device.then((stream) => {
      var recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state === "inactive") {
          var blob = new Blob(items, { type: "audio/wav" });
          download(blob); //for verification
          var audio = document.getElementById("audio");
          var mainAudio = document.createElement("audio");
          mainAudio.setAttribute("controls", "controls");
          audio.appendChild(mainAudio);
          mainAudio.innerHTML =
            '<source src="' + URL.createObjectURL(blob) + '"type="video.wav"/>';
          console.log(URL.createObjectURL(blob));
        }
      };

      recorder.start();
      setTimeout(() => {
        recorder.stop();
      }, 5000);
    });
  };
  return (
    <div>
      <Container fluid>
        <Row>Audio Recorder</Row>
        <Row>
          <Col>
            <div className="audio" id="audio"></div>
          </Col>
          <Col>
            <Button onClick={handleRecord}>Record</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MicContainer;
