import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT } from '../../core/data/resume.data';

@Component({
  selector: 'kk-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly contact = CONTACT;
  readonly year = new Date().getFullYear();
}
