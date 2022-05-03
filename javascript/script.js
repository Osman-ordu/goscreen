const btnOpen = document.getElementById("open");
const btnClose = document.getElementById("close");
const video = document.getElementsByTagName("video")[0];
const questionButtons = document.getElementById("answer-buttons");
const tableScore = document.getElementById("table-score");
const valueGreen = document.getElementById("value-green");
const valueRed = document.getElementById("value-red");
let currentSecond, interval;
let times = melancholy.map(m => m.second);
let questionPrefix = "qm-";


video.onplay = function () {
    interval = setInterval(() => {
        currentSecond = parseInt(video.currentTime);
        if (times.includes(currentSecond)) {
            video.pause();
            showDialog();
        }
    }, 1000)
}
video.onpause = function () {
    interval = clearInterval(interval);
}
function showDialog() {
    const item = melancholy.find(q => q.second === currentSecond);
    const questionsDiv = document.getElementById("answer-buttons");
    let questionsHtml = "";
    item.questions.forEach(questionItem => {
        questionsHtml +=
            `<button onclick="questionClicked(this, ${item.id})" 
        id="${questionPrefix}${questionItem.id}"
        class="videoButton">
        ${questionItem.text}
        </button>`;
    }
    );
    buttonsShow();
    questionsDiv.innerHTML = questionsHtml;
    questionsDiv.className = "show";
    return
}
function questionClicked(elem, id) {
    const questionId = parseInt(elem.id.replace(questionPrefix, ""));
    const questionItem = melancholy.find(m => m.id === id).questions.find(m => m.id === questionId);
    if (questionItem.isRight) {
        elem.style.backgroundColor = "#00BD3C";
        elem.style.color = "white";
        counterGreen();
        video.play();
        buttonsHide();
        return
    }
    counterRed();
    video.play();
    elem.style.backgroundColor = "#C5002A";
    elem.style.color = "white";
    buttonsHide();
}
function buttonsHide() {
    setTimeout(function () {
        questionButtons.style.display = "grid";
        questionButtons.style.display = "none";
    }, 1200);
}
function buttonsShow() {
    questionButtons.style.display = "none";
    questionButtons.style.display = "grid";
}

btnOpen.addEventListener("click", on);
btnClose.addEventListener("click", off);

function on() {
    video.textTracks[0].mode = "showing";
}
function off() {
    video.textTracks[0].mode = "hidden";
}
video.onended = function () {
    tableScore.style.display = "inline-block";
}