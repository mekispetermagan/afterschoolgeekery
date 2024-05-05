const wwaStaff = [
  [
    "Gábor Daróczi",
    "gabor_daroczi.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  [
    "Vivien Rocskár",
    "vivien_rocskar.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  [
    "Diana Filep",
    "diana_filep.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  [
    "Kata Kárász",
    "kata_karasz.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  [
    "Marianna Makai",
    "marianna_makai.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  [
    "Péter Mekis",
    "peter_mekis.jpg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ]
]

class WWANameCard {
  constructor(name, imageName, description, area, owner) {
    this.name = name;
    this.image = new Image();
    this.image.src = `./images/staff/${imageName}`;
    this.image.classList.add("wwaImage");
    this.image.width = 240;
    this.description = description;
    this.fullCard = document.createElement("div");
    this.fullCard.classList.add("wwaFullCard");
    this.shortCard = document.createElement("div");
    this.shortCard.classList.add("wwaShortCard");
    this.shortCard.innerHTML = `<div>${this.name}</div>`;
    this.smallImage = new Image();
    this.smallImage.src = `./images/staff/${imageName}`;
    this.smallImage.classList.add("wwaSmallImage");
    this.smallImage.width = 120;
    this.shortCard.appendChild(this.smallImage);
    this.area = area;
    this.area.appendChild(this.shortCard);
    this.area.appendChild(this.fullCard);
    this.owner = owner;
    this.nameDiv = document.createElement("div");
    this.nameDiv.innerHTML = this.name;
    this.nameDiv.classList.add("wwaName");
    this.fullCard.appendChild(this.nameDiv);
    this.fullCard.appendChild(this.image);
    this.description = document.createElement("div");
    this.description.innerHTML = description;
    this.fullCard.appendChild(this.description);
    this.description.classList.add("wwaDescription");
    this.shortCard.onclick = (_) => {
      this.owner.toggleCard(this);
    }
    this.fullCard.onclick = (_) => {
      this.owner.toggleCard(this);
    }
  }
}

class WhoWeAreApp {
  constructor(language) {
    this.container = document.getElementsByClassName("wwaContainer")[0];
    this.cards = [];
    for (let item of wwaStaff) {
      const card = new WWANameCard(...item, this.container, this);
      this.cards.push(card);
    }
    this.activeCard = null;
    document.onkeydown = (e) => {
      if (e.key == "Escape") {this.toggleCard(this.activeCard);}
    }
  }

  toggleCard(card) {
    for (let c of this.cards) {
      if (c == card && c != this.activeCard) {
        c.fullCard.style.visibility = "visible";
        this.activeCard = c;
      } else {
        c.fullCard.style.visibility = "hidden";
        if (c == this.activeCard) {
          this.activeCard = null;
        }
      }
    }
  }

  loadContent() {

  }
}
