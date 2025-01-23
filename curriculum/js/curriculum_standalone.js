const main = () => {
  fetch("curriculum_main.html")
  .then((response) => response.text())
  .then((html) => {
    const container = gCN("curriculumStandaloneContainer");
    container.innerHTML = html.replaceAll("curriculum/", "./");
    new CurriculumApp(null, true);
  })
  .catch((error) => {
      console.warn(error);
  });
}

main();
