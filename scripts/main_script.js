class GadgetApp {
  languages = ["eng", "ukr", "hun", "rom"];
  apps = [
    ["html/whatwedo.html",    WhatWeDoApp],
    ["html/whoweare.html",    WhoWeAreApp],
    ["map/map.html",          MapApp     ],
    ["curriculum/curriculum_main.html", CurriculumApp],
    ["html/literacy.html",    LiteracyApp]
  ]
  on              = false;
  currentApp      = 0;
  currentLanguage = "eng";

  constructor() {
    this.getDomElements();
    this.activatePowerButton();
    setTimeout(() => {this.switchOn()}, 1000);
  } // constructor

  getDomElements() {
    this.screen             = gCN("gadgetScreen");
    this.powerButton        = gCN("gadgetButton power");
    this.powerButtonOffImg  = gCN("gadgetButtonInner powerOff");
    this.powerButtonOnImg   = gCN("gadgetButtonInner powerOn");
    this.homeButton         = gCN("gadgetButton home");
    this.homeButtonOffImg   = gCN("gadgetButtonInner homeOff");
    this.homeButtonOnImg    = gCN("gadgetButtonInner homeOn");
    this.languageButtons    = gCNs("gadgetButtonInner language");
    this.logo               = gCN("gadgetLogo");
    this.loadLogo();
  } // getDomElements

  setMenu() {
    this.menuButtons = gCNs("mainMenuButton");
    for (let i=0; i<this.menuButtons.length; i++) {
      this.menuButtons[i].onclick = () => {
        this.loadApp(i);
      }
    }
  } // setMenu

  switchOn() {
    this.on = true;
    this.powerButtonOffImg.style.display = "none";
    this.powerButtonOnImg.style.display  = "initial";
    new Loader(this.screen, () => this.startUp());
  } // switchOff

  startUp() {
    this.homeButtonOffImg.style.display = "none";
    this.homeButtonOnImg.style.display  = "initial";
    this.screen.style.backgroundColor   = "#d4dcff";
    this.activateGadgetButtons();
    this.currentApp = 0;
    this.setLanguage("eng");
    for (let anim of this.logoAnimations) {anim.start();}
  } // switchOff

  switchOff() {
    this.on = false;
    this.powerButtonOffImg.style.display  = "initial";
    this.powerButtonOnImg.style.display   = "none";
    this.homeButtonOffImg.style.display   = "initial";
    this.homeButtonOnImg.style.display    = "none";
    this.screen.innerHTML                 = "";
    this.screen.style.backgroundColor     = "#111111";
    for (let i=0;i<4;i++) {
      this.languageButtons[i].style.borderColor  = "#111111";
    }
    this.inActivateGadgetButtons();
    for (let anim of this.logoAnimations) {anim.stop();}
  } // switchOff

  activatePowerButton() {
    this.powerButton.onclick = () => {
      if (this.on) {this.switchOff();}
      else {this.switchOn();}
    }
  } // activatePowerButton

  loadLogo() {
    fetch(`images/ag_logo_toanim.svg`)
    .then((response) => response.text())
    .then((svg) => {
      this.logo.innerHTML = svg;
      this.logoAnimations = [
        new GradientAnimation("gradientStop0"),
        new GradientAnimation("gradientStop1")
      ];

    })
    .catch((error) => {
        console.warn(error);
    });
  }

  activateGadgetButtons() {
    for (let i=0; i<4; i++) {
      this.languageButtons[i].onclick = () => {
        this.setLanguage(this.languages[i]);
      }
    }
    this.homeButton.onclick = () => {
      this.loadHome();
    }
  } // activateGadgetButtons

  inActivateGadgetButtons() {
    for (let i=0; i<4; i++) {
      this.languageButtons[i].onclick = () => {}
    }
    this.homeButton.onclick = () => {}
  } // inActivateGadgetButtons

  setLanguage(language) {
    this.currentLanguage = language;
    for (let i=0;i<4;i++) {
      if (i == this.languages.indexOf(language)) {
        this.languageButtons[i].style.borderColor  = "#faff7f";
      } else {
        this.languageButtons[i].style.borderColor  = "#111111";
      }
    }
    if (this.currentApp == 0) {
      this.loadHome();
    }
  } // setLanguage

  loadHome() {
    this.currentApp = 0;
    fetch(`html/menu_${this.currentLanguage}.html`)
    .then((response) => response.text())
    .then((html) => {
      this.screen.innerHTML = html;
      this.setMenu();
    })
    .catch((error) => {
        console.warn(error);
    });
  } // loadHome

  loadApp(i) {
    this.currentApp = i;
    const path = this.apps[i][0];
    const App  = this.apps[i][1];
    fetch(path)
    .then((response) => response.text())
    .then((html) => {
      this.screen.innerHTML = html;
      new App(this.currentLanguage);
    })
    .catch((error) => {
        console.warn(error);
    });
  } // loadApp

} // GadgetApp

new GadgetApp();