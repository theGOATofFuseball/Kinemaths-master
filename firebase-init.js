// Verbindet das Spiel mit deinem Firebase-Projekt
const meineFirebaseEinstellungen = {
  apiKey: "AIzaSyBJ-tg1XhldhyN0ra6fXobi237_kk3WkOQ",
  authDomain: "kinematik-3323f.firebaseapp.com",
  projectId: "kinematik-3323f",
  storageBucket: "kinematik-3323f.firebasestorage.app",
  messagingSenderId: "27875187619",
  appId: "1:27875187619:web:391afe4e9fa1f636fe1816",
};

firebase.initializeApp(meineFirebaseEinstellungen);
const anmeldedienst = firebase.auth();
const datenbank = firebase.firestore();

// Wie viel XP für den nächsten Levelaufstieg nötig ist (steigt pro Level leicht an)
function xpProLevel(level) {
  return 100 + (level - 1) * 50;
}

// Rechnet aus der Gesamt-XP eines Spielers das aktuelle Level aus
function levelBerechnen(gesamtXp) {
  let level = 1;
  let remaining = gesamtXp;
  while (remaining >= xpProLevel(level)) {
    remaining -= xpProLevel(level);
    level += 1;
  }
  return { level, xpImAktuellenLevel: remaining, xpFuerNaechstesLevel: xpProLevel(level) };
}

// Speichert Fortschritt + XP des eingeloggten Spielers in der Datenbank
async function fortschrittSpeichern(moduleState, gesamtXp) {
  const user = anmeldedienst.currentUser;
  if (!user) return;
  try {
    await datenbank.collection("spieler").doc(user.uid).set(
      { moduleState, gesamtXp, updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
  }
}

// Holt den gespeicherten Fortschritt des eingeloggten Spielers
async function fortschrittLaden() {
  const user = anmeldedienst.currentUser;
  if (!user) return null;
  try {
    const doc = await datenbank.collection("spieler").doc(user.uid).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    return null;
  }
}

function spielerRegistrieren(email, password) {
  return anmeldedienst.createUserWithEmailAndPassword(email, password);
}
function spielerEinloggen(email, password) {
  return anmeldedienst.signInWithEmailAndPassword(email, password);
}
function spielerAusloggen() {
  return anmeldedienst.signOut();
}
// Zeigt das Anmeldefenster. Ruft wennErfolgreich() auf, sobald der Spieler eingeloggt ist.
function anmeldefensterAnzeigen(wennErfolgreich) {
  const vorhanden = document.getElementById("login-overlay");
  if (vorhanden) vorhanden.remove();

  const fenster = document.createElement("div");
  fenster.id = "login-overlay";
  fenster.innerHTML = `
    <div class="login-box">
      <h2>Anmelden</h2>
      <p class="login-hint">Melde dich an oder erstelle ein Profil, um deinen Fortschritt zu speichern.</p>
      <input type="email" id="login-email" placeholder="E-Mail" autocomplete="email" />
      <input type="password" id="login-password" placeholder="Passwort" autocomplete="current-password" />
      <div class="login-error" id="login-error"></div>
      <div class="login-buttons">
        <button id="login-btn" type="button">Einloggen</button>
        <button id="register-btn" type="button">Registrieren</button>
      </div>
    </div>
  `;

  document.body.appendChild(fenster);
  anmeldefensterStilEinfuegen();

  const emailFeld = document.getElementById("login-email");
  const passwortFeld = document.getElementById("login-password");
  const fehlerAnzeige = document.getElementById("login-error");

  const anmeldungVerarbeiten = async (modus) => {
    const email = emailFeld.value.trim();
    const passwort = passwortFeld.value;
    fehlerAnzeige.textContent = "";

    if (!email || !passwort) {
      fehlerAnzeige.textContent = "Bitte E-Mail und Passwort eingeben.";
      return;
    }

    try {
      if (modus === "login") {
        await spielerEinloggen(email, passwort);
      } else {
        await spielerRegistrieren(email, passwort);
      }
      fenster.remove();
      wennErfolgreich();
    } catch (error) {
      fehlerAnzeige.textContent = fehlermeldungUebersetzen(error.code);
    }
  };

  document.getElementById("login-btn").addEventListener("click", () => anmeldungVerarbeiten("login"));
  document.getElementById("register-btn").addEventListener("click", () => anmeldungVerarbeiten("register"));
}

// Übersetzt die häufigsten Firebase-Fehlermeldungen ins Deutsche
function fehlermeldungUebersetzen(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Diese E-Mail-Adresse ist ungültig.";
    case "auth/user-not-found":
      return "Kein Konto mit dieser E-Mail gefunden. Registrier dich zuerst.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Falsches Passwort.";
    case "auth/email-already-in-use":
      return "Diese E-Mail wird bereits verwendet. Logg dich stattdessen ein.";
    case "auth/weak-password":
      return "Das Passwort muss mindestens 6 Zeichen lang sein.";
    default:
      return "Etwas ist schiefgelaufen. Versuch es nochmal.";
  }
}

// Fügt einmalig das CSS für das Anmeldefenster ein, passend zu deinem bestehenden Farbschema
function anmeldefensterStilEinfuegen() {
  if (document.getElementById("login-overlay-styles")) return;

  const stil = document.createElement("style");
  stil.id = "login-overlay-styles";
  stil.textContent = `
    #login-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 17, 19, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .login-box {
      background: var(--bg-1, #fdfefe);
      color: var(--ink, #0f1113);
      border: 3px solid var(--ink, #0f1113);
      border-radius: 28px;
      padding: 40px;
      width: min(420px, 92vw);
      box-shadow: 0 20px 50px rgba(8,10,13,0.25);
      font-family: "Nunito", sans-serif;
    }
    .login-box h2 { margin: 0 0 10px; font-size: 1.8rem; font-weight: 900; }
    .login-hint { margin: 0 0 22px; font-size: 1rem; color: var(--muted, #3e4b5b); }
    .login-box input {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 16px;
      margin-bottom: 14px;
      border-radius: 16px;
      border: 2px solid var(--line, rgba(98,106,116,0.24));
      font-size: 1.05rem;
      font-family: "Nunito", sans-serif;
    }
    .login-error { color: #c0392b; font-size: 0.9rem; min-height: 1.2em; margin-bottom: 10px; font-weight: 700; }
    .login-buttons { display: flex; gap: 12px; }
    .login-buttons button {
      flex: 1;
      padding: 14px;
      border-radius: 16px;
      border: none;
      cursor: pointer;
      font-weight: 800;
      font-size: 1.05rem;
      font-family: "Nunito", sans-serif;
    }
    #login-btn { background: #4caf50; color: #fff; }
    #register-btn {
      background: transparent;
      border: 2px solid var(--ink, #0f1113);
      color: var(--ink, #0f1113);
    }
  `;
  document.head.appendChild(stil);
}
