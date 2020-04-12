

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
var img = document.querySelector('#screenshot-img');

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log('Available input and output devices:', deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
  } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
  }
}
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
  });
}
const audioSource = audioSelect.value;
const videoSource = videoSelect.value;
const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
};
return navigator.mediaDevices.getUserMedia(constraints).
then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  audioSelect.selectedIndex = [...audioSelect.options].
  findIndex(option => option.text === stream.getAudioTracks()[0].label);
  videoSelect.selectedIndex = [...videoSelect.options].
  findIndex(option => option.text === stream.getVideoTracks()[0].label);
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.error('Error: ', error);
}

var canvas = document.createElement('canvas');

function screenshot(numero) {
    if (numero == 1) {
        if (videoElement.style.display == "none") {
            videoElement.style.display = "block";
            img.style.display = "none";
            document.getElementById("screenshot-ok").style.display = "none";
        }else{
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            canvas.getContext('2d').drawImage(videoElement, 0, 0);
            // Other browsers will fall back to image/png
            img.src = canvas.toDataURL('image/webp');
            img.style.display = "block";
            videoElement.style.display = "none";
            document.getElementById("screenshot-ok").style.display = "block";
            
        }        
    }else{
        document.getElementById("img_user_profile").src = canvas.toDataURL('image/webp');
        window.location.href = "#perfil_page";
        videoElement.style.display = "block";
        img.style.display = "none";
        document.getElementById("screenshot-ok").style.display = "none";
    }    
}
