const curriculumBgColor = {
  main   : "#576499",
  dark   : "#46507a",
  darkest: "#343c5c",
  light  : "#7983ad"
}

// Menubuttons for the curriculum app.
// The class has two subclasses instantiated in the app.
// dom is the html element corresponding to an abstract button object.
class CurriculumButton {
  constructor() {
    this.dom = document.createElement("button");
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
    this.dom.classList.add("highlighted");
    // this.dom.style.backgroundColor = curriculumBgColor.main;
  }

  unHighlight() {
    this.dom.classList.remove("highlighted");
    // this.dom.style.backgroundColor = curriculumBgColor.dark;
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
    this.dom.classList.add("sub");
    this.setAction(() => owner.subButtonAction(this, id));
    this.setContent(content);
  }
}

/*
  This is the main curriculum app class. It can be instantiated two ways:
  - from "afterschoolgeekery.org":
    - "main_script.js"'s 'gadgetApp.loadApp()' calls the constructor
    - 'standalone' is false
    - paths are unchanged
    - language selection by gadget buttons
  - from "afterschoolgeekery.org/curriculum":
    - "curriculum_standalone.js"'s 'main()' calls the constructor
    - 'standalone' is true
    - paths are changed
    - language selection by header buttons

  Curriculum chapters are fetched from separate html files that have no
  standalone use. The user selects chapters using the buttons of the main menu
  and the submenus, defined above.

  Both the page and the currently fetched chapter are displayed in one of
  three languages: English, Hungarian, or Ukrainian. If the language is
  changed, both the page and the current chapter are reloaded.

  If the url contains a hash with a topic name, the corresponding topic is displayed.
*/

class CurriculumApp {
  currentTopic  = null;
  mainButtons   = [];
  subButtons    = [];
  infoButtons   = [];
  path          = "";
  imageSizes    = [];

  constructor(language, isStandalone) {
    this.isStandalone = isStandalone;
    this.quiz = new CurriculumQuiz(language, null, isStandalone);
    this.setPath();
    this.setImageSizes();
    this.getDomElements();
    this.infoBox = new InfoBox(this.path);
    this.setLanguage(language);
    this.setCurrentTopic();
  }

  setPath() {
    if (this.isStandalone) {
      this.path = "./";
    } else {
      this.path = "./curriculum/";
    }
    return this;
  }

  // if there is a hash corresponding to a topic,
  // it is set to the current topic
  setCurrentTopic() {
    const hash = window.location.hash.slice(1);
    const topics = [];
    curriculumTopics[this.language].forEach((subTopic) => {
      subTopic[1].forEach((item) => {
        topics.push(item[1]);
      });
    });
    console.log(topics);
    if (topics.includes(hash)) {
      this.currentTopic = hash;
      this.loadChapter(hash);
    }
    return this;
  }

  // this is temporary
  // a further version should make images properly responsive
  // Preares values for 'fixImageSizes'
  setImageSizes() {
    for (let i=5; i<100; i+=5) {
      const source = `width="${i}%"`;
      const target = `width="${i*8}"`;
      // const target = `max-width="${i*8}"`;
      this.imageSizes.push([source, target]);
    }
    return this;
  }

  fixPaths(html) {
    let result;
    if (this.isStandalone) {
      result = html.replaceAll("curriculum/", "./");
    } else {
      result = html;
    }
    return result;
  }

  // this is temporary
  fixImageSizes(html) {
    let result = html;
    for (let [s, t] of this.imageSizes) {
      result = result.replaceAll(s, t);
    }
    return result;
  }

  getDomElements() {
    this.container            = gCN("curriculumContainer");
    this.chapterContainer     = gCN("curriculumChapterContainer");
    this.title                = gCN("curriculumTitle");
    this.subTitle             = gCN("curriculumSubtitle");
    this.errorButton          = gCN("curriculumErrorButtonInner");
    this.mainButtonsContainer = gCN("curriculumMainMenu");
    this.subMenuContainers    = gCNs("curriculumSubMenu");
    if (this.isStandalone) {
      this.languageButtons    = gCNs("curriculumFlag");
    } else {
      this.languageButtons    = gCNs("gadgetButtonInner language");
    }
    for (let button of this.languageButtons) {
      button.addEventListener("click", () => {
        this.setLanguage(button.id);
      })
      button.style.visibility = "visible";
    }
    return this;
  }

  setLanguage(language) {
    this.language = language || localStorage.getItem("language") || "eng";
    localStorage.setItem("language", this.language);
    this.loadPageContent();
    this.quiz.refresh(this.language, this.currentTopic);
    this.infoBox.setLanguage(language);
    return this;
  }

  loadPageContent() {
    this.clearButtons();
    this.title.innerHTML        = curriculumTitle[this.language];
    this.subTitle.innerHTML     = curriculumSubTitle[this.language];
    this.errorButton.innerHTML  = curriculumError[this.language];
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
    if (this.currentTopic != null) {
      this.loadChapter(this.currentTopic);
    } else {
      this.chapterContainer.innerHTML = curriculumPlaceholder[this.language];
    }
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
      html = this.fixPaths(html);
      html = this.fixImageSizes(html);
      this.chapterContainer.innerHTML = html;
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
      window.location.hash = `#${title}`;
      const iconTable = gCN("iconTable");
      iconTable.innerHTML = this.fixPaths(generateIconTable(this.language, this.currentTopic));
    })
    .catch((error) => {
        console.warn(error);
    })
  }

  highlightSubButton(button) {
    for (let b of this.subButtons) {
      if (b == button) {
        b.highlight();
      } else {
        b.unHighlight();
      }
    }
  }

}
