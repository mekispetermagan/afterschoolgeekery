class Location {
  constructor(x, y, name, owner) {
    this.name = name;
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.createMain();
    this.createInfo();
    this.createImage();
    this.dot.addEventListener("mouseenter", () => {
      this.showInfo();
    });
    this.dot.addEventListener("mouseout", () => {
      this.hideInfo();
    });
  }

  createMain() {
    const pointerPart = `
          <img
            class="mapPoi"
            src="${this.owner.path}/images/poi.svg"
            alt="pointer"
            height="60">
    `;
    const namePart = `
          <div class="mapLocationNameCard">
            ${this.name}
          </div>
    `;
    this.dot = document.createElement("div");
    this.dot.classList.add("mapLocation");
    this.owner.map.appendChild(this.dot);
    this.dot.style.left = `${this.x}px`;
    this.dot.style.top = `${this.y}px`;
    this.nameTag = document.createElement("div");
    this.nameTag.classList.add("mapLocationName");
    if (this.x<500) {
      this.nameTag.innerHTML = pointerPart + "\n" + namePart;
      this.nameTag.style.left = `${this.x-21}px`;
    } else {
      this.nameTag.innerHTML = namePart + "\n" + pointerPart;
      this.nameTag.style.right = `${720-this.x-21}px`;
    }
    this.owner.map.appendChild(this.nameTag);
    this.nameTag.style.top = `${this.y-72}px`;
    this.nameTagOn = false;
  }

  createInfo() {
    this.info = document.createElement("div");
    this.info.classList.add("mapInfo");
    this.owner.map.appendChild(this.info);
    this.info.innerHTML = `<p>${mapLocationInfo[this.name].slice(0,-1).join("</p><p>")}</p>`;
    }

    createImage() {
    this.image = new Image();
    this.image.src = `${this.owner.path}/images/locations/${mapLocationInfo[this.name][3]}.jpg`;
    this.image.classList.add("mapLocationImage");
    this.image.width = 240;
    this.owner.map.append(this.image);
  }

  showInfo(name = this.name) {
    if (name == this.name) {
      this.nameTag.style.visibility = "visible";
      this.nameTagOn = true;
      this.info.style.visibility = "visible";
      this.image.style.visibility = "visible";
      setTimeout(() => {this.nameTagOn = false;}, 1000);
    }
  }

  hideInfo() {
    let delay = null;
    const fade = (opacity) => {
      clearTimeout(delay);
      if (0 < opacity) {
        this.nameTag.style.opacity = opacity;
        this.info.style.opacity = opacity;
        this.image.style.opacity = opacity;
        delay = setTimeout(() => fade(opacity-0.05), 25);
      } else {
        this.nameTag.style.visibility = "hidden";
        this.info.style.visibility = "hidden";
        this.image.style.visibility = "hidden";
        this.nameTag.style.opacity = 1;
        this.info.style.opacity = 1;
        this.image.style.opacity = 1;
      }
    }
    if (! this.nameTagOn) {
      fade(1);
    } else {
      delay = setTimeout(() => fade(1), 1000);
    }
  }
}

class MapApp {
  interval = null;
  constructor(language, isStandalone = false) {
    this.setPath(isStandalone);
    this.map = document.getElementsByClassName("map")[0];
    this.playButton = document.getElementsByClassName("mapPlayButton")[0];
    this.locations = [];
    for (let data of mapLocationData) {
      const location = new Location(...data.slice(0, -1), this);
      this.locations.push(location);
    }
    document.addEventListener("keydown", (e) => {
      if (e.key == "s") {this.slideShow();}
    });
    this.playButton.addEventListener("click", () => {
      if (this.interval == null) {
        this.slideShow();
      } else {
        this.stopSlideShow();
      }
    });
    // this.music = new Audio("./Denys Kyshchuk - Inspirational City.mp3");
  }

  setPath(isStandalone) {
    if (isStandalone) {
      this.path = ".";
    } else {
      this.path = "./map";
    }
  }

  slideShow() {
    // this.music.play();
    this.playButton.innerHTML = `<img src="${this.path}/images/stop.svg" alt="stop button" height="48" width="48">`;
    let counter = this.locations.length - 1;
    const nextSlide = () => {
      if (0 <= counter) {
        const location = this.locations[counter];
        location.showInfo();
        setTimeout(() => {location.hideInfo();}, 1200);
        counter--;
      } else {
        this.stopSlideShow();
      }
    }
    this.interval = setInterval(nextSlide, 2000);
  }

  stopSlideShow() {
    this.playButton.innerHTML = `<img src="${this.path}/images/play.svg" alt="play button" height="48" width="48">`;
    clearInterval(this.interval);
    this.interval = null;
  }
}
