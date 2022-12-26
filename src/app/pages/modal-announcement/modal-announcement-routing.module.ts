import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAnnouncementPage } from './modal-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAnnouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAnnouncementPageRoutingModule {}
