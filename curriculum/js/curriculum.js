const curriculumBgColor = {
  main   : "#576499",
  dark   : "#46507a",
  darkest: "#343c5c",
  light  : "#7983ad"
}

class CurriculumButton {

  constructor() {
    this.dom = document.createElement("div");
    this.dom.classList.add("curriculumButton");
  }

  setContent(content) {
    this.dom.innerHTML = content;
  }

  setAction(action) {
    this.dom.addEventListener("click", () => {action();});
  }

  place(area) {
    this.area = area;
    this.area.appendChild(this.dom);
  }

  remove() {
    this.area.removeChild(this.dom);
  }

  highlight() {
    this.dom.style.backgroundColor = curriculumBgColor.main;
  }

  unHighlight() {
    this.dom.style.backgroundColor = curriculumBgColor.dark;
  }
}

class CurriculumMainButton extends CurriculumButton {
  constructor(owner, content, id) {
    super();
    this.setAction(() => owner.mainButtonAction(id));
    this.setContent(content);
  }
}

class CurriculumSubButton extends CurriculumButton {
  constructor(owner, content, id) {
    super();
    this.setAction(() => owner.subButtonAction(this, id));
    this.setContent(content);
  }
}

class CurriculumApp {
  currentTopic   = null;
  mainButtons = [];
  subButtons = [];
  infoButtons = [];
  path = "";

  constructor(language="eng", isStandalone = false) {
    this.isStandalone = isStandalone;
    this.setPath();
    this.getDomElements();
    this.quiz = new CurriculumQuiz(language, this.currentTopic, this.isStandalone);
    this.infoBox = new InfoBox(this.path);
    this.setLanguage(language);
  }

  setPath() {
    if (this.isStandalone) {
      this.path = "./";
    } else {
      this.path = "./curriculum/";
    }
  }

  getDomElements() {
    this.container              = gCN("curriculumContainer");
    this.chapterContainer       = gCN("curriculumChapterContainer");
    this.title                  = gCN("curriculumTitle");
    this.subTitle               = gCN("curriculumSubtitle");
    this.errorButton            = gCN("curriculumErrorButtonInner");
    this.mainButtonsContainer   = gCN("curriculumMainMenu");
    this.subMenuContainers      = gCNs("curriculumSubMenu");
    if (this.isStandalone) {
      this.languageButtons      = gCNs("curriculumFlag");
    } else {
      this.languageButtons      = gCNs("gadgetButtonInner language");
    }
    for (let button of this.languageButtons) {
      button.addEventListener("click", () => {
        this.setLanguage(button.id);
      })
      button.style.visibility = "visible";
    }
  }

  setLanguage(language) {
    this.language = language;
    this.loadPageContent();
    this.quiz.refresh(this.language, this.currentTopic);
    this.infoBox.setLanguage(language);
  }

  loadPageContent() {
    this.clearButtons();
    this.title.innerHTML = curriculumTitle[this.language];
    this.subTitle.innerHTML = curriculumSubTitle[this.language];
    this.errorButton.innerHTML = curriculumError[this.language];
    const topics = curriculumTopics[this.language];
    for (let i=0; i<topics.length; i++) {
      const topic = topics[i];
      // main button
      const button = new CurriculumMainButton(this, topic[0], i);
      button.place(this.mainButtonsContainer);
      this.mainButtons.push(button);
      // subbuttons
      for (let subTopic of topic[1]) {
        const subButton = new CurriculumSubButton(this, subTopic[0], subTopic[1]);
        subButton.place(this.subMenuContainers[i]);
        this.subButtons.push(subButton);
      }
    }
    if (this.currentTopic != null) {this.loadChapter(this.currentTopic);}
    else {this.chapterContainer.innerHTML = curriculumPlaceholder[this.language];}
  }

  clearButtons() {
    this.mainButtons.map((x) => {x.remove();})
    this.subButtons.map((x) => {x.remove();})
    this.mainButtons = [];
    this.subButtons = [];
    this.infoButtons = [];
  }

  mainButtonAction(i) {
    for (let j=0; j<this.mainButtons.length; j++) {
      if (i == j) {
        this.mainButtons[j].highlight();
        this.subMenuContainers[j].style.display = "flex";
      } else {
        this.mainButtons[j].unHighlight();
        this.subMenuContainers[j].style.display = "none";
      }
    }
  }

  subButtonAction(button, title) {
    this.currentTopic = title;
    this.loadChapter(title);
    this.highlightSubButton(button);
  }

  loadChapter(title) {
    fetch(`${this.path}html/${this.language}/${title}.html`)
    .then((response) => response.text())
    .then((html) => {
      if (this.isStandalone) {
        this.chapterContainer.innerHTML = html.replaceAll("curriculum/", "./");
      } else {
        this.chapterContainer.innerHTML = html;
      }
      this.quiz.refresh(this.language, this.currentTopic);
      this.infoButtons = gCNs("curriculumInfoButton");
      for (let button of this.infoButtons) {
        button.innerHTML = `<img src="${this.path}/img/info.svg" width="20">
                            <div class="curriculumInfoHint">
                              click here for more
                            </div>`;
        button.addEventListener("click", () => {
          this.infoBox.loadTopic(button.id);
        }
        );
      }
    })
    .catch((error) => {
        console.warn(error);
    })
  }

  highlightSubButton(button) {
    for (let b of this.subButtons) {
      if (b == button) {
        button.highlight();
      } else {
        button.unHighlight();
      }
    }
  }

}
