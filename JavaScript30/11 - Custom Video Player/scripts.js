/*Get elements*/
const interface = document.querySelector(".player");
const video = interface.querySelector(".viewer");
const progress = interface.querySelector(".progress");
const progressBar = interface.querySelector(".progress__filled");
const playButton = interface.querySelector(".toggle");
const ranges = interface.querySelectorAll(".player__slider");
const skipping = interface.querySelectorAll(".player__button");
/*Make functions*/
function videoPlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function changeButton() {
  if (video.paused) {
    playButton.innerText = "►";
  } else {
    playButton.innerText = "❚ ❚";
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/*Event Listeners*/
playButton.addEventListener("click", videoPlay);
video.addEventListener("click", videoPlay);
video.addEventListener("play", changeButton);
video.addEventListener("pause", changeButton);
video.addEventListener("timeupdate", handleProgress);

skipping.forEach((skips) => skips.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
