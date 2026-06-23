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
  TEST: {
    title: "TEST",
    steps: [
      {
        title: "Gleichförmige Bewegung",
        text: "Auto fährt mit konstanter Geschwindigkeit auf einer geraden Strecke.",
        icon: "car",
        colorA: "#ff8d47",
        colorB: "#ffd164",
      },
      {
        title: "Aufholen",
        text: "Ein Auto startet vorne. Berechne, wann der schnellere Läufer es einholt.",
        icon: "encounter",
        colorA: "#24b7d8",
        colorB: "#84e1f1",
      },
      {
        title: "Beschleunigung",
        text: "Eine Rakete startet aus der Ruhe. Berechne ihre Geschwindigkeit nach einer bestimmten Zeit.",
        icon: "acceleration",
        colorA: "#7a62ff",
        colorB: "#b7a7ff",
      },
      {
        title: "K1 - Sprint-Scanner",
        text: "Berechne die mittlere Geschwindigkeit eines 100-m-Sprints.",
        icon: "speed",
        colorA: "#59a3ff",
        colorB: "#8ed0ff",
      },
      {
        title: "K2 - Überhol-Duell",
        text: "Ein schnelleres Fahrzeug startet dahinter und muss ein langsames Fahrzeug einholen.",
        icon: "encounter",
        colorA: "#ff9c58",
        colorB: "#ffd58a",
      },
      {
        title: "v-t Diagramm lesen",
        text: "Erkenne Bewegungsphasen direkt aus dem Geschwindigkeit-Zeit-Diagramm.",
        icon: "chart",
        colorA: "#3dd18d",
        colorB: "#94ecb8",
      },
      {
        title: "Bremsweg berechnen",
        text: "Ein Auto bremst gleichmäßig. Berechne den Bremsweg aus Anfangsgeschwindigkeit und Bremsbeschleunigung.",
        icon: "brake",
        colorA: "#f86785",
        colorB: "#f9a8bd",
      },
      {
        title: "Fehler finden",
        text: "Ein Schüler macht einen typischen Fehler beim Rechnen. Erkenne, wo der Denkfehler steckt.",
        icon: "error",
        colorA: "#ff8d47",
        colorB: "#ffd164",
      },
      {
        title: "Freier Fall",
        text: "Ein Objekt fällt aus der Ruhe. Berechne Fallzeit und Aufprallgeschwindigkeit.",
        icon: "fall",
        colorA: "#8a73ff",
        colorB: "#c3b8ff",
      },
    ],
  },
  "0": {
    title: "Grundlagen der Bewegung",
    steps: [
      { title: "SI-Einheiten", text: "Einheitensystem sicher lesen, umrechnen und korrekt notieren.", icon: "units", colorA: "#59a3ff", colorB: "#8ed0ff" },
      { title: "Funktionen und Koordinatensysteme", text: "Punkte, Achsen und Funktionsverläufe sauber deuten.", icon: "graph", colorA: "#3dd18d", colorB: "#94ecb8" },
      { title: "Skalar und Vektoren", text: "Größen mit Betrag und Richtung sicher unterscheiden.", icon: "vector", colorA: "#8f73ff", colorB: "#c2b6ff" },
      { title: "Bezugssystem", text: "Bewegung immer relativ zu einem gewählten System interpretieren.", icon: "frame", colorA: "#ff8753", colorB: "#ffc173" },
      { title: "Position", text: "Lage im Raum eindeutig über Koordinaten angeben.", icon: "point", colorA: "#21b7d8", colorB: "#7de1f2" },
      { title: "Strecke und Verschiebung", text: "Zurückgelegten Weg und Ortsänderung präzise trennen.", icon: "displacement", colorA: "#f86785", colorB: "#f9a8bd" },
    ],
  },
  "1": {
    title: "Geradlinig gleichförmige Bewegung",
    steps: [
      { title: "Bewegung mit konstantem v", text: "Gleichförmige Bewegung in 1D erkennen und beschreiben.", icon: "speed", colorA: "#5ea2ff", colorB: "#9bc8ff" },
      { title: "Formel s = s0 + v · t", text: "Weg-Zeit-Zusammenhang sicher in Aufgaben anwenden.", icon: "formula", colorA: "#65d78a", colorB: "#a4f0be" },
      { title: "Durchschnittsgeschwindigkeit", text: "Zeit- und Wegintervalle korrekt auswerten.", icon: "speed", colorA: "#7e74ff", colorB: "#c3bcff" },
      { title: "Begegnungsaufgaben", text: "Zwei Bewegungen im selben Bezugssystem rechnen.", icon: "encounter", colorA: "#ff9c58", colorB: "#ffd58a" },
      { title: "s-t und v-t Diagramme", text: "Lineare Verläufe in beiden Diagrammen erkennen.", icon: "chart", colorA: "#24b7d8", colorB: "#88e4f2" },
    ],
  },
  "2": {
    title: "Geradlinig gleichmäßig beschleunigte Bewegung",
    steps: [
      { title: "Beschleunigung als Änderungsrate", text: "Bedeutung von a im Zeitverlauf klar deuten.", icon: "acceleration", colorA: "#5f9dff", colorB: "#9dc9ff" },
      { title: "Formel v = v0 + a · t", text: "Geschwindigkeit unter konstanter Beschleunigung berechnen.", icon: "formula", colorA: "#60ce88", colorB: "#9ce7b6" },
      { title: "Formel s = s0 + v0 t + 1/2 a t²", text: "Ortsänderung mit Startwerten sicher einsetzen.", icon: "formula", colorA: "#8a73ff", colorB: "#cabdff" },
      { title: "Vorzeichen richtig deuten", text: "Negative Werte bei v und a korrekt interpretieren.", icon: "sign", colorA: "#ff8e5a", colorB: "#ffc981" },
      { title: "Bremsen und Anfahren", text: "Typische Bewegungsphasen physikalisch modellieren.", icon: "brake", colorA: "#27b6d7", colorB: "#84dff0" },
      { title: "Formel- und Diagrammlösung", text: "Zwischen Rechnung und Graphen sicher wechseln.", icon: "chart", colorA: "#f66d93", colorB: "#f8acbf" },
    ],
  },
  "3": {
    title: "Freier Fall und vertikaler Wurf",
    steps: [
      { title: "Erdbeschleunigung g", text: "Richtung und Größe von g im Modell festlegen.", icon: "fall", colorA: "#5ea3ff", colorB: "#9acbff" },
      { title: "Fallzeit berechnen", text: "Zeit bis zum Auftreffen aus Startbedingungen bestimmen.", icon: "formula", colorA: "#65d48a", colorB: "#a2edbe" },
      { title: "Höhe und Ort", text: "Höhenwerte und Positionen über die Zeit berechnen.", icon: "point", colorA: "#8573ff", colorB: "#c6bcff" },
      { title: "Aufwärts- und Abwärtsphase", text: "Phasenwechsel beim vertikalen Wurf sauber trennen.", icon: "throw", colorA: "#ff8f5b", colorB: "#ffd184" },
      { title: "Spezialfall von Modul 2", text: "Freier Fall als beschleunigte Bewegung sicher anwenden.", icon: "acceleration", colorA: "#2ab8d8", colorB: "#89e3f2" },
    ],
  },
  "4": {
    title: "Bewegungsdiagramme und Darstellungen",
    steps: [
      { title: "s-t Diagramm", text: "Ortsverlauf über die Zeit korrekt lesen.", icon: "chart", colorA: "#5fa4ff", colorB: "#9fcfff" },
      { title: "v-t Diagramm", text: "Geschwindigkeitsverlauf in Intervallen interpretieren.", icon: "speed", colorA: "#62d38a", colorB: "#9de9b8" },
      { title: "a-t Diagramm", text: "Beschleunigungsabschnitte physikalisch deuten.", icon: "acceleration", colorA: "#8c76ff", colorB: "#c8beff" },
      { title: "Steigung", text: "Steigungen als Änderungsraten verwenden.", icon: "slope", colorA: "#ff9657", colorB: "#ffd182" },
      { title: "Flächeninhalt", text: "Flächen unter Kurven physikalisch auswerten.", icon: "area", colorA: "#25b7d8", colorB: "#86e1f1" },
      { title: "Darstellungen umwandeln", text: "Zwischen s-t, v-t und a-t sicher wechseln.", icon: "graph", colorA: "#f56e92", colorB: "#f7aec1" },
    ],
  },
  "5": {
    title: "Bewegungen in zwei Dimensionen",
    steps: [
      { title: "x- und y-Komponente", text: "Bewegung in unabhängige Richtungen zerlegen.", icon: "components", colorA: "#5ea3ff", colorB: "#9ac9ff" },
      { title: "Komponenten getrennt lösen", text: "Zwei 1D-Probleme getrennt rechnen.", icon: "vector", colorA: "#65d489", colorB: "#a0ecb8" },
      { title: "Wurf als Überlagerung", text: "Horizontale und vertikale Bewegung kombinieren.", icon: "throw", colorA: "#8972ff", colorB: "#c5bbff" },
      { title: "Flugzeit und Reichweite", text: "Zentrale Größen aus den Komponenten bestimmen.", icon: "formula", colorA: "#ff8f5d", colorB: "#ffcf85" },
      { title: "2D-Transferaufgaben", text: "Kontextaufgaben systematisch und sauber lösen.", icon: "chart", colorA: "#24b7d8", colorB: "#84e1f1" },
    ],
  },
  "6": {
    title: "Relative Bewegung und Bezugssysteme",
    steps: [
      { title: "Passendes Bezugssystem wählen", text: "Systemwahl begründet und zielgerichtet treffen.", icon: "frame", colorA: "#5ea3ff", colorB: "#9ccaff" },
      { title: "Relativgeschwindigkeit", text: "Geschwindigkeiten abhängig vom Beobachter berechnen.", icon: "relative", colorA: "#63d48b", colorB: "#9feab9" },
      { title: "Gegen- und Gleichrichtung", text: "Fälle korrekt unterscheiden und Vorzeichen prüfen.", icon: "sign", colorA: "#8a73ff", colorB: "#c3b8ff" },
      { title: "Ergebnisse interpretieren", text: "Physikalische Aussage im gewählten System formulieren.", icon: "observer", colorA: "#ff925a", colorB: "#ffd083" },
    ],
  },
  "7": {
    title: "Messung, Modellierung, Grenzen",
    steps: [
      { title: "Datenerfassung", text: "Messreihen strukturiert aufnehmen und dokumentieren.", icon: "measure", colorA: "#5ca2ff", colorB: "#9bc9ff" },
      { title: "Einfache Auswertung", text: "Messwerte tabellarisch und grafisch aufbereiten.", icon: "chart", colorA: "#64d38b", colorB: "#a2e9b9" },
      { title: "Messfehler", text: "Absolute und relative Abweichungen bestimmen.", icon: "error", colorA: "#8a73ff", colorB: "#c6bcff" },
      { title: "Modellannahmen", text: "Annahmen wie ohne Luftwiderstand bewusst einsetzen.", icon: "model", colorA: "#ff915a", colorB: "#ffd083" },
      { title: "Modell und Realität", text: "Grenzen des Rechenmodells mit Daten reflektieren.", icon: "observer", colorA: "#24b6d8", colorB: "#84dff1" },
    ],
  },
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
  let activeStepIndex = 0;
  let activeNodes = [];
  let sidePanelHidden = false;

  const STORAGE_KEY = "kinemaths_progress";
  const defaultProgress = () => ({
    modules: Object.fromEntries(
      Object.keys(MODULE_CONTENT).map(id => [id, { completed_steps: [], points: 0 }])
    ),
    total_points: 0,
    badges: [],
  });
  const loadProgress = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultProgress(), ...JSON.parse(raw) };
    } catch {}
    return defaultProgress();
  };
  const saveProgress = (progress) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  };
  let gameProgress = loadProgress();

  const BADGES = {
    first_step: { label: "Erster Schritt", desc: "Modul 0 gestartet." },
    formelfuchs: { label: "Formelfuchs", desc: "Modul 0 abgeschlossen." },
    hartnäckig: { label: "Hartnäckig", desc: "Nach Fehlversuch Aufgabe gelöst." },
  };

  const pointsDisplay = document.getElementById("km-points-display");
  const updatePointsDisplay = () => {
    if (pointsDisplay instanceof HTMLElement) {
      pointsDisplay.textContent = `✦ ${gameProgress.total_points} Pts`;
    }
  };
  updatePointsDisplay();

  const awardPoints = (moduleId, points) => {
    gameProgress.modules[moduleId] = gameProgress.modules[moduleId] || { completed_steps: [], points: 0 };
    gameProgress.modules[moduleId].points = (gameProgress.modules[moduleId].points || 0) + points;
    gameProgress.total_points = (gameProgress.total_points || 0) + points;
    saveProgress(gameProgress);
    updatePointsDisplay();
  };

  const markStepComplete = (moduleId, stepIndex) => {
    const mod = gameProgress.modules[moduleId];
    if (mod && !mod.completed_steps.includes(stepIndex)) {
      mod.completed_steps.push(stepIndex);
      saveProgress(gameProgress);
    }
  };

  const checkModuleComplete = (moduleId) => {
    const steps = MODULE_CONTENT[moduleId]?.steps?.length || 0;
    const completed = gameProgress.modules[moduleId]?.completed_steps?.length || 0;
    if (completed >= steps) {
      if (moduleId === "0") awardBadge("formelfuchs");
    }
  };

  const showBadgeNotification = (badgeId) => {
    const badge = BADGES[badgeId];
    if (!badge) return;
    const el = document.createElement("div");
    el.className = "km-badge-toast";
    el.innerHTML = `<strong>🏅 Badge freigeschaltet!</strong><br>${badge.label}: ${badge.desc}`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add("km-badge-toast--visible"), 50);
    setTimeout(() => {
      el.classList.remove("km-badge-toast--visible");
      setTimeout(() => el.remove(), 400);
    }, 3500);
  };

  const awardBadge = (badgeId) => {
    if (!gameProgress.badges.includes(badgeId)) {
      gameProgress.badges.push(badgeId);
      saveProgress(gameProgress);
      showBadgeNotification(badgeId);
    }
  };
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

  // ── Module 0 Step 1: Koordinatensysteme ──────────────────────────────────
  const renderCoordinatesGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <h3 class="test-theory-title">Koordinatensysteme & Funktionen</h3>
          <p class="test-theory-text">Ein Koordinatensystem besteht aus zwei senkrechten Achsen: der <strong>x-Achse</strong> (horizontal) und der <strong>y-Achse</strong> (vertikal). In der Kinematik verwenden wir oft ein <strong>s-t-Diagramm</strong>, bei dem die Zeit auf der x-Achse und die Position auf der y-Achse aufgetragen wird.</p>
        </div>
        <div class="test-theory-formula">\\[s = f(t)\\]</div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> Im s-t-Diagramm zeigt die Steigung einer Linie die Geschwindigkeit an.</p>
        </div>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="coord-to-question">Zur Frage →</button>
        </div>
      </section>
    `;
    const btn = siGameStage.querySelector("#coord-to-question");
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener("click", () => startCoordinatesQuestion());
    }
  };

  let coordHadError = false;
  const startCoordinatesQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    coordHadError = false;
    const options = [
      { label: "A) Zeit", correct: true },
      { label: "B) Strecke", correct: false },
      { label: "C) Geschwindigkeit", correct: false },
      { label: "D) Masse", correct: false },
    ];
    siGameStage.innerHTML = `
      <section class="test-motion-task">
        <h3 class="test-motion-task-title">Frage: Koordinatensysteme</h3>
        <p class="test-motion-task-desc">Was beschreibt die x-Achse in einem typischen s-t-Diagramm?</p>
        <div class="test-motion-options" id="coord-options">
          ${options.map((o, i) => `<button class="si-jumpgame-button test-mc-option" type="button" data-index="${i}">${o.label}</button>`).join("")}
        </div>
        <div class="test-motion-feedback" id="coord-feedback"></div>
        <div id="coord-actions" style="display:none; margin-top:1rem;">
          <button class="si-jumpgame-button" type="button" id="coord-back">Zurück zum Pfad</button>
        </div>
      </section>
    `;
    const optionEls = siGameStage.querySelectorAll(".test-mc-option");
    optionEls.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        optionEls.forEach(b => { b.disabled = true; });
        const feedback = siGameStage.querySelector("#coord-feedback");
        const actions = siGameStage.querySelector("#coord-actions");
        if (options[i].correct) {
          btn.style.background = "#22c55e";
          btn.style.color = "#fff";
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Richtig! Die x-Achse im s-t-Diagramm zeigt die Zeit t.";
            feedback.className = "test-motion-feedback is-correct";
          }
          awardPoints("0", 50);
          if (coordHadError) awardBadge("hartnäckig");
          markStepComplete("0", 1);
          checkModuleComplete("0");
        } else {
          btn.style.background = "#ef4444";
          btn.style.color = "#fff";
          coordHadError = true;
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Nicht ganz. Im s-t-Diagramm ist die x-Achse die Zeit t.";
            feedback.className = "test-motion-feedback is-hint";
          }
        }
        if (actions instanceof HTMLElement && options[i].correct) {
          actions.style.display = "block";
          const backBtn = actions.querySelector("#coord-back");
          if (backBtn instanceof HTMLButtonElement) {
            backBtn.addEventListener("click", () => closeSIGame());
          }
        }
      });
    });
  };

  // ── Module 0 Step 2: Skalar und Vektoren ────────────────────────────────
  const scalarVectorQuestions = [
    { q: "Geschwindigkeit", answer: "Vektor", hint: "Geschwindigkeit hat Betrag und Richtung → Vektor." },
    { q: "Masse", answer: "Skalar", hint: "Masse hat nur einen Betrag, keine Richtung → Skalar." },
    { q: "Verschiebung", answer: "Vektor", hint: "Verschiebung hat Betrag und Richtung → Vektor." },
    { q: "Temperatur", answer: "Skalar", hint: "Temperatur hat nur einen Betrag → Skalar." },
  ];
  let svQIndex = 0;
  let svHadError = false;
  let svFirstTry = true;

  const renderScalarVectorGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    svQIndex = 0;
    svHadError = false;
    svFirstTry = true;
    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <h3 class="test-theory-title">Skalare und Vektoren</h3>
          <p class="test-theory-text">Eine physikalische Grösse ist entweder ein <strong>Skalar</strong> oder ein <strong>Vektor</strong>.</p>
          <ul class="test-theory-list" style="margin:0.5rem 0 0 1rem;">
            <li><strong>Skalar:</strong> nur Betrag (z.B. Masse, Temperatur, Zeit)</li>
            <li><strong>Vektor:</strong> Betrag UND Richtung (z.B. Geschwindigkeit, Kraft, Verschiebung)</li>
          </ul>
        </div>
        <div class="test-theory-formula">\\[\\vec{v} \\text{ (Vektor)} \\quad\\quad m \\text{ (Skalar)}\\]</div>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="sv-to-question">Zur Frage →</button>
        </div>
      </section>
    `;
    const btn = siGameStage.querySelector("#sv-to-question");
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener("click", () => startSVQuestion());
    }
  };

  const startSVQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    if (svQIndex >= scalarVectorQuestions.length) {
      siGameStage.innerHTML = `
        <section class="test-motion-task">
          <h3 class="test-motion-task-title">Alle Fragen beantwortet!</h3>
          <p class="test-motion-task-desc">Du hast alle Skalar/Vektor-Fragen abgeschlossen.</p>
          <div style="margin-top:1rem;">
            <button class="si-jumpgame-button" type="button" id="sv-back-final">Zurück zum Pfad</button>
          </div>
        </section>
      `;
      markStepComplete("0", 2);
      checkModuleComplete("0");
      const backBtn = siGameStage.querySelector("#sv-back-final");
      if (backBtn instanceof HTMLButtonElement) {
        backBtn.addEventListener("click", () => closeSIGame());
      }
      return;
    }
    svFirstTry = true;
    const qObj = scalarVectorQuestions[svQIndex];
    const opts = ["Skalar", "Vektor"].sort(() => Math.random() - 0.5);
    siGameStage.innerHTML = `
      <section class="test-motion-task">
        <h3 class="test-motion-task-title">Frage ${svQIndex + 1} / ${scalarVectorQuestions.length}: Skalar oder Vektor?</h3>
        <p class="test-motion-task-desc">Ist <strong>${qObj.q}</strong> ein Skalar oder ein Vektor?</p>
        <div class="test-motion-options" id="sv-options">
          ${opts.map(o => `<button class="si-jumpgame-button test-mc-option" type="button" data-val="${o}">${o}</button>`).join("")}
        </div>
        <div class="test-motion-feedback" id="sv-feedback"></div>
        <div id="sv-next-area" style="display:none; margin-top:1rem;">
          <button class="si-jumpgame-button" type="button" id="sv-next">${svQIndex + 1 < scalarVectorQuestions.length ? "Nächste Frage →" : "Abschliessen →"}</button>
        </div>
      </section>
    `;
    const optionEls = siGameStage.querySelectorAll(".test-mc-option");
    optionEls.forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        const feedback = siGameStage.querySelector("#sv-feedback");
        const nextArea = siGameStage.querySelector("#sv-next-area");
        if (val === qObj.answer) {
          optionEls.forEach(b => { b.disabled = true; });
          btn.style.background = "#22c55e";
          btn.style.color = "#fff";
          if (feedback instanceof HTMLElement) {
            feedback.textContent = `Richtig! ${qObj.hint}`;
            feedback.className = "test-motion-feedback is-correct";
          }
          const pts = svFirstTry ? 50 : 25;
          awardPoints("0", pts);
          if (svHadError) awardBadge("hartnäckig");
          if (nextArea instanceof HTMLElement) {
            nextArea.style.display = "block";
            const nextBtn = nextArea.querySelector("#sv-next");
            if (nextBtn instanceof HTMLButtonElement) {
              nextBtn.addEventListener("click", () => {
                svQIndex++;
                svHadError = false;
                startSVQuestion();
              });
            }
          }
        } else {
          svFirstTry = false;
          svHadError = true;
          btn.style.background = "#ef4444";
          btn.style.color = "#fff";
          btn.disabled = true;
          if (feedback instanceof HTMLElement) {
            feedback.textContent = `Falsch. Versuche es nochmal. ${qObj.hint}`;
            feedback.className = "test-motion-feedback is-hint";
          }
        }
      });
    });
  };

  // ── Module 0 Step 3: Bezugssystem ────────────────────────────────────────
  const renderReferenceFrameGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <h3 class="test-theory-title">Bezugssystem</h3>
          <p class="test-theory-text">Jede Bewegung wird <strong>relativ zu einem Bezugssystem</strong> gemessen. Ein Bezugssystem ist ein Koordinatensystem, das an einem bestimmten Beobachter oder Ort befestigt ist.</p>
          <p class="test-theory-text">Die Relativgeschwindigkeit zweier entgegengesetzt fahrender Objekte ergibt sich aus der <strong>Addition</strong> ihrer Einzelgeschwindigkeiten.</p>
        </div>
        <div class="test-theory-formula">\\[v_{\\text{rel}} = v_A + v_B\\]</div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> Auto A fährt mit 60 km/h nach rechts, Auto B mit 40 km/h nach links. Relativgeschwindigkeit: 100 km/h.</p>
        </div>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="ref-to-question">Zur Frage →</button>
        </div>
      </section>
    `;
    const btn = siGameStage.querySelector("#ref-to-question");
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener("click", () => startReferenceFrameQuestion());
    }
  };

  let refHadError = false;
  const startReferenceFrameQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    refHadError = false;
    const options = [
      { label: "A) 20 km/h", correct: false },
      { label: "B) 80 km/h", correct: false },
      { label: "C) 140 km/h", correct: true },
      { label: "D) 60 km/h", correct: false },
    ];
    siGameStage.innerHTML = `
      <section class="test-motion-task">
        <h3 class="test-motion-task-title">Frage: Bezugssystem</h3>
        <p class="test-motion-task-desc">Zwei Züge fahren aufeinander zu. Zug A fährt mit 80 km/h, Zug B mit 60 km/h. Wie gross ist die Relativgeschwindigkeit?</p>
        <div class="test-motion-options" id="ref-options">
          ${options.map((o, i) => `<button class="si-jumpgame-button test-mc-option" type="button" data-index="${i}">${o.label}</button>`).join("")}
        </div>
        <div class="test-motion-feedback" id="ref-feedback"></div>
        <div id="ref-actions" style="display:none; margin-top:1rem;">
          <button class="si-jumpgame-button" type="button" id="ref-back">Zurück zum Pfad</button>
        </div>
      </section>
    `;
    const optionEls = siGameStage.querySelectorAll(".test-mc-option");
    optionEls.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        optionEls.forEach(b => { b.disabled = true; });
        const feedback = siGameStage.querySelector("#ref-feedback");
        const actions = siGameStage.querySelector("#ref-actions");
        if (options[i].correct) {
          btn.style.background = "#22c55e";
          btn.style.color = "#fff";
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Richtig! 80 + 60 = 140 km/h. Bei entgegengesetzter Fahrt addieren sich die Geschwindigkeiten.";
            feedback.className = "test-motion-feedback is-correct";
          }
          awardPoints("0", 75);
          if (refHadError) awardBadge("hartnäckig");
          markStepComplete("0", 3);
          checkModuleComplete("0");
          if (actions instanceof HTMLElement) {
            actions.style.display = "block";
            const backBtn = actions.querySelector("#ref-back");
            if (backBtn instanceof HTMLButtonElement) {
              backBtn.addEventListener("click", () => closeSIGame());
            }
          }
        } else {
          btn.style.background = "#ef4444";
          btn.style.color = "#fff";
          refHadError = true;
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Nicht richtig. Bei entgegengesetzter Fahrt addiert man: 80 + 60 = 140 km/h.";
            feedback.className = "test-motion-feedback is-hint";
          }
        }
      });
    });
  };

  // ── Module 0 Step 4: Position ────────────────────────────────────────────
  const renderPositionGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <h3 class="test-theory-title">Position</h3>
          <p class="test-theory-text">Die <strong>Position</strong> (auch Ort) eines Objektes gibt an, wo es sich im gewählten Bezugssystem befindet. Sie wird über eine Koordinate \\(s\\) (oder \\(x\\)) angegeben.</p>
          <p class="test-theory-text">Wenn ein Objekt von der Startposition \\(s_0\\) eine Strecke \\(\\Delta s\\) zurücklegt, ist die neue Position:</p>
        </div>
        <div class="test-theory-formula">\\[s = s_0 + \\Delta s\\]</div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> Startposition \\(s_0 = 2\\,\\mathrm{m}\\), Verschiebung \\(\\Delta s = 5\\,\\mathrm{m}\\) → neue Position: \\(s = 7\\,\\mathrm{m}\\).</p>
        </div>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="pos-to-question">Zur Frage →</button>
        </div>
      </section>
    `;
    const btn = siGameStage.querySelector("#pos-to-question");
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener("click", () => startPositionQuestion());
    }
  };

  let posHadError = false;
  const startPositionQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    posHadError = false;
    siGameStage.innerHTML = `
      <section class="test-motion-task">
        <h3 class="test-motion-task-title">Frage: Position</h3>
        <p class="test-motion-task-desc">Ein Auto startet bei Position \\(s_0 = 5\\,\\mathrm{m}\\) und fährt 8 m in positiver Richtung. An welcher Position befindet es sich jetzt?</p>
        <div class="test-motion-input-row" style="margin-top:1rem; display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
          <input class="test-motion-input" id="pos-input" type="number" placeholder="Antwort in m" style="padding:0.6rem 0.8rem; border-radius:8px; border:2px solid #ccc; font-size:1rem; width:160px;" />
          <span style="font-size:1rem; font-weight:700;">m</span>
          <button class="si-jumpgame-button" type="button" id="pos-check">Prüfen</button>
        </div>
        <div class="test-motion-feedback" id="pos-feedback" style="margin-top:0.75rem;"></div>
        <div id="pos-actions" style="display:none; margin-top:1rem;">
          <button class="si-jumpgame-button" type="button" id="pos-back">Zurück zum Pfad</button>
        </div>
      </section>
    `;
    const checkBtn = siGameStage.querySelector("#pos-check");
    if (checkBtn instanceof HTMLButtonElement) {
      checkBtn.addEventListener("click", () => {
        const input = siGameStage.querySelector("#pos-input");
        const feedback = siGameStage.querySelector("#pos-feedback");
        const actions = siGameStage.querySelector("#pos-actions");
        const val = parseFloat(input instanceof HTMLInputElement ? input.value : "");
        if (isNaN(val)) {
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Bitte gib eine Zahl ein.";
            feedback.className = "test-motion-feedback is-hint";
          }
          return;
        }
        if (Math.abs(val - 13) <= 0.1) {
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Richtig! s = 5 + 8 = 13 m.";
            feedback.className = "test-motion-feedback is-correct";
          }
          if (checkBtn instanceof HTMLButtonElement) checkBtn.disabled = true;
          awardPoints("0", 75);
          if (posHadError) awardBadge("hartnäckig");
          markStepComplete("0", 4);
          checkModuleComplete("0");
          if (actions instanceof HTMLElement) {
            actions.style.display = "block";
            const backBtn = actions.querySelector("#pos-back");
            if (backBtn instanceof HTMLButtonElement) {
              backBtn.addEventListener("click", () => closeSIGame());
            }
          }
        } else {
          posHadError = true;
          if (feedback instanceof HTMLElement) {
            feedback.textContent = "Nicht ganz. Hinweis: s = s₀ + Δs = 5 + 8 = ?";
            feedback.className = "test-motion-feedback is-hint";
          }
        }
      });
    }
  };

  // ── Module 0 Step 5: Strecke und Verschiebung ────────────────────────────
  const renderDisplacementGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <h3 class="test-theory-title">Strecke und Verschiebung</h3>
          <p class="test-theory-text"><strong>Strecke</strong> (auch zurückgelegter Weg): die gesamte Länge des zurückgelegten Weges, unabhängig von der Richtung. Das ist ein <strong>Skalar</strong>.</p>
          <p class="test-theory-text"><strong>Verschiebung</strong> \\(\\Delta s\\): die direkte Verbindung zwischen Start- und Endpunkt, mit Richtung. Das ist ein <strong>Vektor</strong>.</p>
        </div>
        <div class="test-theory-formula">\\[\\text{Strecke} = \\text{gesamter Weg} \\quad \\Delta s = s_{\\text{end}} - s_0\\]</div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> Jemand läuft 10 m vor und 4 m zurück → Strecke = 14 m, |Verschiebung| = 6 m.</p>
        </div>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="disp-to-question">Zur Frage →</button>
        </div>
      </section>
    `;
    const btn = siGameStage.querySelector("#disp-to-question");
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener("click", () => startDisplacementQuestion());
    }
  };

  let dispHadError = false;
  let dispStreckeDone = false;
  const startDisplacementQuestion = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    dispHadError = false;
    dispStreckeDone = false;
    siGameStage.innerHTML = `
      <section class="test-motion-task">
        <h3 class="test-motion-task-title">Frage: Strecke und Verschiebung</h3>
        <p class="test-motion-task-desc">Ein Jogger läuft 400 m geradeaus und kehrt dann 150 m um.</p>
        <div style="margin-top:1rem; display:flex; flex-direction:column; gap:0.8rem;">
          <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <label style="font-weight:700; min-width:180px;">(a) Strecke [m]:</label>
            <input class="test-motion-input" id="disp-strecke" type="number" placeholder="z.B. 550" style="padding:0.6rem 0.8rem; border-radius:8px; border:2px solid #ccc; font-size:1rem; width:130px;" />
            <button class="si-jumpgame-button" type="button" id="disp-check-strecke">Prüfen</button>
          </div>
          <div class="test-motion-feedback" id="disp-feedback-strecke"></div>
          <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <label style="font-weight:700; min-width:180px;">(b) |Verschiebung| [m]:</label>
            <input class="test-motion-input" id="disp-verschie" type="number" placeholder="z.B. 250" style="padding:0.6rem 0.8rem; border-radius:8px; border:2px solid #ccc; font-size:1rem; width:130px;" />
            <button class="si-jumpgame-button" type="button" id="disp-check-verschie">Prüfen</button>
          </div>
          <div class="test-motion-feedback" id="disp-feedback-verschie"></div>
        </div>
        <div id="disp-actions" style="display:none; margin-top:1rem;">
          <button class="si-jumpgame-button" type="button" id="disp-back">Zurück zum Pfad</button>
        </div>
      </section>
    `;
    let streckeCorrect = false;
    let verschieCorrect = false;
    const checkComplete = () => {
      if (streckeCorrect && verschieCorrect) {
        markStepComplete("0", 5);
        checkModuleComplete("0");
        const actions = siGameStage.querySelector("#disp-actions");
        if (actions instanceof HTMLElement) {
          actions.style.display = "block";
          const backBtn = actions.querySelector("#disp-back");
          if (backBtn instanceof HTMLButtonElement) {
            backBtn.addEventListener("click", () => closeSIGame());
          }
        }
      }
    };
    const checkStrecke = siGameStage.querySelector("#disp-check-strecke");
    if (checkStrecke instanceof HTMLButtonElement) {
      checkStrecke.addEventListener("click", () => {
        const input = siGameStage.querySelector("#disp-strecke");
        const feedback = siGameStage.querySelector("#disp-feedback-strecke");
        const val = parseFloat(input instanceof HTMLInputElement ? input.value : "");
        if (isNaN(val)) {
          if (feedback instanceof HTMLElement) { feedback.textContent = "Bitte eine Zahl eingeben."; feedback.className = "test-motion-feedback is-hint"; }
          return;
        }
        if (Math.abs(val - 550) <= 0.5) {
          if (feedback instanceof HTMLElement) { feedback.textContent = "Richtig! Strecke = 400 + 150 = 550 m."; feedback.className = "test-motion-feedback is-correct"; }
          checkStrecke.disabled = true;
          awardPoints("0", 50);
          streckeCorrect = true;
          checkComplete();
        } else {
          dispHadError = true;
          if (feedback instanceof HTMLElement) { feedback.textContent = "Nicht ganz. Die Strecke ist der gesamte zurückgelegte Weg: 400 + 150 = ?"; feedback.className = "test-motion-feedback is-hint"; }
        }
      });
    }
    const checkVerschie = siGameStage.querySelector("#disp-check-verschie");
    if (checkVerschie instanceof HTMLButtonElement) {
      checkVerschie.addEventListener("click", () => {
        const input = siGameStage.querySelector("#disp-verschie");
        const feedback = siGameStage.querySelector("#disp-feedback-verschie");
        const val = parseFloat(input instanceof HTMLInputElement ? input.value : "");
        if (isNaN(val)) {
          if (feedback instanceof HTMLElement) { feedback.textContent = "Bitte eine Zahl eingeben."; feedback.className = "test-motion-feedback is-hint"; }
          return;
        }
        if (Math.abs(val - 250) <= 0.5) {
          if (feedback instanceof HTMLElement) { feedback.textContent = "Richtig! |Verschiebung| = 400 - 150 = 250 m."; feedback.className = "test-motion-feedback is-correct"; }
          checkVerschie.disabled = true;
          awardPoints("0", 50);
          if (dispHadError) awardBadge("hartnäckig");
          verschieCorrect = true;
          checkComplete();
        } else {
          dispHadError = true;
          if (feedback instanceof HTMLElement) { feedback.textContent = "Nicht ganz. Die Verschiebung ist die direkte Strecke von Start zu End: 400 - 150 = ?"; feedback.className = "test-motion-feedback is-hint"; }
        }
      });
    }
  };

  // ── v-t Diagramm lesen ──────────────────────────────────────────────────────
  const VT_QUESTIONS = [
    {
      label: "Gleichförmige Fahrt",
      description: "Ein Auto fährt mit konstanter Geschwindigkeit 12 m/s für 6 Sekunden.",
      segments: [{ v0: 12, v1: 12, t0: 0, t1: 6 }],
      question: "Was zeigt die waagerechte Linie im v-t-Diagramm?",
      options: [
        { text: "Die Geschwindigkeit ist konstant — keine Beschleunigung.", correct: true, explanation: "Genau! Eine flache Linie bedeutet: Die Geschwindigkeit ändert sich nicht, also a = 0." },
        { text: "Das Auto steht still.", correct: false, explanation: "Nein. Still stehen würde bedeuten, v = 0 — also die Linie liegt auf der Zeitachse." },
        { text: "Das Auto beschleunigt gleichmäßig.", correct: false, explanation: "Nein. Beschleunigung siehst du als schräge Linie, nicht als flache." },
        { text: "Die Strecke nimmt ab.", correct: false, explanation: "Nein. Im v-t-Diagramm liest du Geschwindigkeit — nicht direkt die Strecke." },
      ],
      xp: 75,
    },
    {
      label: "Gleichmäßiges Bremsen",
      description: "Ein Fahrzeug bremst von 20 m/s auf 0 m/s in 5 Sekunden.",
      segments: [{ v0: 20, v1: 0, t0: 0, t1: 5 }],
      question: "Was bedeutet die abfallende Gerade im v-t-Diagramm?",
      options: [
        { text: "Das Fahrzeug verzögert mit konstanter Bremsbeschleunigung.", correct: true, explanation: "Richtig! Eine fallende Gerade zeigt eine konstante negative Beschleunigung — also gleichmäßiges Bremsen." },
        { text: "Das Fahrzeug fährt rückwärts.", correct: false, explanation: "Nicht unbedingt. Erst wenn v unter 0 sinkt, bewegt sich das Fahrzeug rückwärts." },
        { text: "Die Geschwindigkeit ist konstant.", correct: false, explanation: "Nein. Konstante Geschwindigkeit wäre eine flache, waagerechte Linie." },
        { text: "Das Fahrzeug bleibt stehen, sobald die Linie fällt.", correct: false, explanation: "Nein. Das Fahrzeug steht erst still, wenn v = 0 erreicht ist — am Ende der Linie." },
      ],
      xp: 75,
    },
    {
      label: "Beschleunigung dann konstant",
      description: "Ein Auto beschleunigt von 0 auf 15 m/s in 3 Sekunden, dann fährt es konstant.",
      segments: [{ v0: 0, v1: 15, t0: 0, t1: 3 }, { v0: 15, v1: 15, t0: 3, t1: 7 }],
      question: "Was passiert zwischen t = 3 s und t = 7 s?",
      options: [
        { text: "Das Auto fährt mit konstanter Geschwindigkeit von 15 m/s.", correct: true, explanation: "Genau! Die flache Linie ab t = 3 s zeigt: keine Beschleunigung mehr, gleichmäßige Fahrt." },
        { text: "Das Auto bremst langsam ab.", correct: false, explanation: "Nein. Abbremsen wäre eine fallende Linie — hier bleibt die Linie flach." },
        { text: "Das Auto beschleunigt weiterhin.", correct: false, explanation: "Nein. Weiter beschleunigen würde eine steigende Linie geben." },
        { text: "Das Auto steht still.", correct: false, explanation: "Nein. Stillstand wäre v = 0, aber hier ist v = 15 m/s konstant." },
      ],
      xp: 100,
    },
  ];

  let vtState = { questionIndex: 0, answered: false };

  const drawVTDiagram = (canvas, segments, highlightPhase = -1) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.getBoundingClientRect().width;
    const H = canvas.getBoundingClientRect().height;
    canvas.width = Math.max(1, Math.floor(W * ratio));
    canvas.height = Math.max(1, Math.floor(H * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const pad = { top: 18, right: 18, bottom: 36, left: 44 };
    const gW = W - pad.left - pad.right;
    const gH = H - pad.top - pad.bottom;

    const allT = segments.flatMap(s => [s.t0, s.t1]);
    const allV = segments.flatMap(s => [s.v0, s.v1]);
    const maxT = Math.max(...allT);
    const maxV = Math.max(...allV, 1);

    const tx = (t) => pad.left + (t / maxT) * gW;
    const ty = (v) => pad.top + gH - (v / maxV) * gH;

    ctx.fillStyle = "#f4f7fb";
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(0,0,0,0.07)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * gH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + gW, y); ctx.stroke();
    }
    for (let i = 0; i <= maxT; i++) {
      const x = tx(i);
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + gH); ctx.stroke();
    }

    // axes
    ctx.strokeStyle = "#171b21";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + gH); ctx.lineTo(pad.left + gW, pad.top + gH);
    ctx.stroke();

    // axis labels
    ctx.fillStyle = "#555";
    ctx.font = "600 10px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("t (s)", pad.left + gW / 2, H - 4);
    ctx.save(); ctx.translate(11, pad.top + gH / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText("v (m/s)", 0, 0); ctx.restore();

    // tick labels
    ctx.font = "500 9px Space Grotesk, sans-serif";
    ctx.fillStyle = "#777";
    for (let i = 0; i <= maxT; i++) {
      ctx.textAlign = "center";
      ctx.fillText(i, tx(i), pad.top + gH + 12);
    }
    const vStep = maxV / 4;
    for (let i = 0; i <= 4; i++) {
      ctx.textAlign = "right";
      ctx.fillText(Math.round(vStep * (4 - i)), pad.left - 4, pad.top + (i / 4) * gH + 3);
    }

    // segments
    segments.forEach((seg, idx) => {
      const isHL = highlightPhase === idx;
      ctx.strokeStyle = isHL ? "#ff6b35" : "#3b82f6";
      ctx.lineWidth = isHL ? 3.5 : 2.5;
      ctx.beginPath();
      ctx.moveTo(tx(seg.t0), ty(seg.v0));
      ctx.lineTo(tx(seg.t1), ty(seg.v1));
      ctx.stroke();

      // dots
      [{ t: seg.t0, v: seg.v0 }, { t: seg.t1, v: seg.v1 }].forEach(pt => {
        ctx.beginPath();
        ctx.arc(tx(pt.t), ty(pt.v), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isHL ? "#ff6b35" : "#3b82f6";
        ctx.fill();
      });
    });
  };

  const renderVTDiagramGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    vtState.questionIndex = 0;
    vtState.answered = false;

    const showVTQuestion = () => {
      const q = VT_QUESTIONS[vtState.questionIndex];
      vtState.answered = false;
      const isLast = vtState.questionIndex === VT_QUESTIONS.length - 1;

      siGameStage.innerHTML = `
        <section class="test-theory-page">
          <div class="test-theory-copy" style="margin-bottom:0.5rem">
            <p class="test-theory-kicker">v-t Diagramm · Frage ${vtState.questionIndex + 1} von ${VT_QUESTIONS.length} · ${q.xp} XP</p>
            <h3>${q.label}</h3>
            <p>${q.description}</p>
          </div>
          <canvas id="vt-canvas" style="width:100%;height:180px;border-radius:10px;display:block;margin:0.5rem 0 1rem"></canvas>
          <p style="font-weight:700;margin-bottom:0.75rem">${q.question}</p>
          <div id="vt-options" class="vt-options"></div>
          <p class="test-motion-feedback" id="vt-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="vt-next" type="button" hidden>${isLast ? "Fertig" : "Nächste Frage"}</button>
        </section>
      `;

      const canvas = siGameStage.querySelector("#vt-canvas");
      if (canvas instanceof HTMLCanvasElement) {
        window.requestAnimationFrame(() => drawVTDiagram(canvas, q.segments));
      }

      const optionsEl = siGameStage.querySelector("#vt-options");
      const feedbackEl = siGameStage.querySelector("#vt-feedback");
      const nextBtn = siGameStage.querySelector("#vt-next");

      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "vt-option-btn";
        btn.textContent = opt.text;
        btn.addEventListener("click", () => {
          if (vtState.answered) return;
          vtState.answered = true;
          optionsEl?.querySelectorAll(".vt-option-btn").forEach(b => { b.disabled = true; });
          if (opt.correct) {
            btn.classList.add("is-correct");
            if (feedbackEl) { feedbackEl.textContent = `✓ ${opt.explanation} +${q.xp} XP`; feedbackEl.className = "test-motion-feedback is-correct"; }
            awardPoints(q.xp);
          } else {
            btn.classList.add("is-wrong");
            const correctBtn = optionsEl?.querySelectorAll(".vt-option-btn")[q.options.findIndex(o => o.correct)];
            if (correctBtn) correctBtn.classList.add("is-correct");
            if (feedbackEl) { feedbackEl.textContent = `✗ ${opt.explanation}`; feedbackEl.className = "test-motion-feedback is-hint"; }
          }
          if (canvas instanceof HTMLCanvasElement) drawVTDiagram(canvas, q.segments);
          if (nextBtn instanceof HTMLButtonElement) nextBtn.hidden = false;
        });
        optionsEl?.appendChild(btn);
      });

      if (nextBtn instanceof HTMLButtonElement) {
        nextBtn.addEventListener("click", () => {
          if (vtState.questionIndex >= VT_QUESTIONS.length - 1) {
            markStepComplete("TEST", vtState.questionIndex + 2);
            siGameStage.innerHTML = `
              <section class="test-motion-complete">
                <h3>Diagramm-Profi!</h3>
                <p>Du kannst v-t-Diagramme sicher lesen und Bewegungsphasen erkennen.</p>
                <button class="si-jumpgame-button" id="vt-back" type="button">Zurück zum Pfad</button>
              </section>`;
            siGameStage.querySelector("#vt-back")?.addEventListener("click", closeSIGame);
            return;
          }
          vtState.questionIndex++;
          showVTQuestion();
        });
      }
    };

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Theorie</p>
          <h3>Das v-t-Diagramm verstehen</h3>
          <p>Im v-t-Diagramm siehst du auf der y-Achse die <strong>Geschwindigkeit</strong> (in m/s) und auf der x-Achse die <strong>Zeit</strong> (in s).</p>
          <p>Drei Muster sind entscheidend:</p>
          <ul style="line-height:1.9;padding-left:1.2rem">
            <li><strong>Waagerechte Linie:</strong> Gleichförmige Bewegung — v ist konstant, a = 0</li>
            <li><strong>Steigende Gerade:</strong> Gleichmäßige Beschleunigung — v wächst linear</li>
            <li><strong>Fallende Gerade:</strong> Gleichmäßige Verzögerung (Bremsen)</li>
          </ul>
          <p>Die <strong>Fläche</strong> unter dem Graphen gibt dir die zurückgelegte Strecke.</p>
        </div>
        <div class="test-theory-formula" aria-label="Merke">
          <span>Steigung = a &nbsp;|&nbsp; Fläche = s</span>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="vt-start" type="button">Zu den Fragen</button>
      </section>`;
    siGameStage.querySelector("#vt-start")?.addEventListener("click", showVTQuestion);
  };

  // ── Bremsweg berechnen ──────────────────────────────────────────────────────
  const BRAKE_TASKS = [
    { v0: 20, a: 4, answer: 50, xp: 100,
      hint: "Nutze s = v₀² / (2a). Mit v₀ = 20 m/s und a = 4 m/s²: s = 400/8 = 50 m." },
    { v0: 30, a: 6, answer: 75, xp: 100,
      hint: "s = v₀² / (2a) = 900 / 12 = 75 m." },
    { v0: 15, a: 3, answer: 37.5, xp: 125,
      hint: "s = v₀² / (2a) = 225 / 6 = 37.5 m." },
  ];
  let brakeState = { index: 0, hadError: false };

  const renderBrakeGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    brakeState.index = 0;
    brakeState.hadError = false;

    const showBrakeQuestion = () => {
      const task = BRAKE_TASKS[brakeState.index];
      const isLast = brakeState.index === BRAKE_TASKS.length - 1;

      siGameStage.innerHTML = `
        <section class="test-theory-page">
          <div class="test-theory-copy" style="margin-bottom:0.5rem">
            <p class="test-theory-kicker">Bremsweg · Aufgabe ${brakeState.index + 1} von ${BRAKE_TASKS.length} · ${task.xp} XP</p>
            <h3>Notbremsung!</h3>
            <p>Ein Fahrzeug fährt mit <strong>${task.v0} m/s</strong> und bremst mit einer konstanten Verzögerung von <strong>${task.a} m/s²</strong>.</p>
            <p>Wie lang ist der Bremsweg bis zum Stillstand?</p>
          </div>
          <div class="test-theory-formula" style="font-size:1.1rem">
            <span>s = v₀² / (2 · a)</span>
          </div>
          <div class="brake-car-visual" id="brake-visual" style="width:100%;height:80px;position:relative;margin:0.5rem 0">
            <canvas id="brake-canvas" style="width:100%;height:80px;border-radius:10px;display:block"></canvas>
          </div>
          <label class="test-motion-answer-label" for="brake-answer">Bremsweg in Metern</label>
          <div class="test-motion-answer-row">
            <input id="brake-answer" type="number" inputmode="decimal" placeholder="Antwort in m" step="0.1">
            <button class="si-jumpgame-button" id="brake-check" type="button">Prüfen</button>
          </div>
          <p class="test-motion-feedback" id="brake-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="brake-next" type="button" hidden>${isLast ? "Fertig" : "Nächste Frage"}</button>
        </section>`;

      // Draw simple brake animation
      const bCanvas = siGameStage.querySelector("#brake-canvas");
      if (bCanvas instanceof HTMLCanvasElement) {
        window.requestAnimationFrame(() => {
          const ctx = bCanvas.getContext("2d");
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          const W = bCanvas.getBoundingClientRect().width;
          const H = 80;
          bCanvas.width = Math.floor(W * ratio); bCanvas.height = Math.floor(H * ratio);
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          ctx.fillStyle = "#eef2f8"; ctx.fillRect(0, 0, W, H);
          // Road
          ctx.fillStyle = "#d0d7e2"; ctx.fillRect(0, 55, W, 25);
          // Skid marks
          ctx.strokeStyle = "#b0aaa0"; ctx.lineWidth = 3; ctx.setLineDash([6, 4]);
          ctx.beginPath(); ctx.moveTo(W * 0.3, 65); ctx.lineTo(W * 0.85, 65); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(W * 0.3, 71); ctx.lineTo(W * 0.85, 71); ctx.stroke();
          ctx.setLineDash([]);
          // Car body
          const cx = W * 0.25;
          ctx.fillStyle = "#ff6b35"; ctx.beginPath(); ctx.roundRect(cx - 28, 38, 56, 20, 4); ctx.fill();
          ctx.fillStyle = "#c84a1a"; ctx.beginPath(); ctx.roundRect(cx - 18, 30, 36, 14, 3); ctx.fill();
          // Wheels
          ctx.fillStyle = "#222";
          [[cx - 16, 58], [cx + 16, 58]].forEach(([wx, wy]) => {
            ctx.beginPath(); ctx.arc(wx, wy, 6, 0, Math.PI * 2); ctx.fill();
          });
          // Stop sign
          ctx.fillStyle = "#e53e3e"; ctx.beginPath(); ctx.arc(W * 0.88, 40, 14, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText("STOP", W * 0.88, 40);
          // Arrow
          ctx.strokeStyle = "#ff6b35"; ctx.lineWidth = 2; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(cx + 30, 48); ctx.lineTo(W * 0.73, 48); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(W * 0.73, 44); ctx.lineTo(W * 0.78, 48); ctx.lineTo(W * 0.73, 52); ctx.fillStyle = "#ff6b35"; ctx.fill();
          // Label
          ctx.fillStyle = "#555"; ctx.font = "600 10px Space Grotesk, sans-serif"; ctx.textAlign = "center";
          ctx.fillText(`v₀ = ${task.v0} m/s → Bremsweg = ?`, W / 2, 18);
        });
      }

      const answerInput = siGameStage.querySelector("#brake-answer");
      const feedbackEl = siGameStage.querySelector("#brake-feedback");
      const nextBtn = siGameStage.querySelector("#brake-next");
      let solved = false;

      const check = () => {
        if (solved) return;
        const val = Number(answerInput?.value);
        if (!Number.isFinite(val) || val === 0) {
          if (feedbackEl) { feedbackEl.textContent = "Gib eine Zahl ein (in Metern)."; feedbackEl.className = "test-motion-feedback is-hint"; }
          return;
        }
        if (Math.abs(val - task.answer) <= 0.6) {
          solved = true;
          if (answerInput instanceof HTMLInputElement) answerInput.disabled = true;
          if (feedbackEl) { feedbackEl.textContent = `✓ Richtig! Der Bremsweg ist ${task.answer} m. ${brakeState.hadError ? "" : `+${task.xp} XP`}`; feedbackEl.className = "test-motion-feedback is-correct"; }
          if (!brakeState.hadError) awardPoints(task.xp);
          if (nextBtn instanceof HTMLButtonElement) nextBtn.hidden = false;
        } else {
          brakeState.hadError = true;
          if (feedbackEl) { feedbackEl.textContent = `Nicht ganz. Tipp: ${task.hint}`; feedbackEl.className = "test-motion-feedback is-hint"; }
        }
      };

      siGameStage.querySelector("#brake-check")?.addEventListener("click", check);
      if (answerInput instanceof HTMLInputElement) {
        answerInput.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
        answerInput.focus();
      }
      if (nextBtn instanceof HTMLButtonElement) {
        nextBtn.addEventListener("click", () => {
          if (brakeState.index >= BRAKE_TASKS.length - 1) {
            markStepComplete("TEST", brakeState.index + 3);
            siGameStage.innerHTML = `
              <section class="test-motion-complete">
                <h3>Bremsexperte!</h3>
                <p>Du beherrschst den Bremsweg mit s = v₀² / (2a).</p>
                <button class="si-jumpgame-button" id="brake-back" type="button">Zurück zum Pfad</button>
              </section>`;
            siGameStage.querySelector("#brake-back")?.addEventListener("click", closeSIGame);
            return;
          }
          brakeState.index++;
          brakeState.hadError = false;
          showBrakeQuestion();
        });
      }
    };

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Theorie</p>
          <h3>Bremsweg berechnen</h3>
          <p>Wenn ein Fahrzeug mit der Anfangsgeschwindigkeit <strong>v₀</strong> gleichmäßig bremst, bis es steht, gilt:</p>
          <p>Das Fahrzeug hat keine Endgeschwindigkeit mehr (v = 0) und die Bremsbeschleunigung <strong>a</strong> wirkt entgegen der Fahrtrichtung.</p>
          <p>Aus den Bewegungsgleichungen lässt sich ableiten:</p>
        </div>
        <div class="test-theory-formula">
          <span>s = v₀² / (2 · a)</span>
        </div>
        <div class="test-theory-example">
          <p><strong>Beispiel:</strong> v₀ = 10 m/s, a = 5 m/s² → s = 100 / 10 = <strong>10 m</strong></p>
          <p>Verdoppelst du die Anfangsgeschwindigkeit, vervierfacht sich der Bremsweg!</p>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="brake-theory-start" type="button">Zu den Aufgaben</button>
      </section>`;
    siGameStage.querySelector("#brake-theory-start")?.addEventListener("click", showBrakeQuestion);
  };

  // ── Fehler finden ──────────────────────────────────────────────────────────
  const ERROR_QUESTIONS = [
    {
      kicker: "Fehler finden · Aufgabe 1 von 3 · 75 XP",
      situation: "Ein Schüler berechnet, wie weit ein Auto in 5 Sekunden bei 8 m/s fährt.",
      calculation: "s = v + t = 8 + 5 = 13 m",
      question: "Wo steckt der Fehler?",
      options: [
        { text: "Man muss v und t multiplizieren, nicht addieren: s = v · t = 40 m.", correct: true, explanation: "Genau! Die Formel lautet s = v · t. Addition ergibt physikalisch keinen Sinn — Einheiten wären m/s + s, was keine gültige Einheit ist." },
        { text: "Die Einheit der Geschwindigkeit fehlt.", correct: false, explanation: "Das wäre ein Formfehler, aber nicht der inhaltliche Denkfehler im Ergebnis." },
        { text: "Die Zeit muss quadriert werden: s = v · t².", correct: false, explanation: "Nein. Das gilt bei der beschleunigten Bewegung mit s = ½ · a · t², nicht hier." },
        { text: "Es gibt keinen Fehler — 13 m ist richtig.", correct: false, explanation: "Falsch. 8 m/s × 5 s = 40 m. Die Addition ist falsch." },
      ],
      xp: 75,
    },
    {
      kicker: "Fehler finden · Aufgabe 2 von 3 · 100 XP",
      situation: "Ein Schüler berechnet die Beschleunigung einer Rakete. Sie startet aus der Ruhe und erreicht nach 4 s eine Geschwindigkeit von 20 m/s.",
      calculation: "a = v · t = 20 · 4 = 80 m/s²",
      question: "Was hat der Schüler falsch gemacht?",
      options: [
        { text: "Man muss dividieren, nicht multiplizieren: a = v / t = 5 m/s².", correct: true, explanation: "Richtig! a = Δv / Δt = 20 / 4 = 5 m/s². Multiplizieren ergibt eine falsche Einheit (m/s · s = m)." },
        { text: "Die Anfangsgeschwindigkeit wurde vergessen.", correct: false, explanation: "v₀ = 0, also gilt Δv = v − v₀ = 20 − 0 = 20 m/s. Das ist korrekt berücksichtigt." },
        { text: "Das Ergebnis stimmt, nur die Einheit ist falsch.", correct: false, explanation: "Nein — sowohl Wert als auch Rechenoperation sind falsch." },
        { text: "Zeit und Geschwindigkeit müssen addiert werden: a = 20 + 4 = 24 m/s².", correct: false, explanation: "Nein. Addition von Geschwindigkeit und Zeit ergibt keine physikalisch sinnvolle Einheit." },
      ],
      xp: 100,
    },
    {
      kicker: "Fehler finden · Aufgabe 3 von 3 · 100 XP",
      situation: "Ein Schüler berechnet die Fallzeit eines Objekts, das aus 45 m Höhe fällt (g = 10 m/s²).",
      calculation: "h = ½ · g · t  →  t = h / (½ · g) = 45 / 5 = 9 s",
      question: "Was ist der Denkfehler?",
      options: [
        { text: "Die richtige Formel ist h = ½ · g · t². Man muss die Wurzel ziehen: t = √(2h/g) = √9 = 3 s.", correct: true, explanation: "Genau! Die Zeit steht im Quadrat: h = ½gt². Umgeformt: t = √(2h/g) = √(90/10) = √9 = 3 s." },
        { text: "g müsste 9.81 m/s² sein, dann stimmt das Ergebnis.", correct: false, explanation: "Der Wert g = 10 m/s² ist eine übliche Vereinfachung. Das Problem ist die fehlende Quadrat-Beziehung." },
        { text: "Man darf beim freien Fall keine Formeln benutzen.", correct: false, explanation: "Natürlich darf man — und muss man. Die Formel ist nur falsch angewendet worden." },
        { text: "Die Höhe muss durch g geteilt werden: t = h / g = 45 / 10 = 4.5 s.", correct: false, explanation: "Auch das ist falsch. Die korrekte Formel ist t = √(2h/g)." },
      ],
      xp: 100,
    },
  ];
  let errorState = { index: 0 };

  const renderErrorGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    errorState.index = 0;

    const showErrorQuestion = () => {
      const q = ERROR_QUESTIONS[errorState.index];
      const isLast = errorState.index === ERROR_QUESTIONS.length - 1;

      siGameStage.innerHTML = `
        <section class="test-theory-page">
          <div class="test-theory-copy" style="margin-bottom:0.5rem">
            <p class="test-theory-kicker">${q.kicker}</p>
            <h3>Finde den Fehler!</h3>
            <p>${q.situation}</p>
          </div>
          <div class="test-theory-formula" style="font-size:1rem;text-align:left;padding:0.9rem 1.2rem;line-height:1.7">
            <span style="font-family:monospace;white-space:pre-wrap">${q.calculation}</span>
          </div>
          <p style="font-weight:700;margin:0.8rem 0 0.5rem">${q.question}</p>
          <div id="error-options" class="vt-options"></div>
          <p class="test-motion-feedback" id="error-feedback" aria-live="polite"></p>
          <button class="si-jumpgame-button test-motion-next" id="error-next" type="button" hidden>${isLast ? "Fertig" : "Nächste Frage"}</button>
        </section>`;

      const optionsEl = siGameStage.querySelector("#error-options");
      const feedbackEl = siGameStage.querySelector("#error-feedback");
      const nextBtn = siGameStage.querySelector("#error-next");
      let answered = false;

      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "vt-option-btn";
        btn.textContent = opt.text;
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          optionsEl?.querySelectorAll(".vt-option-btn").forEach(b => { b.disabled = true; });
          if (opt.correct) {
            btn.classList.add("is-correct");
            if (feedbackEl) { feedbackEl.textContent = `✓ ${opt.explanation} +${q.xp} XP`; feedbackEl.className = "test-motion-feedback is-correct"; }
            awardPoints(q.xp);
          } else {
            btn.classList.add("is-wrong");
            const ci = q.options.findIndex(o => o.correct);
            optionsEl?.querySelectorAll(".vt-option-btn")[ci]?.classList.add("is-correct");
            if (feedbackEl) { feedbackEl.textContent = `✗ ${opt.explanation}`; feedbackEl.className = "test-motion-feedback is-hint"; }
          }
          if (nextBtn instanceof HTMLButtonElement) nextBtn.hidden = false;
        });
        optionsEl?.appendChild(btn);
      });

      if (nextBtn instanceof HTMLButtonElement) {
        nextBtn.addEventListener("click", () => {
          if (errorState.index >= ERROR_QUESTIONS.length - 1) {
            markStepComplete("TEST", errorState.index + 4);
            siGameStage.innerHTML = `
              <section class="test-motion-complete">
                <h3>Fehlerdetektiv!</h3>
                <p>Du erkennst typische Rechenfehler in der Kinematik sicher.</p>
                <button class="si-jumpgame-button" id="error-back" type="button">Zurück zum Pfad</button>
              </section>`;
            siGameStage.querySelector("#error-back")?.addEventListener("click", closeSIGame);
            return;
          }
          errorState.index++;
          showErrorQuestion();
        });
      }
    };

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Theorie</p>
          <h3>Typische Rechenfehler erkennen</h3>
          <p>In der Kinematik passieren immer wieder dieselben Denkfehler:</p>
          <ul style="line-height:1.9;padding-left:1.2rem">
            <li><strong>Addieren statt Multiplizieren</strong> bei s = v · t</li>
            <li><strong>Multiplizieren statt Dividieren</strong> bei a = Δv / Δt</li>
            <li><strong>t vergessen zu quadrieren</strong> bei s = ½ · a · t²</li>
            <li><strong>Einheiten nicht prüfen</strong> — ein Einheitencheck deckt viele Fehler auf</li>
          </ul>
          <p>Ein guter Trick: Prüfe immer, ob die Einheiten beider Seiten übereinstimmen!</p>
        </div>
        <div class="test-theory-formula" style="font-size:0.95rem;text-align:left;padding:0.8rem 1.2rem">
          <span>[s] = m &nbsp;·&nbsp; [v · t] = m/s · s = m ✓</span>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="error-theory-start" type="button">Fehler jagen</button>
      </section>`;
    siGameStage.querySelector("#error-theory-start")?.addEventListener("click", showErrorQuestion);
  };

  // ── Freier Fall ─────────────────────────────────────────────────────────────
  const FALL_TASKS = [
    { h: 20, g: 10, answerT: 2, answerV: 20, xp: 100,
      hintT: "t = √(2h/g) = √(40/10) = √4 = 2 s",
      hintV: "v = g · t = 10 · 2 = 20 m/s" },
    { h: 45, g: 10, answerT: 3, answerV: 30, xp: 125,
      hintT: "t = √(2h/g) = √(90/10) = √9 = 3 s",
      hintV: "v = g · t = 10 · 3 = 30 m/s" },
    { h: 80, g: 10, answerT: 4, answerV: 40, xp: 150,
      hintT: "t = √(2h/g) = √(160/10) = √16 = 4 s",
      hintV: "v = g · t = 10 · 4 = 40 m/s" },
  ];
  let fallState = { index: 0, phase: "time", hadError: false };

  const renderFallGame = () => {
    if (!(siGameStage instanceof HTMLElement)) return;
    fallState.index = 0;
    fallState.hadError = false;

    const showFallQuestion = () => {
      const task = FALL_TASKS[fallState.index];
      const isLastTask = fallState.index === FALL_TASKS.length - 1;
      fallState.phase = "time";

      const render = () => {
        const isTimePhase = fallState.phase === "time";
        siGameStage.innerHTML = `
          <section class="test-theory-page">
            <div class="test-theory-copy" style="margin-bottom:0.5rem">
              <p class="test-theory-kicker">Freier Fall · Aufgabe ${fallState.index + 1} von ${FALL_TASKS.length} · ${task.xp} XP</p>
              <h3>Fall aus ${task.h} m Höhe</h3>
              <p>Ein Objekt fällt aus der Ruhe (v₀ = 0) aus einer Höhe von <strong>${task.h} m</strong>.</p>
              <p>Die Erdbeschleunigung beträgt g = ${task.g} m/s² (Luftwiderstand vernachlässigt).</p>
            </div>
            <canvas id="fall-canvas" style="width:100%;height:130px;border-radius:10px;display:block;margin:0.5rem 0"></canvas>
            <div class="test-theory-formula" style="font-size:0.95rem;text-align:left;padding:0.7rem 1.2rem">
              <span>h = ½ · g · t² &nbsp;&nbsp;|&nbsp;&nbsp; v = g · t</span>
            </div>
            ${isTimePhase
              ? `<p style="font-weight:700;margin:0.6rem 0 0.4rem">Frage 1: Wie lange fällt das Objekt? (in Sekunden)</p>`
              : `<p style="font-weight:700;margin:0.6rem 0 0.4rem">Frage 2: Mit welcher Geschwindigkeit trifft es auf? (in m/s)</p>`
            }
            <div class="test-motion-answer-row">
              <input id="fall-answer" type="number" inputmode="decimal" placeholder="${isTimePhase ? "Zeit in s" : "Geschwindigkeit in m/s"}" step="0.1">
              <button class="si-jumpgame-button" id="fall-check" type="button">Prüfen</button>
            </div>
            <p class="test-motion-feedback" id="fall-feedback" aria-live="polite"></p>
            <button class="si-jumpgame-button test-motion-next" id="fall-next" type="button" hidden>${!isTimePhase && isLastTask ? "Fertig" : "Weiter"}</button>
          </section>`;

        const fc = siGameStage.querySelector("#fall-canvas");
        if (fc instanceof HTMLCanvasElement) {
          window.requestAnimationFrame(() => {
            const ctx = fc.getContext("2d");
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const W = fc.getBoundingClientRect().width;
            const H = 130;
            fc.width = Math.floor(W * ratio); fc.height = Math.floor(H * ratio);
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            ctx.fillStyle = "#e8f4fd"; ctx.fillRect(0, 0, W, H);
            // Sky gradient
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, "#c8e6ff"); grad.addColorStop(1, "#eef2f8");
            ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
            // Ground
            ctx.fillStyle = "#8ab87d"; ctx.fillRect(0, H - 18, W, 18);
            ctx.fillStyle = "#6a9460"; ctx.fillRect(0, H - 18, W, 4);
            // Height marker
            ctx.strokeStyle = "#aaa"; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
            const objX = W * 0.3;
            ctx.beginPath(); ctx.moveTo(objX, 22); ctx.lineTo(objX, H - 18); ctx.stroke();
            ctx.setLineDash([]);
            // Arrow
            ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(objX + 18, 22); ctx.lineTo(objX + 18, H - 35); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(objX + 13, H - 38); ctx.lineTo(objX + 18, H - 30); ctx.lineTo(objX + 23, H - 38); ctx.fillStyle = "#3b82f6"; ctx.fill();
            // Height label
            ctx.fillStyle = "#3b82f6"; ctx.font = "700 12px Space Grotesk, sans-serif"; ctx.textAlign = "left";
            ctx.fillText(`h = ${task.h} m`, objX + 25, H / 2 + 4);
            // Ball
            const ballY = isTimePhase ? 22 : H - 30;
            ctx.beginPath(); ctx.arc(objX, ballY, 10, 0, Math.PI * 2);
            const ballGrad = ctx.createRadialGradient(objX - 3, ballY - 3, 1, objX, ballY, 10);
            ballGrad.addColorStop(0, "#ff9f5a"); ballGrad.addColorStop(1, "#e05a1a");
            ctx.fillStyle = ballGrad; ctx.fill();
            // Phase indicator
            ctx.fillStyle = "#555"; ctx.font = "600 10px Space Grotesk, sans-serif"; ctx.textAlign = "center";
            ctx.fillText(isTimePhase ? "Objekt am Start (oben)" : "Objekt kurz vor dem Aufprall", W * 0.65, H / 2);
          });
        }

        const answerInput = siGameStage.querySelector("#fall-answer");
        const feedbackEl = siGameStage.querySelector("#fall-feedback");
        const nextBtn = siGameStage.querySelector("#fall-next");
        let solved = false;

        const check = () => {
          if (solved) return;
          const val = Number(answerInput?.value);
          if (!Number.isFinite(val) || val <= 0) {
            if (feedbackEl) { feedbackEl.textContent = "Gib eine positive Zahl ein."; feedbackEl.className = "test-motion-feedback is-hint"; }
            return;
          }
          const correct = isTimePhase ? task.answerT : task.answerV;
          const hint = isTimePhase ? task.hintT : task.hintV;
          if (Math.abs(val - correct) <= 0.1) {
            solved = true;
            if (answerInput instanceof HTMLInputElement) answerInput.disabled = true;
            const pts = Math.round(task.xp / 2);
            if (!fallState.hadError) awardPoints(pts);
            if (feedbackEl) {
              feedbackEl.textContent = `✓ Richtig! ${isTimePhase ? `Fallzeit = ${task.answerT} s.` : `Aufprallgeschwindigkeit = ${task.answerV} m/s.`} ${!fallState.hadError ? `+${pts} XP` : ""}`;
              feedbackEl.className = "test-motion-feedback is-correct";
            }
            if (nextBtn instanceof HTMLButtonElement) nextBtn.hidden = false;
          } else {
            fallState.hadError = true;
            if (feedbackEl) { feedbackEl.textContent = `Nicht ganz. Tipp: ${hint}`; feedbackEl.className = "test-motion-feedback is-hint"; }
          }
        };

        siGameStage.querySelector("#fall-check")?.addEventListener("click", check);
        if (answerInput instanceof HTMLInputElement) {
          answerInput.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
          answerInput.focus();
        }
        if (nextBtn instanceof HTMLButtonElement) {
          nextBtn.addEventListener("click", () => {
            if (isTimePhase) {
              fallState.phase = "velocity";
              fallState.hadError = false;
              render();
              return;
            }
            if (fallState.index >= FALL_TASKS.length - 1) {
              markStepComplete("TEST", fallState.index + 5);
              siGameStage.innerHTML = `
                <section class="test-motion-complete">
                  <h3>Schwerkraft-Kenner!</h3>
                  <p>Du berechnest Fallzeit und Aufprallgeschwindigkeit sicher mit h = ½gt² und v = g·t.</p>
                  <button class="si-jumpgame-button" id="fall-back" type="button">Zurück zum Pfad</button>
                </section>`;
              siGameStage.querySelector("#fall-back")?.addEventListener("click", closeSIGame);
              return;
            }
            fallState.index++;
            fallState.hadError = false;
            showFallQuestion();
          });
        }
      };

      render();
    };

    siGameStage.innerHTML = `
      <section class="test-theory-page">
        <div class="test-theory-copy">
          <p class="test-theory-kicker">Theorie</p>
          <h3>Freier Fall</h3>
          <p>Wenn ein Objekt aus der Ruhe (v₀ = 0) fällt und wir den Luftwiderstand ignorieren, wirkt nur die Erdbeschleunigung:</p>
          <p style="text-align:center;font-size:1.1rem;font-weight:700;margin:0.4rem 0">g ≈ 9.81 m/s² &nbsp; (vereinfacht: 10 m/s²)</p>
          <p>Da die Beschleunigung konstant ist, gelten die Formeln der gleichmäßig beschleunigten Bewegung:</p>
          <ul style="line-height:1.9;padding-left:1.2rem">
            <li><strong>Fallzeit:</strong> h = ½ · g · t² &nbsp;→&nbsp; t = √(2h / g)</li>
            <li><strong>Aufprallgeschwindigkeit:</strong> v = g · t</li>
          </ul>
          <p>Der freie Fall ist ein Spezialfall der gleichmäßig beschleunigten Bewegung — nur in der Vertikalen!</p>
        </div>
        <div class="test-theory-formula">
          <span>t = √(2h / g)</span>
        </div>
        <button class="si-jumpgame-button test-theory-start" id="fall-theory-start" type="button">Zu den Aufgaben</button>
      </section>`;
    siGameStage.querySelector("#fall-theory-start")?.addEventListener("click", showFallQuestion);
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
        markStepComplete("0", 0);
        checkModuleComplete("0");
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
    const isSprintScanner = moduleId === "TEST" && step.title === "K1 - Sprint-Scanner";
    const isOvertakeDuel = moduleId === "TEST" && step.title === "K2 - Überhol-Duell";
    const isVTDiagramPanel = moduleId === "TEST" && step.title === "v-t Diagramm lesen";
    const isBrakePanel = moduleId === "TEST" && step.title === "Bremsweg berechnen";
    const isErrorPanel = moduleId === "TEST" && step.title === "Fehler finden";
    const isFreeFallPanel = moduleId === "TEST" && step.title === "Freier Fall";

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

    if (isVTDiagramPanel) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>v-t Diagramm</strong></h3>
          <p class="side-text">Die <strong>Steigung</strong> der Linie gibt die Beschleunigung an:</p>
          <p class="side-eq">\\[a = \\frac{\\Delta v}{\\Delta t}\\]</p>
          <p class="side-text">Die <strong>Fläche</strong> unter dem Graphen ergibt die zurückgelegte Strecke:</p>
          <p class="side-eq">\\[s = v \\cdot t \\quad \\text{(bei konst. } v\\text{)}\\]</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Drei Muster</strong></h3>
          <p class="side-text">Waagerecht → konstante Geschwindigkeit (a = 0)</p>
          <p class="side-text">Steigend → positive Beschleunigung</p>
          <p class="side-text">Fallend → Verzögerung (Bremsen)</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isBrakePanel) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Bremsweg</strong></h3>
          <p class="side-text">Aus \\(v^2 = v_0^2 - 2as\\) mit \\(v = 0\\) folgt:</p>
          <p class="side-eq">\\[s = \\frac{v_0^2}{2a}\\]</p>
          <p class="side-text">Verdoppelst du \\(v_0\\), vervierfacht sich der Bremsweg!</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Praxisbeispiel</strong></h3>
          <p class="side-text">Bei Tempo 50 (≈ 14 m/s) und \\(a = 7\\,\\mathrm{m/s^2}\\) beträgt der Bremsweg nur ca. 14 m.</p>
          <p class="side-text">Bei Tempo 100 sind es bereits 4× so viel — deshalb gilt im Straßenverkehr: Halber Abstand, doppeltes Risiko!</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isErrorPanel) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Einheitencheck</strong></h3>
          <p class="side-text">Ein guter Trick: Prüfe die Einheiten auf beiden Seiten.</p>
          <p class="side-eq">\\[s = v \\cdot t \\Rightarrow [\\mathrm{m}] = \\frac{\\mathrm{m}}{\\mathrm{s}} \\cdot \\mathrm{s} \\; ✓\\]</p>
          <p class="side-text">Wenn die Einheiten nicht passen, ist die Formel falsch angewendet.</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Häufige Fehler</strong></h3>
          <p class="side-text">+ statt × bei \\(s = v \\cdot t\\)</p>
          <p class="side-text">× statt ÷ bei \\(a = \\Delta v / \\Delta t\\)</p>
          <p class="side-text">\\(t\\) nicht quadriert bei \\(s = \\frac{1}{2}at^2\\)</p>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    if (isFreeFallPanel) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Freier Fall</strong></h3>
          <p class="side-text">Spezialfall: \\(v_0 = 0\\), nur Schwerkraft wirkt.</p>
          <p class="side-eq">\\[h = \\frac{1}{2} g t^2\\]</p>
          <p class="side-eq">\\[t = \\sqrt{\\frac{2h}{g}}\\]</p>
          <p class="side-eq">\\[v = g \\cdot t\\]</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>Merke</strong></h3>
          <p class="side-text">\\(g \\approx 9{,}81\\,\\mathrm{m/s^2}\\) — vereinfacht oft \\(10\\,\\mathrm{m/s^2}\\)</p>
          <p class="side-text">Masse spielt keine Rolle (Galilei)! Schwere und leichte Objekte fallen gleich schnell.</p>
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

    const isCoordSide = moduleId === "0" && step.title === "Funktionen und Koordinatensysteme";
    const isSVSide = moduleId === "0" && step.title === "Skalar und Vektoren";
    const isRefSide = moduleId === "0" && step.title === "Bezugssystem";
    const isPosSide = moduleId === "0" && step.title === "Position";
    const isDispSide = moduleId === "0" && step.title === "Strecke und Verschiebung";

    if (isCoordSide) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Koordinatensystem</strong></h3>
          <p class="side-text">Im <strong>s-t-Diagramm</strong> steht t auf der x-Achse (Zeit) und s auf der y-Achse (Position).</p>
          <p class="side-eq">\\[s = f(t)\\]</p>
          <p class="side-text">Die Steigung der Kurve entspricht der Geschwindigkeit \\(v\\).</p>
        </article>
      `;
    } else if (isSVSide) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Skalar vs. Vektor</strong></h3>
          <p class="side-text"><strong>Skalar:</strong> nur Betrag (z.B. Masse \\(m\\), Zeit \\(t\\), Temperatur \\(T\\))</p>
          <p class="side-text"><strong>Vektor:</strong> Betrag + Richtung (z.B. \\(\\vec{v}\\), \\(\\vec{F}\\), \\(\\vec{\\Delta s}\\))</p>
          <p class="side-eq">\\[\\vec{v} = v \\cdot \\hat{e}\\]</p>
        </article>
      `;
    } else if (isRefSide) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Bezugssystem</strong></h3>
          <p class="side-text">Geschwindigkeiten von entgegengesetzt fahrenden Objekten addieren sich:</p>
          <p class="side-eq">\\[v_{\\text{rel}} = v_A + v_B\\]</p>
          <p class="side-text">Gleichgerichtete Objekte: \\(v_{\\text{rel}} = |v_A - v_B|\\)</p>
        </article>
      `;
    } else if (isPosSide) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Position</strong></h3>
          <p class="side-text">Die neue Position nach einer Verschiebung:</p>
          <p class="side-eq">\\[s = s_0 + \\Delta s\\]</p>
          <p class="side-text">Dabei ist \\(s_0\\) die Startposition und \\(\\Delta s\\) die Verschiebung.</p>
        </article>
      `;
    } else if (isDispSide) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>Strecke & Verschiebung</strong></h3>
          <p class="side-text"><strong>Strecke</strong> = gesamter zurückgelegter Weg (Skalar)</p>
          <p class="side-text"><strong>Verschiebung</strong> = Differenz zwischen End- und Startposition (Vektor)</p>
          <p class="side-eq">\\[\\Delta s = s_{\\text{end}} - s_0\\]</p>
        </article>
      `;
    } else {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>${step.title}</strong></h3>
          <p class="side-text">Zusammenfassung folgt hier.</p>
        </article>
      `;
    }
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

    activeStepIndex = stepIndex;

    if (siGameKicker instanceof HTMLElement) {
      siGameKicker.textContent = `Module ${activeModuleId} Game`;
    }
    if (siGameTitle instanceof HTMLElement) {
      siGameTitle.textContent = step.title;
    }

    if (activeModuleId === "0" && stepIndex === 0 && !gameProgress.badges.includes("first_step")) {
      awardBadge("first_step");
    }

    const isSIUnits = activeModuleId === "0" && step.title === "SI-Einheiten";
    const isCoordinates = activeModuleId === "0" && stepIndex === 1;
    const isScalarVector = activeModuleId === "0" && stepIndex === 2;
    const isReferenceFrame = activeModuleId === "0" && stepIndex === 3;
    const isPosition = activeModuleId === "0" && stepIndex === 4;
    const isDisplacement = activeModuleId === "0" && stepIndex === 5;
    const isTestUniformMotion = activeModuleId === "TEST" && step.title === "Gleichförmige Bewegung";
    const isCatchUpMotion = activeModuleId === "TEST" && step.title === "Aufholen";
    const isAccelerationMotion = activeModuleId === "TEST" && step.title === "Beschleunigung";
    const isSprintScanner = activeModuleId === "TEST" && step.title === "K1 - Sprint-Scanner";
    const isOvertakeDuel = activeModuleId === "TEST" && step.title === "K2 - Überhol-Duell";
    const isVTDiagram = activeModuleId === "TEST" && step.title === "v-t Diagramm lesen";
    const isBrakeCalc = activeModuleId === "TEST" && step.title === "Bremsweg berechnen";
    const isErrorFind = activeModuleId === "TEST" && step.title === "Fehler finden";
    const isFreeFall = activeModuleId === "TEST" && step.title === "Freier Fall";
    if (isSIUnits) {
      renderSIUnitsTutorial();
    } else if (isCoordinates) {
      stopSIUnitsJumpGame();
      renderCoordinatesGame();
    } else if (isScalarVector) {
      stopSIUnitsJumpGame();
      renderScalarVectorGame();
    } else if (isReferenceFrame) {
      stopSIUnitsJumpGame();
      renderReferenceFrameGame();
    } else if (isPosition) {
      stopSIUnitsJumpGame();
      renderPositionGame();
    } else if (isDisplacement) {
      stopSIUnitsJumpGame();
      renderDisplacementGame();
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
    } else if (isVTDiagram) {
      renderVTDiagramGame();
    } else if (isBrakeCalc) {
      renderBrakeGame();
    } else if (isErrorFind) {
      renderErrorGame();
    } else if (isFreeFall) {
      renderFallGame();
    } else {
      stopSIUnitsJumpGame();
      stopTestMotionGame();
      stopCatchUpGame();
      stopAccelerationGame();
      stopSprintGame();
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
