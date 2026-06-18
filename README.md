# Glimmer Grove

Un piccolo platform 2D originale realizzato con Phaser 3, HTML, CSS e JavaScript.

## File del gioco

- `index.html`: pagina principale, include Phaser 3 da CDN e collega CSS/JavaScript.
- `style.css`: layout della pagina, pannello istruzioni e cornice responsive del canvas.
- `game.js`: logica completa del platform, livello iniziale, giocatore, monete, nemici, punteggio, vite e schermata finale.

## Come eseguirlo

Apri `index.html` in un browser moderno, oppure avvia un piccolo server statico nella cartella del progetto:

```bash
python3 -m http.server 8000
```

Poi visita `http://localhost:8000`.

## Comandi

- Freccia sinistra oppure `A`: muovi Nilo a sinistra.
- Freccia destra oppure `D`: muovi Nilo a destra.
- Freccia su, `W` oppure spazio: salta.
- `Invio`: ricomincia dalla schermata di game over o vittoria.
