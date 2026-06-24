const title = document.getElementById("title");
const frame = document.querySelector(".frame");
const pencilLayer = document.getElementById("pencil-layer");
const startButton = document.getElementById("start-game");
const debugToggle = document.getElementById("debug-toggle");
const modulesScroll = document.getElementById("modules-scroll");
const moduleCards = Array.from(document.querySelectorAll(".module-card"));

const moduleView = document.getElementById("m0-view");
const modulePath = document.getElementById("m0-path");
const moduleBack = document.getElementById("m0-back");
const moduleKicker = document.querySelector(".m0-kicker");
const moduleTitle = document.querySelector(".m0-title");
const moduleSteps = document.getElementById("m0-steps");
const siGameBack = document.getElementById("si-game-back");
const siSideToggle = document.getElementById("si-side-toggle");
const siGameKicker = document.getElementById("si-game-kicker");
const siGameTitle = document.getElementById("si-game-title");
const siGameStage = document.getElementById("si-game-stage");
const siSideContent = document.getElementById("si-side-content");

const STEP_ICONS = {
  units: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="8.5" width="14.4" height="6.8" rx="1.2"></rect><path d="M7.3 8.5V12M9.7 8.5V10.9M12.1 8.5V12M14.5 8.5V10.9M16.9 8.5V12"></path></svg>`,
  graph: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.9 5.2V18.8H19"></path><path d="M7.2 15.8L10.2 12.6L13 13.7L17 8.6"></path></svg>`,
  vector: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.1" cy="15.7" r="1.25" fill="currentColor" stroke="none"></circle><path d="M7.2 8.6H12.8"></path><path d="M11.7 7.5L12.8 8.6L11.7 9.7"></path><path d="M9.2 14.8L16.8 9.2"></path><path d="M15.3 9.1H16.8V10.6"></path></svg>`,
  frame: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="7" width="6.6" height="4.8" rx="1"></rect><rect x="12.6" y="12.3" width="6.6" height="4.8" rx="1"></rect><path d="M6 13H11.4"></path><path d="M12.6 10.5H18"></path><path d="M9.8 13L11.4 11.5L9.8 10"></path></svg>`,
  point: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 5.2V18.8H18.8"></path><circle cx="13.9" cy="10.1" r="1.7"></circle><path d="M13.9 8.2V6.5M12 10.1H10.3"></path></svg>`,
  displacement: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.4 13.8C7.7 11.2 10 10.5 12.5 10.1C14.9 9.7 16.9 8.8 19 6.8"></path><path d="M16.9 6.8H19V8.9"></path><path d="M5 17.2H13.8"></path><path d="M12.6 16L13.8 17.2L12.6 18.4"></path></svg>`,
  formula: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 8.6H10.8"></path><path d="M13.2 8.6H18.8"></path><path d="M12 6.7V10.5"></path><path d="M6 15.9H18"></path><path d="M7 13.5L5 15.9L7 18.3"></path><path d="M17 13.5L19 15.9L17 18.3"></path></svg>`,
  speed: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.5 15.7C5.5 11.8 8.5 8.8 12.3 8.8C16 8.8 19 11.8 19 15.7"></path><path d="M12.3 15.6L16.2 11.7"></path><circle cx="12.3" cy="15.7" r="1.1" fill="currentColor" stroke="none"></circle></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.8 14.8H19.2"></path><rect x="5.6" y="9.5" width="8.8" height="4.4" rx="1"></rect><path d="M8.1 9.5L10 7.4H13.2L15.1 9.5"></path><circle cx="8" cy="15" r="1.4"></circle><circle cx="15.4" cy="15" r="1.4"></circle></svg>`,
  encounter: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="9.6" width="5.5" height="3.5" rx="0.8"></rect><rect x="13.7" y="9.6" width="5.5" height="3.5" rx="0.8"></rect><path d="M10.8 11.3H13.2"></path><path d="M11.8 10.3L13.2 11.3L11.8 12.3"></path></svg>`,
  acceleration: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 16.2C7.3 13.8 9.3 12.9 11.6 12.2C14.2 11.4 16.2 10.2 18.8 7.8"></path><path d="M15.8 7.9H18.9V11"></path><circle cx="8" cy="16.2" r="1.15" fill="currentColor" stroke="none"></circle><circle cx="12.2" cy="12.1" r="1.15" fill="currentColor" stroke="none"></circle><circle cx="16.5" cy="9.4" r="1.15" fill="currentColor" stroke="none"></circle></svg>`,
  brake: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.4" cy="15.7" r="2.1"></circle><path d="M9.9 14.3L15.5 10.6"></path><path d="M14.6 9.3H17.9V12.6"></path></svg>`,
  sign: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 8.2H18"></path><path d="M6 15.8H18"></path><path d="M9 5.8V10.6"></path><path d="M15 13.4V18.2"></path></svg>`,
  fall: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5.2C11.5 3.9 12.2 3 13.6 3"></path><path d="M10.5 7.2C8.2 7.2 6.3 9.1 6.3 11.5C6.3 14.5 8.6 17.1 12 17.1C15.4 17.1 17.7 14.5 17.7 11.5C17.7 9.1 15.8 7.2 13.5 7.2C12.5 7.2 11.4 7.8 10.5 7.2Z"></path><path d="M12 19.1V22"></path><path d="M10.3 20.3L12 22L13.7 20.3"></path></svg>`,
  throw: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.9 15.8C7.2 10.5 11 8 18.9 8"></path><path d="M16.8 6.2H18.9V8.3"></path><circle cx="18.9" cy="8.3" r="2.2"></circle><circle cx="18.9" cy="8.3" r="0.9" fill="currentColor" stroke="none"></circle></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 5.2V18.8H19"></path><path d="M7.2 15.6L10.1 12.4L12.8 13.4L16.8 8.4"></path><path d="M14.9 8.4H16.8V10.3"></path></svg>`,
  slope: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 18.2L16.6 8.6"></path><path d="M5.2 18.2H12.6"></path><path d="M12.6 18.2V11.9"></path></svg>`,
  area: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 5.2V18.8H19"></path><path d="M7.3 15.4L11.3 12.8L15.8 10.9V18.8H7.3Z"></path></svg>`,
  components: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 18.4H18.8"></path><path d="M5.2 18.4V7.2"></path><path d="M5.2 18.4L14.7 10.1"></path><path d="M13.4 10.2H14.8V11.6"></path></svg>`,
  relative: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.6" y="7.2" width="6.6" height="4.6" rx="1"></rect><rect x="12.8" y="12.2" width="6.6" height="4.6" rx="1"></rect><path d="M5.8 13.2H11.3"></path><path d="M12.8 10.8H18.2"></path><path d="M9.8 13.2L11.3 11.8L9.8 10.4"></path><path d="M14.3 9.4L12.8 10.8L14.3 12.2"></path></svg>`,
  observer: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.8 12C6.8 8.9 9 7.4 12 7.4C15 7.4 17.2 8.9 19.2 12C17.2 15.1 15 16.6 12 16.6C9 16.6 6.8 15.1 4.8 12Z"></path><circle cx="12" cy="12" r="1.9"></circle></svg>`,
  measure: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 5H15"></path><path d="M10.2 5V9.8L7 15.7C6.2 17.2 7.2 19 8.9 19H15.1C16.8 19 17.8 17.2 17 15.7L13.8 9.8V5"></path><path d="M8.7 14.6H15.3"></path><circle cx="10.1" cy="12.9" r="0.75" fill="currentColor" stroke="none"></circle></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 6.2H18.8V17.8H5.2Z"></path><path d="M7.4 10.6H16.6"></path><path d="M12 8.4V13"></path><path d="M10.2 13.8H13.8"></path></svg>`,
  model: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.2" cy="9.6" r="2"></circle><circle cx="15.8" cy="9.6" r="2"></circle><path d="M8.2 11.6V16.9"></path><path d="M15.8 11.6V16.9"></path><path d="M8.2 14.3H15.8"></path></svg>`,
};

const MODULE_CONTENT = {
  TEST: { title: "Test-Level", steps: [
    { title: "Gleichförmige Bewegung", text: "Auto fährt mit konstanter Geschwindigkeit.", icon: "car",          colorA: "#ff8d47", colorB: "#ffd164" },
    { title: "Aufholen",               text: "Wann holt der schnellere Körper den langsameren ein?",        icon: "encounter",  colorA: "#24b7d8", colorB: "#84e1f1" },
    { title: "Beschleunigung",         text: "Rakete startet aus der Ruhe – Geschwindigkeit berechnen.",    icon: "acceleration",colorA: "#7a62ff", colorB: "#b7a7ff" },
    { title: "K1 – Sprint-Scanner",    text: "Mittlere Geschwindigkeit eines 100-m-Sprints berechnen.",    icon: "speed",      colorA: "#59a3ff", colorB: "#8ed0ff" },
    { title: "K2 – Überhol-Duell",     text: "Schnelleres Fahrzeug holt langsameres ein.",                 icon: "encounter",  colorA: "#ff9c58", colorB: "#ffd58a" },
    { title: "K3 – Freier Fall",       text: "Ball fällt – Fallzeit mit g = 9,81 m/s² berechnen.",        icon: "fall",       colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "K4 – Bremsweg",          text: "Auto bremst – wie weit bis zum Stillstand?",                 icon: "brake",      colorA: "#f86785", colorB: "#f9a8bd" },
    { title: "K5 – Beschleunigungsweg",text: "Fahrzeug beschleunigt aus dem Stand.",                       icon: "acceleration",colorA: "#8f73ff", colorB: "#c2b6ff" },
    { title: "K6 – Konzept-Quiz",      text: "Konzeptfragen zu Bewegungsdiagrammen und Grössen.",          icon: "chart",      colorA: "#21b7d8", colorB: "#7de1f2" },
  ]},

  "0": { title: "Bewegung verstehen", steps: [
    { title: "Was ist Bewegung?",         text: "Ein Körper bewegt sich, wenn sich sein Ort mit der Zeit ändert.",        icon: "speed",        colorA: "#3f8efc", colorB: "#80c2ff" },
    { title: "Das Bezugssystem",          text: "Ruhe und Bewegung hängen immer vom Bezug des Beobachters ab.",           icon: "frame",        colorA: "#8a73ff", colorB: "#c2b6ff" },
    { title: "Ort und Position",          text: "Position als Zahl mit Vorzeichen auf einer Koordinatenachse.",            icon: "point",        colorA: "#ff8d47", colorB: "#ffd164" },
    { title: "Zeit als Messgrösse",       text: "Zeitpunkte und Zeitintervalle klar unterscheiden.",                      icon: "units",        colorA: "#21b7d8", colorB: "#7de1f2" },
    { title: "Strecke vs. Verschiebung",  text: "Zurückgelegter Weg und Netto-Ortsänderung sind verschieden.",            icon: "displacement", colorA: "#f86785", colorB: "#f9a8bd" },
    { title: "Symbol s und Einheit m",    text: "Formelzeichen s für Strecke, SI-Einheit Meter.",                         icon: "formula",      colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "Symbol t und Einheit s",    text: "Formelzeichen t für Zeit, SI-Einheit Sekunde – und die Verwechslungsfalle.", icon: "units",   colorA: "#ff9c58", colorB: "#ffd58a" },
    { title: "Weg und Zeit",              text: "Bewegung braucht immer Ort UND Zeit – erste Idee der Geschwindigkeit.",  icon: "car",          colorA: "#59a3ff", colorB: "#8ed0ff" },
    { title: "Bewegung im Alltag",        text: "Kinematik-Begriffe auf alltägliche Situationen korrekt anwenden.",        icon: "car",          colorA: "#7a62ff", colorB: "#b7a7ff" },
    { title: "Boss – Bewegung",           text: "Alle Grundbegriffe aus Kapitel 1 in einer Boss-Aufgabe vernetzen.",       icon: "chart",        colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "1": { title: "Geschwindigkeit", steps: [
    { title: "Was ist Geschwindigkeit?",    text: "Geschwindigkeit als Ortsänderung pro Zeit verstehen.",         icon: "speed",   colorA: "#5ea2ff", colorB: "#9bc8ff" },
    { title: "Formel v = s / t",            text: "Die Grundformel der Durchschnittsgeschwindigkeit kennen.",     icon: "formula", colorA: "#65d78a", colorB: "#a4f0be" },
    { title: "Einheit m/s",                 text: "SI-Einheit m/s und Alltagseinheit km/h unterscheiden.",        icon: "units",   colorA: "#7e74ff", colorB: "#c3bcff" },
    { title: "v berechnen",                 text: "Geschwindigkeit aus Strecke und Zeit ausrechnen.",             icon: "formula", colorA: "#ff9c58", colorB: "#ffd58a" },
    { title: "s und t berechnen",           text: "Formel nach s und t umstellen und anwenden.",                  icon: "formula", colorA: "#24b7d8", colorB: "#88e4f2" },
    { title: "Gleichförmige Bewegung",      text: "Konstante Geschwindigkeit – Erkennungsmerkmale.",              icon: "car",     colorA: "#f86785", colorB: "#f9a8bd" },
    { title: "Tabelle der Bewegung",        text: "Strecken-Zeit-Tabelle lesen und vervollständigen.",            icon: "chart",   colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "s-t Diagramm",               text: "Lineares s-t Diagramm lesen und deuten.",                      icon: "graph",   colorA: "#8f73ff", colorB: "#c2b6ff" },
    { title: "Durchschnittsgeschwindigkeit",text: "Mittlere Geschwindigkeit bei mehreren Abschnitten.",           icon: "speed",   colorA: "#ff8753", colorB: "#ffc173" },
    { title: "Boss – Geschwindigkeit",      text: "Alle Geschwindigkeits-Konzepte in einer Boss-Aufgabe.",        icon: "chart",   colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "2": { title: "Beschleunigung", steps: [
    { title: "Was ist Beschleunigung?",       text: "Beschleunigung als Geschwindigkeitsänderung pro Zeit.",      icon: "acceleration", colorA: "#5f9dff", colorB: "#9dc9ff" },
    { title: "Formel a = Δv / Δt",            text: "Beschleunigung berechnen und interpretieren.",               icon: "formula",      colorA: "#60ce88", colorB: "#9ce7b6" },
    { title: "Einheit m/s²",                  text: "Was m/s² bedeutet – sprachlich und rechnerisch.",            icon: "units",        colorA: "#8a73ff", colorB: "#cabdff" },
    { title: "Positiv und negativ a",         text: "Schneller werden, langsamer werden, bremsen.",               icon: "sign",         colorA: "#ff8e5a", colorB: "#ffc981" },
    { title: "Gleichmässig beschleunigt",     text: "Konstante Beschleunigung – was das bedeutet.",               icon: "acceleration", colorA: "#27b6d7", colorB: "#84dff0" },
    { title: "v = v₀ + a·t",                 text: "Geschwindigkeit zu beliebigem Zeitpunkt berechnen.",         icon: "formula",      colorA: "#f66d93", colorB: "#f8acbf" },
    { title: "s = ½·a·t² (Ruhe)",            text: "Weg bei Start aus Ruhe – quadratisches Wachstum.",           icon: "formula",      colorA: "#5f9dff", colorB: "#9dc9ff" },
    { title: "Bremsen als Beschleunigung",    text: "Verzögerung ist negative Beschleunigung.",                   icon: "brake",        colorA: "#60ce88", colorB: "#9ce7b6" },
    { title: "v-t Diagramm",                 text: "Steigung im v-t Diagramm = Beschleunigung.",                 icon: "chart",        colorA: "#8a73ff", colorB: "#cabdff" },
    { title: "Boss – Beschleunigung",         text: "Alle Formeln und Diagramme zur Beschleunigung.",             icon: "chart",        colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "3": { title: "Bewegungsdiagramme", steps: [
    { title: "Drei Diagrammtypen",           text: "s-t, v-t und a-t Diagramme unterscheiden.",                icon: "chart",  colorA: "#5fa4ff", colorB: "#9fcfff" },
    { title: "s-t Diagramm lesen",           text: "Ort, Steigung und Phasen ablesen.",                       icon: "slope",  colorA: "#62d38a", colorB: "#9de9b8" },
    { title: "v-t Diagramm lesen",           text: "Geschwindigkeit und Beschleunigung ablesen.",             icon: "speed",  colorA: "#8c76ff", colorB: "#c8beff" },
    { title: "Fläche v-t = Weg",             text: "Zurückgelegter Weg als Fläche unter v-t.",                icon: "area",   colorA: "#ff9657", colorB: "#ffd182" },
    { title: "a-t Diagramm lesen",           text: "Beschleunigungsabschnitte physikalisch deuten.",         icon: "acceleration",colorA: "#25b7d8",colorB: "#86e1f1"},
    { title: "Text → Diagramm",              text: "Beschreibung in ein s-t oder v-t Diagramm übersetzen.",  icon: "graph",  colorA: "#f56e92", colorB: "#f7aec1" },
    { title: "Diagramm → Beschreibung",      text: "Aus einem Graphen eine Bewegung in Worten beschreiben.", icon: "graph",  colorA: "#5fa4ff", colorB: "#9fcfff" },
    { title: "Diagrammfehler finden",        text: "Typische Fehler in Diagrammen erkennen und korrigieren.",icon: "error",  colorA: "#62d38a", colorB: "#9de9b8" },
    { title: "Mehrteilige Bewegung",         text: "Mehrere Phasen in einem Diagramm analysieren.",          icon: "chart",  colorA: "#8c76ff", colorB: "#c8beff" },
    { title: "Boss – Diagramme",             text: "Alle drei Diagrammtypen in einer Boss-Aufgabe.",         icon: "chart",  colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "4": { title: "Reaktions- und Bremsweg", steps: [
    { title: "Reaktionszeit",               text: "Zeit zwischen Wahrnehmen und Bremsen.",                   icon: "car",    colorA: "#5ea3ff", colorB: "#9acbff" },
    { title: "Reaktionsweg berechnen",      text: "s_R = v · t_R – Weg während der Reaktion.",              icon: "formula",colorA: "#65d48a", colorB: "#a2edbe" },
    { title: "Bremsweg als Verzögerung",    text: "Bremsen = negative Beschleunigung.",                     icon: "brake",  colorA: "#8573ff", colorB: "#c6bcff" },
    { title: "Anhalteweg",                  text: "s_A = s_R + s_B – Gesamtweg bis zum Stillstand.",        icon: "formula",colorA: "#ff8f5b", colorB: "#ffd184" },
    { title: "Doppelte Geschwindigkeit",    text: "Warum der Bremsweg überproportional wächst.",             icon: "sign",   colorA: "#2ab8d8", colorB: "#89e3f2" },
    { title: "Sicherheitsabstand",          text: "Reicht der Abstand – Entscheidung mit Kinematik.",       icon: "encounter",colorA:"#f86785",colorB: "#f9a8bd" },
    { title: "Einfluss von Müdigkeit",      text: "Grössere Reaktionszeit → längerer Reaktionsweg.",        icon: "sign",   colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "Einfluss der Geschwindigkeit",text: "Daten zu 30 / 50 / 80 km/h analysieren.",               icon: "chart",  colorA: "#8f73ff", colorB: "#c2b6ff" },
    { title: "Anhalteweg im Diagramm",      text: "Reaktions- und Bremsphase im v-t Diagramm.",             icon: "chart",  colorA: "#ff8753", colorB: "#ffc173" },
    { title: "Boss – Hindernis",            text: "Vollständige Anhalteweganalyse in einem Szenario.",      icon: "chart",  colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "5": { title: "Freier Fall", steps: [
    { title: "Freier Fall als Beschleunigung",text: "Fallbewegung ohne Luftwiderstand verstehen.",             icon: "fall",   colorA: "#5ea3ff", colorB: "#9ac9ff" },
    { title: "Fallbeschleunigung g",          text: "g ≈ 9,81 m/s² – Bedeutung und Modell.",                   icon: "formula",colorA: "#65d48a", colorB: "#a2edbe" },
    { title: "Fallgeschwindigkeit v = g·t",   text: "Wie schnell ist der Körper nach t Sekunden?",             icon: "formula",colorA: "#8573ff", colorB: "#c6bcff" },
    { title: "Fallstrecke s = ½·g·t²",       text: "Wie weit fällt der Körper in t Sekunden?",                icon: "formula",colorA: "#ff8f5b", colorB: "#ffd184" },
    { title: "Gleich schnell fallen",         text: "Masse ist egal – alle fallen gleich schnell.",             icon: "fall",   colorA: "#2ab8d8", colorB: "#89e3f2" },
    { title: "Aufwärtswurf",                  text: "Anfangsgeschwindigkeit nach oben, g bremst ab.",          icon: "throw",  colorA: "#f86785", colorB: "#f9a8bd" },
    { title: "Höchster Punkt",                text: "v = 0 oben, aber a = g ≠ 0 – klassische Fehlvorstellung.", icon: "point", colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "Auf- und Abstieg",              text: "Symmetrie des Aufwärtswurfs erkennen.",                   icon: "throw",  colorA: "#8f73ff", colorB: "#c2b6ff" },
    { title: "Freier Fall im Diagramm",       text: "s-t und v-t Kurven beim freien Fall.",                    icon: "chart",  colorA: "#ff8753", colorB: "#ffc173" },
    { title: "Boss – Fallturm",               text: "Freier Fall und Aufwärtswurf in einer Aufgabe.",          icon: "chart",  colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "6": { title: "Analyse & Fehlvorstellungen", steps: [
    { title: "Gesuchte Grösse finden",       text: "In Textaufgaben Gegebenes und Gesuchtes identifizieren.",   icon: "model",   colorA: "#5ca2ff", colorB: "#9bc9ff" },
    { title: "Formel auswählen",             text: "Die passende Beziehung aus mehreren wählen.",               icon: "formula", colorA: "#64d38b", colorB: "#a2e9b9" },
    { title: "Überflüssige Infos",           text: "Irrelevante Angaben in Aufgaben herausfiltern.",            icon: "error",   colorA: "#8a73ff", colorB: "#c6bcff" },
    { title: "Einheitenkontrolle",           text: "Einheitenfehler finden und vermeiden.",                     icon: "units",   colorA: "#ff915a", colorB: "#ffd083" },
    { title: "Ø-Geschwindigkeit komplex",    text: "Durchschnitt über mehrere Abschnitte korrekt berechnen.",   icon: "speed",   colorA: "#24b6d8", colorB: "#84dff1" },
    { title: "Mehrphasige Bewegung",         text: "Phasen in gemischten Bewegungen sauber analysieren.",       icon: "chart",   colorA: "#5ca2ff", colorB: "#9bc9ff" },
    { title: "Fehlvorstellungen a",          text: "Typische Denkfehler zur Beschleunigung erkennen.",          icon: "error",   colorA: "#64d38b", colorB: "#a2e9b9" },
    { title: "Widersprüche erkennen",        text: "Wenn Text, Tabelle und Diagramm nicht übereinstimmen.",     icon: "error",   colorA: "#8a73ff", colorB: "#c6bcff" },
    { title: "Lösungsstrategie",             text: "Schritte der physikalischen Problemlösung planen.",         icon: "model",   colorA: "#ff915a", colorB: "#ffd083" },
    { title: "Boss – Analyse-Labor",         text: "Mehrschrittige Analyse und Fehlvorstellungen korrigieren.", icon: "chart",   colorA: "#20b76b", colorB: "#69d78f" },
  ]},

  "7": { title: "Boss-Kapitel", steps: [
    { title: "Bewegungsmodell erkennen",    text: "Gleichförmig oder beschleunigt – aus Daten entscheiden.",  icon: "model",   colorA: "#5c9fff", colorB: "#9acfff" },
    { title: "Ankunftszeit planen",         text: "Route und Zeit in einem Szenario kombinieren.",            icon: "car",     colorA: "#62d38b", colorB: "#9de9b9" },
    { title: "Beschleunigungsphase",        text: "v = v₀ + at und Diagramm in einer Aufgabe.",              icon: "acceleration",colorA:"#8972ff",colorB:"#c5bbff"},
    { title: "Verkehrsunfall vermeiden",    text: "Reaktionsweg + Bremsweg im Entscheidungs-Szenario.",      icon: "brake",   colorA: "#ff925a", colorB: "#ffd083" },
    { title: "Freier Fall komplett",        text: "Alle Formeln des freien Falls in einer Aufgabe.",         icon: "fall",    colorA: "#24b7d8", colorB: "#84e1f1" },
    { title: "Fehlerhafte Lösung",          text: "Komplette falsche Lösung analysieren und korrigieren.",   icon: "error",   colorA: "#f86785", colorB: "#f9a8bd" },
    { title: "Bewegung rekonstruieren",     text: "Aus Messpunkten eine Bewegung rekonstruieren.",           icon: "chart",   colorA: "#3dd18d", colorB: "#94ecb8" },
    { title: "Kinematik-Mix",              text: "Das passende Modell für verschiedene Situationen wählen.", icon: "model",   colorA: "#8f73ff", colorB: "#c2b6ff" },
    { title: "Mega-Boss: Station",         text: "Alle Kinematik-Konzepte in einer Mission vernetzen.",      icon: "chart",   colorA: "#ff8753", colorB: "#ffc173" },
    { title: "Final Boss",                 text: "5 Arenen – Meister der Kinematik beweisen.",              icon: "chart",   colorA: "#20b76b", colorB: "#69d78f" },
  ]},
};

// ─── Step content (theory + questions) keyed by step title ─────────────────
const STEP_CONTENT = {

  // ── MODULE 0 · Bewegung verstehen (Level 1–10) ───────────────────────────

  "Was ist Bewegung?": {
    theory: {
      kicker: "Modul 0 · Level 1",
      heading: "Was ist Bewegung?",
      paragraphs: [
        "In der Physik ist Bewegung präzise definiert: Ein Körper bewegt sich, wenn er seinen Ort mit der Zeit ändert. Nicht Kraft, Lärm oder Energie entscheiden – nur die Ortsänderung.",
        "Die Schlüsselfrage lautet: Hat sich die Position zwischen zwei Zeitpunkten verändert? Δs = s₂ − s₁. Wenn Δs ≠ 0, liegt Bewegung vor. Wenn Δs = 0, ruht der Körper.",
        "Bewegung braucht immer zwei Angaben zusammen: Ort und Zeit. Nur ein Ort allein sagt nichts. Erst 'der Ort verändert sich mit der Zeit' macht Bewegung messbar.",
      ],
      formula: "Δs = s₂ − s₁  (Δs ≠ 0 → Bewegung)",
      example: "Ball bei t₁ = 0 s an s₁ = 2 m. Bei t₂ = 3 s an s₂ = 11 m → Δs = 9 m → Bewegung.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Wann bewegt sich ein Körper physikalisch?", options: ["Wenn sich sein Ort mit der Zeit ändert.", "Wenn er schnell ist.", "Wenn eine Kraft auf ihn wirkt.", "Wenn er laut ist."], correct: 0, explanation: "Bewegung = Ortsänderung in der Zeit. Δs = s₂ − s₁ ≠ 0.", hint: "Was ändert sich bei Bewegung?" },
        { text: "Ein Auto steht 10 Minuten im Stau. Liegt physikalische Bewegung vor?", options: ["Nein – der Ort ändert sich nicht.", "Ja – der Motor läuft.", "Ja – die Zeit vergeht.", "Es kommt auf die Strecke an."], correct: 0, explanation: "Motorlaufen ≠ Bewegung. Nur die Ortsänderung entscheidet.", hint: "Ändert sich die Position des Autos?" },
      ],
      challenge: [
        { text: "Welche Aussage beschreibt Bewegung physikalisch korrekt?", options: ["Δs = s₂ − s₁ ≠ 0 in einem Zeitintervall.", "Die wirkende Kraft ist > 0.", "Die Geschwindigkeit ist stets > 0 m/s.", "Der Körper gibt Energie ab."], correct: 0, explanation: "Kraft kann wirken ohne Bewegung (Haftreibung). Entscheidend: Ortsänderung.", hint: "Formale Definition: Δs = ?" },
        { text: "Ein Pendel schwingt hin und her. Was gilt nach einer vollen Schwingung?", options: ["Es hat sich bewegt (Δs ≠ 0 während der Schwingung), Verschiebung gesamt = 0.", "Es hat sich nicht bewegt – es kehrt zurück.", "Nur die Hinbewegung zählt.", "Es kommt auf die Amplitude an."], correct: 0, explanation: "Während der Schwingung ändert sich der Ort ständig → Bewegung. Die Gesamtverschiebung = 0 bedeutet nicht, keine Bewegung stattgefunden hat.", hint: "Bewegung = Ortsänderung zu beliebigen Zeitpunkten." },
      ],
    },
  },

  "Das Bezugssystem": {
    theory: {
      kicker: "Modul 0 · Level 2",
      heading: "Bezugssysteme",
      paragraphs: [
        "Ob ein Körper 'ruht' oder 'sich bewegt' hängt davon ab, von wo man beobachtet. Diese Perspektive heisst Bezugssystem. Physik beschreibt Bewegung immer relativ zu einem gewählten Bezugssystem.",
        "Beispiel Zug: Jemand sitzt im fahrenden Zug und hält eine Tasse. Relativ zum Zug ruht die Tasse. Relativ zum Bahnhof bewegt sie sich mit 80 km/h. Beide Aussagen sind gleichzeitig korrekt.",
        "In der Schulphysik wählt man meist die Erde als ruhendes Bezugssystem. Das ist bequem und für alltägliche Situationen genau genug.",
      ],
      formula: "v_rel = v_A − v_B  (Geschwindigkeit von A relativ zu B)",
      example: "Auto A bei 10 m, Auto B bei 4 m. Im Bezugssystem von B: s_A = 10 − 4 = +6 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Wozu dient ein Bezugssystem?", options: ["Um Orte und Geschwindigkeiten eindeutig messen zu können.", "Damit die Achse immer bei 0 beginnt.", "Um sicherzustellen, dass v > 0.", "Weil Vektoren nur für Punkte definiert sind."], correct: 0, explanation: "Ohne Bezugssystem ist jede Ortsangabe mehrdeutig.", hint: "Relativ zu was wird gemessen?" },
        { text: "Du fährst im Zug. Deine Mitfahrerin sitzt dir gegenüber. Was siehst du?", options: ["Sie ruht – im Bezugssystem Zug ist ihr Δs = 0.", "Sie bewegt sich mit 80 km/h.", "Sie bewegt sich rückwärts.", "Es gibt keine eindeutige Antwort."], correct: 0, explanation: "Im gemeinsamen Bezugssystem Zug ruht sie relativ zu dir.", hint: "In welchem Bezugssystem beobachtest du?" },
      ],
      challenge: [
        { text: "A läuft mit 4 m/s nach rechts, B radelt mit 10 m/s nach rechts. Wie schnell erscheint A aus Sicht von B?", options: ["−6 m/s (scheint rückwärts zu gehen)", "+14 m/s", "+6 m/s", "0 m/s"], correct: 0, explanation: "v_A relativ zu B = 4 − 10 = −6 m/s. Minus: A bleibt hinter B zurück.", hint: "v_rel = v_A − v_B" },
        { text: "Welche Aussage über Bezugssysteme ist falsch?", options: ["Es gibt genau ein richtiges Bezugssystem.", "Ruhe und Bewegung sind relativ.", "Verschiedene Beobachter messen verschiedene Geschwindigkeiten.", "Das Bezugssystem muss zu Beginn festgelegt werden."], correct: 0, explanation: "Es gibt kein 'absolut richtiges' Bezugssystem. Alle Inertialsysteme sind gleichwertig.", hint: "Gibt es ein 'bevorzugtes' Bezugssystem?" },
      ],
    },
  },

  "Ort und Position": {
    theory: {
      kicker: "Modul 0 · Level 3",
      heading: "Ort und Position",
      paragraphs: [
        "Der Ort eines Körpers gibt an, wo er sich im Koordinatensystem befindet. In einer Dimension genügt eine einzige Zahl: s = 3 m bedeutet '3 Meter vom Ursprung in positiver Richtung'.",
        "Das Vorzeichen enthält die Richtungsinformation: s = +3 m und s = −3 m liegen gleich weit vom Ursprung entfernt, aber auf verschiedenen Seiten. Die positive Richtung wird zu Beginn der Aufgabe frei gewählt.",
        "Wichtig: Ort ist eine Momentaufnahme. s(t₀) = 5 m sagt nur, wo der Körper zum Zeitpunkt t₀ ist. Wie er dorthin kam, zeigt erst die Funktion s(t).",
      ],
      formula: "s(t₀) = Ort zum Zeitpunkt t₀ | Δs = s₂ − s₁",
      example: "Messung bei t = 2 s: s = −4 m → 4 Meter links vom Ursprung (wenn positiv = rechts).",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was bedeutet s = −7 m, wenn positiv = rechts gewählt wurde?", options: ["7 m links vom Ursprung.", "7 m/s nach links.", "Negativer Zeitpunkt.", "7 m unterhalb."], correct: 0, explanation: "Vorzeichen gibt Richtung. s = −7 m = 7 m in negativer Richtung = links.", hint: "Was bedeutet das negative Vorzeichen?" },
        { text: "Zwei Orte: s₁ = +5 m und s₂ = −5 m. Was ist gleich, was verschieden?", options: ["Gleicher Abstand, verschiedene Richtungen.", "Gleicher Ort.", "s₁ ist grösser als s₂.", "Beide liegen links."], correct: 0, explanation: "Betrag identisch (5 m), aber entgegengesetzte Richtungen vom Ursprung.", hint: "Vergleiche Betrag und Vorzeichen." },
      ],
      challenge: [
        { text: "Ein Körper befindet sich zuerst bei s₁ = −3 m und dann bei s₂ = +2 m. Was ist seine Verschiebung Δs?", options: ["Δs = +5 m", "Δs = −5 m", "Δs = −1 m", "Δs = +1 m"], correct: 0, explanation: "Δs = s₂ − s₁ = 2 − (−3) = +5 m. Bewegung in positiver Richtung.", hint: "Δs = s₂ − s₁" },
        { text: "s(t) = −2t + 6. Wo ist der Körper bei t = 3 s?", options: ["s = 0 m (am Ursprung)", "s = 6 m", "s = −2 m", "s = 3 m"], correct: 0, explanation: "s = −2·3 + 6 = −6 + 6 = 0. Der Körper befindet sich genau am Ursprung.", hint: "Setze t = 3 in die Gleichung ein." },
      ],
    },
  },

  "Zeit als Messgrösse": {
    theory: {
      kicker: "Modul 0 · Level 4",
      heading: "Zeit als physikalische Grösse",
      paragraphs: [
        "Zeit ist in der Kinematik die zweite unverzichtbare Grösse neben dem Ort. Man unterscheidet Zeitpunkte (t₁, t₂) – bestimmte Momente – und Zeitintervalle (Δt = t₂ − t₁) – die Dauer dazwischen.",
        "Die SI-Einheit der Zeit ist die Sekunde (Abkürzung: s). Häufige Umrechnungen: 1 min = 60 s, 1 h = 3600 s. In Formeln immer Sekunden verwenden, wenn die Geschwindigkeit in m/s gefragt ist.",
        "Erst mit zwei Zeitpunkten kann man Bewegung beschreiben: Wie hat sich der Ort von t₁ zu t₂ verändert? Ohne Zeitbezug ist Kinematik unmöglich.",
      ],
      formula: "Δt = t₂ − t₁  (Zeitintervall, immer ≥ 0)",
      example: "t₁ = 2 s, t₂ = 7 s → Δt = 5 s. In dieser Zeit legt das Auto eine Strecke zurück.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was ist ein Zeitintervall?", options: ["Die Dauer zwischen zwei Zeitpunkten: Δt = t₂ − t₁.", "Ein einzelner Moment.", "Die Geschwindigkeit geteilt durch die Zeit.", "Die Strecke pro Sekunde."], correct: 0, explanation: "Zeitintervall = Zeitspanne zwischen zwei Momenten.", hint: "Δt = ?" },
        { text: "Wie viele Sekunden sind 3 Minuten?", options: ["180 s", "30 s", "300 s", "18 s"], correct: 0, explanation: "1 min = 60 s → 3 min = 3 × 60 = 180 s.", hint: "1 Minute = 60 Sekunden" },
      ],
      challenge: [
        { text: "t₁ = 1,5 min und t₂ = 4 min. Wie gross ist Δt in Sekunden?", options: ["150 s", "5,5 s", "90 s", "240 s"], correct: 0, explanation: "Δt = (4 − 1,5) min = 2,5 min = 2,5 × 60 = 150 s.", hint: "Erst Differenz, dann umrechnen." },
        { text: "An welchem einzigen Zeitpunkt kann man Bewegung nicht beschreiben?", options: ["Man braucht immer mindestens zwei Zeitpunkte.", "Bei t = 0.", "Wenn er sich rückwärts bewegt.", "Das ist nie ein Problem."], correct: 0, explanation: "Bewegung erfordert Δs über Δt. Ein einzelner Zeitpunkt gibt keine Ortsänderung.", hint: "Was braucht man für Δs = s₂ − s₁?" },
      ],
    },
  },

  "Strecke vs. Verschiebung": {
    theory: {
      kicker: "Modul 0 · Level 5",
      heading: "Strecke und Verschiebung",
      paragraphs: [
        "Die zurückgelegte Strecke ist der gesamte Weg, unabhängig von der Richtung: 5 m vor und 5 m zurück ergeben 10 m Strecke. Sie ist immer positiv (oder null).",
        "Die Verschiebung Δs ist die Netto-Ortsänderung: Δs = s₂ − s₁. Wenn du am Startpunkt endest, ist Δs = 0 – egal wie weit du gelaufen bist. Verschiebung kann negativ sein.",
        "Diese Unterscheidung ist fundamental: Formelgrösse s meint oft die Verschiebung (inkl. Vorzeichen). Umgangssprache 'Strecke' meint oft den Gesamtweg. Achte immer genau auf den Kontext.",
      ],
      formula: "Verschiebung: Δs = s₂ − s₁  |  Strecke = |Weg insgesamt|",
      example: "Start s₁ = 0, läuft 8 m vor (s = 8), 3 m zurück (s₂ = 5). Strecke = 11 m. Δs = +5 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Läufer: s₁ = 0, läuft 10 m vor, dreht, läuft 4 m zurück. Verschiebung?", options: ["Δs = +6 m", "Δs = 14 m", "Δs = −4 m", "Δs = 10 m"], correct: 0, explanation: "s₂ = 10 − 4 = 6 m. Δs = 6 − 0 = +6 m. Zurückgelegte Strecke wäre 14 m.", hint: "Wo endet der Läufer? Δs = s₂ − s₁" },
        { text: "Welche Grösse kann NICHT negativ sein?", options: ["Zurückgelegte Strecke (Gesamtweg).", "Verschiebung Δs.", "Geschwindigkeit v.", "Beschleunigung a."], correct: 0, explanation: "Zurückgelegte Strecke ist immer ≥ 0. Alle anderen können negativ sein.", hint: "Kann man 'negative Wegstrecke' laufen?" },
      ],
      challenge: [
        { text: "Körper: 6 m vorwärts, 9 m rückwärts, 3 m vorwärts. Strecke und Verschiebung?", options: ["Strecke = 18 m, Δs = 0 m", "Strecke = 18 m, Δs = −6 m", "Strecke = 0 m, Δs = 18 m", "Strecke = 6 m, Δs = 0 m"], correct: 0, explanation: "Strecke = 6 + 9 + 3 = 18 m. Endort = 6 − 9 + 3 = 0. Δs = 0 − 0 = 0 m.", hint: "Strecke = Summe aller Beträge. Δs = Endort − Startort." },
        { text: "Finde den Fehler: 'Die Verschiebung eines Marathonläufers ist 42,2 km.'", options: ["Falsch – bei Rundkurs Start = Ziel, also Δs = 0 km.", "Richtig – er läuft 42,2 km.", "Hängt von der Route ab.", "Verschiebung hat keine Einheit."], correct: 0, explanation: "Bei Rundkurs Start = Ziel → Δs = 0. Zurückgelegte Strecke = 42,2 km.", hint: "Marathon: Endpunkt = Startpunkt?" },
      ],
    },
  },

  "Symbol s und Einheit m": {
    theory: {
      kicker: "Modul 0 · Level 6",
      heading: "Formelzeichen s und Einheit Meter",
      paragraphs: [
        "In der Physik trägt jede Grösse ein Formelzeichen. Für Strecke und Ort verwendet man meist s. Die SI-Einheit ist das Meter (m). Eine Angabe ohne Einheit ist physikalisch bedeutungslos.",
        "Häufige Untereinheiten: 1 km = 1000 m, 1 dm = 0,1 m, 1 cm = 0,01 m, 1 mm = 0,001 m. Für Berechnungen immer zuerst in Meter umrechnen.",
        "Beispiele vollständiger Angaben: s = 250 m (korrekt), s = 250 (falsch – Einheit fehlt), s = 0,25 km (korrekt – aber für Rechnungen umrechnen).",
      ],
      formula: "s [m]: 1 km = 1000 m | 1 cm = 0,01 m | 1 mm = 0,001 m",
      example: "s = 2,4 km = 2400 m = 240 000 cm.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Welche Angabe ist physikalisch vollständig?", options: ["s = 150 m", "s = 150", "150", "m = 150"], correct: 0, explanation: "Nur 'Zahlenwert + Einheit' ist eine vollständige Angabe.", hint: "Was braucht eine physikalische Grösse?" },
        { text: "Wie viele Meter sind 3,5 km?", options: ["3500 m", "350 m", "35 m", "3,5 m"], correct: 0, explanation: "1 km = 1000 m → 3,5 × 1000 = 3500 m.", hint: "1 km = ? m" },
      ],
      challenge: [
        { text: "Rechne 4800 mm in km um.", options: ["0,0048 km", "4,8 km", "0,48 km", "48 km"], correct: 0, explanation: "4800 mm ÷ 1000 = 4,8 m ÷ 1000 = 0,0048 km.", hint: "mm → m ÷ 1000, dann m → km ÷ 1000" },
        { text: "Problem: Aufgabe gibt s ohne Einheit. Was ist das Problem?", options: ["Ohne Einheit ist das Ergebnis physikalisch bedeutungslos – 5 könnte 5 m, 5 km oder 5 cm sein.", "Kein Problem – der Zahlenwert reicht.", "Man nimmt automatisch Meter.", "Es fehlt das Formelzeichen."], correct: 0, explanation: "Physikalische Grössen brauchen Zahlenwert UND Einheit.", hint: "Was bedeutet '5' ohne Einheit?" },
      ],
    },
  },

  "Symbol t und Einheit s": {
    theory: {
      kicker: "Modul 0 · Level 7",
      heading: "Formelzeichen t und Einheit Sekunde",
      paragraphs: [
        "Zeit wird mit dem Formelzeichen t bezeichnet. Die SI-Einheit ist die Sekunde, abgekürzt s. Hier liegt eine klassische Verwechslungsfalle: s als Einheit (Sekunde) ist NICHT dasselbe wie s als Formelzeichen (Strecke).",
        "Aus dem Kontext erkennt man den Unterschied: '20 s' bedeutet 20 Sekunden. 's = 20 m' bedeutet die Strecke beträgt 20 Meter. In Formeln steht s immer für die Strecke, in Einheiten immer für Sekunde.",
        "Umrechnungen: 1 min = 60 s, 1 h = 3600 s. Für alle Kinematik-Rechnungen mit m/s immer zuerst in Sekunden umrechnen.",
      ],
      formula: "t [s]: 1 min = 60 s | 1 h = 3600 s  ⚠ s [m] ≠ s [Einheit Sekunde]",
      example: "Formel v = s/t. Hier ist s die Strecke (m) und t die Zeit (s = Sekunden). v hat Einheit m/s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was bedeutet '45 s' in der Physik?", options: ["45 Sekunden (Zeitangabe).", "45 Meter Strecke.", "45 m/s Geschwindigkeit.", "Formelzeichen für Strecke."], correct: 0, explanation: "'45 s' = 45 Sekunden. Das s ist die Abkürzung der Einheit Sekunde.", hint: "s als Einheit = Sekunde." },
        { text: "Wie viele Sekunden sind 2,5 Minuten?", options: ["150 s", "250 s", "25 s", "2,5 s"], correct: 0, explanation: "2,5 × 60 = 150 s.", hint: "1 min = 60 s" },
      ],
      challenge: [
        { text: "Finde die Verwechslung: 'v = s/t = 300 s / 60 s = 5 s'", options: ["Ergebnis hat falsche Einheit: muss m/s sein. Erstes s = Strecke [m], t = Zeit [s].", "Alles richtig.", "Der Zahlenwert ist falsch.", "Die Formel ist falsch."], correct: 0, explanation: "v = s[m] / t[s] = 300 m / 60 s = 5 m/s. Das Ergebnis ist Geschwindigkeit, keine Zeit.", hint: "Welche Einheit hat Geschwindigkeit?" },
        { text: "Eine Aufgabe gibt 't = 0,5 h'. In Sekunden?", options: ["1800 s", "50 s", "30 s", "5400 s"], correct: 0, explanation: "0,5 h = 0,5 × 3600 = 1800 s.", hint: "1 h = 3600 s" },
      ],
    },
  },

  "Weg und Zeit": {
    theory: {
      kicker: "Modul 0 · Level 8",
      heading: "Weg und Zeit zusammen denken",
      paragraphs: [
        "Nur den Weg zu kennen reicht nicht: 100 m in 10 s ist sehr verschieden von 100 m in 100 s. Erst die Kombination aus Weg und Zeit beschreibt eine Bewegung vollständig.",
        "Das führt direkt zur Idee der Geschwindigkeit: Sie sagt, wie viel Weg pro Zeit zurückgelegt wird. Je grösser die Strecke in derselben Zeit, desto grösser die Geschwindigkeit.",
        "Vergleiche: Auto A legt 200 m in 10 s zurück. Auto B legt 200 m in 20 s zurück. Gleiche Strecke, aber A braucht halb so lang → A ist doppelt so schnell.",
      ],
      formula: "Schneller = mehr Weg in gleicher Zeit  ODER  gleicher Weg in weniger Zeit",
      example: "A: 200 m in 10 s → v = 20 m/s.  B: 200 m in 20 s → v = 10 m/s. A ist schneller.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Auto A fährt 300 m in 30 s. Auto B fährt 300 m in 15 s. Welches ist schneller?", options: ["Auto B – gleiche Strecke in weniger Zeit.", "Auto A – es fährt länger.", "Beide gleich schnell – gleiche Strecke.", "Kann man nicht sagen."], correct: 0, explanation: "B braucht halb so lange für dieselbe Strecke → doppelt so schnell.", hint: "Gleiche Strecke, wer braucht weniger Zeit?" },
        { text: "Gänger A geht 1000 m in 12 min. Gänger B geht 1500 m in 12 min. Wer ist schneller?", options: ["B – mehr Strecke in gleicher Zeit.", "A – weniger Strecke.", "Beide gleich – gleiche Zeit.", "Hängt von der Richtung ab."], correct: 0, explanation: "B legt in der gleichen Zeit mehr Weg zurück → B ist schneller.", hint: "Gleiche Zeit, wer legt mehr Strecke zurück?" },
      ],
      challenge: [
        { text: "A: 80 m in 8 s. B: 150 m in 12,5 s. Wer ist schneller?", options: ["B – v_B = 12 m/s > v_A = 10 m/s.", "A – v_A = 10 m/s > v_B = 8 m/s.", "Beide gleich schnell.", "Kann man nicht vergleichen."], correct: 0, explanation: "v_A = 80/8 = 10 m/s. v_B = 150/12,5 = 12 m/s. B ist schneller.", hint: "v = s / t für beide berechnen." },
        { text: "Welche Aussage ist FALSCH?", options: ["Mehr Zeit für die gleiche Strecke bedeutet höhere Geschwindigkeit.", "Weniger Zeit für die gleiche Strecke bedeutet höhere Geschwindigkeit.", "Mehr Strecke in gleicher Zeit bedeutet höhere Geschwindigkeit.", "v = s/t ist die Formel der Geschwindigkeit."], correct: 0, explanation: "Mehr Zeit für dieselbe Strecke = NIEDRIGERE Geschwindigkeit. v = s/t: Wenn t grösser wird, wird v kleiner.", hint: "Was passiert mit v, wenn t wächst und s gleich bleibt?" },
      ],
    },
  },

  "Bewegung im Alltag": {
    theory: {
      kicker: "Modul 0 · Level 9",
      heading: "Bewegung in Alltagssituationen",
      paragraphs: [
        "Kinematik beginnt mit sauberem Beschreiben. Bevor man rechnet, muss man eine Situation physikalisch korrekt lesen: Wer bewegt sich? Relativ wozu? In welche Richtung? Wie lange?",
        "Alltagssprache ist oft ungenau. 'Das Auto ist schnell' – relativ wozu? Physikalische Beschreibung ersetzt vage Worte durch Grössen: s, t, Δs, v.",
        "Wichtige Grundtypen: Körper ruht (Δs = 0), Körper bewegt sich gleichförmig (konstante v), Körper wird schneller oder langsamer (Beschleunigung). Diese drei Typen sind der Anfang aller Kinematik.",
      ],
      formula: "Ruhe: Δs = 0 | Gleichförmig: v = konst. | Beschleunigt: v ändert sich",
      example: "'Das Taxi steht 5 Minuten an der Ampel.' → Δs = 0, t = 300 s, v = 0.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Welche Situation beschreibt Bewegung korrekt?", options: ["Δs ≠ 0 zwischen zwei Zeitpunkten.", "Das Objekt macht Lärm.", "Eine Kraft wirkt auf das Objekt.", "Das Objekt hat grosse Masse."], correct: 0, explanation: "Nur Ortsänderung = Bewegung.", hint: "Definition von Bewegung?" },
        { text: "Person läuft 5 min, steht 2 min, läuft 3 min. Wann ist v = 0?", options: ["In den 2 Minuten Pause.", "In den ersten 5 Minuten.", "In den letzten 3 Minuten.", "Wenn sie schnell läuft."], correct: 0, explanation: "Stillstand: Δs = 0 → v = 0. Das ist die Pause.", hint: "Wann ist die Strecke = 0?" },
      ],
      challenge: [
        { text: "Rolltreppe (v = 0,5 m/s): Beobachter auf Rolltreppe sieht dich als ruhend, Beobachter am Boden mit 0,5 m/s. Wer hat recht?", options: ["Beide – im eigenen Bezugssystem korrekt.", "Nur der Beobachter am Boden.", "Du bist immer ruhend, da du stehst.", "Deine Geschwindigkeit ist immer 0."], correct: 0, explanation: "Bewegung ist relativ zum Bezugssystem. Beide beschreiben korrekt.", hint: "Bezugssystem entscheidet!" },
        { text: "Welcher Satz enthält einen physikalischen Fehler?", options: ["'Ein Körper beschleunigt immer dann, wenn er langsamer wird.' – Bremsen ist negative Beschleunigung, kein Widerspruch.", "'Der Ball ruht im Bezugssystem des Regals.'", "'Δs = 0 bedeutet: der Körper endet am Startpunkt.'", "'Strecke und Verschiebung können verschieden sein.'"], correct: 0, explanation: "Bremsen IST Beschleunigung (negativ). Der Satz klingt widersprüchlich, ist aber physikalisch korrekt.", hint: "Was bedeutet 'beschleunigen' in der Physik genau?" },
      ],
    },
  },

  "Boss – Bewegung": {
    theory: {
      kicker: "Modul 0 · Boss-Level",
      heading: "Boss: Bewegung verstehen",
      paragraphs: [
        "Du hast alle Grundbegriffe der Kinematik kennengelernt: Bewegung als Ortsänderung, Bezugssystem, Position und Ort, Zeit als Messgrösse, Strecke vs. Verschiebung, Symbole und Einheiten.",
        "Jetzt kommen diese Konzepte zusammen. Der Boss prüft, ob du sie nicht nur einzeln, sondern auch vernetzt anwenden kannst – wie es in echten Physikaufgaben nötig ist.",
        "Boss-Strategie: 1) Situation verstehen. 2) Gegeben/Gesucht aufschreiben. 3) Den richtigen Begriff wählen. 4) Rechnen oder begründen.",
      ],
      formula: "Δs = s₂ − s₁  |  Δt = t₂ − t₁  |  1 km = 1000 m  |  1 min = 60 s",
      example: "Erst lesen, dann verstehen – erst dann rechnen. Kein blindes Formeleinsetzen!",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Arena 1 – Bezugssystem: Du fährst im Bus. Ein Kind auf der Strasse sieht dich. Wer hat recht über deine Bewegung?", options: ["Beide – im eigenen Bezugssystem korrekt.", "Nur das Kind.", "Nur du – du sitzt still.", "Niemand – Bewegung ist absolut."], correct: 0, explanation: "Beide beschreiben korrekt, was sie in ihrem Bezugssystem sehen.", hint: "Bezugssystem = Perspektive." },
        { text: "Arena 2 – Strecke/Verschiebung: Läufer macht 2 Runden auf einer 400-m-Bahn. Verschiebung?", options: ["Δs = 0 m – wieder am Start.", "Δs = 800 m", "Δs = 400 m", "Δs = 1 Runde"], correct: 0, explanation: "Nach 2 Runden ist er wieder am Startpunkt. Δs = Endort − Startort = 0.", hint: "Wo endet er? Δs = s₂ − s₁." },
        { text: "Arena 3 – Einheiten: s = 2 km und t = 4 min. Rechne um.", options: ["s = 2000 m, t = 240 s", "s = 2 m, t = 4 s", "s = 200 m, t = 40 s", "s = 2000 cm, t = 4 s"], correct: 0, explanation: "2 km = 2000 m. 4 min = 240 s.", hint: "1 km = 1000 m, 1 min = 60 s" },
        { text: "Arena 4 – Bewegung: Δs = 0 nach 10 s. Kann der Körper sich bewegt haben?", options: ["Ja – er kann hin- und hergegangen sein.", "Nein – Δs = 0 beweist Ruhe.", "Nur wenn v = 0 war.", "Nur auf gerader Strecke."], correct: 0, explanation: "Δs = 0 bedeutet Endpunkt = Startpunkt, nicht zwingend Ruhe. Strecke kann > 0 sein.", hint: "Verwechsle Verschiebung und Strecke nicht." },
      ],
      challenge: [
        { text: "Körper A: startet bei s = −3 m, endet nach 4 s bei s = +5 m. Was lässt sich sicher sagen?", options: ["Δs = +8 m sicher. Strecke ≥ 8 m, aber ohne Weginfo nicht genau bestimmbar.", "Strecke = 8 m und Δs = 8 m.", "Δs = −8 m.", "Ohne Richtung keine Aussage."], correct: 0, explanation: "Δs = 5 − (−3) = +8 m ist sicher. Strecke könnte 8 m sein (direkter Weg), bei Richtungswechsel mehr.", hint: "Strecke ≥ |Δs| immer." },
        { text: "Fehler finden: 'Auto fährt 120 km in 2 h. Verschiebung = 120 km.' Was fehlt?", options: ["Verschiebung = Endort − Startort. Ohne Endpunkt unbestimmbar.", "Fehler: 120 km in 2 h ist unrealistisch.", "Strecke und Verschiebung sind immer gleich.", "Die Einheit km ist falsch."], correct: 0, explanation: "Δs = s₂ − s₁. Ohne Endpunkt kann man Δs nicht bestimmen.", hint: "Was braucht man für Δs = s₂ − s₁?" },
      ],
    },
  },

  // ── MODULE 1 · Geschwindigkeit (Level 1–10) ─────────────────────────────

  "Was ist Geschwindigkeit?": {
    theory: {
      kicker: "Modul 1 · Level 1",
      heading: "Was ist Geschwindigkeit?",
      paragraphs: [
        "Geschwindigkeit beschreibt, wie schnell ein Körper seinen Ort ändert. Umgangssprachlich sagt man 'schnell' oder 'langsam' – die Physik macht das messbar: Wie viel Weg legt ein Körper pro Zeiteinheit zurück?",
        "Wichtig ist der Unterschied zwischen Durchschnittsgeschwindigkeit und Momentangeschwindigkeit. Die Durchschnittsgeschwindigkeit gilt für ein ganzes Zeitintervall: v = Δs / Δt. Die Momentangeschwindigkeit beschreibt den Augenblick.",
        "Geschwindigkeit ist eine gerichtete Grösse (Vektor). In einer Dimension reicht aber oft ein Vorzeichen: positiv = vorwärts, negativ = rückwärts.",
      ],
      formula: "v = Δs / Δt  (Durchschnittsgeschwindigkeit)",
      example: "Auto fährt 120 m in 8 s → v = 120 / 8 = 15 m/s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was beschreibt die Durchschnittsgeschwindigkeit?", options: ["Den zurückgelegten Weg pro Zeitintervall.", "Die maximale Geschwindigkeit.", "Die Richtung der Bewegung.", "Den Abstand zum Startpunkt."], correct: 0, explanation: "v = Δs / Δt – Weg geteilt durch Zeit.", hint: "Welche Formel kennst du für v?" },
        { text: "Ein Läufer braucht 50 s für 200 m. Welche Aussage ist richtig?", options: ["Seine Durchschnittsgeschwindigkeit ist 4 m/s.", "Er hat sich immer mit 4 m/s bewegt.", "Seine Momentangeschwindigkeit ist immer 4 m/s.", "Er ist 4 m in 50 s gelaufen."], correct: 0, explanation: "v = 200 / 50 = 4 m/s. Das ist die Durchschnitt, nicht die Momentangeschwindigkeit.", hint: "v = s / t" },
      ],
      challenge: [
        { text: "Was ist der Unterschied zwischen Durchschnitts- und Momentangeschwindigkeit?", options: ["Durchschnitt: v = Δs/Δt über ein Intervall. Moment: Geschwindigkeit zu einem Zeitpunkt (Δt → 0).", "Beide sind identisch.", "Momentangeschwindigkeit ist immer grösser.", "Durchschnittsgeschwindigkeit gilt nur für gerade Strecken."], correct: 0, explanation: "Die Momentangeschwindigkeit ist der Grenzwert des Differenzenquotienten für Δt → 0.", hint: "Was passiert wenn Δt sehr klein wird?" },
        { text: "Fahrzeug fährt 30 s mit 20 m/s, dann 30 s mit 10 m/s. Was ist die Durchschnittsgeschwindigkeit über 60 s?", options: ["15 m/s", "20 m/s", "10 m/s", "Nicht bestimmbar."], correct: 0, explanation: "Gesamt-s = 30·20 + 30·10 = 600 + 300 = 900 m. v = 900/60 = 15 m/s.", hint: "Erst Gesamtstrecke, dann v = s_ges / t_ges" },
      ],
    },
  },

  "Formel v = s / t": {
    theory: {
      kicker: "Modul 1 · Level 2",
      heading: "Die Formel v = s / t",
      paragraphs: [
        "Die Grundformel der gleichförmigen Bewegung lautet: v = s / t. v ist die Geschwindigkeit, s die zurückgelegte Strecke und t das Zeitintervall. Alle drei Grössen hängen direkt zusammen.",
        "Aus dieser Formel lassen sich die anderen Grössen durch Umstellen berechnen: s = v · t (Weg) und t = s / v (Zeit). Das sogenannte 'Dreiecks-Mnemonic' hilft beim Merken: decke die gesuchte Grösse ab.",
        "Achtung: Die Formel gilt exakt nur für gleichförmige Bewegung. Bei nicht konstanter Geschwindigkeit liefert v = s/t nur den Durchschnittswert.",
      ],
      formula: "v = s / t  ↔  s = v · t  ↔  t = s / v",
      example: "v = 25 m/s, t = 12 s → s = 25 · 12 = 300 m.",
    },
    question: {
      type: "speed-lab",
      s: 180,
      minV: 5,
      maxV: 30,
      defaultV: 12,
      followUp: [
        { text: "Du hast gerade beobachtet: Auto legt 180 m zurück. Wenn es 9 Sekunden braucht – was ist v?", options: ["20 m/s", "9 m/s", "180 m/s", "0,05 m/s"], correct: 0, explanation: "v = s/t = 180/9 = 20 m/s. Die Formel v = s ÷ t gibt dir die Geschwindigkeit.", hint: "v = s / t" },
      ],
    },
  },

  "Einheit m/s": {
    theory: {
      kicker: "Modul 1 · Level 3",
      heading: "Einheit m/s und km/h",
      paragraphs: [
        "Die SI-Einheit der Geschwindigkeit ist Meter pro Sekunde: m/s. Im Alltag ist Kilometer pro Stunde (km/h) gebräuchlicher – Tacho, Tempolimit, Wetterberichte nutzen km/h.",
        "Umrechnungsfaktoren: 1 m/s = 3,6 km/h. Merkhilfe: 1 m/s bedeutet 1 Meter in 1 Sekunde. In 1 Stunde (3600 s) legt man damit 3600 m = 3,6 km zurück → 1 m/s = 3,6 km/h.",
        "Für Berechnungen mit Formeln (v = s/t mit s in m, t in s) muss die Geschwindigkeit immer in m/s angegeben sein. Wenn km/h gegeben ist, zuerst umrechnen!",
      ],
      formula: "1 m/s = 3,6 km/h  |  v [km/h] ÷ 3,6 = v [m/s]",
      example: "72 km/h ÷ 3,6 = 20 m/s.  |  5 m/s × 3,6 = 18 km/h.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Wie viele km/h entsprechen 10 m/s?", options: ["36 km/h", "10 km/h", "100 km/h", "3,6 km/h"], correct: 0, explanation: "10 m/s × 3,6 = 36 km/h.", hint: "m/s × 3,6 = km/h" },
        { text: "Ein Auto fährt 90 km/h. Wie viel ist das in m/s?", options: ["25 m/s", "90 m/s", "32,4 m/s", "9 m/s"], correct: 0, explanation: "90 ÷ 3,6 = 25 m/s.", hint: "km/h ÷ 3,6 = m/s" },
      ],
      challenge: [
        { text: "Radfahrer: 15 m/s. Schülerin: 54 km/h. Wer ist schneller?", options: ["Schülerin: 54 km/h = 15 m/s – beide gleich schnell.", "Radfahrer – 15 m/s ist mehr.", "Schülerin – 54 km/h ist mehr.", "Kann man nicht vergleichen."], correct: 0, explanation: "54 ÷ 3,6 = 15 m/s. Exakt gleich schnell.", hint: "Erst beide in dieselbe Einheit umrechnen." },
        { text: "Aufgabe: s = 3 km, t = 4 min. Berechne v in m/s.", options: ["12,5 m/s", "0,75 m/s", "750 m/s", "0,0125 m/s"], correct: 0, explanation: "s = 3000 m, t = 240 s. v = 3000/240 = 12,5 m/s.", hint: "Zuerst s in m und t in s umrechnen!" },
      ],
    },
  },

  "v berechnen": {
    theory: {
      kicker: "Modul 1 · Level 4",
      heading: "Geschwindigkeit berechnen",
      paragraphs: [
        "Der erste Schritt jeder Aufgabe: Gegebene und gesuchte Grössen identifizieren. Bei v = s/t sind die Gegebenen Strecke (s) und Zeit (t), gesucht ist Geschwindigkeit (v).",
        "Einheiten immer zuerst vereinheitlichen: s in Meter (m) und t in Sekunden (s), bevor man rechnet. Ergebnis trägt die Einheit m/s.",
        "Typische Fehlerquellen: Einheit vergessen, km und m verwechseln, min statt s einsetzen. Checke am Ende: Ist das Ergebnis plausibel? Ein Fussgänger mit 500 m/s wäre unphysikalisch.",
      ],
      formula: "v = s / t  (s in m, t in s → v in m/s)",
      example: "s = 5 km = 5000 m, t = 4 min = 240 s → v = 5000/240 ≈ 20,8 m/s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Fahrrad: s = 900 m, t = 3 min. Berechne v in m/s.", options: ["5 m/s", "300 m/s", "0,05 m/s", "180 m/s"], correct: 0, explanation: "t = 3·60 = 180 s. v = 900/180 = 5 m/s.", hint: "t in Sekunden umrechnen! v = s/t" },
        { text: "Zug: s = 250 m, t = 10 s. Berechne v.", options: ["25 m/s", "2500 m/s", "0,04 m/s", "2,5 m/s"], correct: 0, explanation: "v = 250/10 = 25 m/s.", hint: "v = s / t" },
      ],
      challenge: [
        { text: "Rennwagen: s = 4,5 km in 2,5 min. v in km/h?", options: ["108 km/h", "30 km/h", "1,8 km/h", "1800 km/h"], correct: 0, explanation: "v = 4,5 km / (2,5/60 h) = 4,5 / 0,04167 = 108 km/h. Oder: v = 4500/150 = 30 m/s = 108 km/h.", hint: "Weg in km, Zeit in Stunden → v in km/h. Oder m und s, dann × 3,6." },
        { text: "Körper legt in 2 s den Weg von s₁ = 4 m bis s₂ = 20 m zurück. Berechne v.", options: ["8 m/s", "10 m/s", "12 m/s", "16 m/s"], correct: 0, explanation: "Δs = s₂ − s₁ = 20 − 4 = 16 m. v = 16/2 = 8 m/s.", hint: "Δs = s₂ − s₁, dann v = Δs / t" },
      ],
    },
  },

  "s und t berechnen": {
    theory: {
      kicker: "Modul 1 · Level 5",
      heading: "Strecke und Zeit berechnen",
      paragraphs: [
        "Die Formel v = s/t lässt sich nach jeder der drei Grössen umstellen. Wenn v und t bekannt sind, berechnet man die Strecke: s = v · t. Wenn v und s bekannt sind, berechnet man die Zeit: t = s / v.",
        "Schema der Umstellung: Gegebene Grössen identifizieren → unbekannte Grösse bestimmen → passende Formel wählen → Einheiten prüfen → rechnen → Plausibilitätscheck.",
        "Merkhilfe: Im 'vst-Dreieck' decke die gesuchte Grösse ab. Was übrig bleibt, ist die Rechenoperation: v oben → dividieren. s und t unten → multiplizieren oder dividieren.",
      ],
      formula: "s = v · t  |  t = s / v  |  v = s / t",
      example: "v = 30 m/s, t = 4 s → s = 30 · 4 = 120 m. | v = 20 m/s, s = 300 m → t = 300/20 = 15 s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v = 8 m/s, t = 15 s. Wie gross ist s?", options: ["120 m", "0,53 m", "23 m", "1,875 m"], correct: 0, explanation: "s = v · t = 8 · 15 = 120 m.", hint: "s = v · t" },
        { text: "v = 6 m/s, s = 90 m. Wie lange dauert die Fahrt?", options: ["15 s", "540 s", "0,067 s", "84 s"], correct: 0, explanation: "t = s / v = 90 / 6 = 15 s.", hint: "t = s / v" },
      ],
      challenge: [
        { text: "Zug fährt mit 54 km/h. Wie weit kommt er in 20 Minuten? (Antwort in m)", options: ["18 000 m", "1080 m", "300 m", "324 000 m"], correct: 0, explanation: "v = 54/3,6 = 15 m/s. t = 20·60 = 1200 s. s = 15 · 1200 = 18 000 m.", hint: "Zuerst km/h → m/s, dann s = v · t" },
        { text: "Körper A mit v = 10 m/s muss 1,2 km zurücklegen. Wie lange dauert das in Minuten?", options: ["2 min", "120 min", "0,12 min", "12 min"], correct: 0, explanation: "s = 1200 m. t = 1200/10 = 120 s = 2 min.", hint: "t = s / v, dann Sekunden in Minuten umrechnen." },
      ],
    },
  },

  "Gleichförmige Bewegung": {
    theory: {
      kicker: "Modul 1 · Level 6",
      heading: "Gleichförmige Bewegung",
      paragraphs: [
        "Bei der gleichförmigen Bewegung ist die Geschwindigkeit konstant: v = konst. Der Körper legt in gleichen Zeitintervallen immer gleich grosse Strecken zurück.",
        "Erkennungszeichen: Im s-t-Diagramm ist die Kurve eine Gerade mit konstanter Steigung (Steigung = v). Im v-t-Diagramm ist die Kurve eine horizontale Gerade.",
        "In der Natur gibt es keine perfekt gleichförmige Bewegung – Reibung und andere Kräfte ändern die Geschwindigkeit immer leicht. Aber als Modell ist sie unverzichtbar für die ersten Berechnungen.",
      ],
      formula: "v = konst.  →  s = v · t  (lineare Funktion von t)",
      example: "Auto mit v = 20 m/s: nach 1 s → 20 m, nach 2 s → 40 m, nach 3 s → 60 m.",
    },
    question: {
      type: "race",
      carA: { v: 20, color: "#5ea3ff", label: "Auto A" },
      carB: { v: 14, color: "#ff8753", label: "Auto B" },
      s: 280,
      followUp: [
        { text: "Auto A braucht 14 s für 280 m. Auto B braucht 20 s für 280 m. Welche Geschwindigkeiten haben sie?", options: ["v_A = 20 m/s, v_B = 14 m/s", "v_A = 14 m/s, v_B = 20 m/s", "Beide 280 m/s", "Kann man nicht sagen."], correct: 0, explanation: "v = s/t: v_A = 280/14 = 20 m/s, v_B = 280/20 = 14 m/s. Bei gleichförmiger Bewegung ist v konstant.", hint: "v = s / t für jedes Auto" },
      ],
    },
  },

  "Tabelle der Bewegung": {
    theory: {
      kicker: "Modul 1 · Level 7",
      heading: "Strecken-Zeit-Tabellen lesen",
      paragraphs: [
        "Eine Bewegungstabelle listet Zeitpunkte und dazugehörige Orte auf. Man kann daraus direkt die Geschwindigkeit ablesen: v = Δs / Δt zwischen je zwei Zeilen.",
        "Bei gleichförmiger Bewegung ist Δs/Δt in jeder Zeile gleich. Bei nicht gleichförmiger Bewegung ändert sich v von Abschnitt zu Abschnitt – man berechnet dann Abschnittsgeschwindigkeiten.",
        "Tabellen aufstellen: Für gegebene v und Start-s berechnet man s(t) = s₀ + v · t. Erst t-Werte in die erste Spalte schreiben, dann s-Werte berechnen und eintragen.",
      ],
      formula: "v = Δs / Δt  (aus benachbarten Tabellenzeilen)",
      example: "t: 0 | 2 | 4 | 6 s  →  s: 0 | 10 | 20 | 30 m → v = 10/2 = 5 m/s (konstant).",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Tabelle: t = 0 s: s = 0 m; t = 3 s: s = 12 m; t = 6 s: s = 24 m. Ist das gleichförmig?", options: ["Ja – v = 12/3 = 4 m/s konstant.", "Nein – s wird grösser.", "Nein – v wäre 8 m/s.", "Kann man nicht bestimmen."], correct: 0, explanation: "v = Δs/Δt = 12/3 = 4 m/s in beiden Abschnitten → gleichförmig.", hint: "v = Δs / Δt in jedem Abschnitt berechnen." },
        { text: "v = 7 m/s, s₀ = 0. Fülle die Tabelle: s bei t = 4 s?", options: ["28 m", "7 m", "4 m", "11 m"], correct: 0, explanation: "s = v · t = 7 · 4 = 28 m.", hint: "s = v · t" },
      ],
      challenge: [
        { text: "Tabelle: t = 0 s: s = 5 m; t = 2 s: s = 15 m; t = 5 s: s = 30 m. Welche Aussage stimmt?", options: ["v₁ = 5 m/s (0→2 s), v₂ = 5 m/s (2→5 s) – gleichförmig mit v = 5 m/s.", "v₁ = 5 m/s, v₂ = 6 m/s – nicht gleichförmig.", "s₀ = 5 m bedeutet, der Körper ruht zuerst.", "v = 30/5 = 6 m/s konstant."], correct: 0, explanation: "v₁ = (15−5)/2 = 5 m/s. v₂ = (30−15)/3 = 5 m/s. Beide gleich → gleichförmig.", hint: "v = Δs/Δt für jeden Abschnitt berechnen." },
        { text: "Körper: s₀ = 20 m, v = −3 m/s (rückwärts). s bei t = 6 s?", options: ["2 m", "38 m", "−18 m", "20 m"], correct: 0, explanation: "s = 20 + (−3) · 6 = 20 − 18 = 2 m.", hint: "s = s₀ + v · t, v ist negativ!" },
      ],
    },
  },

  "s-t Diagramm": {
    theory: {
      kicker: "Modul 1 · Level 8",
      heading: "Das s-t-Diagramm",
      paragraphs: [
        "Im s-t-Diagramm (Ort-Zeit-Diagramm) trägt man auf der x-Achse die Zeit t und auf der y-Achse den Ort s auf. Jeder Punkt im Diagramm beschreibt: 'Zur Zeit t ist der Körper an Ort s.'",
        "Die Steigung der Kurve im s-t-Diagramm ist die Geschwindigkeit: v = Δs / Δt = tan(α). Steilere Gerade = höhere Geschwindigkeit. Horizontale Linie = Ruhe (v = 0). Fallende Linie = Bewegung in negativer Richtung (v < 0).",
        "Bei gleichförmiger Bewegung ist die s-t-Kurve eine Gerade. Schneidet die Gerade die s-Achse nicht im Ursprung, hat der Körper einen Startort s₀ ≠ 0.",
      ],
      formula: "Steigung im s-t-Diagramm = v = Δs / Δt",
      example: "Gerade von (0; 0) bis (5; 25) → Steigung = 25/5 = 5 m/s.",
    },
    question: {
      type: "st-live",
      v: 10,
      s: 200,
      followUp: [
        { text: "Das s-t-Diagramm zeigt eine Gerade von (0; 0) bis (20 s; 200 m). Was ist die Geschwindigkeit?", options: ["10 m/s – Steigung = Δs/Δt = 200/20", "20 m/s", "200 m/s", "0,1 m/s"], correct: 0, explanation: "Steigung im s-t-Diagramm = v = Δs/Δt = 200 m / 20 s = 10 m/s.", hint: "Steigung der Geraden = v = Δs / Δt" },
      ],
    },
  },

  "Durchschnittsgeschwindigkeit": {
    theory: {
      kicker: "Modul 1 · Level 9",
      heading: "Durchschnittsgeschwindigkeit",
      paragraphs: [
        "Die Durchschnittsgeschwindigkeit über eine Strecke mit verschiedenen Abschnitten ist NICHT der Durchschnitt der einzelnen Geschwindigkeiten – das ist ein häufiger Fehler!",
        "Richtige Formel: v_Ø = Gesamtstrecke / Gesamtzeit = (s₁ + s₂ + ...) / (t₁ + t₂ + ...). Zuerst Strecke und Zeit jedes Abschnitts berechnen, dann alles addieren.",
        "Beispiel für den Fehler: Auto A fährt 1 km mit 10 m/s, dann 1 km mit 20 m/s. Durchschnitt ≠ 15 m/s! Korrekte Rechnung: t₁ = 100 s, t₂ = 50 s → v_Ø = 2000/150 ≈ 13,3 m/s.",
      ],
      formula: "v_Ø = s_ges / t_ges = (s₁+s₂) / (t₁+t₂)",
      example: "s₁ = 300 m, v₁ = 15 m/s → t₁ = 20 s. s₂ = 200 m, v₂ = 10 m/s → t₂ = 20 s. v_Ø = 500/40 = 12,5 m/s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Person geht 500 m in 100 s, dann 300 m in 60 s. v_Ø?", options: ["5 m/s", "4 m/s", "4,5 m/s", "6 m/s"], correct: 0, explanation: "s_ges = 800 m, t_ges = 160 s. v = 800/160 = 5 m/s.", hint: "v_Ø = s_ges / t_ges" },
        { text: "Was ist der häufigste Fehler bei der Durchschnittsgeschwindigkeit?", options: ["Die einzelnen v-Werte werden gemittelt statt s_ges/t_ges zu berechnen.", "Die Einheit wird vergessen.", "t und s werden verwechselt.", "Nur der höchste v-Wert wird genommen."], correct: 0, explanation: "Arithmetisches Mittel der v-Werte ist falsch, weil die Abschnitte gleich lange Zeit, nicht gleich lange Strecke dauern müssen.", hint: "Wie berechnet man v_Ø korrekt?" },
      ],
      challenge: [
        { text: "Hin: 60 km mit 120 km/h. Zurück: 60 km mit 60 km/h. v_Ø für die gesamte Strecke?", options: ["80 km/h", "90 km/h", "75 km/h", "Nicht bestimmbar."], correct: 0, explanation: "t_hin = 60/120 = 0,5 h. t_rück = 60/60 = 1 h. v_Ø = 120/(0,5+1) = 120/1,5 = 80 km/h.", hint: "s_ges = 120 km. t_ges = t_hin + t_rück. v = s/t." },
        { text: "Warum ist v_Ø bei gleichem Hin/Rück-Weg immer kleiner als das arithmetische Mittel der Geschwindigkeiten (ausser bei v₁ = v₂)?", options: ["Weil man bei niedrigerer v mehr Zeit braucht – der langsamere Abschnitt 'zieht' den Durchschnitt stärker runter.", "Weil die Strecken verschieden lang sind.", "Weil Zeit quadratisch eingeht.", "Das stimmt nicht – beide Methoden geben dasselbe Ergebnis."], correct: 0, explanation: "Bei v₁ ≠ v₂ und gleicher Strecke dauert der langsamere Abschnitt länger – er gewichtet den Durchschnitt stärker. Das harmonische Mittel liegt immer unter dem arithmetischen.", hint: "Wer verbraucht mehr Zeit: der schnelle oder langsame Abschnitt?" },
      ],
    },
  },

  "Boss – Geschwindigkeit": {

    theory: {
      kicker: "Modul 1 · Boss-Level",
      heading: "Boss: Geschwindigkeit",
      paragraphs: [
        "Du hast alle Werkzeuge: v = s/t und Umstellungen, Einheitenumrechnung m/s ↔ km/h, gleichförmige Bewegung, s-t-Diagramme und Durchschnittsgeschwindigkeit.",
        "Der Boss prüft, ob du diese Konzepte in ungewohnten Situationen richtig kombinierst. Lies jede Frage genau und entscheide, welches Werkzeug passt.",
        "Strategie: 1) Gegeben/Gesucht. 2) Einheiten prüfen. 3) Richtige Formel. 4) Plausibilität.",
      ],
      formula: "v = s/t  |  s = v·t  |  t = s/v  |  v_Ø = s_ges/t_ges  |  m/s × 3,6 = km/h",
      example: "Boss-Aufgaben verbinden mehrere Abschnitte, verschiedene Einheiten und Diagramm-Lesekompetenz.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Arena 1: Zug fährt 3 km in 4 Minuten. v in km/h?", options: ["45 km/h", "0,75 km/h", "12 km/h", "720 km/h"], correct: 0, explanation: "t = 4/60 h. v = 3/(4/60) = 3·60/4 = 45 km/h.", hint: "t in Stunden, s in km → v in km/h." },
        { text: "Arena 2: Im s-t-Diagramm haben zwei Geraden den selben Startpunkt. Gerade A hat Steigung 8, Gerade B Steigung 3. Welche Aussage stimmt?", options: ["A bewegt sich schneller (v_A = 8 m/s > v_B = 3 m/s) und legt nach 5 s 25 m mehr zurück.", "B ist schneller.", "Beide gleich schnell.", "Die Steigung gibt die Strecke an, nicht v."], correct: 0, explanation: "Steigung im s-t = v. A hat v = 8, B hat v = 3. Nach 5 s: Δs = (8−3)·5 = 25 m.", hint: "Steigung s-t = v. Mehr Steigung = mehr v." },
        { text: "Arena 3: v_Ø-Falle. Hinweg: 200 m mit 10 m/s. Rückweg: 200 m mit 20 m/s. v_Ø = ?", options: ["13,3 m/s", "15 m/s", "10 m/s", "20 m/s"], correct: 0, explanation: "t₁ = 20 s, t₂ = 10 s. v_Ø = 400/30 ≈ 13,3 m/s. Nicht 15 m/s!", hint: "v_Ø = s_ges / t_ges. Nicht arithmetisches Mittel!" },
        { text: "Arena 4: Einheit. Gib 130 km/h in m/s an.", options: ["36,1 m/s", "468 m/s", "130 m/s", "13 m/s"], correct: 0, explanation: "130 / 3,6 ≈ 36,1 m/s.", hint: "km/h ÷ 3,6 = m/s" },
      ],
      challenge: [
        { text: "Boss-Challenge: A startet bei s₀ = 0 mit v = 5 m/s. B startet 20 s später bei s₀ = 0 mit v = 15 m/s. Nach wie vielen Sekunden (ab A's Start) holt B A ein?", options: ["30 s nach A's Start", "10 s nach B's Start", "20 s nach A's Start", "Nie"], correct: 0, explanation: "B startet bei t = 20 s. Gleichung: 15·(t−20) = 5·t → 15t−300 = 5t → 10t = 300 → t = 30 s.", hint: "Ansatz: s_A = s_B. 5t = 15(t−20). Löse nach t." },
        { text: "Fehler korrigieren: 'v_Ø = (10 + 20 + 30) / 3 = 20 m/s'. Wann stimmt das – und wann nicht?", options: ["Stimmt nur wenn die Abschnitte gleich lang dauern (gleiche Zeit, verschiedene Wege). Stimmt nicht wenn alle dieselbe Strecke haben.", "Immer richtig.", "Nie richtig.", "Nur für km/h gültig."], correct: 0, explanation: "Arithmetisches Mittel der v-Werte gilt nur wenn alle Zeitintervalle gleich sind (gleiche Δt). Bei gleichen Streckenabschnitten muss s_ges/t_ges berechnet werden.", hint: "Wann darf man v-Werte einfach mitteln?" },
      ],
    },
  },

  // ── MODULE 2 · Beschleunigung ─────────────────────────────────────────────

  "Was ist Beschleunigung?": {
    theory: {
      kicker: "Modul 2 · Level 1",
      heading: "Was ist Beschleunigung?",
      paragraphs: [
        "Beschleunigung beschreibt, wie sich die Geschwindigkeit in der Zeit ändert. Wenn ein Auto von 0 auf 60 km/h anzieht, wird es schneller – das ist positive Beschleunigung. Wenn es bremst, nimmt die Geschwindigkeit ab – das ist negative Beschleunigung (Verzögerung).",
        "Die Formel lautet: a = Δv / Δt. Das Δ-Zeichen bedeutet 'Änderung von'. Also: Beschleunigung = Geschwindigkeitsänderung geteilt durch die dafür benötigte Zeit.",
        "Entscheidend ist: Beschleunigung erfordert keine hohe Geschwindigkeit – nur eine Änderung. Ein Körper, der mit 100 m/s gleichförmig fährt, hat a = 0. Ein Körper der von 0 auf 2 m/s hochfährt, beschleunigt.",
      ],
      formula: "a = Δv / Δt = (v₂ − v₁) / (t₂ − t₁)  [m/s²]",
      example: "Auto: v₁ = 0, v₂ = 20 m/s, Δt = 4 s → a = 20/4 = 5 m/s².",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was bedeutet a = 3 m/s²?", options: ["Die Geschwindigkeit wächst um 3 m/s pro Sekunde.", "Das Objekt bewegt sich mit 3 m/s.", "Der Körper legt 3 m pro Sekunde zurück.", "Die Kraft beträgt 3 Newton."], correct: 0, explanation: "a = 3 m/s² heisst: jede Sekunde steigt v um 3 m/s. Nach 1 s → +3 m/s, nach 2 s → +6 m/s.", hint: "Beschleunigung = Geschwindigkeitsänderung pro Zeit." },
        { text: "Auto fährt mit konstanten 80 km/h. Wie gross ist a?", options: ["a = 0 m/s²", "a = 80 m/s²", "a = 22,2 m/s²", "Nicht bestimmbar."], correct: 0, explanation: "Konstante Geschwindigkeit → keine Geschwindigkeitsänderung → a = 0.", hint: "Was ändert sich bei gleichförmiger Bewegung?" },
      ],
      challenge: [
        { text: "Körper beschleunigt: v₁ = 4 m/s bei t₁ = 2 s, v₂ = 10 m/s bei t₂ = 5 s. Berechne a.", options: ["2 m/s²", "3 m/s²", "5 m/s²", "1,5 m/s²"], correct: 0, explanation: "a = Δv/Δt = (10−4)/(5−2) = 6/3 = 2 m/s².", hint: "a = (v₂−v₁)/(t₂−t₁)" },
        { text: "Warum hat ein Körper, der sich mit 200 m/s gleichförmig bewegt, die gleiche Beschleunigung wie ein ruhender Körper?", options: ["Weil in beiden Fällen Δv = 0 → a = 0.", "Weil 200 m/s = 0 m/s im richtigen Bezugssystem.", "Weil Beschleunigung nur für Starts gilt.", "Die Aussage ist falsch."], correct: 0, explanation: "Beschleunigung = Änderung von v. Keine Änderung → a = 0. Egal wie hoch v ist.", hint: "Liegt eine Geschwindigkeitsänderung vor?" },
      ],
    },
  },

  "Formel a = Δv / Δt": {
    theory: {
      kicker: "Modul 2 · Level 2",
      heading: "Die Beschleunigungsformel",
      paragraphs: [
        "Die Formel a = Δv / Δt verbindet drei Grössen: Beschleunigung a, Geschwindigkeitsänderung Δv und Zeitintervall Δt. Kennt man zwei davon, berechnet man die dritte durch Umstellen.",
        "Umstellungen: Δv = a · Δt (Geschwindigkeitsänderung berechnen) und Δt = Δv / a (Zeit berechnen). Das 'Beschleunigungs-Dreieck' hilft: decke die gesuchte Grösse ab.",
        "Wichtig: a ist die Durchschnittsbeschleunigung über das Intervall Δt. Bei gleichmässiger Beschleunigung ist das gleichzeitig die momentane Beschleunigung an jedem Zeitpunkt.",
      ],
      formula: "a = Δv / Δt  |  Δv = a · Δt  |  Δt = Δv / a",
      example: "Fahrrad: von 0 auf 6 m/s in 3 s → a = 6/3 = 2 m/s². | a = 4 m/s², Δt = 5 s → Δv = 4·5 = 20 m/s.",
    },
    question: {
      type: "accel-lab",
      v0: 0,
      minA: 1, maxA: 10, defA: 3,
      maxT: 8, defT: 4,
      followUp: [
        { text: "Du siehst: a = 3 m/s², t = 4 s, v₀ = 0. Berechne die Endgeschwindigkeit.", options: ["12 m/s", "7 m/s", "0,75 m/s", "3 m/s"], correct: 0, explanation: "v = v₀ + a·t = 0 + 3·4 = 12 m/s. Die Formel a = Δv/Δt umgestellt nach Δv = a·t.", hint: "Δv = a · t, dann v = v₀ + Δv." },
      ],
    },
  },

  "Einheit m/s²": {
    theory: {
      kicker: "Modul 2 · Level 3",
      heading: "Die Einheit m/s²",
      paragraphs: [
        "Die Einheit m/s² bedeutet: Meter pro Sekunde pro Sekunde. Das klingt kompliziert, ist aber einfach: Die Geschwindigkeit ändert sich um X Meter pro Sekunde, und das jede Sekunde.",
        "Beispiel a = 5 m/s²: Nach 1 s hat sich v um 5 m/s erhöht. Nach 2 s um 10 m/s. Nach 3 s um 15 m/s. Die Geschwindigkeit wächst linear mit der Zeit.",
        "Vergleich: g ≈ 9,81 m/s² ist die Fallbeschleunigung. Ein starkes Auto erreicht 0–100 km/h in 3 s → a ≈ 9,3 m/s². Ein Formel-1-Auto: bis zu 30 m/s²!",
      ],
      formula: "1 m/s² = 1 (m/s) / s = Geschwindigkeitszunahme von 1 m/s pro Sekunde",
      example: "a = 2 m/s²: nach 1 s → v = 2 m/s, nach 3 s → v = 6 m/s, nach 5 s → v = 10 m/s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "a = 4 m/s². Wie gross ist v nach 3 Sekunden (Startgeschwindigkeit 0)?", options: ["12 m/s", "4 m/s", "3 m/s", "7 m/s"], correct: 0, explanation: "v = a · t = 4 · 3 = 12 m/s. Jede Sekunde wächst v um 4 m/s.", hint: "v = a · t (bei v₀ = 0)" },
        { text: "Was bedeutet a = 9,81 m/s² beim freien Fall?", options: ["Jede Sekunde steigt die Fallgeschwindigkeit um 9,81 m/s.", "Der Körper fällt 9,81 m pro Sekunde.", "Die Kraft ist 9,81 N.", "Die Fallzeit beträgt 9,81 s."], correct: 0, explanation: "g = 9,81 m/s² heisst: jede Sekunde nimmt v um 9,81 m/s zu. Nach 2 s: v = 19,62 m/s.", hint: "Einheit m/s² = Geschwindigkeitszunahme pro Sekunde." },
      ],
      challenge: [
        { text: "Körper startet bei v₀ = 5 m/s und hat a = 3 m/s². Welche Geschwindigkeit hat er nach 4 s?", options: ["17 m/s", "12 m/s", "60 m/s", "15 m/s"], correct: 0, explanation: "v = v₀ + a·t = 5 + 3·4 = 17 m/s.", hint: "v = v₀ + a · t" },
        { text: "Auto: v₀ = 0, a = 2 m/s². Wann erreicht es 80 km/h? (in s)", options: ["≈ 11,1 s", "40 s", "160 s", "22,2 s"], correct: 0, explanation: "80 km/h = 22,2 m/s. t = Δv/a = 22,2/2 = 11,1 s.", hint: "80 km/h in m/s umrechnen, dann t = Δv / a." },
      ],
    },
  },

  "Positiv und negativ a": {
    theory: {
      kicker: "Modul 2 · Level 4",
      heading: "Positive und negative Beschleunigung",
      paragraphs: [
        "Das Vorzeichen von a gibt die Richtung der Geschwindigkeitsänderung an – relativ zur gewählten positiven Richtung. a > 0: Körper wird in positiver Richtung schneller. a < 0: Körper wird in positiver Richtung langsamer (Verzögerung).",
        "Achtung: a < 0 bedeutet nicht immer 'bremsen'! Wenn ein Körper in negativer Richtung fährt (v < 0) und a < 0 ist, wird er rückwärts immer schneller. Vorzeichen von a und v zusammen bestimmen, ob der Körper beschleunigt oder verzögert.",
        "Alltagssprache vs. Physik: 'Verzögerung' oder 'Abbremsung' ist im Alltag üblich. In der Physik sagt man präziser: negative Beschleunigung a < 0 (in der gewählten Richtung).",
      ],
      formula: "a > 0: schneller in positiver Richtung | a < 0: langsamer (oder rückwärts schneller)",
      example: "Auto bremst: v von 20 m/s auf 0 in 4 s → a = (0−20)/4 = −5 m/s².",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Auto fährt nach rechts (+) und bremst. Was gilt für a?", options: ["a < 0 (entgegen der Bewegungsrichtung)", "a > 0", "a = 0", "a = −∞"], correct: 0, explanation: "Bremsen = Verzögerung = Beschleunigung entgegen der Bewegung. Bei Bewegung nach rechts → a negativ.", hint: "Bremsen = Geschwindigkeit nimmt ab → a und v haben entgegengesetztes Vorzeichen." },
        { text: "v₀ = −8 m/s (nach links), a = −2 m/s². Was passiert?", options: ["Körper wird schneller nach links (|v| steigt).", "Körper bremst ab.", "Körper bleibt stehen.", "Körper kehrt um."], correct: 0, explanation: "v und a sind beide negativ (gleiche Richtung) → Körper beschleunigt in negativer Richtung, wird also schneller rückwärts.", hint: "Gleiche Vorzeichen von v und a → Betrag von v nimmt zu." },
      ],
      challenge: [
        { text: "v₀ = 12 m/s, a = −4 m/s². Wann stoppt der Körper?", options: ["t = 3 s", "t = 4 s", "t = 8 s", "t = 12 s"], correct: 0, explanation: "0 = v₀ + a·t → 0 = 12 − 4t → t = 3 s.", hint: "Setze v = 0: t = −v₀ / a" },
        { text: "Körper: v₀ = −5 m/s, a = +2 m/s². Was ist v nach 4 s?", options: ["+3 m/s", "−13 m/s", "−3 m/s", "+10 m/s"], correct: 0, explanation: "v = v₀ + a·t = −5 + 2·4 = −5 + 8 = +3 m/s. Der Körper kehrt um und fährt nach rechts.", hint: "v = v₀ + a·t – Vorzeichen beachten!" },
      ],
    },
  },

  "Gleichmässig beschleunigt": {
    theory: {
      kicker: "Modul 2 · Level 5",
      heading: "Gleichmässig beschleunigte Bewegung",
      paragraphs: [
        "Bei gleichmässig beschleunigter Bewegung ist die Beschleunigung a konstant. Das bedeutet: Die Geschwindigkeit nimmt in gleichen Zeitintervallen um gleich viel zu (oder ab).",
        "Im v-t-Diagramm ist gleichmässige Beschleunigung eine Gerade mit der Steigung a. Je steiler die Gerade, desto grösser die Beschleunigung. Eine horizontale Gerade (Steigung 0) bedeutet: keine Beschleunigung, also gleichförmige Bewegung.",
        "Wichtige Eigenschaft: Der zurückgelegte Weg wächst quadratisch mit der Zeit (s ~ t²). In der zweiten Sekunde legt man 3-mal mehr zurück als in der ersten, in der dritten 5-mal mehr – dieses Muster stammt von Galileo Galilei.",
      ],
      formula: "a = konst. → v(t) = v₀ + a·t (lineare Funktion der Zeit)",
      example: "a = 2 m/s², v₀ = 0: t=1 → v=2, t=2 → v=4, t=3 → v=6 m/s. Zunahme konstant: +2 m/s pro Sekunde.",
    },
    question: {
      type: "accel-lab",
      v0: 0,
      minA: 1, maxA: 8, defA: 2,
      maxT: 8, defT: 5,
      followUp: [
        { text: "Bei gleichmässiger Beschleunigung mit a = 2 m/s² – um wie viel m/s steigt v pro Sekunde?", options: ["Um 2 m/s pro Sekunde.", "Um 2 m/s insgesamt.", "Um 4 m/s pro Sekunde.", "Hängt von v ab."], correct: 0, explanation: "a = konst. = 2 m/s² heisst: jede Sekunde steigt v um exakt 2 m/s. Das ist die Definition von 'gleichmässig'.", hint: "Konstante Beschleunigung = konstante Zunahme von v pro Sekunde." },
      ],
    },
  },

  "v = v₀ + a·t": {
    theory: {
      kicker: "Modul 2 · Level 6",
      heading: "Formel v = v₀ + a · t",
      paragraphs: [
        "Die Formel v = v₀ + a·t berechnet die Geschwindigkeit zu einem beliebigen Zeitpunkt t. v₀ ist die Anfangsgeschwindigkeit, a die (konstante) Beschleunigung, t die vergangene Zeit.",
        "Die Formel stammt direkt aus a = Δv/Δt: Wenn a konstant ist und bei t=0 die Geschwindigkeit v₀ war, dann ist v nach Zeit t: v = v₀ + a·t. Man kann sie als 'Startgeschwindigkeit + Zuwachs durch Beschleunigung' lesen.",
        "Umstellungen: t = (v − v₀) / a (wie lange bis zu Geschwindigkeit v?) und a = (v − v₀) / t (welche Beschleunigung war nötig?).",
      ],
      formula: "v = v₀ + a · t  (gilt nur bei konstanter Beschleunigung!)",
      example: "v₀ = 5 m/s, a = 3 m/s², t = 4 s → v = 5 + 3·4 = 17 m/s.",
    },
    question: {
      type: "accel-lab",
      v0: 5,
      minA: 1, maxA: 8, defA: 3,
      maxT: 6, defT: 4,
      followUp: [
        { text: "Rakete: v₀ = 0, a = 50 m/s², t = 10 s. Wie schnell ist sie? (in km/h)", options: ["1800 km/h", "500 km/h", "50 km/h", "180 km/h"], correct: 0, explanation: "v = 0 + 50·10 = 500 m/s = 500·3,6 = 1800 km/h. Beeindruckend!", hint: "v = a·t, dann m/s × 3,6 = km/h." },
        { text: "Auto: v₀ = 20 m/s, bremst mit a = −4 m/s². Nach wie vielen Sekunden steht es?", options: ["5 s", "4 s", "20 s", "80 s"], correct: 0, explanation: "0 = 20 + (−4)·t → 4t = 20 → t = 5 s.", hint: "Setze v = 0: 0 = v₀ + a·t, löse nach t." },
      ],
    },
  },

  "s = ½·a·t² (Ruhe)": {
    theory: {
      kicker: "Modul 2 · Level 7",
      heading: "Weg bei gleichmässiger Beschleunigung",
      paragraphs: [
        "Wenn ein Körper aus der Ruhe (v₀ = 0) gleichmässig beschleunigt, legt er keinen konstanten Weg pro Zeiteinheit zurück – sondern immer mehr. Der Weg wächst quadratisch: s = ½ · a · t².",
        "Warum quadratisch? Weil v selbst mit der Zeit steigt (v = a·t), und der Weg die 'Fläche unter v' ist. Die Fläche unter einer linear steigenden Geraden ist ein Dreieck: ½ · Basis · Höhe = ½ · t · (a·t) = ½·a·t².",
        "Wichtig: Diese Formel gilt nur für Start aus der Ruhe (v₀ = 0). Bei v₀ ≠ 0 lautet die allgemeine Formel: s = v₀·t + ½·a·t².",
      ],
      formula: "s = ½ · a · t²  (nur für v₀ = 0)",
      example: "a = 4 m/s², t = 3 s → s = ½ · 4 · 9 = 18 m.",
    },
    question: {
      type: "accel-lab",
      v0: 0,
      minA: 1, maxA: 6, defA: 2,
      maxT: 8, defT: 4,
      followUp: [
        { text: "a = 2 m/s², t = 4 s, v₀ = 0. Welcher Weg wird zurückgelegt?", options: ["16 m", "8 m", "32 m", "4 m"], correct: 0, explanation: "s = ½ · a · t² = ½ · 2 · 16 = 16 m. Wichtig: t² = 16, nicht t = 16!", hint: "s = ½ · a · t². Achtung: t wird quadriert!" },
        { text: "Doppelte Zeit bei gleicher Beschleunigung – wie ändert sich s?", options: ["s wird 4-mal grösser (quadratisch).", "s wird 2-mal grösser.", "s bleibt gleich.", "s wird 8-mal grösser."], correct: 0, explanation: "s = ½·a·t². Wenn t → 2t, dann s → ½·a·(2t)² = 4·½·a·t². Viermal mehr!", hint: "t kommt im Quadrat vor. Verdopplung von t → 2² = 4-facher Weg." },
      ],
    },
  },

  "Bremsen als Beschleunigung": {
    theory: {
      kicker: "Modul 2 · Level 8",
      heading: "Bremsen ist negative Beschleunigung",
      paragraphs: [
        "Bremsen ist physikalisch keine eigene Erscheinung – es ist einfach eine Beschleunigung in entgegengesetzter Richtung zur Bewegung. In der Formelsprache: a < 0 (wenn die Bewegung in positiver Richtung erfolgt).",
        "Der Bremsweg folgt aus s = v₀² / (2·|a|). Je höher die Ausgangsgeschwindigkeit v₀ oder je schwächer die Bremsverzögerung |a|, desto länger der Bremsweg. Das v₀² erklärt, warum doppelte Geschwindigkeit zu viermal längerem Bremsweg führt.",
        "Praktische Richtwerte: PKW auf trockener Strasse: |a| ≈ 7−9 m/s². Auf nasser Fahrbahn: |a| ≈ 4−5 m/s². Auf Eis: |a| ≈ 1−2 m/s².",
      ],
      formula: "s_B = v₀² / (2 · |a|)  (Bremsweg aus v₀, Verzögerung |a|)",
      example: "v₀ = 20 m/s, |a| = 5 m/s² → s_B = 400/10 = 40 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Auto: v₀ = 15 m/s, Bremsverzögerung 5 m/s². Wie lang ist der Bremsweg?", options: ["22,5 m", "75 m", "3 m", "45 m"], correct: 0, explanation: "s_B = v₀²/(2·a) = 225/10 = 22,5 m.", hint: "s_B = v₀² / (2 · a)" },
        { text: "Was gilt physikalisch korrekt für Bremsen?", options: ["Bremsen ist negative Beschleunigung (a < 0 in Bewegungsrichtung).", "Bremsen ist keine Beschleunigung.", "Beim Bremsen gilt keine Beschleunigungsformel.", "Bremsen hebt die Geschwindigkeit auf sofort."], correct: 0, explanation: "Physikalisch ist Bremsen = Beschleunigung entgegen der Bewegungsrichtung, also a < 0.", hint: "In der Physik gibt es keine 'Bremsbeschleunigung' – nur negative Beschleunigung." },
      ],
      challenge: [
        { text: "Fahrrad bremst: v₀ = 10 m/s, a = −2 m/s². Welcher Weg bis zum Stillstand?", options: ["25 m", "5 m", "20 m", "50 m"], correct: 0, explanation: "s_B = v₀²/(2·|a|) = 100/4 = 25 m.", hint: "s_B = v₀² / (2 · |a|)" },
        { text: "Gleicher Bremsweg bei doppelter Geschwindigkeit – welche Bremskraft wäre nötig?", options: ["4-fache Bremsverzögerung.", "2-fache Bremsverzögerung.", "Halbe Bremsverzögerung.", "Gleiche Bremsverzögerung."], correct: 0, explanation: "s_B = v²/2a. Wenn v verdoppelt → v² vervierfacht. Um s_B gleich zu halten: a muss auch vervierfacht werden.", hint: "s_B ~ v². Wenn v → 2v und s_B konstant bleiben soll: was muss a tun?" },
      ],
    },
  },

  "v-t Diagramm": {
    theory: {
      kicker: "Modul 2 · Level 9",
      heading: "Das v-t-Diagramm",
      paragraphs: [
        "Im v-t-Diagramm (Geschwindigkeit-Zeit-Diagramm) trägt man auf der x-Achse die Zeit t und auf der y-Achse die Geschwindigkeit v auf. Jeder Punkt beschreibt: 'Zur Zeit t hat der Körper die Geschwindigkeit v.'",
        "Die Steigung im v-t-Diagramm ist die Beschleunigung: a = Δv / Δt = tan(α). Steigende Gerade → a > 0. Fallende Gerade → a < 0 (Bremsen). Horizontale Linie → a = 0 (gleichförmig).",
        "Die Fläche unter dem v-t-Graphen (zwischen Kurve und t-Achse) entspricht dem zurückgelegten Weg. Dreieck bei Beschleunigung aus v₀ = 0: Fläche = ½·v_max·t = ½·a·t².",
      ],
      formula: "Steigung v-t = a | Fläche unter v-t = s",
      example: "Gerade von (0; 0) bis (5 s; 20 m/s) → a = 20/5 = 4 m/s². Fläche (Dreieck) = ½·20·5 = 50 m.",
    },
    question: {
      type: "vt-live",
      a: 4,
      v0: 0,
      maxT: 5,
      followUp: [
        { text: "Im v-t-Diagramm liegt eine steigende Gerade. Was sagt die Steigung aus?", options: ["Die Steigung = Beschleunigung a.", "Die Steigung = zurückgelegte Strecke.", "Die Steigung = Durchschnittsgeschwindigkeit.", "Die Steigung hat keine physikalische Bedeutung."], correct: 0, explanation: "Im v-t-Diagramm gilt: Steigung = Δv/Δt = a. Je steiler, desto grösser die Beschleunigung.", hint: "Was ist die Einheit der Steigung im v-t-Diagramm?" },
        { text: "Was entspricht die Fläche unter dem v-t-Graphen?", options: ["Der zurückgelegte Weg s.", "Der Beschleunigung a.", "Der Durchschnittsgeschwindigkeit.", "Der Zeitdauer."], correct: 0, explanation: "Fläche unter v-t = zurückgelegter Weg. Dreieck: ½·v_max·t = ½·a·t² = s.", hint: "Fläche = ∫v dt = s" },
      ],
    },
  },

  "Boss – Beschleunigung": {
    theory: {
      kicker: "Modul 2 · Boss",
      heading: "Boss: Alle Beschleunigungs-Formeln",
      paragraphs: [
        "Jetzt werden alle Formeln aus Modul 2 eingesetzt. Du kennst: a = Δv/Δt, v = v₀ + a·t, s = ½·a·t² (für v₀ = 0) und s_B = v₀²/(2·a). In komplexen Aufgaben musst du entscheiden, welche Formel zutrifft.",
        "Strategie: 1. Was ist gegeben? 2. Was ist gesucht? 3. Welche Formel verbindet diese Grössen? 4. Einheiten prüfen! 5. Plausibilitäts-Check (ist das Ergebnis physikalisch sinnvoll?).",
        "Besonders tückisch: Die Formel s = ½·a·t² gilt nur für v₀ = 0. Bei v₀ ≠ 0 lautet sie s = v₀·t + ½·a·t². Und der Bremsweg s_B = v₀²/(2·a) gilt nur für gleichmässige Verzögerung bis zum Stillstand.",
      ],
      formula: "v = v₀+a·t | s = v₀·t+½·a·t² | a = Δv/Δt | s_B = v₀²/(2·a)",
      example: "Gegeben: v₀=10 m/s, a=2 m/s², t=3 s → v=16 m/s, s=10·3+½·2·9=30+9=39 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v₀ = 0, a = 3 m/s², t = 6 s. Wie gross ist v und s?", options: ["v = 18 m/s, s = 54 m", "v = 18 m/s, s = 108 m", "v = 9 m/s, s = 54 m", "v = 18 m/s, s = 27 m"], correct: 0, explanation: "v = 0 + 3·6 = 18 m/s. s = ½·3·36 = 54 m.", hint: "v = v₀+a·t und s = ½·a·t²" },
        { text: "Auto bremst: v₀ = 25 m/s, |a| = 5 m/s². Bremsweg?", options: ["62,5 m", "125 m", "5 m", "25 m"], correct: 0, explanation: "s_B = 625/10 = 62,5 m.", hint: "s_B = v₀² / (2·a)" },
      ],
      challenge: [
        { text: "Körper: v₀ = 4 m/s, a = 2 m/s², t = 5 s. Berechne v und s.", options: ["v = 14 m/s, s = 45 m", "v = 14 m/s, s = 50 m", "v = 10 m/s, s = 45 m", "v = 14 m/s, s = 25 m"], correct: 0, explanation: "v = 4 + 2·5 = 14 m/s. s = 4·5 + ½·2·25 = 20 + 25 = 45 m.", hint: "v = v₀+a·t | s = v₀·t + ½·a·t²" },
        { text: "Welche Beschleunigung braucht ein Auto, um von 0 auf 100 km/h in 8 s zu kommen?", options: ["≈ 3,5 m/s²", "≈ 12,5 m/s²", "≈ 1,25 m/s²", "≈ 100 m/s²"], correct: 0, explanation: "v = 100/3,6 ≈ 27,8 m/s. a = Δv/Δt = 27,8/8 ≈ 3,5 m/s².", hint: "100 km/h in m/s umrechnen, dann a = v/t." },
      ],
    },
  },

  // ── MODULE 4 · Reaktions- und Bremsweg ────────────────────────────────────

  "Reaktionszeit": {
    theory: {
      kicker: "Modul 4 · Level 1",
      heading: "Die Reaktionszeit",
      paragraphs: [
        "Zwischen dem Wahrnehmen einer Gefahr und dem Beginn der Bremsung vergeht Zeit: die Reaktionszeit t_R. In dieser Zeit fährt das Auto ungebremst mit konstanter Geschwindigkeit weiter.",
        "Typische Reaktionszeiten: Ausgeruhter Fahrer ≈ 0,5–0,8 s. Normaler Verkehr ≈ 1 s. Müdigkeit, Ablenkung, Alkohol können t_R auf über 2 s erhöhen – eine Verdopplung bedeutet doppelten Reaktionsweg!",
        "Wichtig: Während der Reaktionszeit ändert sich die Geschwindigkeit nicht. Das Fahrzeug bewegt sich gleichförmig. Erst danach beginnt die Bremsung.",
      ],
      formula: "s_R = v · t_R  (Reaktionsweg; v = konstant während t_R)",
      example: "v = 20 m/s (72 km/h), t_R = 1 s → s_R = 20 · 1 = 20 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Warum ist die Reaktionszeit gefährlich beim Fahren?", options: ["Weil das Auto in dieser Zeit ungebremst weiterfährt.", "Weil die Bremsen in dieser Zeit nicht funktionieren.", "Weil die Geschwindigkeit in dieser Zeit steigt.", "Weil der Fahrer schläft."], correct: 0, explanation: "Während t_R: v = const., keine Bremsung. Je höher die Geschwindigkeit, desto mehr Weg in t_R.", hint: "Was passiert mit der Bewegung während der Reaktionszeit?" },
        { text: "t_R = 0,8 s, v = 50 km/h = 13,9 m/s. Wie gross ist der Reaktionsweg?", options: ["≈ 11 m", "≈ 40 m", "≈ 0,8 m", "≈ 62,5 m"], correct: 0, explanation: "s_R = v · t_R = 13,9 · 0,8 ≈ 11 m.", hint: "s_R = v · t_R (v in m/s!)" },
      ],
      challenge: [
        { text: "Müdigkeit verdoppelt t_R von 0,8 s auf 1,6 s bei 80 km/h = 22,2 m/s. Wie viel länger ist s_R?", options: ["s_R verdoppelt sich (um ≈ 17,8 m länger).", "s_R vervierfacht sich.", "s_R bleibt gleich.", "s_R steigt um 50%."], correct: 0, explanation: "s_R = v · t_R. t_R verdoppelt → s_R verdoppelt. Δs_R = 22,2·0,8 ≈ 17,8 m mehr.", hint: "s_R = v · t_R ist linear in t_R. Doppeltes t_R → doppeltes s_R." },
        { text: "Bei welcher Geschwindigkeit ist der Reaktionsweg in 1 s genau 25 m?", options: ["25 m/s = 90 km/h", "25 km/h", "2,5 m/s", "250 m/s"], correct: 0, explanation: "s_R = v · t_R → 25 = v · 1 → v = 25 m/s = 90 km/h.", hint: "s_R = v · t_R → v = s_R / t_R" },
      ],
    },
  },

  "Reaktionsweg berechnen": {
    theory: {
      kicker: "Modul 4 · Level 2",
      heading: "Reaktionsweg berechnen",
      paragraphs: [
        "Der Reaktionsweg s_R ist der Weg, den das Fahrzeug während der Reaktionszeit zurücklegt. Da in dieser Phase keine Bremsung erfolgt, gilt gleichförmige Bewegung: s_R = v · t_R.",
        "Die Formel s_R = v · t_R ist die gleiche wie s = v · t aus der gleichförmigen Bewegung – angewendet auf das Zeitintervall der Reaktion. Alle drei Grössen lassen sich berechnen, wenn zwei bekannt sind.",
        "Praxistipp: Bei 50 km/h (≈ 14 m/s) und t_R = 1 s beträgt s_R ≈ 14 m – fast die Länge dreier PKW! In diesem Abstand muss das Auto bereits vollständig gestoppt haben, wenn ein Hindernis auftaucht.",
      ],
      formula: "s_R = v · t_R  |  t_R = s_R / v  |  v = s_R / t_R",
      example: "v = 30 m/s (108 km/h), t_R = 1,2 s → s_R = 36 m (fast zwei Buslängen!).",
    },
    question: {
      type: "speed-lab",
      s: 140,
      minV: 5,
      maxV: 28,
      defaultV: 14,
      followUp: [
        { text: "Auto fährt 14 m/s (50 km/h). Reaktionszeit 1 s. Welcher Reaktionsweg?", options: ["14 m", "50 m", "1 m", "7 m"], correct: 0, explanation: "s_R = v · t_R = 14 · 1 = 14 m. Gleichförmige Bewegung während t_R.", hint: "s_R = v · t_R" },
      ],
    },
  },

  "Bremsweg als Verzögerung": {
    theory: {
      kicker: "Modul 4 · Level 3",
      heading: "Bremsweg berechnen",
      paragraphs: [
        "Nach der Reaktionszeit beginnt die eigentliche Bremsung. Das Fahrzeug verzögert gleichmässig – das ist eine gleichmässig gebremste Bewegung mit negativer Beschleunigung a < 0.",
        "Der Bremsweg s_B ist der Weg vom Beginn der Bremsung bis zum Stillstand. Er hängt quadratisch von der Ausgangsgeschwindigkeit ab: s_B = v₀² / (2 · |a|). Das bedeutet: doppelte Geschwindigkeit → vierfacher Bremsweg!",
        "Typische Bremsverzögerungen: Trockene Strasse: |a| ≈ 8 m/s². Nasse Strasse: |a| ≈ 4 m/s². Eis: |a| ≈ 1,5 m/s². Werte schwanken je nach Fahrzeug, Reifen und Belag.",
      ],
      formula: "s_B = v₀² / (2 · |a|)  (Bremsweg; Stillstand am Ende)",
      example: "v₀ = 20 m/s, |a| = 8 m/s² → s_B = 400/16 = 25 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v₀ = 10 m/s, |a| = 5 m/s². Wie lang ist der Bremsweg?", options: ["10 m", "100 m", "20 m", "2 m"], correct: 0, explanation: "s_B = v₀²/(2·|a|) = 100/10 = 10 m.", hint: "s_B = v₀² / (2 · a)" },
        { text: "Auto verdoppelt seine Geschwindigkeit. Um wie viel steigt der Bremsweg?", options: ["4-mal länger", "2-mal länger", "8-mal länger", "Gleich lang"], correct: 0, explanation: "s_B = v₀². Wenn v₀ → 2v₀: s_B → (2v₀)² / 2a = 4·s_B. Viermal länger!", hint: "s_B ~ v₀². Was passiert wenn v₀ verdoppelt wird?" },
      ],
      challenge: [
        { text: "v₀ = 30 m/s, |a| = 6 m/s². Berechne s_B.", options: ["75 m", "5 m", "180 m", "150 m"], correct: 0, explanation: "s_B = 900/12 = 75 m.", hint: "s_B = v₀²/(2·|a|) = 30²/(2·6)" },
        { text: "s_B = 50 m, |a| = 5 m/s². Wie gross war v₀?", options: ["≈ 22,4 m/s ≈ 80,6 km/h", "50 m/s", "10 m/s", "250 m/s"], correct: 0, explanation: "50 = v₀²/10 → v₀² = 500 → v₀ = √500 ≈ 22,4 m/s = 80,6 km/h.", hint: "s_B = v₀²/2a → v₀ = √(2·a·s_B)" },
      ],
    },
  },

  "Anhalteweg": {
    theory: {
      kicker: "Modul 4 · Level 4",
      heading: "Anhalteweg = Reaktionsweg + Bremsweg",
      paragraphs: [
        "Der Anhalteweg s_A ist der Gesamtweg vom Erkennen der Gefahr bis zum vollständigen Stillstand. Er setzt sich zusammen aus Reaktionsweg s_R und Bremsweg s_B: s_A = s_R + s_B.",
        "Formel vollständig: s_A = v·t_R + v²/(2·|a|). In dieser Formel kommt v linear vor (im Reaktionsweg) und quadratisch (im Bremsweg). Bei hohen Geschwindigkeiten dominiert der quadratische Term.",
        "Faustregel (ungenau, aber praktisch): Anhalteweg in m ≈ (v in km/h) / 10 · ((v in km/h) / 10 + 1). Genauer: Nutz die Formel mit t_R = 1 s und |a| = 8 m/s².",
      ],
      formula: "s_A = s_R + s_B = v·t_R + v²/(2·|a|)",
      example: "v = 20 m/s, t_R = 1 s, |a| = 8 m/s² → s_A = 20·1 + 400/16 = 20 + 25 = 45 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v = 15 m/s, t_R = 1 s, |a| = 5 m/s². Berechne s_A.", options: ["37,5 m", "22,5 m", "52,5 m", "15 m"], correct: 0, explanation: "s_R = 15·1 = 15 m. s_B = 225/10 = 22,5 m. s_A = 15 + 22,5 = 37,5 m.", hint: "s_A = v·t_R + v²/(2·a). Erst Teile, dann addieren." },
        { text: "Welches Teilstück wächst bei hohen Geschwindigkeiten überproportional?", options: ["Der Bremsweg (s_B ~ v²).", "Der Reaktionsweg (s_R ~ v).", "Beide gleich.", "Keiner."], correct: 0, explanation: "s_R ~ v (linear), s_B ~ v² (quadratisch). Bei grossen v dominiert s_B.", hint: "Welche Formel hat v im Quadrat?" },
      ],
      challenge: [
        { text: "v = 25 m/s, t_R = 0,8 s, |a| = 8 m/s². Anhalteweg?", options: ["59,1 m", "49 m", "78,1 m", "25 m"], correct: 0, explanation: "s_R = 25·0,8 = 20 m. s_B = 625/16 ≈ 39,1 m. s_A ≈ 59,1 m.", hint: "s_A = v·t_R + v²/(2·a)" },
        { text: "v = 10 m/s vs. v = 20 m/s (je t_R=1s, |a|=8m/s²). Wie vergleichen sich s_A?", options: ["s_A(10) ≈ 16,3 m; s_A(20) ≈ 45 m (fast 3×)", "Beide gleich.", "s_A(20) ist genau 2× s_A(10).", "s_A(20) ist 4× s_A(10)."], correct: 0, explanation: "s_A(10) = 10 + 100/16 = 16,3 m. s_A(20) = 20 + 400/16 = 45 m. Verhältnis ≈ 2,76.", hint: "Berechne beide s_A und vergleiche." },
      ],
    },
  },

  "Doppelte Geschwindigkeit": {
    theory: {
      kicker: "Modul 4 · Level 5",
      heading: "Doppelte Geschwindigkeit – vierfacher Bremsweg",
      paragraphs: [
        "Die gefährlichste Eigenschaft des Bremswegs: Er steigt mit dem Quadrat der Geschwindigkeit. Das bedeutet: Doppelte Geschwindigkeit → 4-facher Bremsweg. Dreifache Geschwindigkeit → 9-facher Bremsweg!",
        "Dieser Effekt kommt allein aus der Physik, unabhängig von Fahrstil oder Fahrzeug. Er ist der Hauptgrund, warum Tempolimits Leben retten: 30 km/h statt 50 km/h reduziert den Bremsweg um den Faktor 50²/30² ≈ 2,8.",
        "Der Reaktionsweg steigt dagegen nur linear mit v. Bei hohen Geschwindigkeiten ist der Bremsweg der dominant gefährliche Teil des Anhaltewegs.",
      ],
      formula: "s_B = v²/(2·a) → doppeltes v → 4-faches s_B",
      example: "30 km/h = 8,3 m/s: s_B ≈ 4,3 m. 60 km/h = 16,7 m/s: s_B ≈ 17,4 m (4×!).",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v₁ = 10 m/s → s_B1. v₂ = 30 m/s → s_B2. Verhältnis s_B2 / s_B1?", options: ["9 (neunfacher Bremsweg)", "3 (dreifacher Bremsweg)", "6", "27"], correct: 0, explanation: "s_B ~ v². v₂/v₁ = 3 → s_B2/s_B1 = 9.", hint: "s_B ~ v². (v₂/v₁)² = (30/10)² = 9." },
        { text: "Auf Eis: |a| = 1,5 m/s². v = 14 m/s (50 km/h). Bremsweg?", options: ["65,3 m", "9,3 m", "21 m", "196 m"], correct: 0, explanation: "s_B = 196/(2·1,5) = 196/3 ≈ 65,3 m – auf Eis ist selbst Tempo 50 extrem gefährlich!", hint: "s_B = v²/(2·|a|). Eis: kleines a → riesiger s_B!" },
      ],
      challenge: [
        { text: "Bei v = 20 m/s ist s_B = 25 m. Was ist |a|? Bei v = 40 m/s: neues s_B?", options: ["a = 8 m/s²; s_B(40) = 100 m", "a = 8 m/s²; s_B(40) = 50 m", "a = 4 m/s²; s_B(40) = 100 m", "a = 8 m/s²; s_B(40) = 200 m"], correct: 0, explanation: "25 = 400/(2a) → a = 8 m/s². s_B(40) = 1600/16 = 100 m (4× mehr).", hint: "Erst a ausrechnen, dann s_B für v=40 m/s." },
        { text: "Geschwindigkeit wird von 50 auf 70 km/h erhöht. Faktor Bremsweg?", options: ["≈ 1,96 (fast doppelt)", "≈ 1,4", "≈ 4", "= 70/50 = 1,4"], correct: 0, explanation: "(70/50)² = 1,96. Also fast doppelter Bremsweg für 20 km/h mehr!", hint: "s_B ~ v². Faktor = (v₂/v₁)²." },
      ],
    },
  },

  "Sicherheitsabstand": {
    theory: {
      kicker: "Modul 4 · Level 6",
      heading: "Sicherheitsabstand im Strassenverkehr",
      paragraphs: [
        "Der Sicherheitsabstand zum Vorausfahrenden muss mindestens so gross sein, dass man bei dessen Notbremsung noch rechtzeitig anhält. Mindestabstand: s_A (Anhalteweg des Folgefahrzeugs).",
        "Faustregel: 2-Sekunden-Regel – der Abstand soll mindestens so gross sein, dass man 2 Sekunden braucht, um den Punkt zu erreichen, wo das Vorausfahrzeug gerade war. Bei 50 km/h ≈ 28 m.",
        "Auf der Autobahn (120 km/h = 33,3 m/s): 2-Sekunden-Abstand = 66,7 m. Viele Unfälle entstehen durch zu geringen Abstand – das Unfallrisiko steigt mit der zweiten Potenz der Geschwindigkeit.",
      ],
      formula: "Mindestabstand ≥ s_A = v·t_R + v²/(2·|a|)",
      example: "v = 33,3 m/s (120 km/h), t_R = 1 s, |a| = 8 m/s² → s_A ≈ 33,3 + 69,4 ≈ 103 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "2-Sekunden-Regel bei 90 km/h = 25 m/s. Welcher Mindestabstand?", options: ["50 m", "90 m", "25 m", "180 m"], correct: 0, explanation: "Abstand = v · 2 s = 25 · 2 = 50 m.", hint: "Abstand = v × 2 Sekunden." },
        { text: "Ist s_A immer gleich dem sicheren Abstand?", options: ["Nein – der Abstand muss s_A des Folgefahrzeugs betragen, plus Reaktionsweg.", "Ja.", "Nein – der Abstand muss kleiner sein.", "Nur bei Tempo 50."], correct: 0, explanation: "Der nötige Abstand = s_A des Folgefahrers, weil dieser nach der Reaktion noch bremsen muss.", hint: "Was passiert wenn das Vorausauto sofort stoppt?" },
      ],
      challenge: [
        { text: "v = 20 m/s, t_R = 1 s, |a| = 5 m/s². Genügt ein Abstand von 50 m?", options: ["Nein – s_A = 60 m > 50 m.", "Ja – 50 m > 40 m.", "Ja – s_A = 40 m.", "Knapp, s_A = 50 m."], correct: 0, explanation: "s_A = 20·1 + 400/10 = 20 + 40 = 60 m. 50 m genügt nicht!", hint: "s_A = v·t_R + v²/(2·a). Dann vergleichen." },
        { text: "Bei Tempo 30 (8,3 m/s) und Tempo 50 (13,9 m/s), t_R=1s, |a|=8m/s². Um wie viel ist s_A bei Tempo 50 grösser?", options: ["Um ≈ 17,6 m (≈ 75% mehr)", "Um genau 20 m", "Um 50% mehr", "Um 100% mehr"], correct: 0, explanation: "s_A(30) ≈ 8,3 + 4,3 = 12,6 m. s_A(50) ≈ 13,9 + 12,1 = 26 m. Differenz ≈ 13,4 m ≈ 106% mehr.", hint: "Berechne beide s_A und bilde die Differenz." },
      ],
    },
  },

  "Einfluss von Müdigkeit": {
    theory: {
      kicker: "Modul 4 · Level 7",
      heading: "Müdigkeit und Reaktionszeit",
      paragraphs: [
        "Müdigkeit verdoppelt oder verdreifacht die Reaktionszeit. Aus t_R = 0,8 s werden schnell t_R = 2 s oder mehr. Da s_R = v · t_R linear von t_R abhängt, verdoppelt oder verdreifacht sich entsprechend der Reaktionsweg.",
        "Bei 80 km/h (22,2 m/s): t_R = 0,8 s → s_R ≈ 18 m. t_R = 2 s → s_R = 44,4 m. Allein durch Müdigkeit werden 26 m mehr Weg zurückgelegt, bevor die Bremse betätigt wird!",
        "Andere Faktoren die t_R erhöhen: Alkohol und Drogen, Ablenkung (Handy), hohe Umgebungstemperaturen, monotone Strecken (Autobahn). Jede Sekunde mehr Reaktionszeit bedeutet bei 100 km/h = 27,8 m mehr Reaktionsweg.",
      ],
      formula: "s_R = v · t_R → Müdigkeit erhöht t_R → s_R steigt proportional",
      example: "22,2 m/s, t_R verdoppelt von 1 auf 2 s → s_R verdoppelt von 22,2 auf 44,4 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "t_R von 1 s auf 1,5 s erhöht. v = 20 m/s. Um wie viel m länger ist s_R?", options: ["10 m länger", "5 m länger", "20 m länger", "1,5 m länger"], correct: 0, explanation: "s_R_neu = 20·1,5 = 30 m. s_R_alt = 20·1 = 20 m. Differenz = 10 m.", hint: "Δs_R = v · Δt_R = 20 · 0,5 = 10 m." },
        { text: "Was erhöht die Reaktionszeit? (Mehrere möglich – wähle die physikalisch korrekte Antwort)", options: ["Alkohol, Müdigkeit, Ablenkung – alle erhöhen t_R.", "Nur Alkohol.", "Nur Müdigkeit.", "Nichts ausser mangelnde Übung."], correct: 0, explanation: "Alle drei Faktoren (Alkohol, Müdigkeit, Ablenkung) verlängern die Reaktionszeit nachweislich.", hint: "Was beeinflusst die Zeit zwischen Wahrnehmen und Reagieren?" },
      ],
      challenge: [
        { text: "v = 100 km/h = 27,8 m/s. Jede 0,1 s Reaktionszeit kostet wie viel Reaktionsweg?", options: ["2,78 m", "0,1 m", "10 m", "27,8 m"], correct: 0, explanation: "Δs_R = v · Δt_R = 27,8 · 0,1 = 2,78 m. Jede Zehntelsekunde = knapp 3 m mehr.", hint: "Δs_R = v · Δt_R" },
        { text: "Autofahrer: t_R = 2 s (müde) vs. t_R = 0,8 s (ausgeruht), v = 25 m/s. Zusätzlicher Reaktionsweg?", options: ["30 m", "1,2 m", "50 m", "20 m"], correct: 0, explanation: "Δs_R = 25 · (2 − 0,8) = 25 · 1,2 = 30 m. Fast zwei Fahrzeuglängen mehr!", hint: "Δs_R = v · Δt_R" },
      ],
    },
  },

  "Einfluss der Geschwindigkeit": {
    theory: {
      kicker: "Modul 4 · Level 8",
      heading: "Geschwindigkeit und Anhalteweg im Vergleich",
      paragraphs: [
        "Je höher die Geschwindigkeit, desto überproportional länger der Anhalteweg. Ursache: Der Bremsweg steigt quadratisch mit v. Bei 30 km/h sind Hindernisse noch gut zu vermeiden – bei 80 km/h kann ein plötzliches Hindernis tödlich sein.",
        "Zahlen (t_R = 1 s, |a| = 8 m/s²): 30 km/h → s_A ≈ 21 m. 50 km/h → s_A ≈ 38 m. 80 km/h → s_A ≈ 82 m. 120 km/h → s_A ≈ 103 m. Die Verdopplung von 30 auf 60 km/h verdreifacht den Anhalteweg.",
        "Fussgas vs. Bremspedal: Die einzige Möglichkeit, den Anhalteweg zu reduzieren, ist niedrigere Geschwindigkeit. Bessere Bremsen helfen kaum – der Reaktionsweg dominiert im Stadtverkehr.",
      ],
      formula: "s_A = v·t_R + v²/(2·a). Bei 30 vs. 50 km/h: Faktor s_A ≈ 1,8",
      example: "50 km/h = 13,9 m/s: s_A = 13,9 + 9,6 = 23,5 m. 80 km/h = 22,2 m/s: s_A = 22,2 + 30,9 = 53,1 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Warum sind 30-km/h-Zonen in der Nähe von Schulen sinnvoll?", options: ["Weil der Anhalteweg deutlich kürzer ist und Fussgänger rechtzeitig wahrgenommen werden.", "Weil Autos bei 30 km/h keine Energie haben.", "Weil bei 30 km/h keine Unfälle möglich sind.", "Nur aus Lärmschutzgründen."], correct: 0, explanation: "Bei 30 statt 50 km/h: s_B von 12 m auf 4,3 m – fast dreifach kürzer. Das rettet Leben.", hint: "s_B ~ v². Was bedeutet das für 30 vs. 50 km/h?" },
        { text: "Von 30 km/h auf 60 km/h. Bremsweg-Faktor?", options: ["4 (viermal länger)", "2 (doppelt)", "3", "1,5"], correct: 0, explanation: "s_B ~ v². (60/30)² = 4. Doppeltes Tempo → vierfacher Bremsweg.", hint: "s_B ~ v² → Faktor = (v₂/v₁)²" },
      ],
      challenge: [
        { text: "t_R = 1 s, |a| = 8 m/s². Berechne s_A für v = 50 km/h = 13,9 m/s.", options: ["≈ 25,9 m", "≈ 50 m", "≈ 13,9 m", "≈ 39,1 m"], correct: 0, explanation: "s_R = 13,9 m. s_B = 193/16 ≈ 12 m. s_A ≈ 25,9 m.", hint: "s_A = v·t_R + v²/(2·a)" },
        { text: "v = 120 km/h = 33,3 m/s. Wieviele Meter fährt man in der Reaktionszeit (t_R=1s)?", options: ["33,3 m", "120 m", "3,3 m", "10 m"], correct: 0, explanation: "s_R = v · t_R = 33,3 · 1 = 33,3 m – mehr als eine Hauslänge!", hint: "s_R = v · t_R" },
      ],
    },
  },

  "Anhalteweg im Diagramm": {
    theory: {
      kicker: "Modul 4 · Level 9",
      heading: "Anhalteweg im v-t-Diagramm",
      paragraphs: [
        "Im v-t-Diagramm zeigt der Anhalteweg zwei deutlich unterschiedliche Phasen: Phase 1 – Reaktionsphase: v = const. (horizontale Linie). Phase 2 – Bremsphase: v sinkt linear auf 0 (fallende Gerade).",
        "Die Fläche unter dem v-t-Graphen entspricht dem zurückgelegten Weg. Reaktionsphase: Rechteck (Fläche = v · t_R = s_R). Bremsphase: Dreieck (Fläche = ½ · v · t_B = s_B). Gesamt: s_A = s_R + s_B.",
        "Bremszeit t_B berechnen: t_B = v₀ / |a| (Zeit bis v = 0 bei gleichmässiger Verzögerung). Diese Zeit ist das 'Dreieck' im v-t-Diagramm.",
      ],
      formula: "Rechteck (Reaktion): s_R = v·t_R | Dreieck (Bremsung): s_B = ½·v·t_B = v²/(2·a)",
      example: "v=20 m/s, t_R=1s, |a|=5m/s²: t_B=4s. s_R=20m (Rechteck), s_B=40m (Dreieck), s_A=60m.",
    },
    question: {
      type: "st-live",
      v: 8,
      s: 160,
      followUp: [
        { text: "Im v-t-Diagramm des Anhaltevorgangs: Was zeigt das Rechteck und was zeigt das Dreieck?", options: ["Rechteck = s_R (Reaktion), Dreieck = s_B (Bremsung).", "Rechteck = s_B, Dreieck = s_R.", "Beide Flächen = s_B.", "Nur das Dreieck zählt für s_A."], correct: 0, explanation: "Während der Reaktion: v=const. → Rechteck mit Fläche s_R. Bremsung: v→0 → Dreieck mit Fläche s_B.", hint: "Fläche unter v-t = Weg. Welche Form hat jede Phase?" },
      ],
    },
  },

  "Boss – Hindernis": {
    theory: {
      kicker: "Modul 4 · Boss",
      heading: "Boss: Vollständige Anhalteweganalyse",
      paragraphs: [
        "In der Boss-Aufgabe werden alle Formeln kombiniert. Du berechnest Reaktionsweg, Bremsweg und Anhalteweg für verschiedene Szenarien und ziehst physikalisch korrekte Schlussfolgerungen.",
        "Checkliste: 1. Geschwindigkeit in m/s umrechnen. 2. s_R = v·t_R. 3. s_B = v²/(2·|a|). 4. s_A = s_R + s_B. 5. Mit dem Hindernis-Abstand vergleichen – wenn s_A > Abstand: Kollision!",
        "Varianten: Was wenn t_R grösser wird? Was wenn |a| kleiner wird (nasse Strasse)? Was wenn v 20% höher war? Diese Fragen prüfen ob du die Zusammenhänge wirklich verstehst.",
      ],
      formula: "s_A = v·t_R + v²/(2·|a|)",
      example: "v=25 m/s, t_R=1s, |a|=8m/s²: s_A = 25 + 39 = 64 m. Hindernis in 60 m → Kollision!",
    },
    question: {
      type: "mc",
      basis: [
        { text: "v=20 m/s, t_R=1s, |a|=5m/s². Hindernis bei 55 m. Kollision?", options: ["Ja – s_A = 60 m > 55 m.", "Nein – s_A = 50 m < 55 m.", "Gerade so – s_A = 55 m.", "Kann nicht bestimmt werden."], correct: 0, explanation: "s_A = 20·1 + 400/10 = 20 + 40 = 60 m. 60 > 55 → Kollision!", hint: "s_A = v·t_R + v²/(2·a). Dann mit Hindernisabstand vergleichen." },
        { text: "Gleiche Szene, aber nasse Strasse: |a| = 3 m/s². Neues s_A?", options: ["≈ 86,7 m – viel zu lang!", "60 m", "40 m", "≈ 53,3 m"], correct: 0, explanation: "s_A = 20 + 400/6 ≈ 20 + 66,7 = 86,7 m. Nasse Strasse ist deutlich gefährlicher!", hint: "Neues s_A berechnen mit a = 3 m/s²." },
      ],
      challenge: [
        { text: "v = 30 m/s, t_R = 1,5 s (müde), |a| = 7 m/s². Sicher mit Abstand 80 m?", options: ["Nein – s_A ≈ 109 m > 80 m.", "Ja – s_A ≈ 75 m.", "Gerade so – s_A ≈ 80 m.", "Ja – s_A ≈ 50 m."], correct: 0, explanation: "s_R = 30·1,5 = 45 m. s_B = 900/14 ≈ 64 m. s_A ≈ 109 m >> 80 m. Nicht sicher!", hint: "s_A = v·t_R + v²/(2·a)" },
        { text: "Bei welcher Maximalgeschwindigkeit kann man bei Hindernis in 40 m sicher stoppen? (t_R=1s, |a|=8m/s²)", options: ["≈ 14,9 m/s ≈ 53,7 km/h", "≈ 20 m/s", "≈ 8 m/s", "≈ 40 m/s"], correct: 0, explanation: "v·1 + v²/16 = 40 → v²/16 + v − 40 = 0. v ≈ 14,9 m/s (quadratische Gleichung).", hint: "v + v²/16 = 40. Quadratische Gleichung lösen oder Werte ausprobieren." },
      ],
    },
  },

  // ── MODULE 5 · Freier Fall ─────────────────────────────────────────────────

  "Freier Fall als Beschleunigung": {
    theory: {
      kicker: "Modul 5 · Level 1",
      heading: "Freier Fall – eine Beschleunigung",
      paragraphs: [
        "Freier Fall ist die Bewegung eines Körpers unter dem alleinigen Einfluss der Schwerkraft – ohne Luftwiderstand, ohne Auftrieb, ohne jeden anderen Einfluss. In der Physik ist das ein ideales Modell.",
        "Entscheidend: Alle Körper fallen gleich schnell, unabhängig von ihrer Masse! Galileo bewies das durch Experimente. Das Geheimnis: Grössere Masse → grössere Schwerkraft, aber auch grössere Trägheit – beides hebt sich auf.",
        "Die Fallbeschleunigung g ≈ 9,81 m/s² ist überall auf der Erdoberfläche annähernd konstant (kleine Schwankungen je nach Breite und Höhe). Auf dem Mond: g_Mond ≈ 1,62 m/s².",
      ],
      formula: "g ≈ 9,81 m/s²  (Fallbeschleunigung an der Erdoberfläche)",
      example: "Ball und Stein fallen aus gleicher Höhe → kommen gleichzeitig an (ohne Luftwiderstand).",
    },
    question: {
      type: "matter",
      scene: "freeFall",
      tasks: [
        { text: "Drei Kugeln verschiedener Grösse fallen gleichzeitig los. Was beobachtest du?", options: ["Alle kommen gleichzeitig unten an – Masse ist egal.", "Die grösste Kugel landet zuerst.", "Die kleinste Kugel landet zuerst.", "Sie fallen mit verschiedenen Geschwindigkeiten."], correct: 0, explanation: "Im freien Fall (ohne Luftwiderstand) ist a = g für alle Massen. Alle Kugeln kommen gleichzeitig an.", hint: "Galileos Erkenntnis: Masse beeinflusst freien Fall nicht." },
      ],
    },
  },

  "Fallbeschleunigung g": {
    theory: {
      kicker: "Modul 5 · Level 2",
      heading: "Die Fallbeschleunigung g",
      paragraphs: [
        "Die Fallbeschleunigung g = 9,81 m/s² bedeutet: Jede Sekunde steigt die Fallgeschwindigkeit um 9,81 m/s. Nach 1 s: v = 9,81 m/s. Nach 2 s: v = 19,62 m/s. Nach 3 s: v = 29,43 m/s ≈ 106 km/h!",
        "g ist eine Naturkonstante auf der Erdoberfläche, die von der Schwerkraft der Erde bestimmt wird. Für Berechnungen in der Schule wird oft g = 10 m/s² als Näherung verwendet – das vereinfacht Rechnungen ohne grosse Ungenauigkeit.",
        "Auf dem Mond (g_M ≈ 1,62 m/s²) fiele ein Körper nach 3 s nur etwa 7,3 m weit statt 44 m auf der Erde. Das zeigt: g bestimmt direkt alle Bewegungsgrössen beim freien Fall.",
      ],
      formula: "g ≈ 9,81 m/s² ≈ 10 m/s² (Näherung)",
      example: "Nach 4 s: v = g·t = 9,81·4 = 39,24 m/s ≈ 141 km/h. Das ist fast Autobahngeschwindigkeit!",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Was bedeutet g = 9,81 m/s² physikalisch?", options: ["Die Fallgeschwindigkeit steigt jede Sekunde um 9,81 m/s.", "Der Körper fällt 9,81 m pro Sekunde.", "Die Schwerkraft hat 9,81 N.", "Der Körper dreht sich mit 9,81 rad/s."], correct: 0, explanation: "g ist Beschleunigung, nicht Geschwindigkeit. Jede Sekunde +9,81 m/s in der Fallgeschwindigkeit.", hint: "g hat die Einheit m/s² – was sagt das?" },
        { text: "Stein fällt auf der Erde und auf dem Mond aus gleicher Höhe. Wo landet er schneller?", options: ["Auf der Erde (g_Erde > g_Mond).", "Auf dem Mond (weniger Schwerkraft → schneller).", "Gleichzeitig (Masse ist egal).", "Kommt auf die Masse an."], correct: 0, explanation: "g_Erde ≈ 9,81 m/s² >> g_Mond ≈ 1,62 m/s². Grösseres g → grössere Beschleunigung → schneller am Boden.", hint: "Welcher Planet hat die grössere Fallbeschleunigung?" },
      ],
      challenge: [
        { text: "Ball fällt 5 Sekunden frei. Welche Geschwindigkeit hat er? (g = 9,81 m/s²)", options: ["49,05 m/s ≈ 177 km/h", "5 m/s", "9,81 m/s", "24,5 m/s"], correct: 0, explanation: "v = g·t = 9,81·5 = 49,05 m/s. Nach nur 5 Sekunden Autobahn-Speed!", hint: "v = g · t" },
        { text: "Warum ist g auf dem Äquator etwas kleiner als an den Polen?", options: ["Äquator ist weiter vom Erdmittelpunkt entfernt + Fliehkraft.", "Äquator hat mehr Luftwiderstand.", "Am Pol ist die Erde wärmer.", "g ist überall gleich gross."], correct: 0, explanation: "Am Äquator: Erde ist leicht abgeflacht (grösserer Radius → schwächere Anziehung) und die Erdrotation erzeugt eine Fliehkraft.", hint: "Schwerkraft hängt vom Abstand zum Erdmittelpunkt ab." },
      ],
    },
  },

  "Fallgeschwindigkeit v = g·t": {
    theory: {
      kicker: "Modul 5 · Level 3",
      heading: "Fallgeschwindigkeit berechnen",
      paragraphs: [
        "Beim freien Fall aus der Ruhe (v₀ = 0) gilt: Die Geschwindigkeit steigt linear mit der Zeit. Die Formel ist ein Spezialfall von v = v₀ + a·t mit v₀ = 0 und a = g: v = g · t.",
        "Da g eine Konstante ist, wächst v proportional zu t. Die Geschwindigkeit ist nach 1 s: g m/s, nach 2 s: 2g m/s, nach t Sekunden: g·t m/s. Im v-t-Diagramm ist das eine Gerade durch den Ursprung mit Steigung g.",
        "Wichtig: Diese Formel gilt nur ohne Luftwiderstand. In der Realität begrenzt der Luftwiderstand die Fallgeschwindigkeit (Endgeschwindigkeit / Terminal velocity). Ein Fallschirmspringer erreicht etwa 50–60 m/s.",
      ],
      formula: "v = g · t = 9,81 · t  (bei v₀ = 0, kein Luftwiderstand)",
      example: "t = 3 s → v = 9,81 · 3 = 29,43 m/s ≈ 106 km/h.",
    },
    question: {
      type: "accel-lab",
      v0: 0,
      minA: 5, maxA: 12, defA: 10,
      maxT: 6, defT: 3,
      followUp: [
        { text: "Ball fällt 4 s lang frei (g = 9,81 m/s²). Welche Geschwindigkeit?", options: ["39,24 m/s", "4 m/s", "9,81 m/s", "20 m/s"], correct: 0, explanation: "v = g·t = 9,81·4 = 39,24 m/s ≈ 141 km/h. Freier Fall ist schnell!", hint: "v = g · t" },
      ],
    },
  },

  "Fallstrecke s = ½·g·t²": {
    theory: {
      kicker: "Modul 5 · Level 4",
      heading: "Fallstrecke berechnen",
      paragraphs: [
        "Die zurückgelegte Fallstrecke wächst quadratisch mit der Zeit: s = ½ · g · t². Dieser Ausdruck ist ein Spezialfall von s = ½·a·t² (für a = g, v₀ = 0). Das quadratische Wachstum erklärt, warum ein Körper in der letzten Sekunde viel mehr zurücklegt als in der ersten.",
        "Vergleich: In der ersten Sekunde: s(1) = ½·9,81·1 ≈ 4,9 m. In der zweiten Sekunde: s(2)−s(1) = ½·9,81·4 − 4,9 ≈ 14,7 m. In der dritten: s(3)−s(2) ≈ 24,5 m. Verhältnis: 1 : 3 : 5 – Galileos Zahlen!",
        "Umkehrformel: Aus der Fallstrecke h berechnet man die Fallzeit t = √(2h/g). Das ist die Formel, die im Sprint-Test (K3 – Freier Fall) benutzt wird.",
      ],
      formula: "s = ½ · g · t²  |  t = √(2s / g)",
      example: "t = 3 s → s = ½·9,81·9 ≈ 44 m. | h = 80 m → t = √(160/9,81) ≈ 4 s.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Ball fällt 2 Sekunden. Fallstrecke? (g = 9,81 m/s²)", options: ["≈ 19,6 m", "≈ 9,8 m", "≈ 39,2 m", "≈ 4,9 m"], correct: 0, explanation: "s = ½·9,81·4 = 19,62 m.", hint: "s = ½ · g · t². Achtung: t² = 4!" },
        { text: "h = 45 m. Wie lange fällt der Körper? (g = 9,81 m/s²)", options: ["≈ 3,03 s", "≈ 45 s", "≈ 9 s", "≈ 1,5 s"], correct: 0, explanation: "t = √(2·45/9,81) = √(9,17) ≈ 3,03 s.", hint: "t = √(2h/g)" },
      ],
      challenge: [
        { text: "In welcher Sekunde legt ein frei fallender Körper am meisten zurück – der 1., 3. oder 5.?", options: ["5. Sekunde (mehr Weg je später).", "1. Sekunde.", "Alle Sekunden gleich.", "3. Sekunde ist Maximum."], correct: 0, explanation: "s nimmt quadratisch zu → in jeder späteren Sekunde legt man mehr zurück. Die 5. Sekunde hat den grössten Zuwachs.", hint: "s ~ t² → Zuwachs pro Sekunde wird immer grösser." },
        { text: "Doppelte Fallzeit → wie viel grösser ist die Fallstrecke?", options: ["4-mal grösser", "2-mal grösser", "8-mal grösser", "Gleich"], correct: 0, explanation: "s = ½·g·t². t → 2t: s → ½·g·(2t)² = 4·s. Viermal mehr!", hint: "t wird quadriert. (2t)² = 4t²." },
      ],
    },
  },

  "Gleich schnell fallen": {
    theory: {
      kicker: "Modul 5 · Level 5",
      heading: "Alle Körper fallen gleich schnell",
      paragraphs: [
        "Galileo Galilei (1564–1642) widerlegte die aristotelische Vorstellung, dass schwere Körper schneller fallen. Sein berühmtes (vielleicht legendäres) Experiment am Schiefen Turm von Pisa: Zwei Kugeln verschiedener Masse – beide landen gleichzeitig.",
        "Physikalische Erklärung: Grössere Masse → grössere Schwerkraft F_g = m·g. Aber auch grössere Trägheit (F = m·a). Beide Faktoren heben sich in a = F_g/m = g genau auf. Ergebnis: a = g für jede Masse.",
        "Demonstration: Apollo 15 (1971) – Astronaut David Scott liess auf dem Mond einen Hammer und eine Feder fallen. Ohne Atmosphäre landen beide gleichzeitig. Das Experiment beweist Galileos Erkenntnis eindrucksvoll.",
      ],
      formula: "a = g für alle Massen (im Vakuum)",
      example: "1 kg Ball und 10 kg Ball aus 20 m Höhe: t = √(2·20/9,81) ≈ 2,02 s – beide gleichzeitig!",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Warum fallen Feder und Eisenkugel in der Realität unterschiedlich schnell?", options: ["Luftwiderstand bremst die Feder stärker – nicht unterschiedliche g.", "Weil die Feder leichter ist.", "Weil die Schwerkraft stärker wirkt auf Eisen.", "Weil die Beschleunigung massenabhängig ist."], correct: 0, explanation: "Im Vakuum fallen beide gleich. Im Freien: Luftwiderstand hängt von Form und Masse ab – die Feder hat viel mehr Widerstand pro Kilogramm.", hint: "Was fehlt beim idealen freien Fall?" },
        { text: "Was hat Galileo durch seine Fallexperimente bewiesen?", options: ["Alle Körper haben dieselbe Fallbeschleunigung g (unabhängig von der Masse).", "Schwerere Körper fallen schneller.", "Nur im Vakuum fällt alles gleich schnell.", "Fallen hängt von der Form ab."], correct: 0, explanation: "Galileos Erkenntnis: a = g für alle Massen. Moderne Experimente bestätigen das mit riesiger Genauigkeit.", hint: "Was ist Galileos berühmteste Erkenntnis?" },
      ],
      challenge: [
        { text: "a = F/m = m·g/m = g. Warum kürzt sich die Masse heraus?", options: ["Weil Schwerkraft und Trägheit beide proportional zu m sind – beides hebt sich auf.", "Weil Schwerkraft nicht von m abhängt.", "Weil g eine universelle Konstante für alle Kräfte ist.", "Weil m bei kleinen Körpern null wird."], correct: 0, explanation: "F_g = m·g (Schwerkraft proportional zu m). F = m·a (Trägheit proportional zu m). → a = F_g/m = g. Masse kürzt sich weg!", hint: "Schreibe a = F_g / m auf und setze F_g = m·g ein." },
        { text: "Auf dem Mond (g_M ≈ 1,62 m/s²): Fallstrecke nach 3 s?", options: ["≈ 7,3 m", "≈ 44 m", "≈ 29,4 m", "≈ 14,7 m"], correct: 0, explanation: "s = ½·1,62·9 ≈ 7,3 m. Auf der Erde wären es ≈ 44 m!", hint: "s = ½ · g_Mond · t²" },
      ],
    },
  },

  "Aufwärtswurf": {
    theory: {
      kicker: "Modul 5 · Level 6",
      heading: "Der senkrechte Aufwärtswurf",
      paragraphs: [
        "Beim Aufwärtswurf wird ein Körper mit einer Anfangsgeschwindigkeit v₀ nach oben geworfen. Die Schwerkraft (g nach unten) bremst ihn gleichmässig ab. Die Bewegung teilt sich in zwei Phasen: Aufstieg (v > 0) und Abstieg (v < 0, nach unten).",
        "Am höchsten Punkt ist momentan v = 0 – aber die Beschleunigung ist immer noch g = 9,81 m/s² nach unten! Das ist eine klassische Fehlvorstellung: Oben hört die Schwerkraft nicht auf.",
        "Formeln: t_oben = v₀ / g (Zeit bis zum höchsten Punkt). h_max = v₀² / (2·g) (maximale Höhe). Für den vollständigen Flug (zurück zum Startpunkt): t_gesamt = 2·v₀ / g.",
      ],
      formula: "v(t) = v₀ − g·t | t_top = v₀/g | h_max = v₀²/(2g)",
      example: "v₀ = 20 m/s → t_top = 20/9,81 ≈ 2,04 s. h_max = 400/19,62 ≈ 20,4 m.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Ball wird mit v₀ = 15 m/s nach oben geworfen. Nach wie vielen Sekunden ist v = 0?", options: ["t ≈ 1,53 s", "t = 15 s", "t ≈ 3,06 s", "t ≈ 0,77 s"], correct: 0, explanation: "t_top = v₀/g = 15/9,81 ≈ 1,53 s.", hint: "Am höchsten Punkt: v = 0 = v₀ − g·t → t = v₀/g." },
        { text: "Was ist a am höchsten Punkt des Aufwärtswurfs?", options: ["a = g = 9,81 m/s² nach unten.", "a = 0 (weil v = 0).", "a = g nach oben.", "a hängt von v₀ ab."], correct: 0, explanation: "Die Schwerkraft hört nicht auf, wenn v = 0 wird. a = g nach unten – immer, im ganzen Flug.", hint: "Ändert sich die Schwerkraft wenn v = 0 erreicht wird?" },
      ],
      challenge: [
        { text: "v₀ = 25 m/s. Maximale Höhe?", options: ["≈ 31,9 m", "≈ 25 m", "≈ 63,7 m", "≈ 12,7 m"], correct: 0, explanation: "h_max = v₀²/(2g) = 625/19,62 ≈ 31,9 m.", hint: "h_max = v₀² / (2·g)" },
        { text: "Ball wird mit v₀ = 10 m/s geworfen. Wann kommt er zurück auf Ausgangshöhe?", options: ["t ≈ 2,04 s", "t ≈ 1,02 s", "t ≈ 4,08 s", "t ≈ 0,5 s"], correct: 0, explanation: "t_gesamt = 2·v₀/g = 2·10/9,81 ≈ 2,04 s. Aufstieg und Abstieg brauchen gleich lang.", hint: "t_gesamt = 2 · v₀ / g (Symmetrie des Aufwärtswurfs)" },
      ],
    },
  },

  "Höchster Punkt": {
    theory: {
      kicker: "Modul 5 · Level 7",
      heading: "Am höchsten Punkt: v = 0, aber a = g!",
      paragraphs: [
        "Am höchsten Punkt des Aufwärtswurfs gilt: v = 0. Das stimmt. Aber a = 0? Nein! Die Schwerkraft wirkt immer – auch wenn der Körper momentan still steht. a = g = 9,81 m/s² nach unten.",
        "Diese Fehlvorstellung ist extrem häufig: 'Wenn v = 0, dann a = 0.' Das verwechselt Geschwindigkeit und Beschleunigung. Beschleunigung ist die Änderung der Geschwindigkeit – und die ändert sich am höchsten Punkt von 'positiv' zu 'negativ'.",
        "Analogie: Ein Ball, den du hochwirfst, kehrt um, weil g ihn die ganze Zeit nach unten zieht – auch im Moment wo er kurz 'steht'. Wenn g am höchsten Punkt null wäre, würde der Ball dort für immer schweben.",
      ],
      formula: "Am höchsten Punkt: v = 0, aber a = g ≠ 0",
      example: "Ball mit v₀=10 m/s: bei t≈1,02s ist v=0 und a=−9,81 m/s² (nach unten). Dann beginnt Abstieg.",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Ball am höchsten Punkt: v = 0. Was ist a?", options: ["a = g ≈ 9,81 m/s² (nach unten)", "a = 0", "a = g nach oben", "a ist unbestimmt"], correct: 0, explanation: "Schwerkraft hört nicht auf. a = g = 9,81 m/s² nach unten – auch wenn v momentan null ist.", hint: "Hört die Schwerkraft auf zu wirken wenn v = 0?" },
        { text: "Wenn am höchsten Punkt a = 0 wäre, was würde passieren?", options: ["Der Ball würde dort für immer schweben (keine Kraft = keine Richtungsänderung).", "Der Ball würde langsam sinken.", "Der Ball würde schnell fallen.", "Nichts – a = 0 passiert nie."], correct: 0, explanation: "Ohne Kraft (a = 0) und ohne Geschwindigkeit würde kein Newton-Gesetz eine Bewegung auslösen. Der Ball schwebte ewig.", hint: "Was sagt Newtons 1. Gesetz? Ohne Kraft: keine Änderung der Bewegung." },
      ],
      challenge: [
        { text: "v₀ = 15 m/s (nach oben). Was ist v nach 2 s?", options: ["−4,62 m/s (nach unten)", "+4,62 m/s", "0 m/s", "−15 m/s"], correct: 0, explanation: "v = v₀ − g·t = 15 − 9,81·2 = 15 − 19,62 = −4,62 m/s. Minus bedeutet: Körper fällt bereits.", hint: "v = v₀ − g·t. Nach t_top ≈ 1,53 s wird v negativ." },
        { text: "Wo liegt der höchste Punkt bei v₀ = 12 m/s?", options: ["h_max ≈ 7,34 m", "h_max = 12 m", "h_max ≈ 3,67 m", "h_max ≈ 24 m"], correct: 0, explanation: "h_max = v₀²/(2g) = 144/19,62 ≈ 7,34 m.", hint: "h_max = v₀² / (2 · g)" },
      ],
    },
  },

  "Auf- und Abstieg": {
    theory: {
      kicker: "Modul 5 · Level 8",
      heading: "Symmetrie des Aufwärtswurfs",
      paragraphs: [
        "Der Aufwärtswurf ist zeitlich symmetrisch: Aufstieg und Abstieg dauern gleich lang. Die Geschwindigkeit beim Zurückkehren zur Ausgangshöhe hat den gleichen Betrag wie v₀, aber entgegengesetztes Vorzeichen (nach unten).",
        "Warum Symmetrie? Weil a = −g (konstant) ist. Das v-t-Diagramm ist eine Gerade mit negativer Steigung g. Der Nulldurchgang (v = 0) liegt exakt in der Mitte des Zeitintervalls. Auf beiden Seiten des Nulldurchgangs sind Betrag und Verlauf spiegelbildlich.",
        "Wichtig: Symmetrie gilt nur für Start und Rückkehr zur gleichen Höhe ohne Luftwiderstand. Mit Luftwiderstand ist der Abstieg langsamer als der Aufstieg (Energie geht verloren).",
      ],
      formula: "t_auf = t_ab = v₀/g | |v_start| = |v_rückkehr| = v₀",
      example: "v₀ = 20 m/s → t_top = 2,04 s (Aufstieg). t_rückkehr = 4,08 s. |v_rückkehr| = 20 m/s (nach unten).",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Ball mit v₀ = 18 m/s geworfen. Wann ist er auf halber Höhe im Abstieg?", options: ["t ≈ 2,76 s (Aufstieg t_top ≈ 1,84 s; nochmal ≈ 0,92 s für halbe Höhe Abstieg)", "t ≈ 1,84 s (am höchsten Punkt)", "t ≈ 3,67 s (Rückkehr)", "t ≈ 0,92 s (halbe Aufstiegszeit)"], correct: 0, explanation: "t_top = 18/9,81 ≈ 1,83 s. Dann nochmal 0,92 s für die untere Hälfte des Abstiegs. (Parabelrechnung: ½·h_max ist nicht bei halber Zeit.)", hint: "Diese Aufgabe ist komplex – h(t) = v₀·t − ½·g·t² auflösen." },
        { text: "Welche Geschwindigkeit hat der Ball bei der Rückkehr zur Wurfhöhe?", options: ["v₀ nach unten (betragsmässig gleich wie Abwurf).", "v = 0 (er kommt zur Ruhe).", "v = 2·v₀ nach unten.", "Kleiner als v₀ (Energie geht verloren)."], correct: 0, explanation: "Ohne Luftwiderstand: Energieerhaltung → |v_rückkehr| = v₀. Nur Richtung kehrt sich um.", hint: "Energieerhaltung ohne Reibung: kinetische Energie beim Abwurf = kinetische Energie bei Rückkehr." },
      ],
      challenge: [
        { text: "v₀ = 10 m/s (nach oben). Welche Höhe nach 1,5 s? (g = 9,81 m/s²)", options: ["≈ 3,95 m", "≈ 15 m", "≈ 7,36 m", "≈ −1,05 m"], correct: 0, explanation: "h = v₀·t − ½·g·t² = 10·1,5 − ½·9,81·2,25 = 15 − 11,04 ≈ 3,96 m. Körper ist noch in der Luft.", hint: "h(t) = v₀·t − ½·g·t²" },
        { text: "v₀ = 8 m/s. Gesamtflugdauer bis Rückkehr?", options: ["≈ 1,63 s", "≈ 3,26 s", "≈ 0,82 s", "≈ 0,48 s"], correct: 0, explanation: "t_gesamt = 2·v₀/g = 16/9,81 ≈ 1,63 s.", hint: "t_gesamt = 2 · v₀ / g" },
      ],
    },
  },

  "Freier Fall im Diagramm": {
    theory: {
      kicker: "Modul 5 · Level 9",
      heading: "s-t und v-t beim freien Fall",
      paragraphs: [
        "Der freie Fall im s-t-Diagramm ergibt eine Parabel (s = ½·g·t²), weil s quadratisch mit t wächst. Die Kurve beginnt flach und wird immer steiler – der Körper fällt in den letzten Metern viel schneller als am Anfang.",
        "Im v-t-Diagramm ist der freie Fall eine Gerade durch den Ursprung mit der Steigung g: v = g·t. Das ist typisch für gleichmässige Beschleunigung mit v₀ = 0.",
        "Beim Aufwärtswurf: v-t ist eine Gerade mit Steigung −g (fallend, Nulldurchgang beim höchsten Punkt). Das s-t-Diagramm zeigt eine nach unten geöffnete Parabel.",
      ],
      formula: "Freier Fall: s(t) = ½·g·t² (Parabel) | v(t) = g·t (Gerade)",
      example: "Bei t=0: s=0, v=0. Bei t=2: s≈19,6 m, v≈19,6 m/s. Bei t=4: s≈78,5 m, v≈39,2 m/s.",
    },
    question: {
      type: "st-live",
      v: 9,
      s: 162,
      followUp: [
        { text: "Im s-t-Diagramm des freien Falls sieht man eine Parabel. Was bedeutet das?", options: ["Der zurückgelegte Weg wächst quadratisch – immer schnellerer Zuwachs.", "Der Körper bewegt sich in einem Bogen.", "Die Fallzeit verdoppelt sich jede Sekunde.", "Die Geschwindigkeit ist konstant."], correct: 0, explanation: "Parabel im s-t: s = ½·g·t². Quadratisches Wachstum bedeutet: in jeder späteren Sekunde fällt man weiter.", hint: "s ~ t². Was bedeutet ein quadratischer Zusammenhang für den Graphen?" },
      ],
    },
  },

  "Boss – Fallturm": {
    theory: {
      kicker: "Modul 5 · Boss",
      heading: "Boss: Freier Fall und Aufwärtswurf",
      paragraphs: [
        "Die Boss-Aufgabe kombiniert alle Formeln des freien Falls. Freier Fall: v = g·t, s = ½·g·t², t = √(2s/g). Aufwärtswurf: v(t) = v₀ − g·t, h_max = v₀²/(2g), t_top = v₀/g.",
        "Strategie für Textaufgaben: Skizze zeichnen! Koordinatensystem festlegen (positive Richtung = nach oben). Dann v₀, g, t und s/h klar beschriften. Vorzeichen von g beachten (−g wenn positiv = oben).",
        "Typische Aufgabentypen: Ball fällt von einem Turm (h gegeben → t und v berechnen). Ball wird von Turm geworfen (v₀ und h gegeben → Flugzeit, Landegeschwindigkeit).",
      ],
      formula: "Freier Fall: t = √(2h/g) | Aufwärtswurf: h_max = v₀²/(2g), t_top = v₀/g",
      example: "Turm h = 122,5 m: t = √(245/9,81) ≈ 5 s. v_Landung = g·t = 49,1 m/s ≈ 177 km/h!",
    },
    question: {
      type: "mc",
      basis: [
        { text: "Ball fällt von 44,1 m Höhe. Fallzeit und Landegeschwindigkeit? (g = 9,81 m/s²)", options: ["t ≈ 3 s, v ≈ 29,4 m/s", "t = 44,1 s, v = 9,81 m/s", "t ≈ 6 s, v ≈ 9,81 m/s", "t ≈ 3 s, v ≈ 44 m/s"], correct: 0, explanation: "t = √(2·44,1/9,81) = √9 = 3 s. v = g·t = 9,81·3 = 29,4 m/s.", hint: "t = √(2h/g), dann v = g·t." },
        { text: "Ball mit v₀ = 14,7 m/s geworfen. h_max?", options: ["≈ 11 m", "≈ 22 m", "≈ 5,5 m", "≈ 44 m"], correct: 0, explanation: "h_max = v₀²/(2g) = 216,09/19,62 ≈ 11 m.", hint: "h_max = v₀² / (2·g)" },
      ],
      challenge: [
        { text: "Ball von Turm mit v₀ = 10 m/s nach oben geworfen. Turm ist 30 m hoch. Wann trifft Ball den Boden? (g≈10 m/s²)", options: ["t ≈ 4 s", "t ≈ 3 s", "t ≈ 5 s", "t ≈ 2 s"], correct: 0, explanation: "h(t) = v₀·t − ½·g·t² + 30 = 0. 10t − 5t² + 30 = 0. 5t² − 10t − 30 = 0. t² − 2t − 6 = 0. t = (2 + √28)/2 ≈ 4 s.", hint: "Position = v₀·t − ½g·t² + h_Turm = 0. Quadratische Gleichung!" },
        { text: "Zwei Bälle: Ball A fällt frei aus h=20m. Ball B wird aus h=20m mit v₀=5m/s nach oben geworfen. Welcher landet zuerst?", options: ["Ball A landet zuerst (Ball B muss erst hochfliegen).", "Ball B landet zuerst.", "Beide gleichzeitig.", "Kommt auf die Masse an."], correct: 0, explanation: "Ball B fliegt erst hoch (verliert Zeit) und landet daher später als A. Ball A landet früher.", hint: "Ball B muss erst den Höchstpunkt erreichen, bevor er fällt." },
      ],
    },
  },

};


// ─── merge step with STEP_CONTENT ──────────────────────────────────────────
const getStepContent = (step) => {
  const extra = STEP_CONTENT[step.title];
  if (!extra) return step;
  return { ...step, ...extra };
};

const moduleOrder = Object.keys(MODULE_CONTENT).sort((a, b) => {
  if (a === "TEST") {
    return 1;
  }
  if (b === "TEST") {
    return -1;
  }
  return Number(a) - Number(b);
});
const SI_SCALAR_VALUES = Array.from({ length: 21 }, (_, index) => index - 10);
const SI_AIR_SLIDERS = [
  {
    id: "length",
    label: "Länge",
    values: ["km", "hm", "dam", "m", "dm", "cm", "mm", "µm", "nm"],
    baseIndex: 3,
    baseValue: "m",
  },
  {
    id: "time",
    label: "Zeit",
    values: ["ks", "hs", "das", "s", "ds", "cs", "ms", "µs", "ns"],
    baseIndex: 3,
    baseValue: "s",
  },
  {
    id: "mass",
    label: "Masse",
    values: ["Pg", "Tg", "Gg", "Mg", "kg", "g", "mg", "µg", "ng"],
    baseIndex: 4,
    baseValue: "kg",
  },
  {
    id: "scalar",
    label: "Skalar",
    values: SI_SCALAR_VALUES,
    baseIndex: 10,
    baseValue: 0,
    isScalar: true,
  },
];

const SI_JUMP_QUESTIONS = [
  {
    text: "Ordne die Slider so, dass \\(10\\,\\mathrm{cm}\\) raus kommt.",
    targets: { scalar: 10, length: "cm" },
  },
  {
    text: "Ordne die Slider so, dass \\(3\\,\\mathrm{ms}\\) raus kommt.",
    targets: { scalar: 3, time: "ms" },
  },
  {
    text: "Ordne die Slider so, dass \\(2\\,\\mathrm{kg}\\) raus kommt.",
    targets: { scalar: 2, mass: "kg" },
  },
  {
    text: "Ordne die Slider so, dass \\(-5\\,\\mathrm{\\mu s}\\) raus kommt.",
    targets: { scalar: -5, time: "µs" },
  },
];

const SI_READOUT_ICONS = {
  length: "📏",
  time: "⏱️",
  mass: "⚖️",
  scalar: "🧮",
};

if (title && frame && pencilLayer instanceof HTMLCanvasElement) {
  const ctx = pencilLayer.getContext("2d");
  let frameRect = frame.getBoundingClientRect();
  let layerRect = pencilLayer.getBoundingClientRect();
  let cssWidth = 0;
  let cssHeight = 0;
  let lastPoint = null;
  let gameStarted = false;
  let activeModuleId = null;
  let activeNodes = [];
  let sidePanelHidden = false;
  const moduleFlashTimers = new WeakMap();

  const applySidePanelVisibility = () => {
    document.body.classList.toggle("side-panel-hidden", sidePanelHidden);
    if (siSideToggle instanceof HTMLButtonElement) {
      siSideToggle.textContent = sidePanelHidden ? "Panel einblenden" : "Panel ausblenden";
      siSideToggle.setAttribute("aria-pressed", sidePanelHidden ? "true" : "false");
    }
  };

  const clampProgress = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return Math.max(0, Math.min(100, parsed));
  };

  const moduleState = moduleOrder.reduce((acc, moduleId) => {
    const card = moduleCards.find((entry) => entry.dataset.module === moduleId);
    const progress = clampProgress(card?.dataset.progress || "0");
    const steps = MODULE_CONTENT[moduleId].steps.length;
    const segments = Math.max(1, steps - 1);
    const reached = Math.max(0, Math.min(segments, Math.round((progress / 100) * segments)));
    acc[moduleId] = { current: reached, maxReached: reached };
    return acc;
  }, {});
  const siJumpState = {
    running: false,
    rafId: 0,
    worldEl: null,
    playerEl: null,
    questionEl: null,
    statEl: null,
    feedbackEl: null,
    checkButton: null,
    nextButton: null,
    restartButton: null,
    readoutContainer: null,
    readoutEls: new Map(),
    readoutCardEls: new Map(),
    readoutPulseTimers: new Map(),
    sliders: [],
    activeSliderId: null,
    questionIndex: 0,
    score: 0,
    questionSolved: false,
    keys: { left: false, right: false, q: false, e: false },
    jumpQueued: false,
    lastSliderStepAt: 0,
    mathTimer: 0,
    player: { x: 90, y: 0, vx: 0, vy: 0, w: 38, h: 38 },
    groundY: 0,
    platformOffsetX: 0,
    airBoostsLeft: 5,
  };
  const testMotionState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    speedInput: null,
    timeInput: null,
    speedValue: null,
    timeValue: null,
    distanceValue: null,
    answerInput: null,
    feedbackEl: null,
    taskMetaEl: null,
    taskTitleEl: null,
    taskTextEl: null,
    nextButton: null,
    targetX: 0,
    carX: 0,
    lastTime: 0,
    questionIndex: 0,
    questionSolved: false,
    flashTimer: 0,
  };
  const TEST_MOTION_QUESTIONS = [
    { vehicle: "Fahrrad", speed: 5, time: 4, xp: 50 },
    { vehicle: "Auto", speed: 8, time: 6, xp: 50 },
    { vehicle: "Roboter", speed: 2.5, time: 8, xp: 50 },
    { vehicle: "Lieferwagen", speed: 7.5, time: 10, xp: 50 },
  ];
  const catchUpState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    timeInput: null,
    timeValue: null,
    answerInput: null,
    feedbackEl: null,
    nextButton: null,
    questionSolved: false,
    flashTimer: 0,
    lastTime: 0,
    shownTime: 0,
    sliderMovingUntil: 0,
    task: null,
  };
  const CATCH_UP_TASK = {
    title: "Wann holst du ihn ein?",
    kicker: "Schwerere Aufgabe",
    label: "Aufgabe 2",
    intro: "Jetzt bewegen sich zwei Figuren gleichzeitig. Das Auto startet schon weiter vorne, aber der Mensch rennt schneller.",
    example: "Wenn der Vorsprung 50 m ist und du 2 m/s schneller bist, brauchst du 25 s.",
    question:
      'Ein Auto startet <strong>50 m</strong> vor dir und fährt mit <strong>4 m/s</strong>. Der Mensch rennt mit <strong>6 m/s</strong>. Nach welcher Zeit holt er das Auto ein?',
    leadLabel: "Auto startet 50 m vorne",
    leadDistance: 50,
    slowSpeed: 4,
    fastSpeed: 6,
    answer: 25,
    xp: 100,
  };
  const K2_OVERTAKE_TASK = {
    title: "Überhol-Duell",
    kicker: "K2",
    label: "K2",
    intro: "Ein langsames Fahrzeug fährt vorne. Ein schnelleres startet deutlich dahinter und muss vor der Kurve aufholen.",
    example: "Bei 400 m Abstand und 10 m/s Relativgeschwindigkeit dauert das Aufholen 40 s.",
    question:
      'Ein langsames Fahrzeug fährt mit <strong>20 m/s</strong>. Ein schnelleres startet <strong>400 m</strong> dahinter mit <strong>30 m/s</strong>. Nach welcher Zeit holt es auf?',
    leadLabel: "Langsames Fahrzeug startet 400 m vorne",
    leadDistance: 400,
    slowSpeed: 20,
    fastSpeed: 30,
    answer: 40,
    xp: 100,
  };
  const accelerationState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    accelerationInput: null,
    timeInput: null,
    accelerationValue: null,
    timeValue: null,
    velocityValue: null,
    answerInput: null,
    feedbackEl: null,
    taskMetaEl: null,
    taskTextEl: null,
    nextButton: null,
    rocketY: 0,
    lastTime: 0,
    flashTimer: 0,
    questionIndex: 0,
    questionSolved: false,
  };
  const ACCELERATION_TASKS = [
    { acceleration: 2, time: 3, answer: 6, xp: 100 },
    { acceleration: 1.5, time: 4, answer: 6, xp: 100 },
    { acceleration: 3, time: 5, answer: 15, xp: 100 },
    { acceleration: 4, time: 2.5, answer: 10, xp: 100 },
  ];
  const sprintState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    distanceInput: null,
    timeInput: null,
    distanceValue: null,
    timeValue: null,
    speedValue: null,
    answerInput: null,
    feedbackEl: null,
    nextButton: null,
    runnerX: 0,
    lastTime: 0,
    flashTimer: 0,
  };
  const SPRINT_TASK = {
    distance: 100,
    time: 9.58,
    answer: 10.44,
    kmh: 37.6,
    xp: 100,
  };
  const freeFallState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    heightInput: null,
    heightValue: null,
    timeValue: null,
    answerInput: null,
    feedbackEl: null,
    taskMetaEl: null,
    taskTextEl: null,
    nextButton: null,
    ballY: 0,
    lastTime: 0,
    flashTimer: 0,
    questionIndex: 0,
    questionSolved: false,
  };
  const FREE_FALL_TASKS = [
    { height: 20, answer: 2.02, xp: 100 },
    { height: 45, answer: 3.03, xp: 100 },
    { height: 5, answer: 1.01, xp: 100 },
    { height: 80, answer: 4.04, xp: 100 },
  ];
  const brakingState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    speedInput: null,
    decelerationInput: null,
    speedValue: null,
    decelerationValue: null,
    distanceValue: null,
    answerInput: null,
    feedbackEl: null,
    taskMetaEl: null,
    taskTextEl: null,
    nextButton: null,
    carX: 0,
    lastTime: 0,
    flashTimer: 0,
    questionIndex: 0,
    questionSolved: false,
  };
  const BRAKING_TASKS = [
    { speed: 20, deceleration: 4, answer: 50, xp: 100 },
    { speed: 15, deceleration: 3, answer: 37.5, xp: 100 },
    { speed: 10, deceleration: 5, answer: 10, xp: 100 },
    { speed: 25, deceleration: 5, answer: 62.5, xp: 100 },
  ];
  const distanceAccState = {
    running: false,
    rafId: 0,
    canvas: null,
    ctx: null,
    accelerationInput: null,
    timeInput: null,
    accelerationValue: null,
    timeValue: null,
    distanceValue: null,
    answerInput: null,
    feedbackEl: null,
    taskMetaEl: null,
    taskTextEl: null,
    nextButton: null,
    carX: 0,
    lastTime: 0,
    flashTimer: 0,
    questionIndex: 0,
    questionSolved: false,
  };
  const DISTANCE_ACC_TASKS = [
    { acceleration: 3, time: 6, answer: 54, xp: 100 },
    { acceleration: 2, time: 5, answer: 25, xp: 100 },
    { acceleration: 4, time: 3, answer: 18, xp: 100 },
    { acceleration: 1.5, time: 4, answer: 12, xp: 100 },
  ];
  const MC_CONCEPT_QUESTIONS = [
    {
      text: "Was beschreibt die Steigung in einem v-t-Diagramm?",
      options: ["Zurückgelegte Strecke", "Beschleunigung", "Zeit", "Kraft"],
      correct: 1,
      explanation: "Die Steigung im v-t-Diagramm gibt an, wie schnell sich die Geschwindigkeit ändert – das ist genau die Beschleunigung: a = Δv / Δt.",
    },
    {
      text: "Ein Objekt bewegt sich gleichförmig. Welches Diagramm zeigt eine schräge Gerade?",
      options: ["a-t-Diagramm", "v-t-Diagramm", "s-t-Diagramm", "Alle drei"],
      correct: 2,
      explanation: "Bei gleichförmiger Bewegung wächst der Ort proportional zur Zeit: s = v · t. Das ergibt im s-t-Diagramm eine schräge Gerade durch den Ursprung.",
    },
    {
      text: "Was bedeutet negative Beschleunigung bei positiver Geschwindigkeit?",
      options: ["Das Objekt steht still", "Das Objekt bewegt sich rückwärts", "Das Objekt wird langsamer", "Die Kraft hat keine Richtung"],
      correct: 2,
      explanation: "Negative Beschleunigung bei positiver Geschwindigkeit heißt: Das Objekt bremst und wird langsamer. Erst wenn v = 0 ist, steht es still.",
    },
    {
      text: "Welche Formel beschreibt den Bremsweg (v₀ = Startgeschwindigkeit, a = Bremsbeschleunigung)?",
      options: ["s = v₀ · a", "s = v₀ / a", "s = v₀² / (2a)", "s = ½ · a · t"],
      correct: 2,
      explanation: "Aus v² = v₀² − 2as folgt bei Stillstand (v = 0): s = v₀² / (2a). Der Bremsweg wächst quadratisch mit der Anfangsgeschwindigkeit.",
    },
  ];

  const getModulePercent = (moduleId) => {
    const state = moduleState[moduleId];
    const steps = MODULE_CONTENT[moduleId].steps.length;
    if (!state || steps <= 1) {
      return 0;
    }

    const segments = steps - 1;
    return Math.round((state.maxReached / segments) * 100);
  };

  const isModuleUnlocked = (moduleId, forceUnlocked = false) => {
    if (forceUnlocked) {
      return true;
    }

    if (moduleId === "TEST") {
      return true;
    }

    const index = moduleOrder.indexOf(moduleId);
    if (index <= 0) {
      return true;
    }

    const prevId = moduleOrder[index - 1];
    return getModulePercent(prevId) >= 100;
  };

  const renderCard = (card, forceUnlocked = false) => {
    const moduleId = card.dataset.module || "0";
    const unlocked = isModuleUnlocked(moduleId, forceUnlocked);
    const progress = getModulePercent(moduleId);
    const statusBadge = card.querySelector(".status-badge");
    const progressLabel = card.querySelector(".progress-label");
    const progressFill = card.querySelector(".progress-fill");

    card.classList.toggle("is-locked", !unlocked);
    card.classList.toggle("is-unlocked", unlocked);
    card.setAttribute("aria-disabled", unlocked ? "false" : "true");
    card.disabled = !unlocked;

    if (statusBadge) {
      statusBadge.textContent = unlocked ? "Unlocked" : "Locked";
      statusBadge.classList.toggle("is-locked", !unlocked);
    }

    if (progressLabel) {
      progressLabel.textContent = `${progress}%`;
    }

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
  };

  const applyModuleStates = () => {
    const forceUnlocked = debugToggle instanceof HTMLInputElement && debugToggle.checked;
    moduleCards.forEach((card) => renderCard(card, forceUnlocked));
  };

  const flashModuleCard = (card) => {
    card.classList.add("is-active-temp");

    const existingTimer = moduleFlashTimers.get(card);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    const timerId = window.setTimeout(() => {
      card.classList.remove("is-active-temp");
    }, 280);
    moduleFlashTimers.set(card, timerId);
  };

  const clampStep = (step, moduleId) => {
    const maxStep = MODULE_CONTENT[moduleId].steps.length - 1;
    return Math.max(0, Math.min(maxStep, step));
  };

  const getNodeDotCenter = (node) => {
    const dot = node.querySelector(".m0-dot");
    if (!(dot instanceof HTMLElement)) {
      return 0;
    }

    return node.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
  };

  const updateModuleLine = () => {
    if (!(modulePath instanceof HTMLElement) || activeNodes.length === 0 || !activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const firstCenter = getNodeDotCenter(activeNodes[0]);
    const lastCenter = getNodeDotCenter(activeNodes[activeNodes.length - 1]);
    const currentCenter = getNodeDotCenter(activeNodes[state.current]);
    const lineHeight = Math.max(0, lastCenter - firstCenter);
    const progressHeight = Math.max(0, currentCenter - firstCenter);

    modulePath.style.setProperty("--m0-line-top", `${firstCenter}px`);
    modulePath.style.setProperty("--m0-line-height", `${lineHeight}px`);
    modulePath.style.setProperty("--m0-line-progress", `${progressHeight}px`);
  };

  const applyActiveNodeLockState = () => {
    if (!activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const debugOn = debugToggle instanceof HTMLInputElement && debugToggle.checked;

    activeNodes.forEach((node, index) => {
      const unlocked = debugOn || index <= state.maxReached + 1;
      node.classList.toggle("is-locked", !unlocked);
      node.disabled = !unlocked;
      node.setAttribute("aria-disabled", unlocked ? "false" : "true");
    });
  };

  const setActiveStep = (step, focusStep = false) => {
    if (!activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const nextStep = clampStep(step, activeModuleId);

    state.current = nextStep;
    state.maxReached = Math.max(state.maxReached, nextStep);

    activeNodes.forEach((node, index) => {
      node.classList.toggle("is-current", index === state.current);
      node.classList.toggle("is-complete", index < state.current);
    });

    applyActiveNodeLockState();
    updateModuleLine();
    applyModuleStates();

    if (focusStep) {
      const activeNode = activeNodes[state.current];
      if (activeNode instanceof HTMLElement) {
        activeNode.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleNodeClick = (index) => {
    if (!activeModuleId) {
      return;
    }

    const node = activeNodes[index];
    if (!(node instanceof HTMLButtonElement) || node.classList.contains("is-locked")) {
      return;
    }

    setActiveStep(index);
    openSIGame(index);
  };

  const renderActiveModuleView = () => {
    if (!activeModuleId || !(moduleSteps instanceof HTMLElement)) {
      return;
    }

    const moduleData = MODULE_CONTENT[activeModuleId];
    if (moduleKicker instanceof HTMLElement) {
      moduleKicker.textContent = `Module ${activeModuleId}`;
    }
    if (moduleTitle instanceof HTMLElement) {
      moduleTitle.textContent = moduleData.title;
    }

    moduleSteps.innerHTML = moduleData.steps
      .map((step, index) => {
        const icon = STEP_ICONS[step.icon] || STEP_ICONS.graph;
        return `
          <button class="m0-node" type="button" data-step="${index}">
            <span class="m0-dot" aria-hidden="true"></span>
            <span class="m0-node-body">
              <span class="m0-node-title">${step.title}</span>
              <span class="m0-node-text">${step.text}</span>
            </span>
            <span class="m0-node-visual" style="--step-grad-start:${step.colorA}; --step-grad-end:${step.colorB};" aria-hidden="true">
              ${icon}
            </span>
          </button>
        `;
      })
      .join("");

    activeNodes = Array.from(moduleSteps.querySelectorAll(".m0-node"));
    activeNodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        handleNodeClick(index);
      });
    });
  };

  const openModuleView = (moduleId) => {
    if (!gameStarted || !(moduleView instanceof HTMLElement) || !MODULE_CONTENT[moduleId]) {
      return;
    }

    activeModuleId = moduleId;
    closeSIGame();
    renderActiveModuleView();

    document.body.classList.add("module0-open", "module0-zooming");
    window.setTimeout(() => {
      document.body.classList.remove("module0-zooming");
    }, 440);

    const state = moduleState[moduleId];
    setActiveStep(state.current);
    window.requestAnimationFrame(() => {
      updateModuleLine();
    });
  };

  const closeModuleView = () => {
    stopSIUnitsJumpGame();
    stopTestMotionGame();
    stopCatchUpGame();
    stopAccelerationGame();
    stopSprintGame();
    stopFreeFallGame();
    stopBrakingGame();
    stopDistanceAccGame();
    stopModuleGame();
    sidePanelHidden = false;
    applySidePanelVisibility();
    document.body.classList.remove("module0-open", "module0-zooming", "si-game-open");
  };

  const shuffleArray = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const stopTestMotionGame = () => {
    testMotionState.running = false;
    if (testMotionState.rafId) {
      window.cancelAnimationFrame(testMotionState.rafId);
    }
    if (testMotionState.flashTimer) {
      window.clearTimeout(testMotionState.flashTimer);
    }
    testMotionState.rafId = 0;
    testMotionState.lastTime = 0;
    testMotionState.flashTimer = 0;
    if (siGameStage instanceof HTMLElement) {
      siGameStage.classList.remove("test-motion-flash");
    }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopCatchUpGame = () => {
    catchUpState.running = false;
    if (catchUpState.rafId) {
      window.cancelAnimationFrame(catchUpState.rafId);
    }
    if (catchUpState.flashTimer) {
      window.clearTimeout(catchUpState.flashTimer);
    }
    catchUpState.rafId = 0;
    catchUpState.flashTimer = 0;
    catchUpState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) {
      siGameStage.classList.remove("test-motion-flash");
    }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopAccelerationGame = () => {
    accelerationState.running = false;
    if (accelerationState.rafId) {
      window.cancelAnimationFrame(accelerationState.rafId);
    }
    if (accelerationState.flashTimer) {
      window.clearTimeout(accelerationState.flashTimer);
    }
    accelerationState.rafId = 0;
    accelerationState.flashTimer = 0;
    accelerationState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) {
      siGameStage.classList.remove("test-motion-flash");
    }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopSprintGame = () => {
    sprintState.running = false;
    if (sprintState.rafId) {
      window.cancelAnimationFrame(sprintState.rafId);
    }
    if (sprintState.flashTimer) {
      window.clearTimeout(sprintState.flashTimer);
    }
    sprintState.rafId = 0;
    sprintState.flashTimer = 0;
    sprintState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) {
      siGameStage.classList.remove("test-motion-flash");
    }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopFreeFallGame = () => {
    freeFallState.running = false;
    if (freeFallState.rafId) { window.cancelAnimationFrame(freeFallState.rafId); }
    if (freeFallState.flashTimer) { window.clearTimeout(freeFallState.flashTimer); }
    freeFallState.rafId = 0;
    freeFallState.flashTimer = 0;
    freeFallState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) { siGameStage.classList.remove("test-motion-flash"); }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopBrakingGame = () => {
    brakingState.running = false;
    if (brakingState.rafId) { window.cancelAnimationFrame(brakingState.rafId); }
    if (brakingState.flashTimer) { window.clearTimeout(brakingState.flashTimer); }
    brakingState.rafId = 0;
    brakingState.flashTimer = 0;
    brakingState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) { siGameStage.classList.remove("test-motion-flash"); }
    document.body.classList.remove("test-motion-page-flash");
  };

  const stopDistanceAccGame = () => {
    distanceAccState.running = false;
    if (distanceAccState.rafId) { window.cancelAnimationFrame(distanceAccState.rafId); }
    if (distanceAccState.flashTimer) { window.clearTimeout(distanceAccState.flashTimer); }
    distanceAccState.rafId = 0;
    distanceAccState.flashTimer = 0;
    distanceAccState.lastTime = 0;
    if (siGameStage instanceof HTMLElement) { siGameStage.classList.remove("test-motion-flash"); }
    document.body.classList.remove("test-motion-page-flash");
  };

  const getTestMotionValues = () => {
    const speed = Number(testMotionState.speedInput?.value || 5);
    const time = Number(testMotionState.timeInput?.value || 4);
    return {
      speed,
      time,
      distance: speed * time,
    };
  };

  const formatTestDecimal = (value) =>
    new Intl.NumberFormat("de-CH", {
      maximumFractionDigits: 1,
      minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    }).format(value);

  const updateTestMotionLabels = () => {
    const { speed, time, distance } = getTestMotionValues();
    if (testMotionState.speedValue instanceof HTMLElement) {
      testMotionState.speedValue.textContent = `${formatTestDecimal(speed)} m/s`;
    }
    if (testMotionState.timeValue instanceof HTMLElement) {
      testMotionState.timeValue.textContent = `${formatTestDecimal(time)} s`;
    }
    if (testMotionState.distanceValue instanceof HTMLElement) {
      testMotionState.distanceValue.textContent = `${formatTestDecimal(distance)} m`;
    }
  };

  const resizeTestMotionCanvas = () => {
    const canvas = testMotionState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);

    const context = testMotionState.ctx;
    if (context) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const drawTestMotionGame = (now = 0) => {
    if (!testMotionState.running || !(testMotionState.canvas instanceof HTMLCanvasElement) || !testMotionState.ctx) {
      return;
    }

    const canvas = testMotionState.canvas;
    const context = testMotionState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { distance } = getTestMotionValues();
    const maxSpeed = Number(testMotionState.speedInput?.max || 12);
    const maxTime = Number(testMotionState.timeInput?.max || 10);
    const maxDistance = maxSpeed * maxTime;
    const left = 54;
    const right = width - 58;
    const trackY = height * 0.63;
    const metersPerBox = 5;
    const gridStep = (right - left) / (maxDistance / metersPerBox);
    const targetX = left + Math.min(distance, maxDistance) / maxDistance * (right - left);
    const deltaSeconds = testMotionState.lastTime ? Math.min(0.05, (now - testMotionState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);

    testMotionState.lastTime = now;
    testMotionState.targetX = targetX;
    if (!testMotionState.carX) {
      testMotionState.carX = targetX;
    }
    testMotionState.carX += (targetX - testMotionState.carX) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(96, 111, 128, 0.23)";
    context.lineWidth = 1;
    for (let x = left; x <= right + 0.5; x += gridStep) {
      context.beginPath();
      context.moveTo(x, 18);
      context.lineTo(x, height - 30);
      context.stroke();
    }
    for (let y = trackY; y >= 22; y -= gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }
    for (let y = trackY + gridStep; y <= height - 30; y += gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(left, trackY);
    context.lineTo(right, trackY);
    context.stroke();

    context.strokeStyle = "#ff8d47";
    context.lineWidth = 7;
    context.beginPath();
    context.moveTo(left, trackY);
    context.lineTo(testMotionState.carX, trackY);
    context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    for (let meter = 0; meter <= maxDistance; meter += metersPerBox) {
      const x = left + (meter / maxDistance) * (right - left);
      context.strokeStyle = "rgba(23, 27, 33, 0.42)";
      context.lineWidth = meter % 10 === 0 ? 2 : 1;
      context.beginPath();
      context.moveTo(x, trackY - 10);
      context.lineTo(x, trackY + 10);
      context.stroke();
      if (meter % 20 === 0) {
        context.fillText(`${meter} m`, x, trackY + 18);
      }
    }

    const carX = testMotionState.carX;
    const carY = trackY - 24;
    context.fillStyle = "#ff8d47";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.2;
    context.beginPath();
    context.roundRect(carX - 31, carY - 15, 62, 26, 7);
    context.fill();
    context.stroke();

    context.fillStyle = "#ffd164";
    context.beginPath();
    context.roundRect(carX - 14, carY - 33, 31, 20, 5);
    context.fill();
    context.stroke();

    context.fillStyle = "#171b21";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 8, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 8, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#f8fbff";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("1 Kasten = 5 m", left, 18);

    testMotionState.rafId = window.requestAnimationFrame(drawTestMotionGame);
  };

  const getCurrentTestMotionQuestion = () =>
    TEST_MOTION_QUESTIONS[testMotionState.questionIndex] || TEST_MOTION_QUESTIONS[0];

  const setTestMotionSlidersForQuestion = () => {
    if (testMotionState.speedInput instanceof HTMLInputElement) {
      testMotionState.speedInput.value = "0";
    }
    if (testMotionState.timeInput instanceof HTMLInputElement) {
      testMotionState.timeInput.value = "0";
    }
    testMotionState.carX = 0;
    testMotionState.lastTime = 0;
    updateTestMotionLabels();
  };

  const renderCurrentTestMotionQuestion = () => {
    const question = getCurrentTestMotionQuestion();
    const answer = question.speed * question.time;

    testMotionState.questionSolved = false;
    setTestMotionSlidersForQuestion();

    if (testMotionState.taskMetaEl instanceof HTMLElement) {
      testMotionState.taskMetaEl.innerHTML = `
        <span>Aufgabe ${testMotionState.questionIndex + 1} von ${TEST_MOTION_QUESTIONS.length}</span>
        <strong>Leicht · ${question.xp} XP</strong>
      `;
    }
    if (testMotionState.taskTitleEl instanceof HTMLElement) {
      testMotionState.taskTitleEl.textContent = "Strecke berechnen";
    }
    if (testMotionState.taskTextEl instanceof HTMLElement) {
      testMotionState.taskTextEl.innerHTML = `
        Ein ${question.vehicle} fährt mit <strong>${formatTestDecimal(question.speed)} m/s</strong>.
        Wie weit fährt es in <strong>${formatTestDecimal(question.time)} s</strong>?
      `;
    }
    if (testMotionState.answerInput instanceof HTMLInputElement) {
      testMotionState.answerInput.value = "";
      testMotionState.answerInput.disabled = false;
      testMotionState.answerInput.focus();
    }
    if (testMotionState.feedbackEl instanceof HTMLElement) {
      testMotionState.feedbackEl.className = "test-motion-feedback";
      testMotionState.feedbackEl.textContent = "";
    }
    if (testMotionState.nextButton instanceof HTMLButtonElement) {
      testMotionState.nextButton.hidden = true;
      testMotionState.nextButton.textContent =
        testMotionState.questionIndex === TEST_MOTION_QUESTIONS.length - 1 ? "Fertig" : "Nächste Frage";
    }

    return answer;
  };

  const flashTestMotionSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });

    if (testMotionState.flashTimer) {
      window.clearTimeout(testMotionState.flashTimer);
    }
    testMotionState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      testMotionState.flashTimer = 0;
    }, 760);
  };

  const goToNextTestMotionQuestion = () => {
    if (!testMotionState.questionSolved) {
      return;
    }

    if (testMotionState.questionIndex >= TEST_MOTION_QUESTIONS.length - 1) {
      stopTestMotionGame();
      if (siGameStage instanceof HTMLElement) {
        siGameStage.innerHTML = `
          <section class="test-motion-complete">
            <h3>Level geschafft!</h3>
            <p>Du hast alle Auto-Aufgaben zur gleichförmigen Bewegung gelöst.</p>
            <div class="test-motion-complete-actions">
              <button class="si-jumpgame-button" id="test-motion-next-level" type="button">Zur nächsten Aufgabe</button>
              <button class="si-jumpgame-button" id="test-motion-repeat" type="button">Nochmal spielen</button>
            </div>
          </section>
        `;
        const nextLevelButton = siGameStage.querySelector("#test-motion-next-level");
        if (nextLevelButton instanceof HTMLButtonElement) {
          nextLevelButton.addEventListener("click", () => {
            closeSIGame();
          });
        }
        const repeatButton = siGameStage.querySelector("#test-motion-repeat");
        if (repeatButton instanceof HTMLButtonElement) {
          repeatButton.addEventListener("click", () => {
            renderTestUniformMotionGame();
          });
        }
      }
      return;
    }

    testMotionState.questionIndex += 1;
    renderCurrentTestMotionQuestion();
  };

  const checkTestMotionAnswer = () => {
    const feedbackEl = testMotionState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) {
      return;
    }

    const answer =
      testMotionState.answerInput instanceof HTMLInputElement ? testMotionState.answerInput.valueAsNumber : Number.NaN;
    const question = getCurrentTestMotionQuestion();
    const correctAnswer = question.speed * question.time;
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }

    if (Math.abs(answer - correctAnswer) <= 0.05) {
      testMotionState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Das hast du toll gemacht. Die Strecke ist ${formatTestDecimal(correctAnswer)} m. +${question.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (testMotionState.answerInput instanceof HTMLInputElement) {
        testMotionState.answerInput.disabled = true;
      }
      if (testMotionState.nextButton instanceof HTMLButtonElement) {
        testMotionState.nextButton.hidden = false;
      }
      flashTestMotionSuccess();
      return;
    }

    feedbackEl.textContent = "Fast richtig: Prüfe Geschwindigkeit und Zeit. Die Antwort muss in Metern sein.";
    feedbackEl.classList.add("is-hint");
  };

  const startTestMotionQuestions = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopTestMotionGame();

    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="test-motion-canvas" aria-label="Auto auf einer geraden Strecke"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Geschwindigkeit</span>
            <input id="test-motion-speed" type="range" min="0" max="12" step="0.5" value="5">
            <strong id="test-motion-speed-value">5 m/s</strong>
          </label>
          <label class="test-motion-control">
            <span>Zeit</span>
            <input id="test-motion-time" type="range" min="0" max="10" step="0.5" value="4">
            <strong id="test-motion-time-value">4 s</strong>
          </label>
          <div class="test-motion-readout">
            <span>Strecke</span>
            <strong id="test-motion-distance-value">20 m</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta" id="test-motion-task-meta"></div>
          <h3 id="test-motion-task-title">Strecke berechnen</h3>
          <p id="test-motion-task-text"></p>
          <label class="test-motion-answer-label" for="test-motion-answer">Antwort in Metern</label>
          <div class="test-motion-answer-row">
            <input id="test-motion-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="test-motion-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="test-motion-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="test-motion-next" type="button" hidden>Nächste Frage</button>
        </article>
      </section>
    `;

    testMotionState.canvas = siGameStage.querySelector("#test-motion-canvas");
    testMotionState.ctx = testMotionState.canvas instanceof HTMLCanvasElement ? testMotionState.canvas.getContext("2d") : null;
    testMotionState.speedInput = siGameStage.querySelector("#test-motion-speed");
    testMotionState.timeInput = siGameStage.querySelector("#test-motion-time");
    testMotionState.speedValue = siGameStage.querySelector("#test-motion-speed-value");
    testMotionState.timeValue = siGameStage.querySelector("#test-motion-time-value");
    testMotionState.distanceValue = siGameStage.querySelector("#test-motion-distance-value");
    testMotionState.answerInput = siGameStage.querySelector("#test-motion-answer");
    testMotionState.feedbackEl = siGameStage.querySelector("#test-motion-feedback");
    testMotionState.taskMetaEl = siGameStage.querySelector("#test-motion-task-meta");
    testMotionState.taskTitleEl = siGameStage.querySelector("#test-motion-task-title");
    testMotionState.taskTextEl = siGameStage.querySelector("#test-motion-task-text");
    testMotionState.nextButton = siGameStage.querySelector("#test-motion-next");
    testMotionState.carX = 0;
    testMotionState.lastTime = 0;
    testMotionState.questionIndex = 0;
    testMotionState.questionSolved = false;

    [testMotionState.speedInput, testMotionState.timeInput].forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.addEventListener("input", updateTestMotionLabels);
      }
    });

    const checkButton = siGameStage.querySelector("#test-motion-check");
    if (checkButton instanceof HTMLButtonElement) {
      checkButton.addEventListener("click", checkTestMotionAnswer);
    }
    if (testMotionState.answerInput instanceof HTMLInputElement) {
      testMotionState.answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkTestMotionAnswer();
        }
      });
    }
    if (testMotionState.nextButton instanceof HTMLButtonElement) {
      testMotionState.nextButton.addEventListener("click", goToNextTestMotionQuestion);
    }

    renderCurrentTestMotionQuestion();
    resizeTestMotionCanvas();
    testMotionState.running = true;
    testMotionState.rafId = window.requestAnimationFrame(drawTestMotionGame);
  };

  const renderTestUniformMotionGame = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    stopTestMotionGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Vor dem Rennen</p>
          <h3>Gleichförmige Bewegung</h3>
          <p>Stell dir ein Auto vor, das ganz ruhig fährt: kein Turbo, kein Bremsen, kein schneller werden. Es fährt jede Sekunde gleich viele Meter.</p>
          <p>Wenn du wissen willst, wie weit es kommt, brauchst du nur zwei Dinge: die Geschwindigkeit und die Zeit.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>s = v · t</span>
        </div>
        <div class="test-theory-example">
          <p><strong>So liest du die Formel:</strong></p>
          <p>Strecke = Geschwindigkeit mal Zeit. Also: Wenn etwas mit 5 m/s fährt und 4 s unterwegs ist, kommt es 20 m weit.</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="test-theory-start" type="button">Zur Frage</button>
      </section>
    `;

    const theoryStart = siGameStage.querySelector("#test-theory-start");
    if (theoryStart instanceof HTMLButtonElement) {
      theoryStart.addEventListener("click", startTestMotionQuestions);
    }
  };

  const resizeCatchUpCanvas = () => {
    const canvas = catchUpState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));

    if (catchUpState.ctx) {
      catchUpState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const updateCatchUpLabel = () => {
    const time = Number(catchUpState.timeInput?.value || 0);
    if (catchUpState.timeValue instanceof HTMLElement) {
      catchUpState.timeValue.textContent = `${formatTestDecimal(time)} s`;
    }
  };

  const getCatchUpTask = () => catchUpState.task || CATCH_UP_TASK;

  const drawCatchUpCar = (context, x, y, color, roofColor) => {
    context.fillStyle = color;
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.2;
    context.beginPath();
    context.roundRect(x - 31, y - 15, 62, 26, 7);
    context.fill();
    context.stroke();

    context.fillStyle = roofColor;
    context.beginPath();
    context.roundRect(x - 14, y - 33, 31, 20, 5);
    context.fill();
    context.stroke();

    context.fillStyle = "#171b21";
    context.beginPath();
    context.arc(x - 20, y + 12, 8, 0, Math.PI * 2);
    context.arc(x + 20, y + 12, 8, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#f8fbff";
    context.beginPath();
    context.arc(x - 20, y + 12, 3.2, 0, Math.PI * 2);
    context.arc(x + 20, y + 12, 3.2, 0, Math.PI * 2);
    context.fill();
  };

  const drawCatchUpRunner = (context, x, groundY, isRunning, time) => {
    const stride = isRunning ? Math.sin(time * 0.014) : 0;
    const bob = isRunning ? Math.abs(Math.sin(time * 0.014)) * 3 : 0;
    const hipY = groundY - 32 - bob;
    const headY = hipY - 34;
    const armSwing = stride * 14;
    const legSwing = stride * 17;

    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#171b21";
    context.lineWidth = 4;

    context.fillStyle = "#ffd164";
    context.beginPath();
    context.arc(x, headY, 9, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.strokeStyle = "#ff8d47";
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(x, headY + 10);
    context.lineTo(x, hipY);
    context.stroke();

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(x, headY + 18);
    context.lineTo(x - 15 - armSwing * 0.35, hipY - 8 + armSwing * 0.35);
    context.moveTo(x, headY + 18);
    context.lineTo(x + 15 + armSwing * 0.35, hipY - 8 - armSwing * 0.35);
    context.stroke();

    context.beginPath();
    context.moveTo(x, hipY);
    context.lineTo(x - 12 - legSwing * 0.45, groundY - 2);
    context.moveTo(x, hipY);
    context.lineTo(x + 12 + legSwing * 0.45, groundY - 2);
    context.stroke();

    context.fillStyle = "#171b21";
    context.beginPath();
    context.ellipse(x - 12 - legSwing * 0.45, groundY, 8, 3, 0, 0, Math.PI * 2);
    context.ellipse(x + 12 + legSwing * 0.45, groundY, 8, 3, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const drawCatchUpGame = (now = 0) => {
    if (!catchUpState.running || !(catchUpState.canvas instanceof HTMLCanvasElement) || !catchUpState.ctx) {
      return;
    }

    const canvas = catchUpState.canvas;
    const context = catchUpState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const task = getCatchUpTask();
    const targetTime = Number(catchUpState.timeInput?.value || 0);
    const deltaSeconds = catchUpState.lastTime ? Math.min(0.05, (now - catchUpState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);
    catchUpState.lastTime = now;
    catchUpState.shownTime += (targetTime - catchUpState.shownTime) * smoothing;

    const left = 54;
    const right = width - 58;
    const maxDistance = Math.ceil((task.fastSpeed * Number(catchUpState.timeInput?.max || task.answer)) / 100) * 100;
    const gridStep = (right - left) / (maxDistance / 20);
    const topTrackY = height * 0.48;
    const bottomTrackY = height * 0.7;
    const slowDistance = task.leadDistance + task.slowSpeed * catchUpState.shownTime;
    const fastDistance = task.fastSpeed * catchUpState.shownTime;
    const slowX = left + Math.min(slowDistance, maxDistance) / maxDistance * (right - left);
    const fastX = left + Math.min(fastDistance, maxDistance) / maxDistance * (right - left);
    const runnerIsMoving = now < catchUpState.sliderMovingUntil;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    for (let x = left; x <= right + 0.5; x += gridStep) {
      context.beginPath();
      context.moveTo(x, 18);
      context.lineTo(x, height - 28);
      context.stroke();
    }
    for (let y = 24; y <= height - 28; y += gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }

    [topTrackY, bottomTrackY].forEach((trackY) => {
      context.strokeStyle = "#171b21";
      context.lineWidth = 4;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(left, trackY);
      context.lineTo(right, trackY);
      context.stroke();
    });

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    const labelStep = maxDistance > 300 ? 200 : 20;
    for (let meter = 0; meter <= maxDistance; meter += labelStep / 2) {
      const x = left + (meter / maxDistance) * (right - left);
      context.strokeStyle = "rgba(23, 27, 33, 0.42)";
      context.lineWidth = meter % labelStep === 0 ? 2 : 1;
      context.beginPath();
      context.moveTo(x, bottomTrackY - 10);
      context.lineTo(x, bottomTrackY + 10);
      context.stroke();
      if (meter % labelStep === 0) {
        context.fillText(`${meter} m`, x, bottomTrackY + 18);
      }
    }

    context.fillStyle = "#101418";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.fillText(task.leadLabel, left, 18);
    context.fillText(`Zeit: ${formatTestDecimal(catchUpState.shownTime)} s`, left, 40);

    drawCatchUpCar(context, slowX, topTrackY - 24, "#24b7d8", "#84e1f1");
    drawCatchUpRunner(context, fastX, bottomTrackY, runnerIsMoving, now);

    context.fillStyle = "#17212b";
    context.font = "800 12px Space Grotesk, sans-serif";
    context.textAlign = "right";
    context.fillText(`${formatTestDecimal(task.slowSpeed)} m/s`, Math.min(right, slowX + 52), topTrackY - 58);
    context.fillText(`${formatTestDecimal(task.fastSpeed)} m/s`, Math.min(right, fastX + 52), bottomTrackY - 74);

    catchUpState.rafId = window.requestAnimationFrame(drawCatchUpGame);
  };

  const flashCatchUpSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });

    if (catchUpState.flashTimer) {
      window.clearTimeout(catchUpState.flashTimer);
    }
    catchUpState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      catchUpState.flashTimer = 0;
    }, 760);
  };

  const checkCatchUpAnswer = () => {
    const feedbackEl = catchUpState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) {
      return;
    }

    const answer = catchUpState.answerInput instanceof HTMLInputElement ? catchUpState.answerInput.valueAsNumber : Number.NaN;
    const task = getCatchUpTask();
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }

    if (Math.abs(answer - task.answer) <= 0.05) {
      catchUpState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Sehr stark gerechnet. Nach ${formatTestDecimal(task.answer)} s ist das Aufholen geschafft. +${task.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (catchUpState.answerInput instanceof HTMLInputElement) {
        catchUpState.answerInput.disabled = true;
      }
      if (catchUpState.nextButton instanceof HTMLButtonElement) {
        catchUpState.nextButton.hidden = false;
      }
      if (catchUpState.timeInput instanceof HTMLInputElement) {
        catchUpState.timeInput.value = String(task.answer);
        updateCatchUpLabel();
      }
      flashCatchUpSuccess();
      return;
    }

    feedbackEl.textContent = `Noch nicht ganz: Teile den Vorsprung durch den Geschwindigkeits-Unterschied: ${formatTestDecimal(task.leadDistance)} m durch ${formatTestDecimal(task.fastSpeed - task.slowSpeed)} m/s.`;
    feedbackEl.classList.add("is-hint");
  };

  const renderCatchUpGame = (task = CATCH_UP_TASK) => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    stopTestMotionGame();
    stopCatchUpGame();
    catchUpState.task = task;

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">${task.kicker}</p>
          <h3>${task.title}</h3>
          <p>${task.intro}</p>
          <p>Wichtig ist hier nicht deine ganze Geschwindigkeit allein, sondern wie viel schneller du bist.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>t = Abstand ÷ Δv</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Idee:</strong> Pro Sekunde holst du nur den Unterschied der Geschwindigkeiten auf.</p>
          <p>${task.example}</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="catch-up-start" type="button">Zur Frage</button>
      </section>
    `;

    const startButton = siGameStage.querySelector("#catch-up-start");
    if (startButton instanceof HTMLButtonElement) {
      startButton.addEventListener("click", startCatchUpQuestion);
    }
  };

  const startCatchUpQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopCatchUpGame();
    const task = getCatchUpTask();
    const maxTime = Math.ceil((task.answer + 10) / 5) * 5;

    siGameStage.innerHTML = `
      <section class="test-motion-game catch-up-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="catch-up-canvas" aria-label="Auto und Mensch auf parallelen Strecken"></canvas>
        </div>
        <div class="test-motion-controls catch-up-controls">
          <label class="test-motion-control">
            <span>Zeit anschauen</span>
            <input id="catch-up-time" type="range" min="0" max="${maxTime}" step="0.5" value="0">
            <strong id="catch-up-time-value">0 s</strong>
          </label>
          <div class="test-motion-readout">
            <span>Vorsprung</span>
            <strong>${formatTestDecimal(task.leadDistance)} m</strong>
          </div>
          <div class="test-motion-readout">
            <span>Geschwindigkeiten</span>
            <strong>${formatTestDecimal(task.slowSpeed)} m/s und ${formatTestDecimal(task.fastSpeed)} m/s</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta">
            <span>${task.label}</span>
            <strong>Mittel · ${task.xp} XP</strong>
          </div>
          <h3>${task.title}</h3>
          <p>${task.question}</p>
          <label class="test-motion-answer-label" for="catch-up-answer">Antwort in Sekunden</label>
          <div class="test-motion-answer-row">
            <input id="catch-up-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="catch-up-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="catch-up-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="catch-up-next" type="button" hidden>Zurück zum Pfad</button>
        </article>
      </section>
    `;

    catchUpState.canvas = siGameStage.querySelector("#catch-up-canvas");
    catchUpState.ctx = catchUpState.canvas instanceof HTMLCanvasElement ? catchUpState.canvas.getContext("2d") : null;
    catchUpState.timeInput = siGameStage.querySelector("#catch-up-time");
    catchUpState.timeValue = siGameStage.querySelector("#catch-up-time-value");
    catchUpState.answerInput = siGameStage.querySelector("#catch-up-answer");
    catchUpState.feedbackEl = siGameStage.querySelector("#catch-up-feedback");
    catchUpState.nextButton = siGameStage.querySelector("#catch-up-next");
    catchUpState.questionSolved = false;
    catchUpState.shownTime = 0;
    catchUpState.lastTime = 0;

    if (catchUpState.timeInput instanceof HTMLInputElement) {
      catchUpState.timeInput.addEventListener("input", () => {
        catchUpState.sliderMovingUntil = performance.now() + 180;
        updateCatchUpLabel();
      });
    }

    const checkButton = siGameStage.querySelector("#catch-up-check");
    if (checkButton instanceof HTMLButtonElement) {
      checkButton.addEventListener("click", checkCatchUpAnswer);
    }
    if (catchUpState.answerInput instanceof HTMLInputElement) {
      catchUpState.answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkCatchUpAnswer();
        }
      });
      catchUpState.answerInput.focus();
    }
    if (catchUpState.nextButton instanceof HTMLButtonElement) {
      catchUpState.nextButton.addEventListener("click", closeSIGame);
    }

    updateCatchUpLabel();
    resizeCatchUpCanvas();
    catchUpState.running = true;
    catchUpState.rafId = window.requestAnimationFrame(drawCatchUpGame);
  };

  const resizeAccelerationCanvas = () => {
    const canvas = accelerationState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));

    if (accelerationState.ctx) {
      accelerationState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const getAccelerationValues = () => {
    const acceleration = Number(accelerationState.accelerationInput?.value || 0);
    const time = Number(accelerationState.timeInput?.value || 0);
    return {
      acceleration,
      time,
      velocity: acceleration * time,
      height: 0.5 * acceleration * time * time,
    };
  };

  const updateAccelerationLabels = () => {
    const { acceleration, time, velocity } = getAccelerationValues();
    if (accelerationState.accelerationValue instanceof HTMLElement) {
      accelerationState.accelerationValue.textContent = `${formatTestDecimal(acceleration)} m/s²`;
    }
    if (accelerationState.timeValue instanceof HTMLElement) {
      accelerationState.timeValue.textContent = `${formatTestDecimal(time)} s`;
    }
    if (accelerationState.velocityValue instanceof HTMLElement) {
      accelerationState.velocityValue.textContent = `${formatTestDecimal(velocity)} m/s`;
    }
  };

  const drawAccelerationGame = (now = 0) => {
    if (!accelerationState.running || !(accelerationState.canvas instanceof HTMLCanvasElement) || !accelerationState.ctx) {
      return;
    }

    const canvas = accelerationState.canvas;
    const context = accelerationState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { height: rocketHeight } = getAccelerationValues();
    const maxAcceleration = Number(accelerationState.accelerationInput?.max || 8);
    const maxTime = Number(accelerationState.timeInput?.max || 8);
    const maxHeight = Math.ceil((0.5 * maxAcceleration * maxTime * maxTime) / 20) * 20;
    const left = 58;
    const launchY = height - 48;
    const topY = 28;
    const targetY = launchY - Math.min(rocketHeight, maxHeight) / maxHeight * (launchY - topY);
    const deltaSeconds = accelerationState.lastTime ? Math.min(0.05, (now - accelerationState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);

    accelerationState.lastTime = now;
    if (!accelerationState.rocketY) {
      accelerationState.rocketY = targetY;
    }
    accelerationState.rocketY += (targetY - accelerationState.rocketY) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    const gridStep = (launchY - topY) / 10;
    for (let x = left; x <= width - 36; x += gridStep) {
      context.beginPath();
      context.moveTo(x, topY);
      context.lineTo(x, launchY);
      context.stroke();
    }
    for (let y = topY; y <= launchY; y += gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(width - 36, y);
      context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(left, topY);
    context.lineTo(left, launchY);
    context.lineTo(width - 36, launchY);
    context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "right";
    context.textBaseline = "middle";
    const labelStep = maxHeight > 180 ? 40 : 20;
    for (let meter = 0; meter <= maxHeight; meter += labelStep) {
      const y = launchY - (meter / maxHeight) * (launchY - topY);
      context.fillText(`${meter} m`, left - 8, y);
      context.strokeStyle = "rgba(23, 27, 33, 0.38)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(left - 4, y);
      context.lineTo(left + 8, y);
      context.stroke();
    }

    const rocketX = width * 0.56;
    const rocketY = accelerationState.rocketY;
    const flame = Math.max(8, Math.min(30, getAccelerationValues().velocity * 2.4));

    context.fillStyle = "#ff8d47";
    context.beginPath();
    context.moveTo(rocketX, rocketY + 34 + flame);
    context.lineTo(rocketX - 10, rocketY + 32);
    context.lineTo(rocketX + 10, rocketY + 32);
    context.closePath();
    context.fill();

    context.fillStyle = "#7a62ff";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.4;
    context.beginPath();
    context.roundRect(rocketX - 16, rocketY - 30, 32, 62, 12);
    context.fill();
    context.stroke();

    context.fillStyle = "#b7a7ff";
    context.beginPath();
    context.moveTo(rocketX, rocketY - 50);
    context.lineTo(rocketX - 16, rocketY - 24);
    context.lineTo(rocketX + 16, rocketY - 24);
    context.closePath();
    context.fill();
    context.stroke();

    context.fillStyle = "#eaf6ff";
    context.beginPath();
    context.arc(rocketX, rocketY - 6, 7, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Start aus der Ruhe", left + 18, topY + 10);

    accelerationState.rafId = window.requestAnimationFrame(drawAccelerationGame);
  };

  const flashAccelerationSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });

    if (accelerationState.flashTimer) {
      window.clearTimeout(accelerationState.flashTimer);
    }
    accelerationState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      accelerationState.flashTimer = 0;
    }, 760);
  };

  const getCurrentAccelerationTask = () =>
    ACCELERATION_TASKS[accelerationState.questionIndex] || ACCELERATION_TASKS[0];

  const setAccelerationSlidersNeutral = () => {
    if (accelerationState.accelerationInput instanceof HTMLInputElement) {
      accelerationState.accelerationInput.value = "0";
    }
    if (accelerationState.timeInput instanceof HTMLInputElement) {
      accelerationState.timeInput.value = "0";
    }
    accelerationState.rocketY = 0;
    accelerationState.lastTime = 0;
    updateAccelerationLabels();
  };

  const renderCurrentAccelerationTask = () => {
    const task = getCurrentAccelerationTask();

    accelerationState.questionSolved = false;
    setAccelerationSlidersNeutral();

    if (accelerationState.taskMetaEl instanceof HTMLElement) {
      accelerationState.taskMetaEl.innerHTML = `
        <span>Aufgabe ${accelerationState.questionIndex + 1} von ${ACCELERATION_TASKS.length}</span>
        <strong>Mittel · ${task.xp} XP</strong>
      `;
    }
    if (accelerationState.taskTextEl instanceof HTMLElement) {
      accelerationState.taskTextEl.innerHTML = `
        Eine Rakete startet aus der Ruhe mit <strong>a = ${formatTestDecimal(task.acceleration)} m/s²</strong>.
        Wie schnell ist sie nach <strong>${formatTestDecimal(task.time)} s</strong>?
      `;
    }
    if (accelerationState.answerInput instanceof HTMLInputElement) {
      accelerationState.answerInput.value = "";
      accelerationState.answerInput.disabled = false;
      accelerationState.answerInput.focus();
    }
    if (accelerationState.feedbackEl instanceof HTMLElement) {
      accelerationState.feedbackEl.className = "test-motion-feedback";
      accelerationState.feedbackEl.textContent = "";
    }
    if (accelerationState.nextButton instanceof HTMLButtonElement) {
      accelerationState.nextButton.hidden = true;
      accelerationState.nextButton.textContent =
        accelerationState.questionIndex === ACCELERATION_TASKS.length - 1 ? "Fertig" : "Nächste Frage";
    }
  };

  const goToNextAccelerationTask = () => {
    if (!accelerationState.questionSolved) {
      return;
    }

    if (accelerationState.questionIndex >= ACCELERATION_TASKS.length - 1) {
      stopAccelerationGame();
      if (siGameStage instanceof HTMLElement) {
        siGameStage.innerHTML = `
          <section class="test-motion-complete">
            <h3>Raketen-Level geschafft!</h3>
            <p>Du hast die ersten Aufgaben zur gleichmäßig beschleunigten Bewegung gelöst.</p>
            <div class="test-motion-complete-actions">
              <button class="si-jumpgame-button" id="acceleration-back-final" type="button">Zurück zum Pfad</button>
              <button class="si-jumpgame-button" id="acceleration-repeat-final" type="button">Nochmal spielen</button>
            </div>
          </section>
        `;
        const backButton = siGameStage.querySelector("#acceleration-back-final");
        if (backButton instanceof HTMLButtonElement) {
          backButton.addEventListener("click", closeSIGame);
        }
        const repeatButton = siGameStage.querySelector("#acceleration-repeat-final");
        if (repeatButton instanceof HTMLButtonElement) {
          repeatButton.addEventListener("click", () => {
            renderAccelerationGame();
          });
        }
      }
      return;
    }

    accelerationState.questionIndex += 1;
    renderCurrentAccelerationTask();
  };

  const checkAccelerationAnswer = () => {
    const feedbackEl = accelerationState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) {
      return;
    }

    const answer =
      accelerationState.answerInput instanceof HTMLInputElement ? accelerationState.answerInput.valueAsNumber : Number.NaN;
    const task = getCurrentAccelerationTask();
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }

    if (Math.abs(answer - task.answer) <= 0.05) {
      accelerationState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Die Rakete erreicht ${formatTestDecimal(task.answer)} m/s. +${task.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (accelerationState.answerInput instanceof HTMLInputElement) {
        accelerationState.answerInput.disabled = true;
      }
      if (accelerationState.nextButton instanceof HTMLButtonElement) {
        accelerationState.nextButton.hidden = false;
      }
      if (accelerationState.accelerationInput instanceof HTMLInputElement) {
        accelerationState.accelerationInput.value = String(task.acceleration);
      }
      if (accelerationState.timeInput instanceof HTMLInputElement) {
        accelerationState.timeInput.value = String(task.time);
      }
      updateAccelerationLabels();
      flashAccelerationSuccess();
      return;
    }

    feedbackEl.textContent = "Fast: Bei Start aus der Ruhe gilt v = a · t. Multipliziere Beschleunigung und Zeit.";
    feedbackEl.classList.add("is-hint");
  };

  const startAccelerationQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopAccelerationGame();
    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="acceleration-canvas" aria-label="Rakete startet aus der Ruhe"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Beschleunigung</span>
            <input id="acceleration-a" type="range" min="0" max="8" step="0.5" value="0">
            <strong id="acceleration-a-value">0 m/s²</strong>
          </label>
          <label class="test-motion-control">
            <span>Zeit</span>
            <input id="acceleration-time" type="range" min="0" max="8" step="0.5" value="0">
            <strong id="acceleration-time-value">0 s</strong>
          </label>
          <div class="test-motion-readout">
            <span>Geschwindigkeit</span>
            <strong id="acceleration-v-value">0 m/s</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta" id="acceleration-task-meta"></div>
          <h3>Raketenstart</h3>
          <p id="acceleration-task-text"></p>
          <label class="test-motion-answer-label" for="acceleration-answer">Antwort in m/s</label>
          <div class="test-motion-answer-row">
            <input id="acceleration-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="acceleration-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="acceleration-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="acceleration-next" type="button" hidden>Nächste Frage</button>
        </article>
      </section>
    `;

    accelerationState.canvas = siGameStage.querySelector("#acceleration-canvas");
    accelerationState.ctx =
      accelerationState.canvas instanceof HTMLCanvasElement ? accelerationState.canvas.getContext("2d") : null;
    accelerationState.accelerationInput = siGameStage.querySelector("#acceleration-a");
    accelerationState.timeInput = siGameStage.querySelector("#acceleration-time");
    accelerationState.accelerationValue = siGameStage.querySelector("#acceleration-a-value");
    accelerationState.timeValue = siGameStage.querySelector("#acceleration-time-value");
    accelerationState.velocityValue = siGameStage.querySelector("#acceleration-v-value");
    accelerationState.answerInput = siGameStage.querySelector("#acceleration-answer");
    accelerationState.feedbackEl = siGameStage.querySelector("#acceleration-feedback");
    accelerationState.taskMetaEl = siGameStage.querySelector("#acceleration-task-meta");
    accelerationState.taskTextEl = siGameStage.querySelector("#acceleration-task-text");
    accelerationState.nextButton = siGameStage.querySelector("#acceleration-next");
    accelerationState.rocketY = 0;
    accelerationState.lastTime = 0;
    accelerationState.questionIndex = 0;
    accelerationState.questionSolved = false;

    [accelerationState.accelerationInput, accelerationState.timeInput].forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.addEventListener("input", updateAccelerationLabels);
      }
    });

    const checkButton = siGameStage.querySelector("#acceleration-check");
    if (checkButton instanceof HTMLButtonElement) {
      checkButton.addEventListener("click", checkAccelerationAnswer);
    }
    if (accelerationState.answerInput instanceof HTMLInputElement) {
      accelerationState.answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkAccelerationAnswer();
        }
      });
      accelerationState.answerInput.focus();
    }
    if (accelerationState.nextButton instanceof HTMLButtonElement) {
      accelerationState.nextButton.addEventListener("click", goToNextAccelerationTask);
    }

    renderCurrentAccelerationTask();
    resizeAccelerationCanvas();
    accelerationState.running = true;
    accelerationState.rafId = window.requestAnimationFrame(drawAccelerationGame);
  };

  const renderAccelerationGame = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    stopTestMotionGame();
    stopCatchUpGame();
    stopAccelerationGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Unterthema 2</p>
          <h3>Gleichmäßig beschleunigt</h3>
          <p>Die Rakete startet ruhig. Dann wird sie jede Sekunde schneller, weil die Beschleunigung gleich bleibt.</p>
          <p>Wenn der Start aus der Ruhe ist, brauchst du für die Geschwindigkeit nur Beschleunigung und Zeit.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>v = a · t</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Merksatz:</strong> Beschleunigung sagt, wie viele m/s pro Sekunde dazukommen.</p>
          <p>Bei 2 m/s² kommen in jeder Sekunde 2 m/s Geschwindigkeit dazu.</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="acceleration-start" type="button">Zur Frage</button>
      </section>
    `;

    const startButton = siGameStage.querySelector("#acceleration-start");
    if (startButton instanceof HTMLButtonElement) {
      startButton.addEventListener("click", startAccelerationQuestion);
    }
  };

  const resizeSprintCanvas = () => {
    const canvas = sprintState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));

    if (sprintState.ctx) {
      sprintState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const getSprintValues = () => {
    const distance = Number(sprintState.distanceInput?.value || 0);
    const time = Number(sprintState.timeInput?.value || 0);
    return {
      distance,
      time,
      speed: time > 0 ? distance / time : 0,
    };
  };

  const updateSprintLabels = () => {
    const { distance, time, speed } = getSprintValues();
    if (sprintState.distanceValue instanceof HTMLElement) {
      sprintState.distanceValue.textContent = `${formatTestDecimal(distance)} m`;
    }
    if (sprintState.timeValue instanceof HTMLElement) {
      sprintState.timeValue.textContent = `${formatTestDecimal(time)} s`;
    }
    if (sprintState.speedValue instanceof HTMLElement) {
      sprintState.speedValue.textContent = `${formatTestDecimal(speed)} m/s`;
    }
  };

  const drawSprintRunner = (context, x, groundY, now, speed) => {
    const isMoving = speed > 0.05;
    const runCycle = Math.min(8, 2.4 + speed * 0.32);
    const stride = isMoving ? Math.sin(now * 0.001 * runCycle) : 0;
    const bob = isMoving ? Math.abs(stride) * Math.min(5, 1.2 + speed * 0.18) : 0;
    const hipY = groundY - 30 - bob;
    const headY = hipY - 34;
    const armReach = Math.min(14, 4 + speed * 0.55);
    const legReach = Math.min(18, 5 + speed * 0.75);

    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#171b21";
    context.lineWidth = 4;

    context.fillStyle = "#8ed0ff";
    context.beginPath();
    context.arc(x, headY, 9, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.strokeStyle = "#59a3ff";
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(x, headY + 10);
    context.lineTo(x, hipY);
    context.stroke();

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(x, headY + 18);
    context.lineTo(x - 16 - stride * armReach, hipY - 9 + stride * 5);
    context.moveTo(x, headY + 18);
    context.lineTo(x + 16 + stride * armReach, hipY - 9 - stride * 5);
    context.moveTo(x, hipY);
    context.lineTo(x - 13 - stride * legReach, groundY - 2);
    context.moveTo(x, hipY);
    context.lineTo(x + 13 + stride * legReach, groundY - 2);
    context.stroke();
    context.restore();
  };

  const drawSprintGame = (now = 0) => {
    if (!sprintState.running || !(sprintState.canvas instanceof HTMLCanvasElement) || !sprintState.ctx) {
      return;
    }

    const canvas = sprintState.canvas;
    const context = sprintState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { distance, speed } = getSprintValues();
    const maxDistance = 120;
    const left = 54;
    const right = width - 58;
    const trackY = height * 0.67;
    const targetX = left + Math.min(distance, maxDistance) / maxDistance * (right - left);
    const deltaSeconds = sprintState.lastTime ? Math.min(0.05, (now - sprintState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);

    sprintState.lastTime = now;
    if (!sprintState.runnerX) {
      sprintState.runnerX = targetX;
    }
    sprintState.runnerX += (targetX - sprintState.runnerX) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    const gridStep = (right - left) / (maxDistance / 5);
    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    for (let x = left; x <= right + 0.5; x += gridStep) {
      context.beginPath();
      context.moveTo(x, 18);
      context.lineTo(x, height - 28);
      context.stroke();
    }
    for (let y = trackY; y >= 24; y -= gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }
    for (let y = trackY + gridStep; y <= height - 28; y += gridStep) {
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(left, trackY);
    context.lineTo(right, trackY);
    context.stroke();

    context.strokeStyle = "#59a3ff";
    context.lineWidth = 7;
    context.beginPath();
    context.moveTo(left, trackY);
    context.lineTo(sprintState.runnerX, trackY);
    context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    for (let meter = 0; meter <= maxDistance; meter += 20) {
      const x = left + (meter / maxDistance) * (right - left);
      context.fillText(`${meter} m`, x, trackY + 18);
    }

    const speedLabel = `${formatTestDecimal(speed)} m/s`;
    const labelX = Math.max(left + 54, Math.min(right - 54, sprintState.runnerX));
    context.fillStyle = "rgba(255, 255, 255, 0.94)";
    context.strokeStyle = "rgba(23, 27, 33, 0.72)";
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(labelX - 46, trackY - 118, 92, 30, 12);
    context.fill();
    context.stroke();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(speedLabel, labelX, trackY - 103);

    drawSprintRunner(context, sprintState.runnerX, trackY, now, speed);

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Sprint-Scanner: 100 m", left, 18);

    sprintState.rafId = window.requestAnimationFrame(drawSprintGame);
  };

  const flashSprintSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });

    if (sprintState.flashTimer) {
      window.clearTimeout(sprintState.flashTimer);
    }
    sprintState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      sprintState.flashTimer = 0;
    }, 760);
  };

  const checkSprintAnswer = () => {
    const feedbackEl = sprintState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) {
      return;
    }

    const answer = sprintState.answerInput instanceof HTMLInputElement ? sprintState.answerInput.valueAsNumber : Number.NaN;
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }

    if (Math.abs(answer - SPRINT_TASK.answer) <= 0.03) {
      feedbackEl.textContent = `Richtig! Der Scanner zeigt ${formatTestDecimal(SPRINT_TASK.answer)} m/s. Das sind etwa ${formatTestDecimal(SPRINT_TASK.kmh)} km/h. +${SPRINT_TASK.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (sprintState.answerInput instanceof HTMLInputElement) {
        sprintState.answerInput.disabled = true;
      }
      if (sprintState.nextButton instanceof HTMLButtonElement) {
        sprintState.nextButton.hidden = false;
      }
      if (sprintState.distanceInput instanceof HTMLInputElement) {
        sprintState.distanceInput.value = String(SPRINT_TASK.distance);
      }
      if (sprintState.timeInput instanceof HTMLInputElement) {
        sprintState.timeInput.value = String(SPRINT_TASK.time);
      }
      updateSprintLabels();
      flashSprintSuccess();
      return;
    }

    feedbackEl.textContent = "Fast: Die mittlere Geschwindigkeit ist Strecke geteilt durch Zeit. Rechne 100 m durch 9,58 s.";
    feedbackEl.classList.add("is-hint");
  };

  const startSprintQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSprintGame();
    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="sprint-canvas" aria-label="Sprint-Scanner auf einer 100-m-Bahn"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Strecke</span>
            <input id="sprint-distance" type="range" min="0" max="120" step="0.5" value="0">
            <strong id="sprint-distance-value">0 m</strong>
          </label>
          <label class="test-motion-control">
            <span>Zeit</span>
            <input id="sprint-time" type="range" min="0" max="15" step="0.5" value="0">
            <strong id="sprint-time-value">0 s</strong>
          </label>
          <div class="test-motion-readout">
            <span>Tacho</span>
            <strong id="sprint-speed-value">0 m/s</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta">
            <span>K1</span>
            <strong>Mittel · ${SPRINT_TASK.xp} XP</strong>
          </div>
          <h3>Sprint-Scanner</h3>
          <p>Ein Avatar läuft <strong>100 m</strong> in <strong>9,58 s</strong>. Welche mittlere Geschwindigkeit soll das Spiel anzeigen?</p>
          <label class="test-motion-answer-label" for="sprint-answer">Antwort in m/s</label>
          <div class="test-motion-answer-row">
            <input id="sprint-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="sprint-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="sprint-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="sprint-next" type="button" hidden>Zurück zum Pfad</button>
        </article>
      </section>
    `;

    sprintState.canvas = siGameStage.querySelector("#sprint-canvas");
    sprintState.ctx = sprintState.canvas instanceof HTMLCanvasElement ? sprintState.canvas.getContext("2d") : null;
    sprintState.distanceInput = siGameStage.querySelector("#sprint-distance");
    sprintState.timeInput = siGameStage.querySelector("#sprint-time");
    sprintState.distanceValue = siGameStage.querySelector("#sprint-distance-value");
    sprintState.timeValue = siGameStage.querySelector("#sprint-time-value");
    sprintState.speedValue = siGameStage.querySelector("#sprint-speed-value");
    sprintState.answerInput = siGameStage.querySelector("#sprint-answer");
    sprintState.feedbackEl = siGameStage.querySelector("#sprint-feedback");
    sprintState.nextButton = siGameStage.querySelector("#sprint-next");
    sprintState.runnerX = 0;
    sprintState.lastTime = 0;

    [sprintState.distanceInput, sprintState.timeInput].forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.addEventListener("input", updateSprintLabels);
      }
    });

    const checkButton = siGameStage.querySelector("#sprint-check");
    if (checkButton instanceof HTMLButtonElement) {
      checkButton.addEventListener("click", checkSprintAnswer);
    }
    if (sprintState.answerInput instanceof HTMLInputElement) {
      sprintState.answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkSprintAnswer();
        }
      });
      sprintState.answerInput.focus();
    }
    if (sprintState.nextButton instanceof HTMLButtonElement) {
      sprintState.nextButton.addEventListener("click", closeSIGame);
    }

    updateSprintLabels();
    resizeSprintCanvas();
    sprintState.running = true;
    sprintState.rafId = window.requestAnimationFrame(drawSprintGame);
  };

  const renderSprintGame = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    stopTestMotionGame();
    stopCatchUpGame();
    stopAccelerationGame();
    stopSprintGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">K1</p>
          <h3>Sprint-Scanner</h3>
          <p>Der Tacho im Spiel zeigt keine Magie an. Er vergleicht einfach, wie viel Strecke in wie viel Zeit geschafft wurde.</p>
          <p>Für einen Sprint bedeutet das: Strecke durch Zeit teilen.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>v = s ÷ t</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Hinweis:</strong> Wenn du von m/s in km/h willst, multiplizierst du mit 3,6.</p>
          <p>Die Aufgabe fragt zuerst nach m/s. Der km/h-Wert ist Bonuswissen.</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="sprint-start" type="button">Zur Frage</button>
      </section>
    `;

    const startButton = siGameStage.querySelector("#sprint-start");
    if (startButton instanceof HTMLButtonElement) {
      startButton.addEventListener("click", startSprintQuestion);
    }
  };

  // ─── K3: Freier Fall ─────────────────────────────────────────────────────

  const getFreeFallValues = () => {
    const height = Number(freeFallState.heightInput?.value || 0);
    return { height, time: height > 0 ? Math.sqrt(2 * height / 9.81) : 0 };
  };

  const updateFreeFallLabels = () => {
    const { height, time } = getFreeFallValues();
    if (freeFallState.heightValue instanceof HTMLElement) freeFallState.heightValue.textContent = `${formatTestDecimal(height)} m`;
    if (freeFallState.timeValue instanceof HTMLElement) freeFallState.timeValue.textContent = `${formatTestDecimal(time)} s`;
  };

  const resizeFreeFallCanvas = () => {
    const canvas = freeFallState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    if (freeFallState.ctx) freeFallState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawFreeFallGame = (now = 0) => {
    if (!freeFallState.running || !(freeFallState.canvas instanceof HTMLCanvasElement) || !freeFallState.ctx) return;
    const canvas = freeFallState.canvas;
    const context = freeFallState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { height: h } = getFreeFallValues();
    const maxHeight = Number(freeFallState.heightInput?.max || 100);
    const left = 62;
    const groundY = height - 42;
    const topY = 28;
    const deltaSeconds = freeFallState.lastTime ? Math.min(0.05, (now - freeFallState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);
    freeFallState.lastTime = now;

    const targetBallY = topY + (1 - Math.min(h, maxHeight) / maxHeight) * (groundY - topY);
    if (!freeFallState.ballY) freeFallState.ballY = groundY;
    freeFallState.ballY += (targetBallY - freeFallState.ballY) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    const gridStep = (groundY - topY) / 10;
    for (let x = left; x <= width - 28; x += gridStep) {
      context.beginPath(); context.moveTo(x, topY); context.lineTo(x, groundY); context.stroke();
    }
    for (let y = topY; y <= groundY + 0.5; y += gridStep) {
      context.beginPath(); context.moveTo(left, y); context.lineTo(width - 28, y); context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(left, topY);
    context.lineTo(left, groundY);
    context.lineTo(width - 28, groundY);
    context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "right";
    context.textBaseline = "middle";
    const labelStep = maxHeight > 60 ? 20 : 10;
    for (let m = 0; m <= maxHeight; m += labelStep) {
      const y = groundY - (m / maxHeight) * (groundY - topY);
      context.fillText(`${m} m`, left - 8, y);
      context.strokeStyle = "rgba(23, 27, 33, 0.38)";
      context.lineWidth = 1.5;
      context.beginPath(); context.moveTo(left - 4, y); context.lineTo(left + 8, y); context.stroke();
    }

    context.fillStyle = "#3dd18d";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.5;
    context.beginPath();
    context.roundRect(left + 4, topY - 8, 50, 10, 3);
    context.fill(); context.stroke();

    context.strokeStyle = "#ff8d47";
    context.lineWidth = 2.5;
    context.setLineDash([5, 5]);
    context.beginPath();
    context.moveTo(left + 29, topY + 2);
    context.lineTo(left + 29, freeFallState.ballY - 14);
    context.stroke();
    context.setLineDash([]);

    context.strokeStyle = "rgba(100, 120, 140, 0.35)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(left, freeFallState.ballY);
    context.lineTo(width - 28, freeFallState.ballY);
    context.stroke();

    context.fillStyle = "#ff8d47";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.5;
    context.beginPath();
    context.arc(left + 29, freeFallState.ballY, 13, 0, Math.PI * 2);
    context.fill(); context.stroke();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(`${formatTestDecimal(h)} m`, left + 50, freeFallState.ballY);

    context.fillStyle = "#101418";
    context.textBaseline = "top";
    context.fillText("Freier Fall  (g = 9,81 m/s²)", left + 18, topY + 10);

    freeFallState.rafId = window.requestAnimationFrame(drawFreeFallGame);
  };

  const flashFreeFallSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });
    if (freeFallState.flashTimer) window.clearTimeout(freeFallState.flashTimer);
    freeFallState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      freeFallState.flashTimer = 0;
    }, 760);
  };

  const getCurrentFreeFallTask = () => FREE_FALL_TASKS[freeFallState.questionIndex] || FREE_FALL_TASKS[0];

  const renderCurrentFreeFallTask = () => {
    const task = getCurrentFreeFallTask();
    freeFallState.questionSolved = false;
    if (freeFallState.heightInput instanceof HTMLInputElement) freeFallState.heightInput.value = "0";
    freeFallState.ballY = 0;
    freeFallState.lastTime = 0;
    updateFreeFallLabels();

    if (freeFallState.taskMetaEl instanceof HTMLElement) {
      freeFallState.taskMetaEl.innerHTML = `
        <span>Aufgabe ${freeFallState.questionIndex + 1} von ${FREE_FALL_TASKS.length}</span>
        <strong>Mittel · ${task.xp} XP</strong>
      `;
    }
    if (freeFallState.taskTextEl instanceof HTMLElement) {
      freeFallState.taskTextEl.innerHTML = `
        Ein Ball fällt aus einer Höhe von <strong>${formatTestDecimal(task.height)} m</strong>
        aus der Ruhe. Wie lange dauert der Fall? (g = 9,81 m/s²)
      `;
    }
    if (freeFallState.answerInput instanceof HTMLInputElement) {
      freeFallState.answerInput.value = "";
      freeFallState.answerInput.disabled = false;
      freeFallState.answerInput.focus();
    }
    if (freeFallState.feedbackEl instanceof HTMLElement) {
      freeFallState.feedbackEl.className = "test-motion-feedback";
      freeFallState.feedbackEl.textContent = "";
    }
    if (freeFallState.nextButton instanceof HTMLButtonElement) {
      freeFallState.nextButton.hidden = true;
      freeFallState.nextButton.textContent =
        freeFallState.questionIndex === FREE_FALL_TASKS.length - 1 ? "Fertig" : "Nächste Frage";
    }
  };

  const goToNextFreeFallTask = () => {
    if (!freeFallState.questionSolved) return;
    if (freeFallState.questionIndex >= FREE_FALL_TASKS.length - 1) {
      stopFreeFallGame();
      if (siGameStage instanceof HTMLElement) {
        siGameStage.innerHTML = `
          <section class="test-motion-complete">
            <h3>Freier Fall – geschafft!</h3>
            <p>Du hast alle Fallzeit-Aufgaben korrekt gelöst.</p>
            <div class="test-motion-complete-actions">
              <button class="si-jumpgame-button" id="freefall-back-final" type="button">Zurück zum Pfad</button>
              <button class="si-jumpgame-button" id="freefall-repeat-final" type="button">Nochmal spielen</button>
            </div>
          </section>
        `;
        siGameStage.querySelector("#freefall-back-final")?.addEventListener("click", closeSIGame);
        siGameStage.querySelector("#freefall-repeat-final")?.addEventListener("click", () => renderFreeFallGame());
      }
      return;
    }
    freeFallState.questionIndex += 1;
    renderCurrentFreeFallTask();
  };

  const checkFreeFallAnswer = () => {
    const feedbackEl = freeFallState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) return;
    const answer = freeFallState.answerInput instanceof HTMLInputElement ? freeFallState.answerInput.valueAsNumber : Number.NaN;
    const task = getCurrentFreeFallTask();
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }
    if (Math.abs(answer - task.answer) <= 0.05) {
      freeFallState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Die Fallzeit beträgt ${formatTestDecimal(task.answer)} s. +${task.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (freeFallState.answerInput instanceof HTMLInputElement) freeFallState.answerInput.disabled = true;
      if (freeFallState.nextButton instanceof HTMLButtonElement) freeFallState.nextButton.hidden = false;
      if (freeFallState.heightInput instanceof HTMLInputElement) freeFallState.heightInput.value = String(task.height);
      updateFreeFallLabels();
      flashFreeFallSuccess();
      return;
    }
    feedbackEl.textContent = `Fast: Forme h = ½ · g · t² um: t = √(2h / g). Mit h = ${formatTestDecimal(task.height)} m und g = 9,81 m/s².`;
    feedbackEl.classList.add("is-hint");
  };

  const startFreeFallQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopFreeFallGame();

    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="freefall-canvas" aria-label="Ball fällt aus einer Höhe"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Höhe erkunden</span>
            <input id="freefall-height" type="range" min="0" max="100" step="1" value="0">
            <strong id="freefall-height-value">0 m</strong>
          </label>
          <div class="test-motion-readout">
            <span>Fallzeit</span>
            <strong id="freefall-time-value">0 s</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta" id="freefall-task-meta"></div>
          <h3>Freier Fall</h3>
          <p id="freefall-task-text"></p>
          <label class="test-motion-answer-label" for="freefall-answer">Antwort in Sekunden</label>
          <div class="test-motion-answer-row">
            <input id="freefall-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="freefall-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="freefall-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="freefall-next" type="button" hidden>Nächste Frage</button>
        </article>
      </section>
    `;

    freeFallState.canvas = siGameStage.querySelector("#freefall-canvas");
    freeFallState.ctx = freeFallState.canvas instanceof HTMLCanvasElement ? freeFallState.canvas.getContext("2d") : null;
    freeFallState.heightInput = siGameStage.querySelector("#freefall-height");
    freeFallState.heightValue = siGameStage.querySelector("#freefall-height-value");
    freeFallState.timeValue = siGameStage.querySelector("#freefall-time-value");
    freeFallState.answerInput = siGameStage.querySelector("#freefall-answer");
    freeFallState.feedbackEl = siGameStage.querySelector("#freefall-feedback");
    freeFallState.taskMetaEl = siGameStage.querySelector("#freefall-task-meta");
    freeFallState.taskTextEl = siGameStage.querySelector("#freefall-task-text");
    freeFallState.nextButton = siGameStage.querySelector("#freefall-next");
    freeFallState.ballY = 0;
    freeFallState.lastTime = 0;
    freeFallState.questionIndex = 0;
    freeFallState.questionSolved = false;

    if (freeFallState.heightInput instanceof HTMLInputElement) {
      freeFallState.heightInput.addEventListener("input", updateFreeFallLabels);
    }
    siGameStage.querySelector("#freefall-check")?.addEventListener("click", checkFreeFallAnswer);
    if (freeFallState.answerInput instanceof HTMLInputElement) {
      freeFallState.answerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkFreeFallAnswer(); });
      freeFallState.answerInput.focus();
    }
    if (freeFallState.nextButton instanceof HTMLButtonElement) {
      freeFallState.nextButton.addEventListener("click", goToNextFreeFallTask);
    }

    renderCurrentFreeFallTask();
    resizeFreeFallCanvas();
    freeFallState.running = true;
    freeFallState.rafId = window.requestAnimationFrame(drawFreeFallGame);
  };

  const renderFreeFallGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopSIUnitsJumpGame(); stopTestMotionGame(); stopCatchUpGame();
    stopAccelerationGame(); stopSprintGame(); stopFreeFallGame();
    stopBrakingGame(); stopDistanceAccGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">K3 · Freier Fall</p>
          <h3>Was ist freier Fall?</h3>
          <p>Wenn ein Objekt nur durch die Schwerkraft fällt – ohne Luftwiderstand, ohne Antrieb – spricht man von freiem Fall. Die Erde beschleunigt alles gleich stark, egal ob schwer oder leicht.</p>
          <p>Die Fallbeschleunigung ist überall auf der Erde annähernd gleich: <strong>g ≈ 9,81 m/s²</strong>. Jede Sekunde nimmt die Fallgeschwindigkeit um 9,81 m/s zu.</p>
          <p>Fällt ein Objekt aus der Ruhe, wächst der Weg quadratisch mit der Zeit – deshalb fällt man die letzten Meter viel schneller als die ersten.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>t = √(2h / g)</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> Ball fällt aus h = 20 m.</p>
          <p>t = √(2 · 20 / 9,81) = √(4,08) ≈ 2,02 s</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="freefall-start" type="button">Zur Frage</button>
      </section>
    `;

    siGameStage.querySelector("#freefall-start")?.addEventListener("click", startFreeFallQuestion);
  };


  // ─── K4: Bremsweg ────────────────────────────────────────────────────────

  const getBrakingValues = () => {
    const speed = Number(brakingState.speedInput?.value || 0);
    const deceleration = Number(brakingState.decelerationInput?.value || 1);
    return {
      speed,
      deceleration,
      distance: deceleration > 0 ? (speed * speed) / (2 * deceleration) : 0,
    };
  };

  const updateBrakingLabels = () => {
    const { speed, deceleration, distance } = getBrakingValues();
    if (brakingState.speedValue instanceof HTMLElement) brakingState.speedValue.textContent = `${formatTestDecimal(speed)} m/s`;
    if (brakingState.decelerationValue instanceof HTMLElement) brakingState.decelerationValue.textContent = `${formatTestDecimal(deceleration)} m/s²`;
    if (brakingState.distanceValue instanceof HTMLElement) brakingState.distanceValue.textContent = `${formatTestDecimal(distance)} m`;
  };

  const resizeBrakingCanvas = () => {
    const canvas = brakingState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    if (brakingState.ctx) brakingState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawBrakingGame = (now = 0) => {
    if (!brakingState.running || !(brakingState.canvas instanceof HTMLCanvasElement) || !brakingState.ctx) return;
    const canvas = brakingState.canvas;
    const context = brakingState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { distance } = getBrakingValues();
    const maxDistance = 80;
    const left = 54;
    const right = width - 58;
    const trackY = height * 0.63;
    const deltaSeconds = brakingState.lastTime ? Math.min(0.05, (now - brakingState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);
    brakingState.lastTime = now;

    const targetX = left + Math.min(distance, maxDistance) / maxDistance * (right - left);
    if (!brakingState.carX) brakingState.carX = left;
    brakingState.carX += (targetX - brakingState.carX) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    const gridStep = (right - left) / (maxDistance / 10);
    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    for (let x = left; x <= right + 0.5; x += gridStep) {
      context.beginPath(); context.moveTo(x, 18); context.lineTo(x, height - 30); context.stroke();
    }
    for (let y = trackY; y >= 22; y -= gridStep) {
      context.beginPath(); context.moveTo(left, y); context.lineTo(right, y); context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.beginPath(); context.moveTo(left, trackY); context.lineTo(right, trackY); context.stroke();

    context.strokeStyle = "#f86785";
    context.lineWidth = 7;
    context.beginPath(); context.moveTo(left, trackY); context.lineTo(brakingState.carX, trackY); context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    for (let m = 0; m <= maxDistance; m += 10) {
      const x = left + (m / maxDistance) * (right - left);
      context.strokeStyle = "rgba(23, 27, 33, 0.42)";
      context.lineWidth = m % 20 === 0 ? 2 : 1;
      context.beginPath(); context.moveTo(x, trackY - 8); context.lineTo(x, trackY + 8); context.stroke();
      if (m % 20 === 0) context.fillText(`${m} m`, x, trackY + 16);
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 2;
    context.setLineDash([4, 4]);
    context.beginPath(); context.moveTo(left, trackY - 44); context.lineTo(left, trackY + 4); context.stroke();
    context.setLineDash([]);
    context.fillStyle = "#384858";
    context.font = "700 11px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "bottom";
    context.fillText("Start", left, trackY - 46);

    const carX = brakingState.carX;
    const carY = trackY - 24;
    context.fillStyle = "#f86785";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.2;
    context.beginPath();
    context.roundRect(carX - 31, carY - 15, 62, 26, 7);
    context.fill(); context.stroke();
    context.fillStyle = "#f9a8bd";
    context.beginPath();
    context.roundRect(carX - 14, carY - 33, 31, 20, 5);
    context.fill(); context.stroke();
    context.fillStyle = "#171b21";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 8, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 8, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#f8fbff";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Bremsweg-Analyse", left, 18);

    brakingState.rafId = window.requestAnimationFrame(drawBrakingGame);
  };

  const flashBrakingSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });
    if (brakingState.flashTimer) window.clearTimeout(brakingState.flashTimer);
    brakingState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      brakingState.flashTimer = 0;
    }, 760);
  };

  const getCurrentBrakingTask = () => BRAKING_TASKS[brakingState.questionIndex] || BRAKING_TASKS[0];

  const renderCurrentBrakingTask = () => {
    const task = getCurrentBrakingTask();
    brakingState.questionSolved = false;
    if (brakingState.speedInput instanceof HTMLInputElement) brakingState.speedInput.value = "0";
    if (brakingState.decelerationInput instanceof HTMLInputElement) brakingState.decelerationInput.value = "1";
    brakingState.carX = 0;
    brakingState.lastTime = 0;
    updateBrakingLabels();

    if (brakingState.taskMetaEl instanceof HTMLElement) {
      brakingState.taskMetaEl.innerHTML = `
        <span>Aufgabe ${brakingState.questionIndex + 1} von ${BRAKING_TASKS.length}</span>
        <strong>Mittel · ${task.xp} XP</strong>
      `;
    }
    if (brakingState.taskTextEl instanceof HTMLElement) {
      brakingState.taskTextEl.innerHTML = `
        Ein Auto fährt mit <strong>${formatTestDecimal(task.speed)} m/s</strong>
        und bremst mit <strong>${formatTestDecimal(task.deceleration)} m/s²</strong>.
        Wie lang ist der Bremsweg bis zum Stillstand?
      `;
    }
    if (brakingState.answerInput instanceof HTMLInputElement) {
      brakingState.answerInput.value = "";
      brakingState.answerInput.disabled = false;
      brakingState.answerInput.focus();
    }
    if (brakingState.feedbackEl instanceof HTMLElement) {
      brakingState.feedbackEl.className = "test-motion-feedback";
      brakingState.feedbackEl.textContent = "";
    }
    if (brakingState.nextButton instanceof HTMLButtonElement) {
      brakingState.nextButton.hidden = true;
      brakingState.nextButton.textContent =
        brakingState.questionIndex === BRAKING_TASKS.length - 1 ? "Fertig" : "Nächste Frage";
    }
  };

  const goToNextBrakingTask = () => {
    if (!brakingState.questionSolved) return;
    if (brakingState.questionIndex >= BRAKING_TASKS.length - 1) {
      stopBrakingGame();
      if (siGameStage instanceof HTMLElement) {
        siGameStage.innerHTML = `
          <section class="test-motion-complete">
            <h3>Bremsweg – geschafft!</h3>
            <p>Du hast alle Bremsweg-Aufgaben korrekt gelöst.</p>
            <div class="test-motion-complete-actions">
              <button class="si-jumpgame-button" id="braking-back-final" type="button">Zurück zum Pfad</button>
              <button class="si-jumpgame-button" id="braking-repeat-final" type="button">Nochmal spielen</button>
            </div>
          </section>
        `;
        siGameStage.querySelector("#braking-back-final")?.addEventListener("click", closeSIGame);
        siGameStage.querySelector("#braking-repeat-final")?.addEventListener("click", () => renderBrakingGame());
      }
      return;
    }
    brakingState.questionIndex += 1;
    renderCurrentBrakingTask();
  };

  const checkBrakingAnswer = () => {
    const feedbackEl = brakingState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) return;
    const answer = brakingState.answerInput instanceof HTMLInputElement ? brakingState.answerInput.valueAsNumber : Number.NaN;
    const task = getCurrentBrakingTask();
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }
    if (Math.abs(answer - task.answer) <= 0.1) {
      brakingState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Der Bremsweg beträgt ${formatTestDecimal(task.answer)} m. +${task.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (brakingState.answerInput instanceof HTMLInputElement) brakingState.answerInput.disabled = true;
      if (brakingState.nextButton instanceof HTMLButtonElement) brakingState.nextButton.hidden = false;
      if (brakingState.speedInput instanceof HTMLInputElement) brakingState.speedInput.value = String(task.speed);
      if (brakingState.decelerationInput instanceof HTMLInputElement) brakingState.decelerationInput.value = String(task.deceleration);
      updateBrakingLabels();
      flashBrakingSuccess();
      return;
    }
    feedbackEl.textContent = `Fast: Nutze s = v₀² / (2 · a). Mit v₀ = ${formatTestDecimal(task.speed)} m/s und a = ${formatTestDecimal(task.deceleration)} m/s².`;
    feedbackEl.classList.add("is-hint");
  };

  const startBrakingQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopBrakingGame();

    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="braking-canvas" aria-label="Auto bremst auf einer Strecke"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Startgeschwindigkeit</span>
            <input id="braking-speed" type="range" min="0" max="30" step="1" value="0">
            <strong id="braking-speed-value">0 m/s</strong>
          </label>
          <label class="test-motion-control">
            <span>Bremsbeschleunigung</span>
            <input id="braking-deceleration" type="range" min="1" max="10" step="0.5" value="1">
            <strong id="braking-deceleration-value">1 m/s²</strong>
          </label>
          <div class="test-motion-readout">
            <span>Bremsweg</span>
            <strong id="braking-distance-value">0 m</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta" id="braking-task-meta"></div>
          <h3>Bremsweg</h3>
          <p id="braking-task-text"></p>
          <label class="test-motion-answer-label" for="braking-answer">Antwort in Metern</label>
          <div class="test-motion-answer-row">
            <input id="braking-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="braking-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="braking-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="braking-next" type="button" hidden>Nächste Frage</button>
        </article>
      </section>
    `;

    brakingState.canvas = siGameStage.querySelector("#braking-canvas");
    brakingState.ctx = brakingState.canvas instanceof HTMLCanvasElement ? brakingState.canvas.getContext("2d") : null;
    brakingState.speedInput = siGameStage.querySelector("#braking-speed");
    brakingState.decelerationInput = siGameStage.querySelector("#braking-deceleration");
    brakingState.speedValue = siGameStage.querySelector("#braking-speed-value");
    brakingState.decelerationValue = siGameStage.querySelector("#braking-deceleration-value");
    brakingState.distanceValue = siGameStage.querySelector("#braking-distance-value");
    brakingState.answerInput = siGameStage.querySelector("#braking-answer");
    brakingState.feedbackEl = siGameStage.querySelector("#braking-feedback");
    brakingState.taskMetaEl = siGameStage.querySelector("#braking-task-meta");
    brakingState.taskTextEl = siGameStage.querySelector("#braking-task-text");
    brakingState.nextButton = siGameStage.querySelector("#braking-next");
    brakingState.carX = 0;
    brakingState.lastTime = 0;
    brakingState.questionIndex = 0;
    brakingState.questionSolved = false;

    [brakingState.speedInput, brakingState.decelerationInput].forEach((input) => {
      if (input instanceof HTMLInputElement) input.addEventListener("input", updateBrakingLabels);
    });
    siGameStage.querySelector("#braking-check")?.addEventListener("click", checkBrakingAnswer);
    if (brakingState.answerInput instanceof HTMLInputElement) {
      brakingState.answerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkBrakingAnswer(); });
      brakingState.answerInput.focus();
    }
    if (brakingState.nextButton instanceof HTMLButtonElement) {
      brakingState.nextButton.addEventListener("click", goToNextBrakingTask);
    }

    renderCurrentBrakingTask();
    resizeBrakingCanvas();
    brakingState.running = true;
    brakingState.rafId = window.requestAnimationFrame(drawBrakingGame);
  };

  const renderBrakingGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopSIUnitsJumpGame(); stopTestMotionGame(); stopCatchUpGame();
    stopAccelerationGame(); stopSprintGame(); stopFreeFallGame();
    stopBrakingGame(); stopDistanceAccGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">K4 · Bremsweg</p>
          <h3>Wie weit bremst ein Auto?</h3>
          <p>Beim Bremsen verzögert ein Fahrzeug gleichmäßig – das ist eine gleichmäßig gebremste Bewegung mit negativer Beschleunigung.</p>
          <p>Entscheidend ist: Doppelte Anfangsgeschwindigkeit bedeutet <strong>viermal längeren Bremsweg</strong>, weil v₀ im Quadrat in die Formel eingeht.</p>
          <p>Das erklärt, warum auf Autobahnen die Unfallgefahr bei höheren Geschwindigkeiten so dramatisch ansteigt.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>s = v₀² / (2 · a)</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> v₀ = 20 m/s, a = 4 m/s²</p>
          <p>s = 20² / (2 · 4) = 400 / 8 = 50 m</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="braking-start" type="button">Zur Frage</button>
      </section>
    `;

    siGameStage.querySelector("#braking-start")?.addEventListener("click", startBrakingQuestion);
  };


  // ─── K5: Beschleunigungsweg ───────────────────────────────────────────────

  const getDistanceAccValues = () => {
    const acceleration = Number(distanceAccState.accelerationInput?.value || 0);
    const time = Number(distanceAccState.timeInput?.value || 0);
    return { acceleration, time, distance: 0.5 * acceleration * time * time };
  };

  const updateDistanceAccLabels = () => {
    const { acceleration, time, distance } = getDistanceAccValues();
    if (distanceAccState.accelerationValue instanceof HTMLElement) distanceAccState.accelerationValue.textContent = `${formatTestDecimal(acceleration)} m/s²`;
    if (distanceAccState.timeValue instanceof HTMLElement) distanceAccState.timeValue.textContent = `${formatTestDecimal(time)} s`;
    if (distanceAccState.distanceValue instanceof HTMLElement) distanceAccState.distanceValue.textContent = `${formatTestDecimal(distance)} m`;
  };

  const resizeDistanceAccCanvas = () => {
    const canvas = distanceAccState.canvas;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    if (distanceAccState.ctx) distanceAccState.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawDistanceAccGame = (now = 0) => {
    if (!distanceAccState.running || !(distanceAccState.canvas instanceof HTMLCanvasElement) || !distanceAccState.ctx) return;
    const canvas = distanceAccState.canvas;
    const context = distanceAccState.ctx;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { distance } = getDistanceAccValues();
    const maxDistance = 80;
    const left = 54;
    const right = width - 58;
    const trackY = height * 0.63;
    const deltaSeconds = distanceAccState.lastTime ? Math.min(0.05, (now - distanceAccState.lastTime) / 1000) : 0.016;
    const smoothing = 1 - Math.pow(0.001, deltaSeconds);
    distanceAccState.lastTime = now;

    const targetX = left + Math.min(distance, maxDistance) / maxDistance * (right - left);
    if (!distanceAccState.carX) distanceAccState.carX = left;
    distanceAccState.carX += (targetX - distanceAccState.carX) * smoothing;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillRect(0, 0, width, height);

    const gridStep = (right - left) / (maxDistance / 10);
    context.strokeStyle = "rgba(96, 111, 128, 0.22)";
    context.lineWidth = 1;
    for (let x = left; x <= right + 0.5; x += gridStep) {
      context.beginPath(); context.moveTo(x, 18); context.lineTo(x, height - 30); context.stroke();
    }
    for (let y = trackY; y >= 22; y -= gridStep) {
      context.beginPath(); context.moveTo(left, y); context.lineTo(right, y); context.stroke();
    }

    context.strokeStyle = "#171b21";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.beginPath(); context.moveTo(left, trackY); context.lineTo(right, trackY); context.stroke();

    context.strokeStyle = "#8f73ff";
    context.lineWidth = 7;
    context.beginPath(); context.moveTo(left, trackY); context.lineTo(distanceAccState.carX, trackY); context.stroke();

    context.fillStyle = "#384858";
    context.font = "700 12px Space Grotesk, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "top";
    for (let m = 0; m <= maxDistance; m += 10) {
      const x = left + (m / maxDistance) * (right - left);
      context.strokeStyle = "rgba(23, 27, 33, 0.42)";
      context.lineWidth = m % 20 === 0 ? 2 : 1;
      context.beginPath(); context.moveTo(x, trackY - 8); context.lineTo(x, trackY + 8); context.stroke();
      if (m % 20 === 0) context.fillText(`${m} m`, x, trackY + 16);
    }

    const carX = distanceAccState.carX;
    const carY = trackY - 24;
    context.fillStyle = "#8f73ff";
    context.strokeStyle = "#171b21";
    context.lineWidth = 2.2;
    context.beginPath();
    context.roundRect(carX - 31, carY - 15, 62, 26, 7);
    context.fill(); context.stroke();
    context.fillStyle = "#c2b6ff";
    context.beginPath();
    context.roundRect(carX - 14, carY - 33, 31, 20, 5);
    context.fill(); context.stroke();
    context.fillStyle = "#171b21";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 8, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 8, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#f8fbff";
    context.beginPath();
    context.arc(carX - 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.arc(carX + 20, carY + 12, 3.2, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#101418";
    context.font = "800 13px Space Grotesk, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Beschleunigungsweg (Start aus Ruhe)", left, 18);

    distanceAccState.rafId = window.requestAnimationFrame(drawDistanceAccGame);
  };

  const flashDistanceAccSuccess = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.classList.remove("test-motion-flash");
    window.requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });
    if (distanceAccState.flashTimer) window.clearTimeout(distanceAccState.flashTimer);
    distanceAccState.flashTimer = window.setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
      distanceAccState.flashTimer = 0;
    }, 760);
  };

  const getCurrentDistanceAccTask = () => DISTANCE_ACC_TASKS[distanceAccState.questionIndex] || DISTANCE_ACC_TASKS[0];

  const renderCurrentDistanceAccTask = () => {
    const task = getCurrentDistanceAccTask();
    distanceAccState.questionSolved = false;
    if (distanceAccState.accelerationInput instanceof HTMLInputElement) distanceAccState.accelerationInput.value = "0";
    if (distanceAccState.timeInput instanceof HTMLInputElement) distanceAccState.timeInput.value = "0";
    distanceAccState.carX = 0;
    distanceAccState.lastTime = 0;
    updateDistanceAccLabels();

    if (distanceAccState.taskMetaEl instanceof HTMLElement) {
      distanceAccState.taskMetaEl.innerHTML = `
        <span>Aufgabe ${distanceAccState.questionIndex + 1} von ${DISTANCE_ACC_TASKS.length}</span>
        <strong>Mittel · ${task.xp} XP</strong>
      `;
    }
    if (distanceAccState.taskTextEl instanceof HTMLElement) {
      distanceAccState.taskTextEl.innerHTML = `
        Ein Fahrzeug startet aus der Ruhe und beschleunigt gleichmäßig mit
        <strong>a = ${formatTestDecimal(task.acceleration)} m/s²</strong>
        für <strong>t = ${formatTestDecimal(task.time)} s</strong>.
        Wie weit ist es gefahren?
      `;
    }
    if (distanceAccState.answerInput instanceof HTMLInputElement) {
      distanceAccState.answerInput.value = "";
      distanceAccState.answerInput.disabled = false;
      distanceAccState.answerInput.focus();
    }
    if (distanceAccState.feedbackEl instanceof HTMLElement) {
      distanceAccState.feedbackEl.className = "test-motion-feedback";
      distanceAccState.feedbackEl.textContent = "";
    }
    if (distanceAccState.nextButton instanceof HTMLButtonElement) {
      distanceAccState.nextButton.hidden = true;
      distanceAccState.nextButton.textContent =
        distanceAccState.questionIndex === DISTANCE_ACC_TASKS.length - 1 ? "Fertig" : "Nächste Frage";
    }
  };

  const goToNextDistanceAccTask = () => {
    if (!distanceAccState.questionSolved) return;
    if (distanceAccState.questionIndex >= DISTANCE_ACC_TASKS.length - 1) {
      stopDistanceAccGame();
      if (siGameStage instanceof HTMLElement) {
        siGameStage.innerHTML = `
          <section class="test-motion-complete">
            <h3>Beschleunigungsweg – geschafft!</h3>
            <p>Du hast alle Aufgaben zum Weg beim Anfahren korrekt gelöst.</p>
            <div class="test-motion-complete-actions">
              <button class="si-jumpgame-button" id="distacc-back-final" type="button">Zurück zum Pfad</button>
              <button class="si-jumpgame-button" id="distacc-repeat-final" type="button">Nochmal spielen</button>
            </div>
          </section>
        `;
        siGameStage.querySelector("#distacc-back-final")?.addEventListener("click", closeSIGame);
        siGameStage.querySelector("#distacc-repeat-final")?.addEventListener("click", () => renderDistanceAccGame());
      }
      return;
    }
    distanceAccState.questionIndex += 1;
    renderCurrentDistanceAccTask();
  };

  const checkDistanceAccAnswer = () => {
    const feedbackEl = distanceAccState.feedbackEl;
    if (!(feedbackEl instanceof HTMLElement)) return;
    const answer = distanceAccState.answerInput instanceof HTMLInputElement ? distanceAccState.answerInput.valueAsNumber : Number.NaN;
    const task = getCurrentDistanceAccTask();
    feedbackEl.className = "test-motion-feedback";

    if (!Number.isFinite(answer)) {
      feedbackEl.textContent = "Gib zuerst eine Zahl ein.";
      feedbackEl.classList.add("is-hint");
      return;
    }
    if (Math.abs(answer - task.answer) <= 0.5) {
      distanceAccState.questionSolved = true;
      feedbackEl.textContent = `Richtig! Das Fahrzeug hat ${formatTestDecimal(task.answer)} m zurückgelegt. +${task.xp} XP`;
      feedbackEl.classList.add("is-correct");
      if (distanceAccState.answerInput instanceof HTMLInputElement) distanceAccState.answerInput.disabled = true;
      if (distanceAccState.nextButton instanceof HTMLButtonElement) distanceAccState.nextButton.hidden = false;
      if (distanceAccState.accelerationInput instanceof HTMLInputElement) distanceAccState.accelerationInput.value = String(task.acceleration);
      if (distanceAccState.timeInput instanceof HTMLInputElement) distanceAccState.timeInput.value = String(task.time);
      updateDistanceAccLabels();
      flashDistanceAccSuccess();
      return;
    }
    feedbackEl.textContent = `Fast: Bei Start aus der Ruhe gilt s = ½ · a · t². Mit a = ${formatTestDecimal(task.acceleration)} m/s² und t = ${formatTestDecimal(task.time)} s.`;
    feedbackEl.classList.add("is-hint");
  };

  const startDistanceAccQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopDistanceAccGame();

    siGameStage.innerHTML = `
      <section class="test-motion-game">
        <div class="test-motion-sim">
          <canvas class="test-motion-canvas" id="distacc-canvas" aria-label="Fahrzeug beschleunigt aus dem Stand"></canvas>
        </div>
        <div class="test-motion-controls">
          <label class="test-motion-control">
            <span>Beschleunigung</span>
            <input id="distacc-acceleration" type="range" min="0" max="6" step="0.5" value="0">
            <strong id="distacc-acceleration-value">0 m/s²</strong>
          </label>
          <label class="test-motion-control">
            <span>Zeit</span>
            <input id="distacc-time" type="range" min="0" max="8" step="0.5" value="0">
            <strong id="distacc-time-value">0 s</strong>
          </label>
          <div class="test-motion-readout">
            <span>Zurückgelegter Weg</span>
            <strong id="distacc-distance-value">0 m</strong>
          </div>
        </div>
        <article class="test-motion-task">
          <div class="test-motion-task-meta" id="distacc-task-meta"></div>
          <h3>Beschleunigungsweg</h3>
          <p id="distacc-task-text"></p>
          <label class="test-motion-answer-label" for="distacc-answer">Antwort in Metern</label>
          <div class="test-motion-answer-row">
            <input id="distacc-answer" type="number" inputmode="decimal" placeholder="Antwort">
            <button class="si-jumpgame-button" id="distacc-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="distacc-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="distacc-next" type="button" hidden>Nächste Frage</button>
        </article>
      </section>
    `;

    distanceAccState.canvas = siGameStage.querySelector("#distacc-canvas");
    distanceAccState.ctx = distanceAccState.canvas instanceof HTMLCanvasElement ? distanceAccState.canvas.getContext("2d") : null;
    distanceAccState.accelerationInput = siGameStage.querySelector("#distacc-acceleration");
    distanceAccState.timeInput = siGameStage.querySelector("#distacc-time");
    distanceAccState.accelerationValue = siGameStage.querySelector("#distacc-acceleration-value");
    distanceAccState.timeValue = siGameStage.querySelector("#distacc-time-value");
    distanceAccState.distanceValue = siGameStage.querySelector("#distacc-distance-value");
    distanceAccState.answerInput = siGameStage.querySelector("#distacc-answer");
    distanceAccState.feedbackEl = siGameStage.querySelector("#distacc-feedback");
    distanceAccState.taskMetaEl = siGameStage.querySelector("#distacc-task-meta");
    distanceAccState.taskTextEl = siGameStage.querySelector("#distacc-task-text");
    distanceAccState.nextButton = siGameStage.querySelector("#distacc-next");
    distanceAccState.carX = 0;
    distanceAccState.lastTime = 0;
    distanceAccState.questionIndex = 0;
    distanceAccState.questionSolved = false;

    [distanceAccState.accelerationInput, distanceAccState.timeInput].forEach((input) => {
      if (input instanceof HTMLInputElement) input.addEventListener("input", updateDistanceAccLabels);
    });
    siGameStage.querySelector("#distacc-check")?.addEventListener("click", checkDistanceAccAnswer);
    if (distanceAccState.answerInput instanceof HTMLInputElement) {
      distanceAccState.answerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkDistanceAccAnswer(); });
      distanceAccState.answerInput.focus();
    }
    if (distanceAccState.nextButton instanceof HTMLButtonElement) {
      distanceAccState.nextButton.addEventListener("click", goToNextDistanceAccTask);
    }

    renderCurrentDistanceAccTask();
    resizeDistanceAccCanvas();
    distanceAccState.running = true;
    distanceAccState.rafId = window.requestAnimationFrame(drawDistanceAccGame);
  };

  const renderDistanceAccGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopSIUnitsJumpGame(); stopTestMotionGame(); stopCatchUpGame();
    stopAccelerationGame(); stopSprintGame(); stopFreeFallGame();
    stopBrakingGame(); stopDistanceAccGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">K5 · Beschleunigungsweg</p>
          <h3>Wie weit kommt man beim Anfahren?</h3>
          <p>Ein Fahrzeug, das aus der Ruhe gleichmäßig beschleunigt, legt in den ersten Sekunden wenig zurück – aber der Weg wächst sehr schnell, weil die Geschwindigkeit zunimmt.</p>
          <p>Der zurückgelegte Weg hängt vom <strong>Quadrat der Zeit</strong> ab: Doppelte Zeit bedeutet viermal mehr Weg. Das nennt man quadratisches Wachstum.</p>
          <p>Diese Formel gilt nur, wenn das Fahrzeug aus der Ruhe startet (v₀ = 0). Ansonsten kommt noch ein v₀ · t-Term hinzu.</p>
        </div>
        <div class="test-theory-formula" aria-label="Wichtige Formel">
          <span>s = ½ · a · t²</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> a = 3 m/s², t = 6 s</p>
          <p>s = ½ · 3 · 6² = ½ · 3 · 36 = 54 m</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="distacc-start" type="button">Zur Frage</button>
      </section>
    `;

    siGameStage.querySelector("#distacc-start")?.addEventListener("click", startDistanceAccQuestion);
  };


  // ─── K6: Konzept-Quiz (Multiple Choice) ──────────────────────────────────

  const startMCConceptQuestion = (index) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    const question = MC_CONCEPT_QUESTIONS[index];

    if (!question) {
      siGameStage.innerHTML = `
        <section class="test-motion-complete">
          <h3>Konzept-Quiz geschafft!</h3>
          <p>Du hast alle vier Konzeptfragen beantwortet. Sehr gut!</p>
          <div class="test-motion-complete-actions">
            <button class="si-jumpgame-button" id="mc-back-final" type="button">Zurück zum Pfad</button>
            <button class="si-jumpgame-button" id="mc-repeat-final" type="button">Nochmal spielen</button>
          </div>
        </section>
      `;
      siGameStage.querySelector("#mc-back-final")?.addEventListener("click", closeSIGame);
      siGameStage.querySelector("#mc-repeat-final")?.addEventListener("click", () => renderMCConceptGame());
      return;
    }

    const optionsHTML = question.options.map((option, i) => `
      <button class="mc-option-btn" type="button" data-index="${i}">${option}</button>
    `).join("");

    siGameStage.innerHTML = `
      <section class="test-theory-page mc-quiz-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Frage ${index + 1} von ${MC_CONCEPT_QUESTIONS.length}</p>
          <h3>${question.text}</h3>
        </div>
        <div class="mc-options-grid" id="mc-options-grid">
          ${optionsHTML}
        </div>
        <p class="test-motion-feedback mc-feedback" id="mc-feedback" aria-live="polite"></p>
        <button class="si-jumpgame-button test-motion-next" id="mc-next" type="button" hidden>
          ${index + 1 < MC_CONCEPT_QUESTIONS.length ? "Nächste Frage" : "Fertig"}
        </button>
      </section>
    `;

    const optionsGrid = siGameStage.querySelector("#mc-options-grid");
    const feedbackEl = siGameStage.querySelector("#mc-feedback");
    const nextBtn = siGameStage.querySelector("#mc-next");

    optionsGrid?.querySelectorAll(".mc-option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = Number(btn.getAttribute("data-index"));
        optionsGrid.querySelectorAll(".mc-option-btn").forEach((b) => {
          b.disabled = true;
          const idx = Number(b.getAttribute("data-index"));
          if (idx === question.correct) b.classList.add("mc-correct");
          else if (idx === chosen && chosen !== question.correct) b.classList.add("mc-wrong");
        });

        if (feedbackEl instanceof HTMLElement) {
          feedbackEl.className = "test-motion-feedback mc-feedback";
          if (chosen === question.correct) {
            feedbackEl.textContent = `Richtig! ${question.explanation}`;
            feedbackEl.classList.add("is-correct");
          } else {
            feedbackEl.textContent = `Nicht ganz. ${question.explanation}`;
            feedbackEl.classList.add("is-hint");
          }
        }
        if (nextBtn instanceof HTMLButtonElement) nextBtn.hidden = false;
      });
    });

    if (nextBtn instanceof HTMLButtonElement) {
      nextBtn.addEventListener("click", () => startMCConceptQuestion(index + 1));
    }
  };

  const renderMCConceptGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    stopSIUnitsJumpGame(); stopTestMotionGame(); stopCatchUpGame();
    stopAccelerationGame(); stopSprintGame(); stopFreeFallGame();
    stopBrakingGame(); stopDistanceAccGame();

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">K6 · Konzept-Quiz</p>
          <h3>Was hast du wirklich verstanden?</h3>
          <p>Rechenaufgaben lösen ist wichtig – aber genauso wichtig ist das konzeptuelle Verständnis. Kannst du erklären, was die Physik bedeutet?</p>
          <p>In diesem Quiz gibt es <strong>vier Konzeptfragen</strong> mit je vier Antwortmöglichkeiten. Genau eine Antwort ist richtig. Nach deiner Wahl siehst du sofort eine Erklärung.</p>
          <p>Lies alle Optionen, bevor du klickst – oft klingt mehr als eine Antwort plausibel.</p>
        </div>
        <div class="test-theory-formula" aria-label="Tipp">
          <span>Denk – dann klick!</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Themen:</strong> v-t-Diagramm, gleichförmige Bewegung, Bremsbeschleunigung, Bremsweg.</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="mc-concept-start" type="button">Quiz starten</button>
      </section>
    `;

    siGameStage.querySelector("#mc-concept-start")?.addEventListener("click", () => startMCConceptQuestion(0));
  };


  // ─── Module Game Engine ─────────────────────────────────────────────────────

  let _matterEngine = null;
  let _matterRender = null;
  let _matterRunner = null;
  let _activeChart = null;

  const stopModuleGame = () => {
    if (_matterRunner) { try { Matter.Runner.stop(_matterRunner); } catch (_) {} _matterRunner = null; }
    if (_matterRender) { try { Matter.Render.stop(_matterRender); } catch (_) {} _matterRender = null; }
    if (_matterEngine) { try { Matter.Engine.clear(_matterEngine); } catch (_) {} _matterEngine = null; }
    if (_activeChart) { try { _activeChart.destroy(); } catch (_) {} _activeChart = null; }
    if (siGameStage instanceof HTMLElement) {
      siGameStage.classList.remove("test-motion-flash");
    }
    document.body.classList.remove("test-motion-page-flash");
  };

  const _flashCorrect = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.classList.remove("test-motion-flash");
    requestAnimationFrame(() => {
      siGameStage.classList.add("test-motion-flash");
      document.body.classList.add("test-motion-page-flash");
    });
    setTimeout(() => {
      siGameStage.classList.remove("test-motion-flash");
      document.body.classList.remove("test-motion-page-flash");
    }, 760);
  };

  // Anime.js entrance for theory page
  const animateModuleTheory = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    const items = siGameStage.querySelectorAll(".theory-anim");
    if (typeof anime !== "undefined") {
      anime({
        targets: items,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80, { start: 60 }),
        duration: 440,
        easing: "easeOutCubic",
      });
    } else {
      items.forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  };

  // Show theory page then hand off to question
  const showModuleTheory = (step, onStart) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    const t = step.theory;
    if (!t) { onStart(); return; }
    const accent = step.colorA || "#59a3ff";

    siGameStage.innerHTML = `
      <section class="mod-theory-page">
        <div class="mod-theory-body">
          <p class="theory-anim mod-theory-kicker" style="color:${accent}">${t.kicker}</p>
          <h3 class="theory-anim mod-theory-heading">${t.heading}</h3>
          ${t.paragraphs.map(p => `<p class="theory-anim mod-theory-para">${p}</p>`).join("")}
          ${t.formula ? `<div class="theory-anim mod-theory-formula"><span>${t.formula}</span></div>` : ""}
          ${t.example ? `<div class="theory-anim mod-theory-example">${t.example}</div>` : ""}
          <button class="theory-anim si-jumpgame-button mod-theory-cta" type="button">Zur Aufgabe →</button>
        </div>
      </section>
    `;
    siGameStage.querySelector(".mod-theory-cta")?.addEventListener("click", onStart);
    animateModuleTheory();
  };

  // Multiple-Choice engine
  const runMCEngine = (tasks, onComplete) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    let idx = 0;

    const render = () => {
      const task = tasks[idx];
      if (!task) { onComplete?.(); return; }

      siGameStage.innerHTML = `
        <section class="mod-question-page mc-page">
          <p class="mod-q-meta">Frage ${idx + 1} von ${tasks.length}</p>
          <h3 class="mod-q-text">${task.text}</h3>
          <div class="mc-options-grid" id="eng-mc-grid">
            ${task.options.map((o, i) => `<button class="mc-option-btn" type="button" data-i="${i}">${o}</button>`).join("")}
          </div>
          <p class="test-motion-feedback" id="eng-mc-fb" aria-live="polite"></p>
          ${task.hint ? `<button class="mc-hint-btn" id="eng-mc-hint" type="button">💡 Tipp anzeigen</button><p class="mc-hint-text" id="eng-mc-hint-text" hidden>${task.hint}</p>` : ""}
          <button class="si-jumpgame-button mod-q-next" id="eng-mc-next" type="button" hidden>
            ${idx === tasks.length - 1 ? "Fertig →" : "Weiter →"}
          </button>
        </section>
      `;

      if (typeof anime !== "undefined") {
        anime({ targets: "#eng-mc-grid .mc-option-btn", opacity:[0,1], translateY:[12,0], delay: anime.stagger(55), duration: 300, easing:"easeOutCubic" });
      }

      const grid = siGameStage.querySelector("#eng-mc-grid");
      const fb = siGameStage.querySelector("#eng-mc-fb");
      const next = siGameStage.querySelector("#eng-mc-next");
      const hintBtn = siGameStage.querySelector("#eng-mc-hint");
      const hintText = siGameStage.querySelector("#eng-mc-hint-text");
      let done = false;
      hintBtn?.addEventListener("click", () => {
        if (hintText) { hintText.hidden = false; hintBtn.hidden = true; }
      });

      grid?.querySelectorAll(".mc-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (done) return;
          done = true;
          const chosen = Number(btn.getAttribute("data-i"));
          grid.querySelectorAll(".mc-option-btn").forEach(b => {
            b.disabled = true;
            const i = Number(b.getAttribute("data-i"));
            if (i === task.correct) b.classList.add("mc-correct");
            else if (i === chosen) b.classList.add("mc-wrong");
          });
          if (fb) {
            fb.className = `test-motion-feedback ${chosen === task.correct ? "is-correct" : "is-hint"}`;
            fb.textContent = chosen === task.correct
              ? `Richtig! ${task.explanation}`
              : `Nicht ganz. ${task.explanation}`;
          }
          if (next) next.hidden = false;
          if (chosen === task.correct) _flashCorrect();
        });
      });

      next?.addEventListener("click", () => { idx++; render(); });
    };
    render();
  };

  // Calculation engine
  const runCalcEngine = (tasks, cfg, onComplete) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    let idx = 0;

    const render = () => {
      const task = tasks[idx];
      if (!task) { onComplete?.(); return; }

      siGameStage.innerHTML = `
        <section class="mod-question-page calc-page">
          <div class="mod-q-meta">
            <span>Aufgabe ${idx + 1} von ${tasks.length}</span>
            <strong>${task.xp ?? 100} XP</strong>
          </div>
          <h3 class="mod-q-heading">${cfg.questionTitle ?? "Berechne"}</h3>
          <p class="mod-q-text">${task.description}</p>
          <div class="calc-formula-chip"><span>${cfg.formulaDisplay ?? cfg.formula ?? ""}</span></div>
          <label class="test-motion-answer-label" for="eng-calc-input">Antwort in ${cfg.answerUnit}</label>
          <div class="test-motion-answer-row">
            <input id="eng-calc-input" type="number" inputmode="decimal" placeholder="…" autocomplete="off">
            <button class="si-jumpgame-button" id="eng-calc-check">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="eng-calc-fb" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="eng-calc-next" hidden>
            ${idx === tasks.length - 1 ? "Fertig →" : "Nächste Aufgabe →"}
          </button>
        </section>
      `;

      const inp = siGameStage.querySelector("#eng-calc-input");
      const fb  = siGameStage.querySelector("#eng-calc-fb");
      const nxt = siGameStage.querySelector("#eng-calc-next");
      inp?.focus();

      const check = () => {
        const val = inp instanceof HTMLInputElement ? inp.valueAsNumber : NaN;
        if (!Number.isFinite(val)) { fb.textContent = "Gib zuerst eine Zahl ein."; fb.className = "test-motion-feedback is-hint"; return; }
        const tol = cfg.tolerance ?? 0.05;
        const ok = Math.abs(val - task.answer) <= Math.max(tol, Math.abs(task.answer) * tol);
        if (ok) {
          fb.className = "test-motion-feedback is-correct";
          fb.textContent = task.successFeedback ?? `Richtig! Ergebnis: ${task.answer} ${cfg.answerUnit}. +${task.xp ?? 100} XP`;
          if (inp) inp.disabled = true;
          if (nxt) nxt.hidden = false;
          _flashCorrect();
        } else {
          fb.className = "test-motion-feedback is-hint";
          fb.textContent = task.hint ?? `Überprüfe deine Rechnung. Formel: ${cfg.formula}`;
        }
      };
      siGameStage.querySelector("#eng-calc-check")?.addEventListener("click", check);
      inp?.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
      nxt?.addEventListener("click", () => { idx++; render(); });
    };
    render();
  };

  // Chart.js engine
  const runChartEngine = (chartCfg, tasks, onComplete) => {
    if (!(siGameStage instanceof HTMLElement)) return;

    siGameStage.innerHTML = `
      <section class="mod-question-page chart-page">
        <div class="mod-chart-wrap">
          <canvas id="eng-chart-canvas" class="mod-chart-canvas"></canvas>
        </div>
        <div class="mod-chart-questions" id="eng-chart-q"></div>
      </section>
    `;

    const canvas = siGameStage.querySelector("#eng-chart-canvas");
    if (canvas instanceof HTMLCanvasElement && typeof Chart !== "undefined") {
      _activeChart = new Chart(canvas.getContext("2d"), {
        type: chartCfg.chartType ?? "line",
        data: {
          labels: chartCfg.xData,
          datasets: chartCfg.datasets.map(d => ({
            label: d.label,
            data: d.data,
            borderColor: d.color,
            backgroundColor: d.color + "22",
            borderWidth: 2.5,
            pointRadius: 3,
            tension: d.tension ?? 0,
            fill: d.fill ?? false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: "easeOutQuart" },
          plugins: {
            legend: { labels: { font: { family: "Space Grotesk", size: 13 }, color: "#17212b" } },
            tooltip: { bodyFont: { family: "Space Grotesk" }, titleFont: { family: "Space Grotesk" } },
          },
          scales: {
            x: {
              title: { display: true, text: chartCfg.xLabel ?? "Zeit t (s)", color: "#384858", font: { family: "Space Grotesk", size: 12 } },
              grid: { color: "rgba(96,111,128,0.14)" },
              ticks: { color: "#384858", font: { family: "Space Grotesk" } },
            },
            y: {
              title: { display: true, text: chartCfg.yLabel ?? "s (m)", color: "#384858", font: { family: "Space Grotesk", size: 12 } },
              grid: { color: "rgba(96,111,128,0.14)" },
              ticks: { color: "#384858", font: { family: "Space Grotesk" } },
            },
          },
        },
      });
    }

    const qContainer = siGameStage.querySelector("#eng-chart-q");
    let taskIdx = 0;

    const renderQ = () => {
      const task = tasks[taskIdx];
      if (!task || !qContainer) { onComplete?.(); return; }

      if (task.type === "calc") {
        qContainer.innerHTML = `
          <p class="mod-q-meta">Frage ${taskIdx + 1} von ${tasks.length}</p>
          <p class="mod-q-text">${task.text}</p>
          <div class="test-motion-answer-row">
            <input id="eng-cq-input" type="number" inputmode="decimal" placeholder="Antwort in ${task.unit}">
            <button class="si-jumpgame-button" id="eng-cq-check">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="eng-cq-fb" aria-live="polite"></p>
          <button class="si-jumpgame-button mod-q-next" id="eng-cq-next" hidden>${taskIdx === tasks.length - 1 ? "Fertig →" : "Weiter →"}</button>
        `;
        const inp = qContainer.querySelector("#eng-cq-input");
        const fb = qContainer.querySelector("#eng-cq-fb");
        const nxt = qContainer.querySelector("#eng-cq-next");
        inp?.focus();
        const check = () => {
          const v = inp instanceof HTMLInputElement ? inp.valueAsNumber : NaN;
          if (!Number.isFinite(v)) return;
          const tol = task.tolerance ?? 0.1;
          if (Math.abs(v - task.answer) <= Math.max(tol, Math.abs(task.answer) * tol)) {
            fb.className = "test-motion-feedback is-correct";
            fb.textContent = `Richtig! ${task.explanation ?? ""}`;
            inp.disabled = true; nxt.hidden = false; _flashCorrect();
          } else {
            fb.className = "test-motion-feedback is-hint";
            fb.textContent = task.hint ?? "Lies den Graphen nochmals sorgfältig ab.";
          }
        };
        qContainer.querySelector("#eng-cq-check")?.addEventListener("click", check);
        inp?.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
        nxt?.addEventListener("click", () => { taskIdx++; renderQ(); });
      } else {
        qContainer.innerHTML = `
          <p class="mod-q-meta">Frage ${taskIdx + 1} von ${tasks.length}</p>
          <p class="mod-q-text">${task.text}</p>
          <div class="mc-options-grid" id="eng-cq-grid">
            ${task.options.map((o, i) => `<button class="mc-option-btn" type="button" data-i="${i}">${o}</button>`).join("")}
          </div>
          <p class="test-motion-feedback" id="eng-cq-fb" aria-live="polite"></p>
          <button class="si-jumpgame-button mod-q-next" id="eng-cq-next" hidden>${taskIdx === tasks.length - 1 ? "Fertig →" : "Weiter →"}</button>
        `;
        const grid = qContainer.querySelector("#eng-cq-grid");
        const fb = qContainer.querySelector("#eng-cq-fb");
        const nxt = qContainer.querySelector("#eng-cq-next");
        let done = false;
        grid?.querySelectorAll(".mc-option-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            if (done) return; done = true;
            const chosen = Number(btn.getAttribute("data-i"));
            grid.querySelectorAll(".mc-option-btn").forEach(b => {
              b.disabled = true;
              const i = Number(b.getAttribute("data-i"));
              if (i === task.correct) b.classList.add("mc-correct");
              else if (i === chosen) b.classList.add("mc-wrong");
            });
            fb.className = `test-motion-feedback ${chosen === task.correct ? "is-correct" : "is-hint"}`;
            fb.textContent = chosen === task.correct ? `Richtig! ${task.explanation}` : `Nicht ganz. ${task.explanation}`;
            nxt.hidden = false;
            if (chosen === task.correct) _flashCorrect();
          });
        });
        nxt?.addEventListener("click", () => { taskIdx++; renderQ(); });
      }
    };
    renderQ();
  };

  // Matter.js engine (free-fall simulation)
  const runMatterEngine = (scene, tasks, onComplete) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.innerHTML = `
      <section class="mod-question-page matter-page">
        <div class="mod-matter-wrap">
          <canvas id="eng-matter-canvas" class="mod-matter-canvas"></canvas>
          <div class="mod-matter-controls">
            <button class="si-jumpgame-button" id="eng-matter-drop" type="button">Fallen lassen</button>
            <button class="si-jumpgame-button mod-matter-reset" id="eng-matter-reset" type="button">Nochmal</button>
          </div>
        </div>
        <div class="mod-matter-questions" id="eng-matter-q"></div>
      </section>
    `;

    const canvas = siGameStage.querySelector("#eng-matter-canvas");
    if (!(canvas instanceof HTMLCanvasElement) || typeof Matter === "undefined") {
      runMCEngine(tasks, onComplete); return;
    }

    const W = canvas.offsetWidth || 420;
    const H = canvas.offsetHeight || 280;

    const engine = Matter.Engine.create({ gravity: { y: 1.8 } });
    const render = Matter.Render.create({
      canvas,
      engine,
      options: { width: W, height: H, wireframes: false, background: "#f4f8ff" },
    });

    const ballColors = ["#59a3ff", "#f86785", "#3dd18d"];
    const ballSizes = scene === "freeFall" ? [16, 10, 24] : [14, 14, 14];
    const positions = [W * 0.25, W * 0.5, W * 0.75];

    const balls = positions.map((x, i) => Matter.Bodies.circle(x, 40, ballSizes[i], {
      restitution: 0.25,
      isStatic: true,
      render: { fillStyle: ballColors[i], strokeStyle: "#17212b", lineWidth: 2 },
    }));

    const ground = Matter.Bodies.rectangle(W / 2, H - 10, W, 20, {
      isStatic: true,
      render: { fillStyle: "#c8d8ea" },
    });

    Matter.Composite.add(engine.world, [...balls, ground]);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    _matterEngine = engine;
    _matterRender = render;
    _matterRunner = runner;

    const dropBtn = siGameStage.querySelector("#eng-matter-drop");
    const resetBtn = siGameStage.querySelector("#eng-matter-reset");
    let dropped = false;

    const dropAll = () => {
      if (dropped) return;
      dropped = true;
      balls.forEach(b => Matter.Body.setStatic(b, false));
      if (dropBtn) dropBtn.disabled = true;
      setTimeout(() => {
        const qContainer = siGameStage.querySelector("#eng-matter-q");
        if (!qContainer) return;
        runMCEngineInEl(qContainer, tasks, onComplete);
      }, 2200);
    };

    dropBtn?.addEventListener("click", dropAll);
    resetBtn?.addEventListener("click", () => {
      dropped = false;
      if (dropBtn) dropBtn.disabled = false;
      balls.forEach((b, i) => {
        Matter.Body.setStatic(b, true);
        Matter.Body.setPosition(b, { x: positions[i], y: 40 });
        Matter.Body.setVelocity(b, { x: 0, y: 0 });
      });
    });
  };

  // MC rendered inside a given container element (used by matter engine)
  const runMCEngineInEl = (container, tasks, onComplete) => {
    let idx = 0;
    const render = () => {
      const task = tasks[idx];
      if (!task) { onComplete?.(); return; }
      container.innerHTML = `
        <p class="mod-q-meta">Frage ${idx + 1} von ${tasks.length}</p>
        <p class="mod-q-text">${task.text}</p>
        <div class="mc-options-grid" id="eng-mel-grid">
          ${task.options.map((o, i) => `<button class="mc-option-btn" type="button" data-i="${i}">${o}</button>`).join("")}
        </div>
        <p class="test-motion-feedback" id="eng-mel-fb" aria-live="polite"></p>
        <button class="si-jumpgame-button mod-q-next" id="eng-mel-next" hidden>${idx === tasks.length - 1 ? "Fertig →" : "Weiter →"}</button>
      `;
      const grid = container.querySelector("#eng-mel-grid");
      const fb = container.querySelector("#eng-mel-fb");
      const nxt = container.querySelector("#eng-mel-next");
      let done = false;
      grid?.querySelectorAll(".mc-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (done) return; done = true;
          const chosen = Number(btn.getAttribute("data-i"));
          grid.querySelectorAll(".mc-option-btn").forEach(b => {
            b.disabled = true;
            const i = Number(b.getAttribute("data-i"));
            if (i === task.correct) b.classList.add("mc-correct");
            else if (i === chosen) b.classList.add("mc-wrong");
          });
          fb.className = `test-motion-feedback ${chosen === task.correct ? "is-correct" : "is-hint"}`;
          fb.textContent = chosen === task.correct ? `Richtig! ${task.explanation}` : `Nicht ganz. ${task.explanation}`;
          nxt.hidden = false;
          if (chosen === task.correct) _flashCorrect();
        });
      });
      nxt?.addEventListener("click", () => { idx++; render(); });
    };
    render();
  };

  // Completion screen
  const showModuleComplete = (step) => {
    if (!(siGameStage instanceof HTMLElement)) return;
    const accent = step.colorA || "#59a3ff";
    siGameStage.innerHTML = `
      <section class="mod-complete-page">
        <div class="mod-complete-icon" style="color:${accent}">
          <svg viewBox="0 0 48 48" fill="none" width="64" height="64">
            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3"/>
            <path d="M14 24l7 7 13-14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>${step.title} gemeistert!</h3>
        <p>Du hast alle Aufgaben zu <strong>${step.title}</strong> erfolgreich abgeschlossen.</p>
        <div class="mod-complete-actions">
          <button class="si-jumpgame-button" id="mod-comp-back">Zurück zum Pfad</button>
          <button class="si-jumpgame-button" id="mod-comp-retry">Nochmal üben</button>
        </div>
      </section>
    `;
    if (typeof anime !== "undefined") {
      anime({ targets: ".mod-complete-icon", scale:[0.4,1], opacity:[0,1], duration:560, easing:"easeOutBack" });
      anime({ targets: ".mod-complete-page h3, .mod-complete-page p, .mod-complete-actions", opacity:[0,1], translateY:[16,0], delay: anime.stagger(80, {start:300}), duration:380, easing:"easeOutCubic" });
    }
    siGameStage.querySelector("#mod-comp-back")?.addEventListener("click", closeSIGame);
    siGameStage.querySelector("#mod-comp-retry")?.addEventListener("click", () => renderModuleGame(step));
  };

  // Main dispatcher
  const showDifficultyPicker = (q, onSelect) => {
    siGameStage.innerHTML = `
      <div class="diff-picker-page theory-anim">
        <p class="diff-picker-label">Wähle deinen Schwierigkeitsgrad</p>
        <div class="diff-picker-grid">
          <button class="diff-card diff-card-basis" id="diff-basis">
            <span class="diff-card-icon">⭐</span>
            <span class="diff-card-title">Basis</span>
            <span class="diff-card-desc">Grundlegende Fragen – perfekt zum Einstieg</span>
          </button>
          <button class="diff-card diff-card-challenge" id="diff-challenge">
            <span class="diff-card-icon">🔥</span>
            <span class="diff-card-title">Challenge</span>
            <span class="diff-card-desc">Anspruchsvollere Fragen – für Profis</span>
          </button>
        </div>
      </div>`;
    siGameStage.querySelector("#diff-basis").addEventListener("click", () => onSelect(q.basis));
    siGameStage.querySelector("#diff-challenge").addEventListener("click", () => onSelect(q.challenge));
    if (typeof anime !== "undefined") {
      anime({ targets: ".diff-picker-page", opacity: [0, 1], translateY: [16, 0], duration: 400, easing: "easeOutQuart" });
    } else {
      const picker = siGameStage.querySelector(".diff-picker-page");
      if (picker) { picker.style.opacity = "1"; picker.style.transform = "translateY(0)"; }
    }
  };


  // ── roundRect polyfill for browsers that don't support it ────────────────
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      const R = Math.min(+r || 0, w / 2, h / 2);
      this.moveTo(x + R, y);
      this.lineTo(x + w - R, y);   this.arcTo(x + w, y,     x + w, y + R,     R);
      this.lineTo(x + w, y + h - R); this.arcTo(x + w, y + h, x + w - R, y + h, R);
      this.lineTo(x + R, y + h);   this.arcTo(x,     y + h, x,     y + h - R, R);
      this.lineTo(x, y + R);       this.arcTo(x,     y,     x + R, y,         R);
      this.closePath();
    };
  }

  // ── Interactive Engine 1: Speed Lab (v = s/t) ──────────────────────────
  const runSpeedLabEngine = (q, onComplete) => {
    const trackS = q.s ?? 160;
    const minV = q.minV ?? 5, maxV = q.maxV ?? 30, defV = q.defaultV ?? 12;

    siGameStage.innerHTML = `
      <div class="interact-page">
        <p class="mod-q-meta">Interaktiv · Geschwindigkeits-Labor</p>
        <h3 class="interact-heading">v = s ÷ t – selbst erleben</h3>
        <p class="interact-sub">Stelle die Geschwindigkeit ein, starte das Auto und beobachte, wie v = s/t live berechnet wird.</p>
        <div class="interact-canvas-wrap"><canvas id="ilab-cv" height="110"></canvas></div>
        <div class="interact-ctrl-row">
          <span class="interact-v-label">v = <strong id="ilab-vv">${defV}</strong> m/s</span>
          <input class="interact-slider" id="ilab-sl" type="range" min="${minV}" max="${maxV}" value="${defV}" step="1">
          <button class="si-jumpgame-button" id="ilab-go">▶ Start</button>
        </div>
        <div class="interact-formula-box">
          v = <span class="ilab-hl" id="ilab-fs">${trackS}</span> m ÷
          <span class="ilab-hl" id="ilab-ft">—</span> s =
          <span class="ilab-hl ilab-result" id="ilab-fv">—</span> m/s
        </div>
        <p class="test-motion-feedback" id="ilab-fb"></p>
        <button class="si-jumpgame-button mod-q-next" id="ilab-nx" hidden>Weiter →</button>
      </div>`;

    const cv = document.getElementById('ilab-cv');
    cv.width = cv.parentElement.offsetWidth || cv.parentElement.clientWidth || 560;
    const W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    const TL = 30, TR = W - 30, TW = TR - TL, TY = 60;

    const paint = (prog, elapsed) => {
      ctx.clearRect(0, 0, W, H);
      // road (dark on white page bg)
      ctx.fillStyle = '#2c3a4a'; ctx.fillRect(TL, TY - 16, TW, 32);
      ctx.setLineDash([14, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TL, TY); ctx.lineTo(TR, TY); ctx.stroke(); ctx.setLineDash([]);
      // start post
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(TL - 1, TY - 20, 2, 40);
      ctx.fillStyle = '#2d3a48'; ctx.font = 'bold 10px monospace';
      ctx.fillText('0', TL - 2, TY - 24);
      // finish (checkered)
      for (let r = 0; r < 8; r++) {
        ctx.fillStyle = r % 2 ? '#333' : '#fff'; ctx.fillRect(TR - 1, TY - 20 + r * 5, 3, 5);
      }
      ctx.fillStyle = '#1a7a50'; ctx.font = 'bold 10px monospace';
      ctx.fillText(trackS + ' m', TR - 26, TY - 24);
      // progress bar
      ctx.fillStyle = 'rgba(63,142,252,0.15)'; ctx.fillRect(TL, TY + 18, TW, 3);
      ctx.fillStyle = '#3f8efc'; ctx.fillRect(TL, TY + 18, TW * Math.min(prog, 1), 3);
      // car
      const cx = TL + Math.min(prog, 1) * TW;
      ctx.fillStyle = '#3f8efc'; ctx.beginPath(); ctx.roundRect(cx - 22, TY - 23, 44, 16, 5); ctx.fill();
      ctx.fillStyle = '#1a62d4'; ctx.beginPath(); ctx.roundRect(cx - 13, TY - 32, 26, 11, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath(); ctx.roundRect(cx - 10, TY - 30, 8, 7, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + 2, TY - 30, 8, 7, 2); ctx.fill();
      [cx - 14, cx + 14].forEach(wx => {
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, TY - 7, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(wx, TY - 7, 3, 0, Math.PI * 2); ctx.fill();
      });
      // timer overlay (dark pill, white text — visible on both backgrounds)
      if (elapsed !== null) {
        ctx.fillStyle = 'rgba(20,24,40,0.88)'; ctx.beginPath();
        ctx.roundRect(W / 2 - 46, 4, 92, 22, 4); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center';
        ctx.fillText('t = ' + elapsed.toFixed(1) + ' s', W / 2, 19); ctx.textAlign = 'left';
      }
    };

    paint(0, null);

    const sl = document.getElementById('ilab-sl'), vv = document.getElementById('ilab-vv');
    const ftEl = document.getElementById('ilab-ft'), fvEl = document.getElementById('ilab-fv');
    const fb = document.getElementById('ilab-fb'), nx = document.getElementById('ilab-nx');
    let raf = null;

    sl.addEventListener('input', () => { vv.textContent = sl.value; });

    document.getElementById('ilab-go').addEventListener('click', function () {
      if (raf) return;
      this.disabled = true; sl.disabled = true;
      const v = Number(sl.value), totalT = trackS / v;
      const t0 = performance.now();
      const loop = (now) => {
        const el = Math.min((now - t0) / 1000, totalT);
        paint(el / totalT, el);
        ftEl.textContent = el.toFixed(1);
        fvEl.textContent = (trackS / Math.max(el, 0.01)).toFixed(1);
        if (el < totalT) { raf = requestAnimationFrame(loop); }
        else {
          raf = null; ftEl.textContent = totalT.toFixed(1); fvEl.textContent = String(v);
          fb.className = 'test-motion-feedback is-correct';
          fb.textContent = '✓  v = ' + trackS + ' m ÷ ' + totalT.toFixed(1) + ' s = ' + v + ' m/s';
          nx.hidden = false; _flashCorrect?.();
        }
      };
      raf = requestAnimationFrame(loop);
    });

    nx.addEventListener('click', () => {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      q.followUp?.length ? runMCEngine(q.followUp, onComplete) : onComplete?.();
    });
  };


  // ── Interactive Engine 2: Two-Car Race ──────────────────────────────────
  const runRaceEngine = (q, onComplete) => {
    const cA = q.carA ?? { v: 20, color: '#5ea3ff', label: 'Auto A' };
    const cB = q.carB ?? { v: 14, color: '#ff8753', label: 'Auto B' };
    const trackS = q.s ?? 280;
    const totalT = Math.max(trackS / cA.v, trackS / cB.v);

    siGameStage.innerHTML = `
      <div class="interact-page">
        <p class="mod-q-meta">Interaktiv · Gleichförmige Bewegung</p>
        <h3 class="interact-heading">Das Rennen – wer ist schneller?</h3>
        <p class="interact-sub">Beide Autos starten gleichzeitig mit konstanter Geschwindigkeit. Beobachte genau!</p>
        <div class="interact-canvas-wrap"><canvas id="irace-cv" height="150"></canvas></div>
        <div class="interact-race-info">
          <span style="color:${cA.color}">■ ${cA.label}</span><span id="ira-sa">0 m</span>
          <span style="color:${cB.color}">■ ${cB.label}</span><span id="ira-sb">0 m</span>
          <span class="interact-timer">⏱ <span id="ira-t">0,0</span> s</span>
        </div>
        <button class="si-jumpgame-button" id="irace-go" style="margin:1rem auto;display:block">▶ Rennen starten</button>
        <p class="test-motion-feedback" id="irace-fb"></p>
      </div>`;

    const cv = document.getElementById('irace-cv');
    cv.width = cv.parentElement.offsetWidth || cv.parentElement.clientWidth || 560;
    const W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    const TL = 28, TR = W - 28, TW = TR - TL;
    const LA = 46, LB = 104;

    const drawLane = (ly, car, prog) => {
      ctx.fillStyle = '#2c3a4a'; ctx.fillRect(TL, ly - 20, TW, 40);
      ctx.setLineDash([14, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TL, ly); ctx.lineTo(TR, ly); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = car.color; ctx.font = 'bold 11px monospace'; ctx.fillText(car.label, TL + 2, ly - 25);
      for (let r = 0; r < 8; r++) {
        ctx.fillStyle = r % 2 ? '#333' : '#fff'; ctx.fillRect(TR - 2, ly - 18 + r * 4.5, 4, 4.5);
      }
      const p = Math.min(prog, 1);
      ctx.fillStyle = car.color + '33'; ctx.fillRect(TL, ly + 21, TW, 3);
      ctx.fillStyle = car.color; ctx.fillRect(TL, ly + 21, TW * p, 3);
      const cx = TL + p * TW;
      ctx.fillStyle = car.color; ctx.beginPath(); ctx.roundRect(cx - 20, ly - 20, 40, 15, 4); ctx.fill();
      ctx.fillStyle = car.color + 'cc'; ctx.beginPath(); ctx.roundRect(cx - 12, ly - 28, 24, 10, 3); ctx.fill();
      [cx - 11, cx + 11].forEach(wx => {
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, ly - 5, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#666'; ctx.beginPath(); ctx.arc(wx, ly - 5, 2.5, 0, Math.PI * 2); ctx.fill();
      });
    };

    const paint = (el) => {
      ctx.clearRect(0, 0, W, H);
      // finish line
      ctx.strokeStyle = '#1a7a50'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(TR, 4); ctx.lineTo(TR, H - 4); ctx.stroke();
      ctx.fillStyle = '#1a7a50'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(trackS + ' m', TR, H - 6); ctx.textAlign = 'left';
      drawLane(LA, cA, cA.v * el / trackS);
      drawLane(LB, cB, cB.v * el / trackS);
      // timer pill
      ctx.fillStyle = 'rgba(20,24,40,0.88)'; ctx.beginPath();
      ctx.roundRect(W / 2 - 42, H / 2 - 13, 84, 22, 4); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
      ctx.fillText('t = ' + el.toFixed(1) + ' s', W / 2, H / 2 + 3); ctx.textAlign = 'left';
    };

    paint(0);

    const saEl = document.getElementById('ira-sa'), sbEl = document.getElementById('ira-sb');
    const tEl = document.getElementById('ira-t'), fb = document.getElementById('irace-fb');
    let raf = null;

    document.getElementById('irace-go').addEventListener('click', function () {
      if (raf) return; this.disabled = true;
      const t0 = performance.now();
      const loop = (now) => {
        const el = Math.min((now - t0) / 1000, totalT);
        paint(el);
        saEl.textContent = Math.min(cA.v * el, trackS).toFixed(0) + ' m';
        sbEl.textContent = Math.min(cB.v * el, trackS).toFixed(0) + ' m';
        tEl.textContent = el.toFixed(1);
        if (el < totalT) { raf = requestAnimationFrame(loop); }
        else {
          raf = null;
          const winner = cA.v > cB.v ? cA : cB, loser = cA.v > cB.v ? cB : cA;
          fb.className = 'test-motion-feedback is-correct';
          fb.textContent = '🏁 ' + winner.label + ' gewinnt! Ankunft nach ' +
            (trackS / winner.v).toFixed(1) + ' s vs. ' + (trackS / loser.v).toFixed(1) + ' s.';
          if (q.followUp?.length) setTimeout(() => runMCEngine(q.followUp, onComplete), 1600);
          else setTimeout(() => onComplete?.(), 1800);
        }
      };
      raf = requestAnimationFrame(loop);
    });
  };


  // ── Interactive Engine 3: Live s-t Graph ────────────────────────────────
  const runSTLiveEngine = (q, onComplete) => {
    const movV = q.v ?? 8, movS = q.s ?? 160;
    const dur = movS / movV;

    siGameStage.innerHTML = `
      <div class="interact-page">
        <p class="mod-q-meta">Interaktiv · s-t-Diagramm live</p>
        <h3 class="interact-heading">s-t-Diagramm in Echtzeit</h3>
        <p class="interact-sub">Oben bewegt sich der Körper. Unten entsteht simultan das s-t-Diagramm. Achte auf die Steigung!</p>
        <div class="interact-canvas-wrap"><canvas id="ist-cv" height="260"></canvas></div>
        <button class="si-jumpgame-button" id="ist-go" style="margin:1rem auto;display:block">▶ Animation starten</button>
        <p class="test-motion-feedback" id="ist-fb"></p>
      </div>`;

    const cv = document.getElementById('ist-cv');
    cv.width = cv.parentElement.offsetWidth || cv.parentElement.clientWidth || 560;
    const W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    const SPLIT = 100, TL = 22, TR = W - 22, TW = TR - TL, TY = SPLIT / 2 + 8;
    const GP = { x0: 46, x1: W - 18, y0: SPLIT + 16, y1: H - 18 };
    GP.w = GP.x1 - GP.x0; GP.h = GP.y1 - GP.y0;
    const pts = [];

    const paintAll = (elapsed, finished) => {
      ctx.clearRect(0, 0, W, H);
      const prog = Math.min(elapsed / dur, 1);

      // Track
      ctx.fillStyle = '#2c3a4a'; ctx.fillRect(TL, TY - 16, TW, 32);
      ctx.setLineDash([12, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TL, TY); ctx.lineTo(TR, TY); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(TL - 1, TY - 18, 2, 36);
      ctx.fillStyle = '#2d3a48'; ctx.font = 'bold 10px monospace'; ctx.fillText('s=0', TL, TY - 22);
      for (let r = 0; r < 8; r++) {
        ctx.fillStyle = r % 2 ? '#333' : '#fff'; ctx.fillRect(TR - 2, TY - 18 + r * 4.5, 4, 4.5);
      }
      ctx.fillStyle = '#1a7a50'; ctx.font = 'bold 10px monospace'; ctx.fillText(movS + ' m', TR - 22, TY - 22);
      ctx.fillStyle = 'rgba(138,115,255,0.2)'; ctx.fillRect(TL, TY + 18, TW, 3);
      ctx.fillStyle = '#7c5cf5'; ctx.fillRect(TL, TY + 18, TW * prog, 3);
      const cx = TL + prog * TW;
      ctx.fillStyle = '#7c5cf5'; ctx.beginPath(); ctx.roundRect(cx - 20, TY - 23, 40, 16, 5); ctx.fill();
      ctx.fillStyle = '#5a3fd4'; ctx.beginPath(); ctx.roundRect(cx - 12, TY - 31, 24, 10, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath(); ctx.roundRect(cx - 9, TY - 29, 8, 7, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + 1, TY - 29, 8, 7, 2); ctx.fill();
      [cx - 12, cx + 12].forEach(wx => {
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, TY - 6, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(wx, TY - 6, 3, 0, Math.PI * 2); ctx.fill();
      });
      // divider
      ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(0, SPLIT, W, 1);

      // Graph grid
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; ctx.setLineDash([3, 6]);
      for (let i = 1; i <= 4; i++) {
        const gx = GP.x0 + (GP.w / 4) * i, gy = GP.y1 - (GP.h / 4) * i;
        ctx.beginPath(); ctx.moveTo(gx, GP.y0); ctx.lineTo(gx, GP.y1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(GP.x0, gy); ctx.lineTo(GP.x1, gy); ctx.stroke();
        ctx.fillStyle = '#4d6070'; ctx.font = '10px monospace';
        ctx.textAlign = 'center'; ctx.fillText((dur / 4 * i).toFixed(1), gx, GP.y1 + 14);
        ctx.textAlign = 'right'; ctx.fillText((movS / 4 * i).toFixed(0), GP.x0 - 4, gy + 4);
      }
      ctx.setLineDash([]); ctx.textAlign = 'left';
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(GP.x0, GP.y0 - 6); ctx.lineTo(GP.x0, GP.y1); ctx.lineTo(GP.x1 + 6, GP.y1); ctx.stroke();
      ctx.fillStyle = '#2d3a48'; ctx.font = '11px monospace';
      ctx.fillText('s (m)', GP.x0 - 40, GP.y0 + 2);
      ctx.fillText('t (s)', GP.x1, GP.y1 + 14);
      ctx.fillText('0', GP.x0 - 8, GP.y1 + 14);

      // Plotted line
      if (pts.length > 1) {
        ctx.strokeStyle = '#8a73ff'; ctx.lineWidth = 2.5; ctx.beginPath();
        pts.forEach(({ t, s: ps }, i) => {
          const px = GP.x0 + (t / dur) * GP.w, py = GP.y1 - (ps / movS) * GP.h;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();
        const last = pts[pts.length - 1];
        const lx = GP.x0 + (last.t / dur) * GP.w, ly = GP.y1 - (last.s / movS) * GP.h;
        ctx.fillStyle = '#8a73ff'; ctx.beginPath(); ctx.arc(lx, ly, 5, 0, Math.PI * 2); ctx.fill();
      }

      // Slope annotation when done
      if (finished) {
        const ax = GP.x0 + GP.w * 0.1, ay = GP.y1 - GP.h * 0.1;
        const bx = GP.x0 + GP.w * 0.5, by = GP.y1 - GP.h * 0.5;
        ctx.strokeStyle = '#ffd164'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, ay); ctx.lineTo(bx, by); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(20,24,40,0.85)'; ctx.beginPath();
        ctx.roundRect(bx + 5, (ay + by) / 2 - 14, 162, 22, 4); ctx.fill();
        ctx.fillStyle = '#ffd164'; ctx.font = 'bold 11px monospace';
        ctx.fillText('Steigung = ' + movV + ' m/s', bx + 9, (ay + by) / 2 + 3);
      }
    };

    paintAll(0, false);
    const fb = document.getElementById('ist-fb');
    let raf = null;

    document.getElementById('ist-go').addEventListener('click', function () {
      if (raf) return; this.disabled = true; pts.length = 0;
      const t0 = performance.now();
      const loop = (now) => {
        const el = Math.min((now - t0) / 1000, dur);
        pts.push({ t: el, s: Math.min(movV * el, movS) });
        const done = el >= dur;
        paintAll(el, done);
        if (!done) { raf = requestAnimationFrame(loop); }
        else {
          raf = null;
          fb.className = 'test-motion-feedback is-correct';
          fb.textContent = 'Steigung = Δs/Δt = ' + movS + ' m / ' + dur.toFixed(1) + ' s = ' + movV + ' m/s';
          if (q.followUp?.length) setTimeout(() => runMCEngine(q.followUp, onComplete), 1800);
          else setTimeout(() => onComplete?.(), 2200);
        }
      };
      raf = requestAnimationFrame(loop);
    });
  };


  // ── Interactive Engine 4: Acceleration Lab ─────────────────────────────
  const runAccelLabEngine = (q, onComplete) => {
    const v0 = q.v0 ?? 0;
    const minA = q.minA ?? 1, maxA = q.maxA ?? 10, defA = q.defA ?? 3;
    const maxT = q.maxT ?? 8, defT = q.defT ?? 4;

    siGameStage.innerHTML = `
      <div class="interact-page">
        <p class="mod-q-meta">Interaktiv · Beschleunigungs-Labor</p>
        <h3 class="interact-heading">v = v₀ + a · t – selbst erleben</h3>
        <p class="interact-sub">Stelle Beschleunigung und Zeit ein. Die Endgeschwindigkeit wird live berechnet und animiert.</p>
        <div class="interact-canvas-wrap"><canvas id="iacc-cv" height="120"></canvas></div>
        <div class="interact-ctrl-row">
          <span class="interact-v-label">a = <strong id="iacc-av">${defA}</strong> m/s²</span>
          <input class="interact-slider" id="iacc-sl-a" type="range" min="${minA}" max="${maxA}" step="0.5" value="${defA}">
        </div>
        <div class="interact-ctrl-row">
          <span class="interact-v-label">t = <strong id="iacc-tv">${defT}</strong> s</span>
          <input class="interact-slider" id="iacc-sl-t" type="range" min="1" max="${maxT}" step="0.5" value="${defT}">
        </div>
        <div class="interact-formula-box">
          v = ${v0} + <span class="ilab-hl" id="iacc-fa">${defA}</span> ×
          <span class="ilab-hl" id="iacc-ft">${defT}</span> =
          <span class="ilab-hl ilab-result" id="iacc-fv">${(v0 + defA * defT).toFixed(1)}</span> m/s
        </div>
        <button class="si-jumpgame-button" id="iacc-go">▶ Starten</button>
        <p class="test-motion-feedback" id="iacc-fb"></p>
        <button class="si-jumpgame-button mod-q-next" id="iacc-nx" hidden>Weiter →</button>
      </div>`;

    const cv = document.getElementById('iacc-cv');
    cv.width = cv.parentElement?.offsetWidth || 560;
    const W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    const TL = 30, TR = W - 30, TW = TR - TL, TY = 62;

    const getA = () => Number(document.getElementById('iacc-sl-a')?.value ?? defA);
    const getT = () => Number(document.getElementById('iacc-sl-t')?.value ?? defT);

    const paintAccel = (prog, currentV) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#2c3a4a'; ctx.fillRect(TL, TY - 16, TW, 32);
      ctx.setLineDash([14, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TL, TY); ctx.lineTo(TR, TY); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(TL - 1, TY - 20, 2, 40);
      ctx.fillStyle = '#2d3a48'; ctx.font = 'bold 10px monospace';
      ctx.fillText('v₀=' + v0, TL, TY - 24);
      ctx.fillStyle = 'rgba(143,115,255,0.2)'; ctx.fillRect(TL, TY + 18, TW, 3);
      ctx.fillStyle = '#8f73ff'; ctx.fillRect(TL, TY + 18, TW * Math.min(prog, 1), 3);
      const cx = TL + Math.min(prog, 1) * TW;
      ctx.fillStyle = '#8f73ff'; ctx.beginPath(); ctx.roundRect(cx - 22, TY - 23, 44, 16, 5); ctx.fill();
      ctx.fillStyle = '#6248d4'; ctx.beginPath(); ctx.roundRect(cx - 13, TY - 32, 26, 11, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath(); ctx.roundRect(cx - 10, TY - 30, 8, 7, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + 2, TY - 30, 8, 7, 2); ctx.fill();
      [cx - 14, cx + 14].forEach(wx => {
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, TY - 7, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(wx, TY - 7, 3, 0, Math.PI * 2); ctx.fill();
      });
      if (currentV !== null) {
        ctx.fillStyle = 'rgba(20,24,40,0.88)'; ctx.beginPath();
        ctx.roundRect(W / 2 - 62, 4, 124, 22, 4); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center';
        ctx.fillText('v = ' + currentV.toFixed(1) + ' m/s', W / 2, 19); ctx.textAlign = 'left';
      }
    };

    const slA = document.getElementById('iacc-sl-a');
    const slT = document.getElementById('iacc-sl-t');
    const avEl = document.getElementById('iacc-av'), tvEl = document.getElementById('iacc-tv');
    const faEl = document.getElementById('iacc-fa'), ftEl = document.getElementById('iacc-ft');
    const fvEl = document.getElementById('iacc-fv');
    const fb = document.getElementById('iacc-fb'), nx = document.getElementById('iacc-nx');
    let raf = null;

    const updateFormula = () => {
      const a = getA(), t = getT(), v = v0 + a * t;
      if (avEl) avEl.textContent = a;
      if (tvEl) tvEl.textContent = t;
      if (faEl) faEl.textContent = a;
      if (ftEl) ftEl.textContent = t;
      if (fvEl) fvEl.textContent = v.toFixed(1);
      paintAccel(0, v0 > 0 ? v0 : null);
    };

    slA?.addEventListener('input', updateFormula);
    slT?.addEventListener('input', updateFormula);
    paintAccel(0, v0 > 0 ? v0 : null);

    document.getElementById('iacc-go')?.addEventListener('click', function () {
      if (raf) return;
      this.disabled = true; if (slA) slA.disabled = true; if (slT) slT.disabled = true;
      const a = getA(), totalT = getT(), vFinal = v0 + a * totalT;
      const t0 = performance.now();
      const loop = (now) => {
        const el = Math.min((now - t0) / 1000, totalT);
        const currentV = v0 + a * el;
        paintAccel(el / totalT, currentV);
        if (el < totalT) { raf = requestAnimationFrame(loop); }
        else {
          raf = null;
          if (fb) { fb.className = 'test-motion-feedback is-correct'; fb.textContent = '✓  v = ' + v0 + ' + ' + a + ' × ' + totalT + ' = ' + vFinal.toFixed(1) + ' m/s'; }
          if (nx) nx.hidden = false;
          _flashCorrect?.();
        }
      };
      raf = requestAnimationFrame(loop);
    });

    nx?.addEventListener('click', () => {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      q.followUp?.length ? runMCEngine(q.followUp, onComplete) : onComplete?.();
    });
  };

  // ── v-t live diagram engine ───────────────────────────────────────────────
  const runVTLiveEngine = (q, onComplete) => {
    const accel = q.a   ?? 4;
    const v0    = q.v0  ?? 0;
    const maxT  = q.maxT ?? 5;
    const vMax  = v0 + accel * maxT;

    siGameStage.innerHTML = `
      <div class="interact-page">
        <p class="mod-q-meta theory-anim">Interaktiv · v-t-Diagramm live</p>
        <h3 class="interact-heading theory-anim">v-t-Diagramm in Echtzeit</h3>
        <p class="interact-sub theory-anim">Der Körper beschleunigt gleichmässig. Beobachte die <strong>konstante Steigung</strong> im v-t-Diagramm — das ist a!</p>
        <div class="interact-canvas-wrap theory-anim"><canvas id="ivt-cv" height="290"></canvas></div>
        <button class="si-jumpgame-button theory-anim" id="ivt-go" style="margin:1rem auto;display:block">▶ Animation starten</button>
        <p class="test-motion-feedback" id="ivt-fb"></p>
      </div>`;

    animateModuleTheory();

    const cv = document.getElementById('ivt-cv');
    cv.width = cv.parentElement?.offsetWidth || 560;
    const W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    const SPLIT = 104;
    const TL = 24, TR = W - 24, TW = TR - TL, TY = SPLIT / 2 + 8;
    const GP = { x0: 52, x1: W - 18, y0: SPLIT + 14, y1: H - 22 };
    GP.w = GP.x1 - GP.x0; GP.h = GP.y1 - GP.y0;
    const pts = [];

    const paintAll = (elapsed, finished) => {
      ctx.clearRect(0, 0, W, H);
      const elClamped = Math.min(elapsed, maxT);
      const currentV = v0 + accel * elClamped;

      // ── Track section ──
      ctx.fillStyle = '#2c3a4a'; ctx.fillRect(TL, TY - 18, TW, 36);
      ctx.setLineDash([12, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TL, TY); ctx.lineTo(TR, TY); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(TL - 1, TY - 20, 2, 40);
      for (let r = 0; r < 8; r++) {
        ctx.fillStyle = r % 2 ? '#333' : '#fff'; ctx.fillRect(TR - 2, TY - 20 + r * 5, 4, 5);
      }
      ctx.fillStyle = '#fff'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
      ctx.fillText('v₀=' + v0 + ' m/s', TL, TY - 22);
      ctx.textAlign = 'right'; ctx.fillStyle = '#4cffa0';
      ctx.fillText('a=' + accel + ' m/s²', TR, TY - 22); ctx.textAlign = 'left';

      // Car position (quadratic — s = v₀t + ½at²)
      const dist    = v0 * elClamped + 0.5 * accel * elClamped * elClamped;
      const maxDist = v0 * maxT      + 0.5 * accel * maxT      * maxT;
      const carFrac = Math.min(dist / (maxDist || 1), 1);
      const cx = TL + carFrac * TW;

      ctx.fillStyle = 'rgba(255,135,83,0.2)'; ctx.fillRect(TL, TY + 20, TW, 3);
      ctx.fillStyle = '#ff8753'; ctx.fillRect(TL, TY + 20, TW * carFrac, 3);
      ctx.beginPath(); ctx.roundRect(cx - 20, TY - 25, 40, 18, 5); ctx.fill();
      ctx.fillStyle = '#c85a1a'; ctx.beginPath(); ctx.roundRect(cx - 12, TY - 33, 24, 10, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath(); ctx.roundRect(cx - 9, TY - 31, 8, 7, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + 1, TY - 31, 8, 7, 2); ctx.fill();
      [cx - 12, cx + 12].forEach(wx => {
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, TY - 6, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(wx, TY - 6, 3, 0, Math.PI * 2); ctx.fill();
      });

      // Velocity readout
      if (elClamped > 0.05) {
        ctx.fillStyle = 'rgba(20,24,40,0.88)'; ctx.beginPath();
        ctx.roundRect(W / 2 - 64, 2, 128, 22, 4); ctx.fill();
        ctx.fillStyle = '#ff8753'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
        ctx.fillText('v = ' + currentV.toFixed(1) + ' m/s', W / 2, 17); ctx.textAlign = 'left';
      }

      // Divider
      ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0, SPLIT, W, 1);

      // Grid
      const steps = 5;
      ctx.setLineDash([3, 6]); ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
      for (let i = 1; i <= steps; i++) {
        const gx = GP.x0 + (GP.w / steps) * i;
        const gy = GP.y1 - (GP.h / steps) * i;
        ctx.beginPath(); ctx.moveTo(gx, GP.y0); ctx.lineTo(gx, GP.y1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(GP.x0, gy); ctx.lineTo(GP.x1, gy); ctx.stroke();
        ctx.fillStyle = '#4d6070'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText((maxT / steps * i).toFixed(1), gx, GP.y1 + 13);
        ctx.textAlign = 'right';
        ctx.fillText((vMax / steps * i).toFixed(1), GP.x0 - 3, GP.y1 - (GP.h / steps) * i + 4);
      }
      ctx.setLineDash([]); ctx.textAlign = 'left';

      // Axes
      ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(GP.x0, GP.y0 - 6); ctx.lineTo(GP.x0, GP.y1); ctx.lineTo(GP.x1 + 6, GP.y1); ctx.stroke();
      ctx.fillStyle = '#2d3a48'; ctx.font = '10px monospace';
      ctx.fillText('v (m/s)', GP.x0 - 50, GP.y0 + 4);
      ctx.fillText('t (s)', GP.x1 - 8, GP.y1 + 16);
      ctx.fillText('0', GP.x0 - 10, GP.y1 + 13);

      // Live v-t line
      if (pts.length > 1) {
        ctx.strokeStyle = '#ff8753'; ctx.lineWidth = 2.5; ctx.beginPath();
        pts.forEach(({ t: pt, v: pv }, i) => {
          const px = GP.x0 + (pt / maxT) * GP.w;
          const py = GP.y1 - ((pv - v0) / (vMax - v0 || 1)) * GP.h;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();
        const last = pts[pts.length - 1];
        const lx = GP.x0 + (last.t / maxT) * GP.w;
        const ly = GP.y1 - ((last.v - v0) / (vMax - v0 || 1)) * GP.h;
        ctx.fillStyle = '#ff8753'; ctx.beginPath(); ctx.arc(lx, ly, 5, 0, Math.PI * 2); ctx.fill();
      }

      // Slope annotation when done
      if (finished) {
        const ax = GP.x0 + GP.w * 0.08, ay = GP.y1 - GP.h * 0.08;
        const bx = GP.x0 + GP.w * 0.52, by = GP.y1 - GP.h * 0.52;
        ctx.strokeStyle = '#ffd164'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, ay); ctx.lineTo(bx, by); ctx.stroke();
        ctx.setLineDash([]);
        const labelW = 196;
        ctx.fillStyle = 'rgba(20,24,40,0.9)'; ctx.beginPath();
        ctx.roundRect(bx + 6, (ay + by) / 2 - 14, labelW, 22, 4); ctx.fill();
        ctx.fillStyle = '#ffd164'; ctx.font = 'bold 11px monospace';
        ctx.fillText('Steigung = Δv/Δt = ' + accel + ' m/s² = a', bx + 10, (ay + by) / 2 + 3);
      }
    };

    paintAll(0, false);
    const fb = document.getElementById('ivt-fb');
    let raf = null;

    document.getElementById('ivt-go').addEventListener('click', function () {
      if (raf) return;
      this.disabled = true; pts.length = 0;
      const t0 = performance.now();
      const loop = (now) => {
        const el = (now - t0) / 1000;
        pts.push({ t: Math.min(el, maxT), v: v0 + accel * Math.min(el, maxT) });
        const done = el >= maxT;
        paintAll(el, done);
        if (!done) { raf = requestAnimationFrame(loop); }
        else {
          raf = null;
          fb.className = 'test-motion-feedback is-correct';
          fb.textContent = 'Steigung = Δv/Δt = ' + vMax.toFixed(1) + '/' + maxT + ' = ' + accel + ' m/s²  →  Das ist die Beschleunigung a!';
          if (q.followUp?.length) setTimeout(() => runMCEngine(q.followUp, onComplete), 2000);
          else setTimeout(() => onComplete?.(), 2400);
        }
      };
      raf = requestAnimationFrame(loop);
    });
  };

  const renderModuleGame = (step) => {
    if (!(siGameStage instanceof HTMLElement) || !step) return;
    stopModuleGame();
    stopSIUnitsJumpGame(); stopTestMotionGame(); stopCatchUpGame();
    stopAccelerationGame(); stopSprintGame(); stopFreeFallGame();
    stopBrakingGame(); stopDistanceAccGame();

    // Enrich step with STEP_CONTENT data
    const enriched = getStepContent(step);

    if (!enriched.theory && !enriched.question) {
      renderGenericGame(step); return;
    }

    step = enriched;

    const startQuestion = () => {
      stopModuleGame();
      if (!step.question) { showModuleComplete(step); return; }
      const q = step.question;
      const done = () => showModuleComplete(step);

      // Interactive engines bypass the difficulty picker
      if (q.type === "speed-lab") { runSpeedLabEngine(q, done); return; }
      if (q.type === "race")      { runRaceEngine(q, done);      return; }
      if (q.type === "st-live")   { runSTLiveEngine(q, done);    return; }
      if (q.type === "accel-lab") { runAccelLabEngine(q, done);  return; }
      if (q.type === "vt-live")   { runVTLiveEngine(q, done);    return; }

      const runQ = (tasks) => {
        if (q.type === "mc") {
          runMCEngine(tasks, done);
        } else if (q.type === "calc") {
          runCalcEngine(tasks, q.config, done);
        } else if (q.type === "chart") {
          runChartEngine(q.chartConfig, tasks, done);
        } else if (q.type === "matter") {
          runMatterEngine(q.scene, tasks, done);
        } else {
          showModuleComplete(step);
        }
      };

      if (q.basis && q.challenge) {
        showDifficultyPicker(q, runQ);
      } else {
        runQ(q.tasks || []);
      }
    };

    showModuleTheory(step, startQuestion);
  };


  const renderGenericGame = (step) => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.innerHTML = `
      <p class="si-game-placeholder">${step.title} Spiel startet hier als nächstes.</p>
    `;
  };

  const renderSIUnitsTutorial = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    siGameStage.innerHTML = `
      <section class="si-tutorial">
        <header class="si-tutorial-head">
          <h3 class="si-tutorial-title">Tutorial: SI-Einheiten Jump Game</h3>
          <p class="si-tutorial-subtitle">Lerne zuerst kurz die Steuerung und den Lösungsweg. Danach startet das Spiel.</p>
        </header>
        <section class="si-tutorial-grid">
          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">1) Bewegung</p>
            <div class="si-tutorial-demo si-tutorial-demo-move" aria-hidden="true">
              <div class="si-tutorial-ground"></div>
              <div class="si-tutorial-player"></div>
              <div class="si-tutorial-keys">
                <span>A</span>
                <span>D</span>
              </div>
            </div>
            <p class="si-tutorial-text">Mit <strong>A/D</strong> oder <strong>←/→</strong> läufst du nach links/rechts.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">2) Springen + Boost</p>
            <div class="si-tutorial-demo si-tutorial-demo-jump" aria-hidden="true">
              <div class="si-tutorial-ground"></div>
              <div class="si-tutorial-player"></div>
              <div class="si-tutorial-space">SPACE ×5</div>
            </div>
            <p class="si-tutorial-text"><strong>Space</strong> springt. In der Luft kannst du bis zu <strong>5x</strong> boosten.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">3) Slider steuern</p>
            <div class="si-tutorial-demo si-tutorial-demo-slider" aria-hidden="true">
              <div class="si-tutorial-track">
                <span>km</span><span>m</span><span>cm</span>
                <div class="si-tutorial-platform"></div>
              </div>
              <div class="si-tutorial-readout">Länge: \\(10\\,\\mathrm{cm}\\)</div>
            </div>
            <p class="si-tutorial-text">Lande auf einer Plattform. Dann verschieben <strong>←/→</strong> genau diesen Slider.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">4) Aufgabe lösen</p>
            <div class="si-tutorial-demo si-tutorial-demo-solve" aria-hidden="true">
              <p class="si-tutorial-question">Beispiel: \\(10\\,\\mathrm{cm}\\)</p>
              <ol class="si-tutorial-mini-steps">
                <li>Skalar auf <strong>10</strong></li>
                <li>Länge auf <strong>cm</strong></li>
                <li><strong>Prüfen</strong> drücken</li>
              </ol>
            </div>
            <p class="si-tutorial-text">Masse und Zeit bleiben auf der Mitte, wenn sie in der Frage nicht vorkommen.</p>
          </article>
        </section>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="si-tutorial-skip">Tutorial überspringen</button>
          <button class="si-jumpgame-button" type="button" id="si-tutorial-start">Spiel starten</button>
        </div>
      </section>
    `;

    const startButton = siGameStage.querySelector("#si-tutorial-start");
    if (startButton instanceof HTMLButtonElement) {
      startButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    const skipButton = siGameStage.querySelector("#si-tutorial-skip");
    if (skipButton instanceof HTMLButtonElement) {
      skipButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    queueSIJumpTypeset();
  };

  const formatNumber = (value, maximumFractionDigits = 2) =>
    new Intl.NumberFormat("de-DE", {
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(value);

  const unitToLatex = (unit) => unit.replace("µ", "\\mu ");
  const SI_BASE_UNITS = {
    length: "m",
    time: "s",
    mass: "g",
  };
  const SI_PREFIX_EXPONENTS = {
    length: {
      km: 3,
      hm: 2,
      dam: 1,
      m: 0,
      dm: -1,
      cm: -2,
      mm: -3,
      "µm": -6,
      nm: -9,
    },
    time: {
      ks: 3,
      hs: 2,
      das: 1,
      s: 0,
      ds: -1,
      cs: -2,
      ms: -3,
      "µs": -6,
      ns: -9,
    },
    mass: {
      Pg: 15,
      Tg: 12,
      Gg: 9,
      Mg: 6,
      kg: 3,
      g: 0,
      mg: -3,
      "µg": -6,
      ng: -9,
    },
  };

  const queueSIJumpTypeset = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    if (siJumpState.mathTimer) {
      window.clearTimeout(siJumpState.mathTimer);
    }

    siJumpState.mathTimer = window.setTimeout(() => {
      const mathJax = window.MathJax;
      if (mathJax && typeof mathJax.typesetPromise === "function") {
        mathJax.typesetPromise([siGameStage]).catch(() => {
          // Keep interaction smooth even if one typeset call fails.
        });
      }
    }, 16);
  };

  const SI_GROUND_BOTTOM = 17;
  const SI_GROUND_HEIGHT = 14;
  const SI_MAX_AIR_BOOSTS = 5;

  const getSliderById = (sliderId) =>
    siJumpState.sliders.find((slider) => slider.id === sliderId) || null;

  const getSliderCurrentValue = (sliderId) => {
    const slider = getSliderById(sliderId);
    if (!slider) {
      return null;
    }
    return slider.values[slider.index];
  };

  const measureSliderGeometry = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const worldRect = siJumpState.worldEl.getBoundingClientRect();
    siJumpState.sliders.forEach((slider) => {
      if (!(slider.trackEl instanceof HTMLElement) || !(slider.platformEl instanceof HTMLElement)) {
        return;
      }
      const trackRect = slider.trackEl.getBoundingClientRect();
      const platformRect = slider.platformEl.getBoundingClientRect();
      slider.geom.x1 = trackRect.left - worldRect.left;
      slider.geom.x2 = trackRect.right - worldRect.left;
      slider.geom.y = trackRect.top - worldRect.top;
      slider.geom.px1 = platformRect.left - worldRect.left;
      slider.geom.px2 = platformRect.right - worldRect.left;
      slider.geom.py = platformRect.top - worldRect.top;
    });
  };

  const getSliderPlatformCenterX = (slider) => {
    if (!slider) {
      return 0;
    }
    return slider.geom.px1 + (slider.geom.px2 - slider.geom.px1) * 0.5;
  };

  const updateSliderKnobVisuals = () => {
    siJumpState.sliders.forEach((slider) => {
      if (!(slider.platformEl instanceof HTMLElement)) {
        return;
      }
      const span = Math.max(1, slider.values.length - 1);
      const ratio = slider.index / span;
      slider.platformEl.style.left = `${ratio * 100}%`;
    });
  };

  const updateSIJumpReadouts = () => {
    const scalarCurrent = Number(getSliderCurrentValue("scalar") ?? 0);
    const scalarShown = `${scalarCurrent}`;

    siJumpState.sliders.forEach((slider) => {
      const valueEl = siJumpState.readoutEls.get(slider.id);
      if (!(valueEl instanceof HTMLElement)) {
        return;
      }

      const value = slider.values[slider.index];
      if (slider.isScalar) {
        const shown = value > 0 ? `+${value}` : `${value}`;
        valueEl.innerHTML = `<span class="si-jump-readout-main">\\(s = ${shown}\\)</span>`;
      } else {
        const unit = String(value);
        const exponent = SI_PREFIX_EXPONENTS[slider.id]?.[unit];
        const baseUnit = SI_BASE_UNITS[slider.id] || unit;

        if (typeof exponent === "number") {
          const formulaLine = `\\(${scalarShown}\\cdot10^{${exponent}}\\,\\mathrm{${unitToLatex(baseUnit)}}\\)`;
          valueEl.innerHTML = `<span class="si-jump-readout-main">${formulaLine}</span>`;
        } else {
          valueEl.innerHTML = `<span class="si-jump-readout-main">\\(${scalarShown}\\,\\mathrm{${unitToLatex(baseUnit)}}\\)</span>`;
        }
      }
    });
    queueSIJumpTypeset();
  };

  const updateActiveReadoutHighlight = () => {
    siJumpState.readoutCardEls.forEach((cardEl, sliderId) => {
      if (!(cardEl instanceof HTMLElement)) {
        return;
      }
      cardEl.classList.toggle("is-active", sliderId === siJumpState.activeSliderId);
    });
  };

  const setActiveSlider = (sliderId) => {
    siJumpState.activeSliderId = sliderId;
    updateActiveReadoutHighlight();
  };

  const pulseReadout = (sliderId) => {
    const cardEl = siJumpState.readoutCardEls.get(sliderId);
    if (!(cardEl instanceof HTMLElement)) {
      return;
    }

    const existingTimer = siJumpState.readoutPulseTimers.get(sliderId);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    cardEl.classList.remove("is-pulse");
    void cardEl.offsetWidth;
    cardEl.classList.add("is-pulse");

    const timer = window.setTimeout(() => {
      cardEl.classList.remove("is-pulse");
    }, 260);
    siJumpState.readoutPulseTimers.set(sliderId, timer);
  };

  const buildSIJumpWorldMarkup = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    const readouts = SI_AIR_SLIDERS.map(
      (slider) => {
        const icon = SI_READOUT_ICONS[slider.id] || "⚙️";
        return `
        <article class="si-jump-readout" data-readout-card="${slider.id}">
          <p class="si-jump-readout-title">
            <span class="si-jump-readout-icon" aria-hidden="true">${icon}</span>
            <span>${slider.label}</span>
          </p>
          <p class="si-jump-readout-value" data-readout-id="${slider.id}"></p>
        </article>
      `;
      },
    ).join("");

    const sliderLines = SI_AIR_SLIDERS.map((slider) => {
      const icon = SI_READOUT_ICONS[slider.id] || "⚙️";
      const span = Math.max(1, slider.values.length - 1);
      const baseRatio = (slider.baseIndex / span) * 100;
      const centerLabel = slider.isScalar ? "Mitte: 0" : `Mitte: ${slider.baseValue}`;
      const tickMarkup = slider.values
        .map((entry, index) => {
          const ratio = (index / span) * 100;
          const label = slider.isScalar ? (Number(entry) % 5 === 0 ? `${entry}` : "") : `${entry}`;
          return `
            <span class="si-air-tick" style="left:${ratio}%">
              <span class="si-air-tick-mark"></span>
              ${label ? `<span class="si-air-tick-label">${label}</span>` : ""}
            </span>
          `;
        })
        .join("");

      return `
        <div class="si-air-slider" data-slider-id="${slider.id}">
          <div class="si-air-slider-head">
            <span class="si-air-slider-label">
              <span class="si-air-slider-icon" aria-hidden="true">${icon}</span>
              <span>${slider.label}</span>
            </span>
            <span>${centerLabel}</span>
          </div>
          <div class="si-air-track" data-slider-track="${slider.id}">
            <span class="si-air-track-center" style="left:${baseRatio}%"></span>
            <span class="si-air-platform" data-slider-platform="${slider.id}"></span>
          </div>
          <div class="si-air-ticks">
            ${tickMarkup}
          </div>
        </div>
      `;
    }).join("");

    siGameStage.innerHTML = `
      <section class="si-jumpgame">
        <header class="si-jumpgame-top">
          <p class="si-jumpgame-question" id="si-jump-question"></p>
          <p class="si-jumpgame-stat" id="si-jump-stat"></p>
        </header>
        <section class="si-jumpgame-readouts" id="si-jump-readouts">
          ${readouts}
        </section>
        <p class="si-jumpgame-feedback" id="si-jump-feedback"></p>
        <div class="si-jumpgame-actions">
          <button class="si-jumpgame-button" type="button" id="si-jump-check">Prüfen</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-next" disabled>Nächste Frage</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-reset">Neu starten</button>
        </div>
        <div class="si-jumpgame-world" id="si-jump-world">
          <div class="si-jump-ground"></div>
          ${sliderLines}
          <div class="si-jump-player" id="si-jump-player"></div>
        </div>
        <p class="si-jumpgame-help">A/D oder ←/→ bewegen. Space springt und gibt in der Luft bis zu 5x Boost. Auf einer Slider-Linie verschieben ←/→ den Slider. Mit Q/E bewegst du dich auf der Plattform, ohne den Slider zu ändern. Space springt heraus.</p>
      </section>
    `;
  };

  const initSIJumpDomRefs = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siJumpState.worldEl = siGameStage.querySelector("#si-jump-world");
    siJumpState.playerEl = siGameStage.querySelector("#si-jump-player");
    siJumpState.questionEl = siGameStage.querySelector("#si-jump-question");
    siJumpState.statEl = siGameStage.querySelector("#si-jump-stat");
    siJumpState.feedbackEl = siGameStage.querySelector("#si-jump-feedback");
    siJumpState.checkButton = siGameStage.querySelector("#si-jump-check");
    siJumpState.nextButton = siGameStage.querySelector("#si-jump-next");
    siJumpState.restartButton = siGameStage.querySelector("#si-jump-reset");
    siJumpState.readoutContainer = siGameStage.querySelector("#si-jump-readouts");
    siJumpState.readoutEls = new Map(
      Array.from(siGameStage.querySelectorAll("[data-readout-id]")).map((entry) => [
        entry.getAttribute("data-readout-id"),
        entry,
      ]),
    );
    siJumpState.readoutCardEls = new Map(
      Array.from(siGameStage.querySelectorAll("[data-readout-card]")).map((entry) => [
        entry.getAttribute("data-readout-card"),
        entry,
      ]),
    );

    siJumpState.sliders = SI_AIR_SLIDERS.map((slider) => ({
      ...slider,
      index: slider.baseIndex,
      wrapperEl: siGameStage.querySelector(`[data-slider-id="${slider.id}"]`),
      trackEl: siGameStage.querySelector(`[data-slider-track="${slider.id}"]`),
      platformEl: siGameStage.querySelector(`[data-slider-platform="${slider.id}"]`),
      geom: { x1: 0, x2: 0, y: 0, px1: 0, px2: 0, py: 0 },
    }));
  };

  const layoutSIJumpWorld = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const worldHeight = siJumpState.worldEl.clientHeight;
    const topGap = Math.max(44, worldHeight * 0.12);
    const stepGap = Math.max(52, worldHeight * 0.16);

    siJumpState.sliders.forEach((slider, index) => {
      if (slider.wrapperEl instanceof HTMLElement) {
        slider.wrapperEl.style.top = `${topGap + index * stepGap}px`;
      }
    });
    measureSliderGeometry();
    updateSliderKnobVisuals();
  };

  const updateSIJumpQuestion = () => {
    const question = SI_JUMP_QUESTIONS[siJumpState.questionIndex];
    if (!question) {
      return;
    }

    if (siJumpState.questionEl instanceof HTMLElement) {
      siJumpState.questionEl.textContent = question.text;
    }
    if (siJumpState.statEl instanceof HTMLElement) {
      siJumpState.statEl.textContent = `Frage ${siJumpState.questionIndex + 1}/${SI_JUMP_QUESTIONS.length} | Punkte ${siJumpState.score}`;
    }
    if (siJumpState.feedbackEl instanceof HTMLElement) {
      siJumpState.feedbackEl.classList.remove("is-good", "is-warn");
      siJumpState.feedbackEl.textContent = "Stelle die Slider passend ein und drücke dann Prüfen.";
    }
    if (siJumpState.nextButton instanceof HTMLButtonElement) {
      siJumpState.nextButton.disabled = true;
      siJumpState.nextButton.textContent = "Nächste Frage";
    }
    if (siJumpState.checkButton instanceof HTMLButtonElement) {
      siJumpState.checkButton.disabled = false;
    }
    siJumpState.questionSolved = false;
    queueSIJumpTypeset();
  };

  const renderSIJumpCompletion = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    const maxScore = SI_JUMP_QUESTIONS.length;
    const percent = Math.round((siJumpState.score / maxScore) * 100);
    const summary =
      percent >= 90
        ? "Stark. Du hast sehr gutes Einheitengefühl."
        : percent >= 60
          ? "Gute Basis. Noch eine Runde macht es stabiler."
          : "Guter Start. Spiele die Runde noch einmal für mehr Sicherheit.";

    siGameStage.innerHTML = `
      <section class="si-jump-complete">
        <h3 class="si-jump-complete-title">Runde abgeschlossen</h3>
        <p class="si-jump-complete-text">Punkte: <strong>${siJumpState.score}/${maxScore}</strong> (${percent}%).</p>
        <p class="si-jump-complete-text">${summary}</p>
        <div class="si-jumpgame-actions">
          <button class="si-jumpgame-button" type="button" id="si-jump-restart-final">Nochmal spielen</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-back-final">Zum Pfad</button>
        </div>
      </section>
    `;

    const restartButton = siGameStage.querySelector("#si-jump-restart-final");
    if (restartButton instanceof HTMLButtonElement) {
      restartButton.addEventListener("click", () => {
        renderSIUnitsTutorial();
      });
    }
    const backButton = siGameStage.querySelector("#si-jump-back-final");
    if (backButton instanceof HTMLButtonElement) {
      backButton.addEventListener("click", () => {
        closeSIGame();
      });
    }
  };

  const checkSIJumpQuestion = () => {
    const question = SI_JUMP_QUESTIONS[siJumpState.questionIndex];
    if (!question || siJumpState.questionSolved) {
      return;
    }

    const mismatches = [];
    Object.entries(question.targets).forEach(([sliderId, expected]) => {
      const current = getSliderCurrentValue(sliderId);
      if (current === expected) {
        return;
      }

      if (sliderId === "scalar") {
        mismatches.push(`Skalar: ${current} statt ${expected}`);
      } else {
        const label = SI_AIR_SLIDERS.find((slider) => slider.id === sliderId)?.label || sliderId;
        mismatches.push(`${label}: ${current} statt ${expected}`);
      }
    });

    if (mismatches.length === 0) {
      siJumpState.questionSolved = true;
      siJumpState.score += 1;
      if (siJumpState.feedbackEl instanceof HTMLElement) {
        siJumpState.feedbackEl.classList.remove("is-warn");
        siJumpState.feedbackEl.classList.add("is-good");
        siJumpState.feedbackEl.textContent = "Richtig. Sehr gut eingestellt.";
      }
      if (siJumpState.statEl instanceof HTMLElement) {
        siJumpState.statEl.textContent = `Frage ${siJumpState.questionIndex + 1}/${SI_JUMP_QUESTIONS.length} | Punkte ${siJumpState.score}`;
      }
      if (siJumpState.nextButton instanceof HTMLButtonElement) {
        siJumpState.nextButton.disabled = false;
        siJumpState.nextButton.textContent =
          siJumpState.questionIndex >= SI_JUMP_QUESTIONS.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
      }
      if (siJumpState.checkButton instanceof HTMLButtonElement) {
        siJumpState.checkButton.disabled = true;
      }
      return;
    }

    if (siJumpState.feedbackEl instanceof HTMLElement) {
      siJumpState.feedbackEl.classList.remove("is-good");
      siJumpState.feedbackEl.classList.add("is-warn");
      siJumpState.feedbackEl.textContent = `Noch nicht passend: ${mismatches.join(" | ")}`;
    }
  };

  const goToNextSIJumpQuestion = () => {
    if (!siJumpState.questionSolved) {
      return;
    }

    siJumpState.questionIndex += 1;
    if (siJumpState.questionIndex >= SI_JUMP_QUESTIONS.length) {
      stopSIUnitsJumpGame();
      renderSIJumpCompletion();
      return;
    }
    updateSIJumpQuestion();
  };

  const shiftActiveSlider = (step) => {
    const slider = getSliderById(siJumpState.activeSliderId);
    if (!slider) {
      return;
    }
    const maxIndex = slider.values.length - 1;
    const nextIndex = Math.max(0, Math.min(maxIndex, slider.index + step));
    if (nextIndex === slider.index) {
      return;
    }
    slider.index = nextIndex;
    updateSliderKnobVisuals();
    updateSIJumpReadouts();
    pulseReadout(slider.id);
  };

  const updateSIJumpPlayerVisual = () => {
    if (!(siJumpState.playerEl instanceof HTMLElement)) {
      return;
    }
    siJumpState.playerEl.style.transform = `translate(${siJumpState.player.x}px, ${siJumpState.player.y}px)`;
  };

  const jumpFromSurface = () => {
    setActiveSlider(null);
    siJumpState.platformOffsetX = 0;
    siJumpState.player.vy = -12.8;
    siJumpState.player.y -= 1;
    siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
  };

  const applySIJumpPhysics = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const player = siJumpState.player;
    const worldWidth = siJumpState.worldEl.clientWidth;
    const worldHeight = siJumpState.worldEl.clientHeight;
    siJumpState.groundY = worldHeight - SI_GROUND_BOTTOM - SI_GROUND_HEIGHT;
    const groundY = siJumpState.groundY;

    const activeSlider = getSliderById(siJumpState.activeSliderId);
    if (activeSlider) {
      const now = performance.now();
      if (now - siJumpState.lastSliderStepAt > 92) {
        if (siJumpState.keys.left) {
          shiftActiveSlider(-1);
          siJumpState.lastSliderStepAt = now;
        } else if (siJumpState.keys.right) {
          shiftActiveSlider(1);
          siJumpState.lastSliderStepAt = now;
        }
      }

      const platformCenterX = getSliderPlatformCenterX(activeSlider);
      const platformWidth = Math.max(0, activeSlider.geom.px2 - activeSlider.geom.px1);
      const maxOffset = Math.max(0, (platformWidth - player.w) * 0.5);
      const platformWalk = (siJumpState.keys.e ? 1 : 0) - (siJumpState.keys.q ? 1 : 0);
      if (platformWalk !== 0) {
        siJumpState.platformOffsetX += platformWalk * 2.6;
      }
      siJumpState.platformOffsetX = Math.max(-maxOffset, Math.min(maxOffset, siJumpState.platformOffsetX));
      player.x = platformCenterX + siJumpState.platformOffsetX - player.w / 2;
      player.y = activeSlider.geom.py - player.h;
      player.vx = 0;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;

      if (siJumpState.jumpQueued) {
        jumpFromSurface();
      }

      updateSIJumpPlayerVisual();
      siJumpState.jumpQueued = false;
      return;
    }

    const targetVx = ((siJumpState.keys.right ? 1 : 0) - (siJumpState.keys.left ? 1 : 0)) * 4.2;
    player.vx += (targetVx - player.vx) * 0.24;
    if (Math.abs(player.vx) < 0.04 && targetVx === 0) {
      player.vx = 0;
    }

    const previousBottom = player.y + player.h;
    player.x += player.vx;
    player.vy += 0.72;
    player.y += player.vy;

    if (player.x < 0) {
      player.x = 0;
    }
    if (player.x + player.w > worldWidth) {
      player.x = worldWidth - player.w;
    }

    let landedSlider = null;
    if (player.vy >= 0) {
      const centerX = player.x + player.w * 0.5;
      for (const slider of siJumpState.sliders) {
        if (!slider.geom) {
          continue;
        }
        const currentBottom = player.y + player.h;
        const hitsY = previousBottom <= slider.geom.py && currentBottom >= slider.geom.py;
        const hitsX = centerX >= slider.geom.px1 && centerX <= slider.geom.px2;
        if (hitsY && hitsX) {
          if (!landedSlider || slider.geom.py < landedSlider.geom.py) {
            landedSlider = slider;
          }
        }
      }
    }

    if (landedSlider) {
      setActiveSlider(landedSlider.id);
      const platformCenterX = getSliderPlatformCenterX(landedSlider);
      const minX = landedSlider.geom.px1;
      const maxX = landedSlider.geom.px2 - player.w;
      player.x = Math.max(minX, Math.min(maxX, player.x));
      siJumpState.platformOffsetX = player.x + player.w * 0.5 - platformCenterX;
      player.y = landedSlider.geom.py - player.h;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    } else if (player.y + player.h >= groundY) {
      setActiveSlider(null);
      siJumpState.platformOffsetX = 0;
      player.y = groundY - player.h;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    }

    const onGround = player.y + player.h >= groundY - 0.1 && player.vy === 0;
    if (siJumpState.jumpQueued) {
      if (onGround) {
        jumpFromSurface();
      } else if (siJumpState.airBoostsLeft > 0) {
        player.vy = -10.9;
        siJumpState.airBoostsLeft -= 1;
      }
    }

    updateSIJumpPlayerVisual();
    siJumpState.jumpQueued = false;
  };

  const stepSIJumpFrame = () => {
    if (!siJumpState.running) {
      return;
    }

    measureSliderGeometry();
    applySIJumpPhysics();
    siJumpState.rafId = window.requestAnimationFrame(stepSIJumpFrame);
  };

  const startSIUnitsJumpGame = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    buildSIJumpWorldMarkup();
    initSIJumpDomRefs();
    layoutSIJumpWorld();

    siJumpState.questionIndex = 0;
    siJumpState.score = 0;
    siJumpState.questionSolved = false;
    setActiveSlider(null);
    siJumpState.keys.left = false;
    siJumpState.keys.right = false;
    siJumpState.keys.q = false;
    siJumpState.keys.e = false;
    siJumpState.jumpQueued = false;
    siJumpState.platformOffsetX = 0;
    siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    siJumpState.player.x = 72;
    siJumpState.player.vx = 0;
    siJumpState.player.vy = 0;
    siJumpState.groundY =
      siJumpState.worldEl instanceof HTMLElement
        ? siJumpState.worldEl.clientHeight - SI_GROUND_BOTTOM - SI_GROUND_HEIGHT
        : 0;
    siJumpState.player.y = siJumpState.groundY - siJumpState.player.h;

    siJumpState.sliders.forEach((slider) => {
      slider.index = slider.baseIndex;
    });
    updateSliderKnobVisuals();
    updateSIJumpReadouts();
    updateSIJumpQuestion();
    updateSIJumpPlayerVisual();

    if (siJumpState.checkButton instanceof HTMLButtonElement) {
      siJumpState.checkButton.addEventListener("click", () => {
        checkSIJumpQuestion();
      });
    }
    if (siJumpState.nextButton instanceof HTMLButtonElement) {
      siJumpState.nextButton.addEventListener("click", () => {
        goToNextSIJumpQuestion();
      });
    }
    if (siJumpState.restartButton instanceof HTMLButtonElement) {
      siJumpState.restartButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    siJumpState.running = true;
    siJumpState.rafId = window.requestAnimationFrame(stepSIJumpFrame);
  };

  const stopSIUnitsJumpGame = () => {
    siJumpState.running = false;
    if (siJumpState.rafId) {
      window.cancelAnimationFrame(siJumpState.rafId);
      siJumpState.rafId = 0;
    }
    if (siJumpState.mathTimer) {
      window.clearTimeout(siJumpState.mathTimer);
      siJumpState.mathTimer = 0;
    }
    siJumpState.keys.left = false;
    siJumpState.keys.right = false;
    siJumpState.keys.q = false;
    siJumpState.keys.e = false;
    siJumpState.jumpQueued = false;
    siJumpState.platformOffsetX = 0;
    setActiveSlider(null);
    siJumpState.readoutPulseTimers.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    siJumpState.readoutPulseTimers.clear();
    siJumpState.readoutCardEls.forEach((cardEl) => {
      if (cardEl instanceof HTMLElement) {
        cardEl.classList.remove("is-pulse", "is-active");
      }
    });
  };

  const handleSIJumpKeyDown = (event) => {
    if (!siJumpState.running) {
      return;
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      siJumpState.keys.left = true;
      event.preventDefault();
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      siJumpState.keys.right = true;
      event.preventDefault();
      return;
    }
    if (event.code === "KeyQ") {
      siJumpState.keys.q = true;
      event.preventDefault();
      return;
    }
    if (event.code === "KeyE") {
      siJumpState.keys.e = true;
      event.preventDefault();
      return;
    }
    if (event.code === "Space") {
      if (!event.repeat) {
        siJumpState.jumpQueued = true;
      }
      event.preventDefault();
    }
  };

  const handleSIJumpKeyUp = (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      siJumpState.keys.left = false;
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      siJumpState.keys.right = false;
      return;
    }
    if (event.code === "KeyQ") {
      siJumpState.keys.q = false;
      return;
    }
    if (event.code === "KeyE") {
      siJumpState.keys.e = false;
    }
  };

  window.addEventListener("keydown", handleSIJumpKeyDown);
  window.addEventListener("keyup", handleSIJumpKeyUp);

  const typesetSidePanelMath = () => {
    if (!(siSideContent instanceof HTMLElement)) {
      return;
    }

    const mathJax = window.MathJax;
    if (mathJax && typeof mathJax.typesetPromise === "function") {
      mathJax.typesetPromise([siSideContent]).catch(() => {
        // Keep UI responsive even if math rendering fails once.
      });
    }
  };

  const renderSidePanel = (moduleId, step) => {
    if (!(siSideContent instanceof HTMLElement) || !step) {
      return;
    }

    const isSIUnits = moduleId === "0" && step.title === "SI-Einheiten";
    const isTestUniformMotion = moduleId === "TEST" && step.title === "Gleichförmige Bewegung";
    const isCatchUpMotion = moduleId === "TEST" && step.title === "Aufholen";
    const isAccelerationMotion = moduleId === "TEST" && step.title === "Beschleunigung";
    const isSprintScanner = moduleId === "TEST" && step.title === "K1 – Sprint-Scanner";
    const isOvertakeDuel = moduleId === "TEST" && step.title === "K2 – Überhol-Duell";

    if (isTestUniformMotion) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Theorie</strong></h3>
          <p class="side-text">Bei der gleichförmigen Bewegung bleibt die Geschwindigkeit konstant. Die Beschleunigung ist \\(a=0\\).</p>
          <p class="side-eq">\\[s = v \\cdot t\\]</p>
          <p class="side-text">Dabei ist \\(s\\) die Strecke, \\(v\\) die Geschwindigkeit und \\(t\\) die Zeit.</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Interaktive Idee</strong></h3>
          <p class="side-text">Das Auto fährt auf einer geraden Strecke. Jeder Kasten im Hintergrund entspricht 5 Metern.</p>
          <p class="side-text">Mit den Slidern stellst du Geschwindigkeit und Zeit in 0.5er-Schritten ein. Die Bewegung gleitet leicht nach, damit man die Änderung sieht.</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isCatchUpMotion) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Theorie</strong></h3>
          <p class="side-text">Beim Aufholen zählt, wie schnell der Abstand kleiner wird.</p>
          <p class="side-eq">\\[\\Delta v = v_{schnell} - v_{langsam}\\]</p>
          <p class="side-eq">\\[t = \\frac{\\text{Vorsprung}}{\\Delta v}\\]</p>
          <p class="side-text">Wenn du 2 m/s schneller bist, wird der Abstand jede Sekunde um 2 m kleiner.</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Interaktive Idee</strong></h3>
          <p class="side-text">Ein Auto und ein Mensch bewegen sich auf parallelen Linien. Mit dem Zeit-Slider kannst du beobachten, wann beide auf gleicher Höhe sind.</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isAccelerationMotion) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Theorie</strong></h3>
          <p class="side-text">Bei gleichmäßig beschleunigter Bewegung bleibt die Beschleunigung konstant.</p>
          <p class="side-eq">\\[v = a \\cdot t\\]</p>
          <p class="side-eq">\\[s = \\frac{1}{2} a t^2\\]</p>
          <p class="side-text">Diese Aufgabe fragt nur nach der Geschwindigkeit, also brauchst du hier \\(v = a \\cdot t\\).</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Interaktive Idee</strong></h3>
          <p class="side-text">Die Rakete startet aus der Ruhe. Mit den Slidern siehst du, wie Beschleunigung und Zeit die Geschwindigkeit verändern.</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isSprintScanner) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Theorie</strong></h3>
          <p class="side-text">Die mittlere Geschwindigkeit sagt, wie schnell etwas im Durchschnitt war.</p>
          <p class="side-eq">\\[v = \\frac{s}{t}\\]</p>
          <p class="side-text">Für den 100-m-Sprint teilst du die Strecke durch die gemessene Zeit.</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Einbau ins Spiel</strong></h3>
          <p class="side-text">Nach dem Zieleinlauf erscheint ein Tacho. Der Spieler berechnet, welche Anzeige korrekt ist.</p>
          <p class="side-text">Bonuswissen: \\(1\\,\\mathrm{m/s}=3{,}6\\,\\mathrm{km/h}\\).</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isOvertakeDuel) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Theorie</strong></h3>
          <p class="side-text">Beim Überholen zählt die Relativgeschwindigkeit: Wie viel schneller ist das hintere Fahrzeug?</p>
          <p class="side-eq">\\[\\Delta v = v_{schnell} - v_{langsam}\\]</p>
          <p class="side-eq">\\[t = \\frac{\\text{Abstand}}{\\Delta v}\\]</p>
          <p class="side-text">Hier ist \\(\\Delta v = 30 - 20 = 10\\,\\mathrm{m/s}\\).</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Einbau ins Spiel</strong></h3>
          <p class="side-text">Der Spieler entscheidet, ob das Überholmanöver vor einer Kurve möglich ist. Die Simulation zeigt, wann beide Fahrzeuge gleichauf sind.</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isSIUnits) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>1) SI-Basiseinheiten</strong></h3>
          <div class="side-si-base-list" aria-label="SI Basiseinheiten">
            <div class="side-si-base-item" style="--item-delay: 0s;">
              <span class="side-si-base-name">Länge</span>
              <span class="side-si-base-unit">\\(\\mathrm{m}\\) (Meter)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.07s;">
              <span class="side-si-base-name">Masse</span>
              <span class="side-si-base-unit">\\(\\mathrm{kg}\\) (Kilogramm)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.14s;">
              <span class="side-si-base-name">Zeit</span>
              <span class="side-si-base-unit">\\(\\mathrm{s}\\) (Sekunde)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.21s;">
              <span class="side-si-base-name">Stromstärke</span>
              <span class="side-si-base-unit">\\(\\mathrm{A}\\) (Ampere)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.28s;">
              <span class="side-si-base-name">Temperatur</span>
              <span class="side-si-base-unit">\\(\\mathrm{K}\\) (Kelvin)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.35s;">
              <span class="side-si-base-name">Stoffmenge</span>
              <span class="side-si-base-unit">\\(\\mathrm{mol}\\) (Mol)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.42s;">
              <span class="side-si-base-name">Lichtstärke</span>
              <span class="side-si-base-unit">\\(\\mathrm{cd}\\) (Candela)</span>
            </div>
          </div>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>2) Präfixe = Potenzen von 10</strong></h3>
          <p class="side-text">Jedes Präfix bedeutet einen festen Faktor \\(10^n\\).</p>
          <div class="side-prefix-grid" aria-hidden="true">
            <div class="side-prefix-item" style="--prefix-delay: 0s;">
              <span class="side-prefix-symbol">k</span>
              <span class="side-prefix-name">kilo</span>
              <span class="side-prefix-power">\\(10^3\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.08s;">
              <span class="side-prefix-symbol">h</span>
              <span class="side-prefix-name">hekto</span>
              <span class="side-prefix-power">\\(10^2\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.16s;">
              <span class="side-prefix-symbol">da</span>
              <span class="side-prefix-name">deka</span>
              <span class="side-prefix-power">\\(10^1\\)</span>
            </div>
            <div class="side-prefix-item side-prefix-item-base" style="--prefix-delay: 0.24s;">
              <span class="side-prefix-symbol">-</span>
              <span class="side-prefix-name">Basis</span>
              <span class="side-prefix-power">\\(10^0\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.32s;">
              <span class="side-prefix-symbol">d</span>
              <span class="side-prefix-name">dezi</span>
              <span class="side-prefix-power">\\(10^{-1}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.4s;">
              <span class="side-prefix-symbol">c</span>
              <span class="side-prefix-name">zenti</span>
              <span class="side-prefix-power">\\(10^{-2}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.48s;">
              <span class="side-prefix-symbol">m</span>
              <span class="side-prefix-name">milli</span>
              <span class="side-prefix-power">\\(10^{-3}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.56s;">
              <span class="side-prefix-symbol">µ</span>
              <span class="side-prefix-name">mikro</span>
              <span class="side-prefix-power">\\(10^{-6}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.64s;">
              <span class="side-prefix-symbol">n</span>
              <span class="side-prefix-name">nano</span>
              <span class="side-prefix-power">\\(10^{-9}\\)</span>
            </div>
          </div>
          <p class="side-eq">\\[\\text{Präfix-Einheit}=10^n\\cdot\\text{Basiseinheit}\\]</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>3) Umrechnung: Meter und Gramm</strong></h3>
          <p class="side-text">Gleiche Präfix-Reihenfolge, andere Basiseinheit.</p>
          <div class="side-convert-block" aria-hidden="true">
            <p class="side-convert-label">Länge</p>
            <div class="side-convert-track">
              <span class="side-convert-chip">km<br><small>10³</small></span>
              <span class="side-convert-chip">hm<br><small>10²</small></span>
              <span class="side-convert-chip">dam<br><small>10¹</small></span>
              <span class="side-convert-chip side-convert-chip-base">m<br><small>10⁰</small></span>
              <span class="side-convert-chip">dm<br><small>10⁻¹</small></span>
              <span class="side-convert-chip">cm<br><small>10⁻²</small></span>
              <span class="side-convert-chip">mm<br><small>10⁻³</small></span>
              <span class="side-convert-chip">µm<br><small>10⁻⁶</small></span>
              <span class="side-convert-chip">nm<br><small>10⁻⁹</small></span>
              <span class="side-convert-dot"></span>
            </div>
            <p class="side-eq">\\[2\\,\\mathrm{m}=200\\,\\mathrm{cm}=2000\\,\\mathrm{mm}\\]</p>
          </div>
          <div class="side-convert-block" aria-hidden="true">
            <p class="side-convert-label">Masse</p>
            <div class="side-convert-track">
              <span class="side-convert-chip">kg<br><small>10³</small></span>
              <span class="side-convert-chip">hg<br><small>10²</small></span>
              <span class="side-convert-chip">dag<br><small>10¹</small></span>
              <span class="side-convert-chip side-convert-chip-base">g<br><small>10⁰</small></span>
              <span class="side-convert-chip">dg<br><small>10⁻¹</small></span>
              <span class="side-convert-chip">cg<br><small>10⁻²</small></span>
              <span class="side-convert-chip">mg<br><small>10⁻³</small></span>
              <span class="side-convert-chip">µg<br><small>10⁻⁶</small></span>
              <span class="side-convert-chip">ng<br><small>10⁻⁹</small></span>
              <span class="side-convert-dot side-convert-dot-second"></span>
            </div>
            <p class="side-eq">\\[3\\,\\mathrm{g}=3000\\,\\mathrm{mg}=3\\cdot10^6\\,\\mathrm{\\mu g}\\]</p>
          </div>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    siSideContent.innerHTML = `
      <article class="side-card">
        <h3 class="side-title"><strong>${step.title}</strong></h3>
        <p class="side-text">Zusammenfassung folgt hier.</p>
      </article>
    `;
    typesetSidePanelMath();
  };

  const openSIGame = (stepIndex) => {
    if (!activeModuleId) {
      return;
    }

    const moduleData = MODULE_CONTENT[activeModuleId];
    const step = moduleData?.steps?.[stepIndex];
    if (!step) {
      return;
    }

    if (siGameKicker instanceof HTMLElement) {
      siGameKicker.textContent = `Module ${activeModuleId} Game`;
    }
    if (siGameTitle instanceof HTMLElement) {
      siGameTitle.textContent = step.title;
    }
    const isSIUnits = activeModuleId === "0" && step.title === "SI-Einheiten";
    const isTestUniformMotion = activeModuleId === "TEST" && step.title === "Gleichförmige Bewegung";
    const isCatchUpMotion = activeModuleId === "TEST" && step.title === "Aufholen";
    const isAccelerationMotion = activeModuleId === "TEST" && step.title === "Beschleunigung";
    const isSprintScanner = activeModuleId === "TEST" && step.title === "K1 – Sprint-Scanner";
    const isOvertakeDuel = activeModuleId === "TEST" && step.title === "K2 – Überhol-Duell";
    const isFreeFall = activeModuleId === "TEST" && step.title === "K3 – Freier Fall";
    const isBraking = activeModuleId === "TEST" && step.title === "K4 – Bremsweg";
    const isDistanceAcc = activeModuleId === "TEST" && step.title === "K5 – Beschleunigungsweg";
    const isMCConcept = activeModuleId === "TEST" && step.title === "K6 – Konzept-Quiz";
    if (isSIUnits) {
      renderSIUnitsTutorial();
    } else if (isTestUniformMotion) {
      renderTestUniformMotionGame();
    } else if (isCatchUpMotion) {
      renderCatchUpGame();
    } else if (isAccelerationMotion) {
      renderAccelerationGame();
    } else if (isSprintScanner) {
      renderSprintGame();
    } else if (isOvertakeDuel) {
      renderCatchUpGame(K2_OVERTAKE_TASK);
    } else if (isFreeFall) {
      renderFreeFallGame();
    } else if (isBraking) {
      renderBrakingGame();
    } else if (isDistanceAcc) {
      renderDistanceAccGame();
    } else if (isMCConcept) {
      renderMCConceptGame();
    } else if (step.theory || step.question || STEP_CONTENT[step.title]) {
      renderModuleGame(step);
    } else {
      stopSIUnitsJumpGame();
      stopTestMotionGame();
      stopCatchUpGame();
      stopAccelerationGame();
      stopSprintGame();
      stopFreeFallGame();
      stopBrakingGame();
      stopDistanceAccGame();
      stopModuleGame();
      renderGenericGame(step);
    }
    renderSidePanel(activeModuleId, step);

    document.body.classList.add("si-game-open");
  };

  const closeSIGame = () => {
    stopSIUnitsJumpGame();
    stopTestMotionGame();
    stopCatchUpGame();
    stopAccelerationGame();
    stopSprintGame();
    stopFreeFallGame();
    stopBrakingGame();
    stopDistanceAccGame();
    stopModuleGame();
    sidePanelHidden = false;
    applySidePanelVisibility();
    document.body.classList.remove("si-game-open");
    document.body.classList.add("module0-open");
    window.requestAnimationFrame(() => {
      updateModuleLine();
    });
  };

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resizeCanvas = () => {
    cssWidth = Math.max(1, Math.floor(frame.clientWidth));
    cssHeight = Math.max(1, Math.floor(frame.clientHeight));
    pencilLayer.width = Math.floor(cssWidth * dpr);
    pencilLayer.height = Math.floor(cssHeight * dpr);
    pencilLayer.style.width = `${cssWidth}px`;
    pencilLayer.style.height = `${cssHeight}px`;

    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);
    }

    frameRect = frame.getBoundingClientRect();
    layerRect = pencilLayer.getBoundingClientRect();
    updateModuleLine();
  };

  const jitter = (amount = 0.9) => (Math.random() - 0.5) * amount;

  const drawPencilSegment = (from, to) => {
    if (!ctx) {
      return;
    }

    for (let i = 0; i < 3; i += 1) {
      ctx.strokeStyle = `rgba(43, 50, 58, ${0.13 + Math.random() * 0.13})`;
      ctx.lineWidth = 0.85 + Math.random() * 1.15;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x + jitter(1.1), from.y + jitter(1.1));
      ctx.lineTo(to.x + jitter(1.1), to.y + jitter(1.1));
      ctx.stroke();
    }

    if (Math.random() > 0.58) {
      ctx.fillStyle = `rgba(43, 50, 58, ${0.08 + Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.arc(to.x + jitter(2.3), to.y + jitter(2.3), 0.7 + Math.random() * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const fadeTrail = () => {
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(255, 255, 255, 0.045)";
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.restore();
    }
    window.requestAnimationFrame(fadeTrail);
  };

  resizeCanvas();
  fadeTrail();

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    observer.observe(frame);
  } else {
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
  }

  frame.addEventListener("pointerenter", () => {
    frameRect = frame.getBoundingClientRect();
    layerRect = pencilLayer.getBoundingClientRect();
  });

  frame.addEventListener("pointermove", (event) => {
    if (gameStarted) {
      return;
    }

    const x = (event.clientX - frameRect.left) / frameRect.width - 0.5;
    const y = (event.clientY - frameRect.top) / frameRect.height - 0.5;
    const rotateX = (-y * 2.4).toFixed(2);
    const rotateY = (x * 2.4).toFixed(2);

    title.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const point = {
      x: event.clientX - layerRect.left,
      y: event.clientY - layerRect.top,
    };

    if (lastPoint) {
      drawPencilSegment(lastPoint, point);
    }
    lastPoint = point;
  });

  frame.addEventListener("pointerleave", () => {
    title.style.transform = "";
    lastPoint = null;
  });

  if (startButton instanceof HTMLButtonElement) {
    startButton.addEventListener("click", () => {
      if (gameStarted) {
        return;
      }

      gameStarted = true;
      document.body.classList.add("game-started");
      title.style.transform = "";
      lastPoint = null;

      if (ctx) {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
      }
    });
  }

  moduleCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("is-locked")) {
        return;
      }

      flashModuleCard(card);
      const moduleId = card.dataset.module || "0";
      openModuleView(moduleId);
    });
  });

  if (debugToggle instanceof HTMLInputElement) {
    debugToggle.addEventListener("change", () => {
      applyModuleStates();
      applyActiveNodeLockState();

      if (activeModuleId && !isModuleUnlocked(activeModuleId, false)) {
        closeModuleView();
      }
    });
  }

  if (moduleBack instanceof HTMLButtonElement) {
    moduleBack.addEventListener("click", () => {
      closeModuleView();
    });
  }

  if (siGameBack instanceof HTMLButtonElement) {
    siGameBack.addEventListener("click", () => {
      closeSIGame();
    });
  }

  if (siSideToggle instanceof HTMLButtonElement) {
    siSideToggle.addEventListener("click", () => {
      sidePanelHidden = !sidePanelHidden;
      applySidePanelVisibility();
    });
  }

  window.addEventListener("resize", () => {
    updateModuleLine();
    if (testMotionState.running) {
      resizeTestMotionCanvas();
    }
    if (catchUpState.running) {
      resizeCatchUpCanvas();
    }
    if (accelerationState.running) {
      resizeAccelerationCanvas();
    }
    if (sprintState.running) {
      resizeSprintCanvas();
    }
    if (freeFallState.running) {
      resizeFreeFallCanvas();
    }
    if (brakingState.running) {
      resizeBrakingCanvas();
    }
    if (distanceAccState.running) {
      resizeDistanceAccCanvas();
    }
    if (siJumpState.running) {
      layoutSIJumpWorld();
      updateSIJumpPlayerVisual();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("si-game-open")) {
      closeSIGame();
      return;
    }

    if (event.key === "Escape" && document.body.classList.contains("module0-open")) {
      closeModuleView();
    }
  });

  if (modulesScroll instanceof HTMLElement) {
    // Keep default scrolling without edge bounce to avoid stutter.
  }

  applySidePanelVisibility();
  applyModuleStates();
}
