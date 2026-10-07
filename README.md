# Profil-System, XP-Fix, Level 25, Levelaufstiegs-Animation, Test-Modul-Entfernung

## 1. Der ursprüngliche Bug: "alles ist freigeschaltet"

Dein Freischalt-System war inhaltlich richtig gebaut, aber `index.html` hatte
bei den Modul-Karten 0–5 hartcodierte `data-progress="100"`-Platzhalter
(Reste aus der Entwicklung). Behoben: alle auf `"0"` gesetzt.

## 2. NEUER Bug (aus deiner letzten Nachricht): XP beim Öffnen statt beim Lösen

Das war ein echter, tieferliegender Fehler: `handleNodeClick` rief beim
blossen Anklicken eines Pfad-Knotens `setActiveStep(index)` auf – und genau
diese Funktion hat gleichzeitig den Fortschritt (`maxReached`) erhöht UND XP
vergeben. Öffnen einer Aufgabe = XP bekommen, unabhängig davon, ob man sie
löst.

**Fix – sauber getrennt in zwei Funktionen:**

- `setActiveStep(index)` – wird beim Anklicken eines Knotens aufgerufen,
  setzt nur noch die **Ansicht** (welcher Schritt gerade angezeigt wird).
  Keine XP, kein Fortschritt.
- `markiereAufgabeGeloest(stepIndex, schwierigkeit)` – wird jetzt ausschliesslich
  in `showModuleComplete` aufgerufen, also erst in dem Moment, in dem der
  "... gemeistert!"-Bildschirm nach einer **tatsächlich gelösten** Aufgabe
  erscheint. Nur hier wird `maxReached` erhöht und XP vergeben. Ein erneutes
  Lösen über "Nochmal üben" vergibt keine doppelten XP (wird per
  `stepIndex < state.maxReached`-Prüfung verhindert).

Die Schwierigkeit (Basis/Challenge/interaktiv) wird jetzt vom
Schwierigkeits-Auswahlbildschirm (`showDifficultyPicker`) bis zum
Abschluss-Bildschirm durchgereicht, damit die richtige XP-Menge vergeben
werden kann.

Als Nebeneffekt wurde auch die Fortschrittsberechnung (`getModulePercent`)
korrigiert: Sie basiert jetzt direkt auf der Anzahl **gelöster** Aufgaben
geteilt durch die Gesamtzahl der Aufgaben im Modul, statt auf einer
Zwischenschritte-Formel, die eigentlich fürs blosse Ansehen gedacht war.

## 3. Neue XP-Beträge (von mir berechnet)

Ich habe deinen kompletten Aufgabenbestand durchgezählt:

- **56 Aufgaben** haben eine Basis/Challenge-Auswahl (Multiple-Choice-Fragen)
- **24 Aufgaben** sind interaktive Simulationen oder einfache Rechen-/Diagramm-Aufgaben
  ohne Schwierigkeitswahl (Speed-Lab, Race, ST-Live, Accel-Lab, VT-Live, sowie
  einzelne Calc-/Chart-/Matter-Aufgaben ohne Basis/Challenge-Splitting)
- Macht zusammen **80 Aufgaben** im ganzen Spiel

XP-Vergabe:
- Basis-Aufgabe gelöst: **10 XP**
- Challenge-Aufgabe gelöst: **20 XP** (doppelt so viel wie Basis)
- Interaktive/einfache Aufgabe (keine Schwierigkeitswahl vorhanden): **15 XP**

## 4. Level-System: neu bis Level 25

Maximal erreichbare XP, wenn wirklich **jede** Aufgabe mit Challenge (bzw.
bei den 24 Aufgaben ohne Wahl mit der interaktiven Belohnung) gelöst wird:

```
56 × 20 XP + 24 × 15 XP = 1120 + 360 = 1480 XP
```

Die 24 Level-Schwellen sind exakt so gewählt, dass ihre Summe **1480**
ergibt – man erreicht also **exakt Level 25**, wenn wirklich alles per
Challenge gelöst wurde:

```
24, 27, 30, 35, 38, 41, 44, 47, 51, 54, 57, 60,
63, 67, 70, 73, 76, 79, 83, 86, 89, 92, 95, 99
```

Zur Einordnung: Wer alles nur mit Basis-Aufgaben löst (56×10 + 24×15 = 920
XP), landet bei **Level 18** – immer noch eine solide Leistung (Diamant-Stufe),
aber Challenge lohnt sich spürbar mehr. Beide Werte wurden per Testskript
nachgerechnet und bestätigt.

## 5. Farbstufen (erweitert)

- Level 1–9: Grün
- Level 10–14: Gold
- Level 15–19: Diamant-Blau
- **Level 20–24: Smaragdgrün (neu)**
- **Level 25: Dunkelrot mit schwarzem Rand (neu, "legendär")**

Überall konsistent eingebaut: Profil-Chip-Badge, XP-Balken im Profilfenster,
Levelaufstiegs-Animation und der permanente Seitenhintergrund.

## 6. Levelaufstiegs-Animation

Bei jedem Levelaufstieg (jetzt korrekt erst nach echtem Lösen einer Aufgabe
ausgelöst): 3 Sekunden vollflächige Animation mit abgedunkeltem Screen,
rotierenden Strahlen von der Mitte nach aussen, kurzem Aufleuchten in der
Levelfarbe und der grossen Levelzahl mit Bounce-Effekt in der Mitte. Bei
Level 25 zusätzlich mit schwarzer Kontur um die Zahl (`-webkit-text-stroke`).
Per Screenshot-Test für Gold- und die neue legendäre Stufe geprüft.

## 7. Permanenter Hintergrund je nach Level

Automatisch eingefärbt passend zur Stufe (alle sehr hell, damit alles
lesbar bleibt): Grün→Weiss, Gold→helles Gold, Diamant→helles Eisblau,
Smaragd→helles Mintgrün, Legendär→helles Rosé. Über den Schalter
"Level-Hintergrundfarbe anzeigen" im Profilfenster lässt sich das jederzeit
auf Weiss zurücksetzen (Einstellung wird lokal im Browser gespeichert).

## 8. Test-Modul entfernt

Komplett aus `script.js`, `index.html` und `styles.css` entfernt (siehe
letztes Update für Details).

## Was du tun musst

1. Ersetze alle vier Dateien (`index.html`, `styles.css`, `script.js`,
   `firebase-init.js`) in deinem Projektordner.
2. Push wie gewohnt:
   ```
   git add .
   git commit -m "XP nur noch beim tatsächlichen Lösen, Level 25, neue Farbstufen"
   git push
   ```
3. Kein zusätzlicher Schritt in der Firebase-Konsole nötig.

Getestet: Beide JS-Dateien laufen fehlerfrei (`node --check`), die neue
XP-Logik wurde gegen den echten Aufgabenbestand durchgerechnet (1480 XP →
exakt Level 25; 920 XP → Level 18), und die Levelaufstiegs-Animation wurde
für die Gold- und die neue legendäre Stufe per Screenshot visuell geprüft.
