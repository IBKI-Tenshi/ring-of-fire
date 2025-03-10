import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';

  game: Game = new Game;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;

      this.game.CurrentPlayer++;
      this.game.CurrentPlayer = this.game.CurrentPlayer % this.game.players.length;


      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);

        this.pickCardAnimation = false;
      }, 2000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }

    });
  }


}
