import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(      private translateService: TranslateService,
    private router:Router    ) {
    // this.router.navigateByUrl('/finish');
    let language = localStorage.getItem('language')?localStorage.getItem('language'):'en';
    this.translateService.setDefaultLang(language);
    this.translateService.addLangs(['en','es']);
  }
}
