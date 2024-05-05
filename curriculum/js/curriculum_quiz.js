class CurriculumQuiz {
  questionCounter = 0;
  numberOfQuestions = 0;
  questionData = [];
  score = 0;
  buttonNormalColor = "#663658";
  buttonCorrectColor = "#5b9c54";
  buttonWrongColor = "#9C2B2B";

  constructor(language, topic, isStandalone=false) {
    this.language = language;
    this.topic = topic;
    this.isStandalone = isStandalone;
    this.getPath();
    this.getDomElements();
    this.getSounds();
    this.activateButtons();
    this.refresh(this.language, this.topic);
  }

  getDomElements() {
    this.button = gCN("curriculumQuizButton");
    this.container = gCN("curriculumQuizContainer");
    // if (this.isStandalone) {
    //   this.button.style.position = "fixed";
    //   this.container.style.position = "fixed";
    // }
    this.quitX = gCN("curriculumQuizX");
    this.closeButton = gCN("curriculumQuizClose");
    this.title = gCN("curriculumQuizTitle");
    this.questionArea = gCN("curriculumQuizQuestion");
    this.answerButtons = gCNs("curriculumQuizAnswer");
    this.scoreArea = gCN("curriculumQuizScore");
    this.restartButton = gCN("curriculumQuizRestart");
  }

  getPath() {
    if (this.isStandalone) {
      this.path = "./";
    } else {
      this.path = "./curriculum/"
    }
  }

  getSounds() {
    this.correctSound = new Audio(`${this.path}sound/correct.mp3`);
    this.wrongSound = new Audio(`${this.path}sound/wrong.mp3`);
    this.perfectSound = new Audio(`${this.path}sound/fanfare.mp3`);
  }

  activateButtons() {
    this.button.addEventListener("click", () => {this.showQuiz();});
    this.closeButton.addEventListener("click", () => {this.showButton();});
    this.quitX.addEventListener("click", () => {this.showButton();});
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        if ((quiz_data[this.topic] && quiz_data[this.topic][this.language])) {this.showButton();}
      }
    });

    for (let button of this.answerButtons) {
      button.addEventListener("click", () => {
        if (button.innerHTML != "") {this.checkAnswer(button);}
      });
      this.restartButton.addEventListener("click", () => {this.restart();});
    }
  }

  refresh(language, topic) {
    this.language = language;
    this.topic = topic;
    if (!quiz_data[topic] || !quiz_data[topic][language]) {
      this.hideButton();
    } else {
      this.button.innerHTML = quizButton[language];
      this.restartButton.innerHTML = quizRestart[language];
      this.displayScore();
      this.closeButton.innerHTML = quizClose[language];
      this.questionData = quiz_data[topic][language];
      this.numberOfQuestions = this.questionData.length;
      const topicTitle = gCN("topicTitle");
      if (topicTitle) {
        this.title.innerHTML = topicTitle.innerHTML;
      }
      this.showButton();
      this.restart();
    }
  }

  loadQuestion() {
      if (this.questionCounter < this.numberOfQuestions) {
        const data = this.questionData[this.questionCounter];
        const questionText = `${this.questionCounter+1}.&nbsp;&nbsp;${data[0]}`;
        this.questionArea.innerHTML = `<span>${questionText}</span>`;
        this.solution = data[1];
        const answers = shuffle(data.slice(1));
        for (let i=0; i<3; i++) {
          this.answerButtons[i].innerHTML = answers[i];
        }
      } else {
        // this.questionArea.innerHTML = `That was it! :) You scored ${this.score} out of ${this.numberOfQuestions}.`;
        const result = quizResult[this.language]
        if (this.score < this.numberOfQuestions) {
          this.questionArea.innerHTML = `${result[0]} ${this.score} ${result[1]} ${this.numberOfQuestions}.`;
        } else {
          this.questionArea.innerHTML = result[2];
          this.perfectSound.play();
        }
        for (let i=0; i<3; i++) {
          this.answerButtons[i].innerHTML = "";
        }
      }
  }

  checkAnswer(button) {
    const moveOn = () => {
      button.style.backgroundColor = this.buttonNormalColor;
      this.questionCounter++;
      this.loadQuestion();
    }
    const answer = button.innerHTML;
    if (this.solution == answer) {
      this.score++;
      this.displayScore();
      button.style.backgroundColor = this.buttonCorrectColor;
      this.correctSound.play();
    } else {
      button.style.backgroundColor = this.buttonWrongColor;
      this.wrongSound.play();
    }
    setTimeout(moveOn, 300);
  }

  displayScore() {
    this.scoreArea.innerHTML = `${quizScore[this.language]}: ${this.score}`;
    // this.scoreArea.innerHTML = `Score: ${this.score}`;
  }

  restart() {
    this.questionCounter = 0;
    this.score = 0;
    this.displayScore();
    this.loadQuestion();
  }

  hideButton() {
    this.container.style.visibility = "hidden";
    this.button.style.visibility = "hidden";
  }

  showQuiz() {
    this.container.style.visibility = "visible";
    this.button.style.visibility = "hidden";
  }

  showButton() {
    this.container.style.visibility = "hidden";
    this.button.style.visibility = "visible";
  }

}

