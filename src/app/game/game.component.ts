import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { NgIf } from '@angular/common';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, PlayerMobileComponent, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore); // eventuell erst da einbinden wo die info gebraucht wird

  game: any;
  gameData$: any;
  gameId: string = ''; // Hier speichern wir die ID
  gameOver = false;

  route = inject(ActivatedRoute); // Route-Parameter injizieren

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id']; // ID speichern
      this.loadGameData(this.gameId);
    });
  }

  newGame() {
    this.game = new Game();
    const gameCollection = collection(this.firestore, 'games');
  }

  loadGameData(gameId: string) {
    if (!gameId) return;

    const gameDocRef = doc(this.firestore, `games/${gameId}`); // Firestore-Dokument abrufen
    this.gameData$ = docData(gameDocRef); // Wir abonnieren die Dokumentdaten

    this.gameData$.subscribe((game: any) => {
      // console.log('Geladene Spiel-Daten:', game);
      if (game) {
        this.game = game; // Spiel-Daten auf die Instanz anwenden
      }
    });
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else {
      console.log(this.game.stack.length);
      if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop() || '';
        this.game.pickCardAnimation = true;

        this.game.CurrentPlayer++;
        this.game.CurrentPlayer = this.game.CurrentPlayer % this.game.players.length;

        this.saveGame();

        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);

          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 2000);
      }
    }
  }

  editPlayer(playerId: number) {
    // console.log('edit player', playerId)

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      // console.log('recived change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImages.splice(playerId, 1);
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('user-solid.svg')
        this.saveGame();
      }

    });
  }

  saveGame() {
    if (!this.gameId) return;  // Verhindern, dass das Spiel ohne ID gespeichert wird

    const gameDocRef = doc(this.firestore, `games/${this.gameId}`);

    updateDoc(gameDocRef, {

      players: this.game.players,
      playerImages: this.game.playerImages,
      stack: this.game.stack,  // Stack speichern
      playedCards: this.game.playedCards,  // Gespielte Karten speichern
      CurrentPlayer: this.game.CurrentPlayer,  // Aktuellen Spieler speichern
      pickCardAnimation: this.game.pickCardAnimation,
      currentCard: this.game.currentCard,  // Aktuelle Karte speichern

    })
      .then(() => {
        // console.log('Spiel erfolgreich aktualisiert!');
        // console.log(this.game.players);
      })
      .catch((error: any) => {
        console.error('Fehler beim Aktualisieren des Spiels:', error);
      });
  }



}
