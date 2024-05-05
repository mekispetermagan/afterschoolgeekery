class LiteracyApp {
  constructor(language) {
    this.container = document.getElementsByClassName("litContainer")[0];
    console.log(this.container);
    this.container.innerHTML = `<embed class="gadgetLiteracyEmbed"
    src="https://codingkidsmalta.org/olvasas/">`;
  }

}