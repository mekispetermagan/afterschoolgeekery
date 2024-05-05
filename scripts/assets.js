const gCN   = (cn, d=document) => d.getElementsByClassName(cn)[0];
const gCNs  = (cn, d=document) => [...d.getElementsByClassName(cn)];

class ProgressBar {
  constructor(area, callback) {
    this.area = area;
    this.callback = callback;
    this.outer = document.createElement("div");
    this.outer.classList.add("progressBarOuter");
    this.area.appendChild(this.outer);
    this.inner = document.createElement("div");
    this.inner.classList.add("progressBarInner");
    this.outer.appendChild(this.inner);
    this.timeout = null;
    this.forward(0);
  }

  forward(progress) {
    clearTimeout(this.timeout);
    if (progress < 100) {
      this.inner.style.width = `${progress*5}px`;
      this.timeout = setTimeout(() => this.forward(progress+1), 7);
    } else if (progress == 100) {
      this.timeOut = setTimeout(() => this.forward(progress+1), 300)
    } else {
      this.area.removeChild(this.outer);
      this.callback();
    }
  }
}

class Loader {
  constructor(area, callback) {
    this.area = area;
    this.callback = callback;
    this.dom = document.createElement("div");
    this.dom.classList.add("loader", "midElement");
    this.area.appendChild(this.dom);
    const logo = new Image();
    logo.src = "./images/ag_logo.svg";
    logo.width = 180;
    this.dom.appendChild(logo);
    new ProgressBar(this.dom, () => this.finish())
  }

  finish() {
    this.area.removeChild(this.dom);
    this.callback();
  }
}

class GradientAnimation {
  constructor(className) {
    this.stops = [...document.getElementsByClassName(className)];
    this.color0 = this.stops[0].getAttribute("stop-color");
    this.color1 = this.stops[1].getAttribute("stop-color");
  }

  start() {
    this.on = true;
    this.animInterval = setInterval(() => {this.animation();}, 0.01);
  }

  stop() {
    this.on = false;
    clearInterval(this.animInterval);
    this.stops[0].setAttribute("stop-color", this.color0);
    this.stops[1].setAttribute("stop-color", this.color1);
    this.stops[2].setAttribute("stop-color", this.color0);
    this.stops[0].setAttribute("offset", "-1");
    this.stops[1].setAttribute("offset", "0");
    this.stops[2].setAttribute("offset", "1");
  }

  animation() {
    for (let stop of this.stops) {
      stop.setAttribute("offset", stop.getAttribute("offset")*1+0.001);
    }
    if (2<this.stops[2].getAttribute("offset")) {
      for (let i=0; i<3; i++) {
        const stop = this.stops[i];
        stop.setAttribute("offset",i-1);
        if (stop.getAttribute("stop-color") == this.color0) {
          stop.setAttribute("stop-color", this.color1);
        } else {
          stop.setAttribute("stop-color", this.color0);
        }
      }
    }
  }
}


