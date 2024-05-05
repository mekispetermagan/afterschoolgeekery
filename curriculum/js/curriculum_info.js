class InfoBox {
  topic = "";
  on = false;
  language = "eng";
  page = 0;

  constructor(path) {
    this.path         = path;
    this.getDomElements();
    this.setLanguage("eng");
  }

  getDomElements() {
    this.container    = gCN("curriculumInfoContainer");
    this.titleArea    = gCN("curriculumInfoTitle");
    this.contentArea  = gCN("curriculumInfoContent");
    this.quitButton   = gCN("curriculumInfoQuit");
    this.quitButton.addEventListener("click", () => {this.quit();});
    document.addEventListener("keydown", (e) => {
      if (e.key=="Escape") {this.quit();}
    });
    this.navButtons = gCNs("curriculumInfoNavigate");
    this.navButtons[0].addEventListener("click", () => {
      if (0 < this.page) {
        this.page--;
        this.displayPage();
      }
    });
    this.navButtons[1].addEventListener("click", () => {
      if (this.page < this.pageContents.length-1) {
        this.page++;
        this.displayPage();
      }
    });
  }

  setLanguage(language) {
    this.language = language;
    if (this.on) this.display();
  }

  loadTopic(topic=this.topic) {
    this.on = true;
    this.container.style.visibility = "visible";
    fetch(`${this.path}html/info/${this.language}/${topic}.html`)
    .then((response) => response.text())
    .then((html) => {
      const buffer = document.createElement("div");
      buffer.innerHTML = html.replaceAll("curriculum/", this.path);
      this.title = gCN("curriculumInfoContentTitle", buffer);
      this.pageContents = gCNs("curriculumInfoContentPage", buffer);
      this.lastPage = this.pageContents.length - 1;
      this.displayPage();
      console.log(title)
      })
    .catch((error) => {
        console.warn(error);
    })
  }

  displayPage() {
    this.titleArea.innerHTML = `${this.title.innerHTML} (${this.page+1} / ${this.lastPage+1})`;
    this.contentArea.innerHTML = this.pageContents[this.page].innerHTML;
    if (0 < this.page){this.navButtons[0].style.visibility = "visible"}
    else {this.navButtons[0].style.visibility = "hidden"};
    if (this.page < this.pageContents.length-1){this.navButtons[1].style.visibility = "visible"}
    else {this.navButtons[1].style.visibility = "hidden"};
  }

  quit() {
    this.on = false;
    this.container.style.visibility = "hidden";
    this.navButtons[0].style.visibility = "hidden"
    this.navButtons[1].style.visibility = "hidden"
    this.topic = "";
    this.page = 0;
  }
}