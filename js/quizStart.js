document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startQuizBtn");
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "questionsQuiz.html";
        });
    }
});