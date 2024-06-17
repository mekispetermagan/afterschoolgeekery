const container = [...document.getElementsByClassName("mapAppOuter")][0];
fetch("./map.html")
.then((response) => response.text())
.then((html) => {
  container.innerHTML = html.replaceAll("./map/","./");
  new MapApp("eng", true);
})
.catch((error) => {
    console.warn(error);
});
