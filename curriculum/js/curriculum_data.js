const curriculumTitle = {
  "eng": "Scratch Curriculum",
  "hun": "Scratch Tananyag",
  "ukr": "Навчальний план Скретч"
}

const curriculumSubTitle = {
  "eng": "for Afterschool Geekeries",
  "hun": "Kocka Tanodáknak",
  "ukr": "для позашкільних гікерських клубів"
}

/*
  To add a topic:
  - html files in 3 languages in the html folder
    (filename is the project name)
    (use other files as sample)
  - images in 3 languages the img folder
    (foldername is the project name)
  - insert [title, project name] pairs in 3 languages below
*/
const curriculumTopics = {
  "eng": [
    ["Teaching", [
      ["Session plan",        "session"      ],
    ]],
    ["Scratch basics", [
      ["Getting started",     "intro"        ],
      ["Drawing",             "drawing"      ],
      ["Motion",              "motion"       ],
      ["Variables",           "variables"    ],
      ["Messaging",           "messaging"    ],
      ["Cloning",             "cloning"      ],
    ]],
    ["Projects (60-90 min)", [
      ["Dance",               "dance"        ],
      ["Chasing game",        "chasing"      ],
      ["Snowfall",            "snowfall"     ],
      ["Firework",            "firework"     ],
      ["Mandala drawing",     "mandala"      ],
      ["Dino Game",           "dino"         ],
      ["Space game",          "space"        ],
      ["Flappy Bee game",     "flappybee"    ],
      // ["Storytelling",        "storytelling" ],
      ["Simple quiz",         "simplequiz"   ],
      ["Advanced quiz",       "quiz"         ],
    ]],
    ["Miniprojects (30-45 min)", [
      ["Dressing game",       "dressing"     ],
      ["Bouncing ball",       "bouncing"     ],
      ["Heartbeat",           "heartbeat"    ],
      ["Flower Shower",       "flowershower" ],
      ["Butterfly",           "butterfly"    ],
      ["Balloon",             "balloon"      ],
      ["Rolling eyes",        "eyeroll"      ],
      ["Birthday card",       "birthday"     ],
      ["Clock",               "clock"        ],
    ]]
  ],

  "hun": [
    ["Tanítás", [
      ["Foglalkozásterv",     "session"      ],
    ]],
    ["Scratch alapok", [
      ["Bevezetés",           "intro"        ],
      ["Rajzolás",            "drawing"      ],
      ["Mozgatás",            "motion"       ],
      ["Változók",            "variables"    ],
      ["Üzenetküldés",        "messaging"    ],
      ["Klónozás",            "cloning"      ],
    ]],
    ["Projektek (60-90 perc)", [
      ["Tánc",                "dance"        ],
      ["Kergetőzős",          "chasing"      ],
      ["Havazás",             "snowfall"     ],
      ["Tűzijáték",           "firework"     ],
      ["Mandalarajzoló",      "mandala"      ],
      ["Dínós játék",         "dino"         ],
      ["Űrjáték",             "space"        ],
      ["Flappy Bee játék",    "flappybee"    ],
      // ["Történetmesélés",     "storytelling" ],
      ["Kvíz",                "quiz"         ],
    ]],
    ["Miniprojektek (30-45 perc)", [
      ["Öltöztetős",          "dressing"     ],
      ["Pattogó labda",       "bouncing"     ],
      ["Szívdobogás",         "heartbeat"    ],
      ["Virágeső",            "flowershower" ],
      ["Pillangó",            "butterfly"    ],
      ["Lufifújás",           "balloon"      ],
      ["Szemforgatás",        "eyeroll"      ],
      ["Szülinap",            "birthday"     ],
      ["Óra",                 "clock"        ],
    ]]
  ],

  "ukr": [
    ["Викладання", [
      ["План сесії",          "session"      ],
    ]],
    ["Основи скретча", [
      ["Початок роботи зі Скретч", "intro"   ],
      ["Малюнок",             "drawing"      ],
      ["Переміщення",         "motion"       ],
      ["Змінні",              "variables"    ],
      ["Повідомлення",        "messaging"    ],
      ["Клонування",          "cloning"      ],
    ]],
    ["Проекти (60-90 хв)", [
      ["Танець",              "dance"        ],
      ["Гра-переслідування",  "chasing"      ],
      ["Феєрверк",            "firework"     ],
      ["Снігопад",            "snowfall"     ],
      ["Малювання мандали",   "mandala"      ],
      ["Гра дино",            "dino"         ],
      ["Космічна гра",        "space"        ],
      ["Гра Флеппібі",        "flappybee"    ],
      // ["Розповідь",           "storytelling" ],
      ["Вікторина",           "quiz"         ],
    ]],
    ["Міні-проекти (30-45 хв)", [
      ["Гра Одягалка",         "dressing"     ],
      ["Підстрибування м'яча", "bouncing"     ],
      ["Серцебиття",           "heartbeat"    ],
      ["Квітковий душ",        "flowershower" ],
      ["Метелик",              "butterfly"    ],
      ["Повітряна кульк",      "balloon"      ],
      ["Закочує очі",          "eyeroll"      ],
      ["День народження",      "birthday"     ],
      ["Годинник",             "clock"        ],
    ]]
  ],
}

const curriculumPlaceholder = {
  "eng": "Choose a topic!",
  "hun": "Válassz egy témát!",
  "ukr": "Оберіть тему!"
}

const curriculumError = {
  "eng": "Found an error? Correct it here!",
  "hun": "Hibát találtál? Javítsd ki itt!",
  "ukr": "Знайшли помилку? Виправте її тут!"
}

const quizButton = {
  "eng": "Check your knowledge!",
  "hun": "Ellenőrizd a tudásod!",
  "ukr": "Перевірте свої знання!",
}

const quizRestart = {
  "eng": "Restart",
  "hun": "Újraindítás",
  "ukr": "Перезапустити",
}

const quizScore = {
  "eng": "Score",
  "hun": "Pont",
  "ukr": "Оцінка",
}

const quizClose = {
  "eng": "Close",
  "hun": "Bezár",
  "ukr": "Закрити",
}

const quizResult = {
  "eng": ["That was it! :) You scored", "out of", "Wow! Perfect score!"],
  "hun": ["Ennyi volt :)", "pontot értél el ennyiből:", "Ez igen! Tökéletes!"],
  "ukr": ["Ось і все! :) Ви набрали", "бал з", "Ого! Чудовий результат!"],
}
