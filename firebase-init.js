// Verbindet das Spiel mit deinem Firebase-Projekt
const firebaseConfig = {
  apiKey: "AIzaSyBJ-tg1XhldhyN0ra6fXobi237_kk3WkOQ",
  authDomain: "kinematik-3323f.firebaseapp.com",
  projectId: "kinematik-3323f",
  storageBucket: "kinematik-3323f.firebasestorage.app",
  messagingSenderId: "27875187619",
  appId: "1:27875187619:web:391afe4e9fa1f636fe1816",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Wie viel XP für den nächsten Levelaufstieg nötig ist (steigt pro Level leicht an)
function xpForLevel(level) {
  return 100 + (level - 1) * 50;
}

// Rechnet aus der Gesamt-XP eines Spielers das aktuelle Level aus
function calculateLevel(totalXp) {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: xpForLevel(level) };
}

// Speichert Fortschritt + XP des eingeloggten Spielers in der Datenbank
async function saveProgressToFirestore(moduleState, totalXp) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await db.collection("players").doc(user.uid).set(
      { moduleState, totalXp, updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
  }
}

// Holt den gespeicherten Fortschritt des eingeloggten Spielers
async function loadProgressFromFirestore() {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    const doc = await db.collection("players").doc(user.uid).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    return null;
  }
}

function registerPlayer(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
function loginPlayer(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
function logoutPlayer() {
  return auth.signOut();
}