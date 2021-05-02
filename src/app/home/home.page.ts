import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tabs = [
    [
      { title: 'Raccolta', url: '/folder/Raccolta', icon: 'speedometer-outline' },
      { title: 'Pesata', url: '/folder/Pesata', icon: 'scale-outline' },
    ],
    [
      { title: 'Biocelle', url: '/folder/Biocelle', icon: 'leaf-outline' },
      { title: 'Impostazioni', url: '/folder/Impostazioni', icon: 'cog-outline' },
    ],
  ];
  constructor() { }

  ngOnInit() {
  }

}
