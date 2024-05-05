class WhatWeDoApp {
  constructor(language) {
    this.content = document.getElementsByClassName("wwdContent")[0];
    this.loadPage(language);
  }

  loadPage(language) {
    fetch(`html/whatwedo_${language}.html`)
    .then((response) => response.text())
    .then((html) => {
      this.content.innerHTML = html;
    })
    .catch((error) => {
        console.warn(error);
    });

  }
}