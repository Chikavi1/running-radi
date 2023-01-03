import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private screenOrientation:ScreenOrientation,
    private translateService: TranslateService,
    private router:Router) {
      localStorage.setItem('device','phone');
      // this.router.navigateByUrl('/near-people')
    window.screen.orientation.lock('portrait');
    let language = localStorage.getItem('language')?localStorage.getItem('language'):'en';
    this.translateService.setDefaultLang(language);
    this.translateService.addLangs(['en','es']);
    localStorage.setItem('sandbox','true')

  }
}
