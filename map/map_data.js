const mapLocationData = [
  [618, 316, "Odesa",                       "Ukraine" ],
  [558, 105, "Zolotonosha",                 "Ukraine" ],
  [272, 283, "Berehove",                    "Ukraine" ],
  [267, 258, "Tur'ya Pasika",               "Ukraine" ],
  [246, 253, "Uzhhorod Lyceum",             "Ukraine" ],
  [251, 262, "Uzhhorod Gymnasium",          "Ukraine" ],
  [255, 254, "Uzhhorod Blaho",              "Ukraine" ],
  [175, 283, "Tornal'a",                    "Slovakia"],
  [175, 272, "Gemer",                       "Slovakia"],
  [169, 283, "Gemerská Ves",                "Slovakia"],
  [166, 265, "Barca",                       "Slovakia"],
  [158, 300, "Lenartovce",                  "Slovakia"],
  [158, 278, "Uzovská Panica",              "Slovakia"],
  [213, 303, "Homrogd",                     "Hungary" ],
  [206, 295, "Tomor",                       "Hungary" ],
  [196, 290, "Hegymeg",                     "Hungary" ],
  [177, 317, "Erdőkövesd",                  "Hungary" ],
  [169, 330, "Bátonyterenye Tanoda",        "Hungary" ],
  [163, 324, "Bátonyterenye Kindergarten",  "Hungary" ],
  [160, 332, "Mátraverebély",               "Hungary" ],
  [158, 318, "Lucfalva",                    "Hungary" ],
  [128, 340, "Budapest V",                  "Hungary" ],
  [128, 352, "Budapest IX",                 "Hungary" ],
  [117, 343, "Budapest XII",                "Hungary" ],
];

const mapLocationInfo = {
  "Mátraverebély": [
    "Zagyi Bence",
    "Nógrád Megyei Cigány Kisebbségi Képviselők és Szószólók Szövetsége",
    "1 group",
    "matraverebely"
  ],
  "Homrogd": [
    "Havlicsek Ferenc",
    "Homrogd közösségi és esély ház",
    "1 group",
    "homrogd"
  ],
  "Tomor": [
    "Siroki Levente",
    "Romama",
    "1 group",
    "tomor"
  ],
  "Hegymeg": [
    "Jocha Tamás",
    "Hegymegért Egyesület",
    "1 group",
    "hegymeg"
  ],
  "Erdőkövesd": [
    "Kövesdy Katalin",
    "Boglyas Kuckó",
    "1 group",
    "erdokovesd"
  ],
  "Bátonyterenye Tanoda": [
    "Gál Benjamin",
    "Bátonyterenyei Tanoda",
    "1 group",
    "batonyterenye_t"
  ],
  "Bátonyterenye Kindergarten": [
    "Kövesdy Katalin",
    "Bátonyterenyei Városi Óvoda",
    "1 group",
    "batonyterenye_k"
  ],
  "Lucfalva": [
    "Oláh Attila",
    "Nógrád Megyei Cigány Kisebbségi Képviselők és Szószólók Szövetsége",
    "1 group",
    "lucfalva"
  ],
  "Budapest V": [
    "Szöllősi Bea, Gerhard Kata",
    "Belvárosi Tanoda",
    "1 group",
    "budapest_v"
  ],
  "Budapest IX": [
    "Greskovics Eszter, Dominik-Suhajda Ágnes",
    "Ökumenikus Segélyszervezet - Ukrajnai Menekülteket Támogató Központ",
    "2 groups",
    "budapest_ix"
  ],
  "Budapest XII": [
    "Virág Szelina",
    "Fővárosi Önkormányzat Kútvölgyi úti Idősek Otthona Zugligeti úti telephely",
    "1 group",
    "budapest_xii"
  ],
  "Odesa": [
    "Maksym Dzhum",
    "CF 'Planet of Good People'",
    "1 group",
    "odesa"
  ],
  "Zolotonosha": [
    "Yevhen Bortek, Volodymyr Bambula, Anzhelika Panchenko",
    "NGO 'Romani Rota'",
    "1 group",
    "zolotonosha"
  ],
  "Berehove": [
    "Svitlana Chyryban",
    "Berehove Gymnasium No. 7 'Opre Roma'",
    "1 group",
    "berehove"
  ],
  "Tur'ya Pasika": [
    "Nadia Fontosh, Oksana Kuzmanich, Lyubov Gushtan",
    "Tur'ya Pasitske Secondary School of the Turya Remeta Council",
    "1 group",
    "turya_pasika"
  ],
  "Uzhhorod Lyceum": [
    "Bohdan Toder",
    "Uzhhorod Lyceum Intellect",
    "1 group",
    "uzhhorod_lyceum"
  ],
  "Uzhhorod Gymnasium": [
    "Istvan Dendeshi",
    "Uzhhorod Gymnasium No. 14",
    "1 group",
    "uzhhorod_gymnasium"
  ],
  "Uzhhorod Blaho": [
    "Anna-Marie Markovych, Yana Shershun",
    "Comprehensive Social Centre of the Charity Foundation 'Blaho'",
    "1 group",
    "uzhhorod_blaho"
  ],
  "Tornal'a": [
    "Klára Varga Tóth",
    "Základná škola Ferenca Kazinczyho s vyučovacím jazykom maďarským",
    "1 group",
    "tornalja"
  ],
  "Gemer": [
    "Péter Varga",
    "Základná škola s vyučovacím jazykom maďarským",
    "1 group",
    "gemer"
  ],
  "Gemerská Ves": [
    "Adam Csonka",
    "Základná škola",
    "1 group",
    "gemerska_ves"
  ],
  "Lenartovce": [
    "Gejza Váradi",
    "Základná škola s materskou školou s vyučovacím jazykom maďarským",
    "5 groups",
    "lenartovce"
  ],
  "Barca": [
    "Cynthia Ferkóová, Alex Agócs (3 groups)",
    "Základná škola s vyučovacím jazykom maďarským",
    "3 groups",
    "barca"
  ],
  "Uzovská Panica": [
    "Patrik Ferkó",
    "Základná škola s vyučovacím jazykom maďarským",
    "2 groups",
    "uzovska_panica"
  ],
};