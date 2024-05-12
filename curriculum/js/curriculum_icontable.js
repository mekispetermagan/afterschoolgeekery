
const generateIconTable = (language, topic) => {
  const topicData = iconTableTopicData[topic];
  const terms = iconTableTerms[language];
  const ageTerm = terms["age"];
  const age = topicData["age"];
  const levelTerm = terms["level"];
  const level = topicData["level"];
  const techniquesTerm = terms["techniques"];
  const techniques = topicData["techniques"];
  let techniquesPart = "\n";
  for (let technique of techniques) {
    techniquesPart += `<img src="curriculum/img/icons/${language}/${technique}.png" height="60px" alt="${technique}">\n`;
  }
  if (techniquesPart == "\n") {
    techniquesPart = terms["none"]
  }
  return `
  <tr>
    <th class="iconTableHead"> ${ageTerm}: </th>
    <td>
      <img src="curriculum/img/icons/age_${age.join("_")}.png" height="84px" alt="11+">
    </td>
  </tr>
  <tr>
    <th class="iconTableHead"> ${levelTerm}: </th>
    <td>
      <img src="curriculum/img/icons/${language}/level_${level}.png" height="84px" alt="novice">
    </td>
  </tr>
  <tr>
    <th class="iconTableHead"> ${techniquesTerm}: </th>
    <td>${techniquesPart}  </td>
  </tr>
  `;
}


