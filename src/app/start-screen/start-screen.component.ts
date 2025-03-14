import { Component, inject } from '@angular/core';
// import { log } from 'node:console';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore); // eventuell erst da einbinden wo die info gebraucht wird
  game: any;
  gameId: string = ''; // Hier speichern wir die ID

  constructor(private router: Router) {}

  newGame() {
    this.game = new Game();
    const gameCollection = collection(this.firestore, 'games');

    addDoc(gameCollection, this.game.toJson())
    .then((docRef) => {
      console.log('Spiel erfolgreich erstellt! ID:', docRef.id);
      this.gameId = docRef.id; // Spiel-ID speichern
      this.router.navigate(['/game', this.gameId]); // Navigiere zur neuen Spiel-URL
    })
    .catch((error) => console.error('Fehler beim Erstellen des Spiels:', error));

    this.router.navigateByUrl('/game');
  }
}

