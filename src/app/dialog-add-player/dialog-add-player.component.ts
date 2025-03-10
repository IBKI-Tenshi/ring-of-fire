import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {

  name: string = '';

  private dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
