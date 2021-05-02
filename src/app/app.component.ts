import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Raccolta', url: '/folder/Raccolta', icon: 'speedometer' },
    { title: 'Pesata', url: '/folder/Pesata', icon: 'scale' },
    { title: 'Biocelle', url: '/folder/Biocelle', icon: 'leaf' },
    { title: 'Impostazioni', url: '/folder/Impostazioni', icon: 'cog' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
