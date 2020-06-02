const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

const faceDetector = new window.FaceDetector();
console.log(video, canvas, faceCanvas, faceDetector);

// populate video as an assync function with getUserMedia
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 600, height: 400 },
  });
  // set the video src to be the stream
  video.srcObject = stream;
  await video.play();
  // size the canvas to be the same size as the video using video.videoWidth, video.videoHeight

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  console.log(faces);
  // ask the browser when next animation frame happens to run something for us
  requestAnimationFrame(detect);
}
populateVideo().then(detect);
