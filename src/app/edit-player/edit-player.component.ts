
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [NgForOf, MatDialogModule, MatButtonModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

  allProfilePictures = ['user-solid.svg', 'male_picture.png', 'female_picture.png'];

  public dialogRef = inject(MatDialogRef<EditPlayerComponent>);

  closeDialog() {
    this.dialogRef.close();
  }
}
