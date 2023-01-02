import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'place',
    loadChildren: () => import('./pages/place/place.module').then( m => m.PlacePageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'finish',
    loadChildren: () => import('./pages/finish/finish.module').then( m => m.FinishPageModule)
  },
  {
    path: 'run-show/:id',
    loadChildren: () => import('./pages/run-show/run-show.module').then( m => m.RunShowPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./pages/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./pages/subscriptions/subscriptions.module').then( m => m.SubscriptionsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'acknowledge',
    loadChildren: () => import('./pages/acknowledge/acknowledge.module').then( m => m.AcknowledgePageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./pages/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'gifts',
    loadChildren: () => import('./pages/gifts/gifts.module').then( m => m.GiftsPageModule)
  },
  {
    path: 'blog/:slug',
    loadChildren: () => import('./pages/blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'lostpet',
    loadChildren: () => import('./pages/lostpet/lostpet.module').then( m => m.LostpetPageModule)
  },
  {
    path: 'helpcenter',
    loadChildren: () => import('./pages/helpcenter/helpcenter.module').then( m => m.HelpcenterPageModule)
  },
  {
    path: 'info-app',
    loadChildren: () => import('./pages/info-app/info-app.module').then( m => m.InfoAppPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'modal-help',
    loadChildren: () => import('./pages/modal-help/modal-help.module').then( m => m.ModalHelpPageModule)
  },
  {
    path: 'code-verification',
    loadChildren: () => import('./pages/code-verification/code-verification.module').then( m => m.CodeVerificationPageModule)
  },
  {
    path: 'modal-announcement',
    loadChildren: () => import('./pages/modal-announcement/modal-announcement.module').then( m => m.ModalAnnouncementPageModule)
  },
  {
    path: 'register-place',
    loadChildren: () => import('./pages/register-place/register-place.module').then( m => m.RegisterPlacePageModule)
  },
  {
    path: 'my-pets',
    loadChildren: () => import('./pages/my-pets/my-pets.module').then( m => m.MyPetsPageModule)
  },
  {
    path: 'pet/:id',
    loadChildren: () => import('./pages/pet/pet.module').then( m => m.PetPageModule)
  },  {
    path: 'qr-user',
    loadChildren: () => import('./pages/qr-user/qr-user.module').then( m => m.QrUserPageModule)
  },
  {
    path: 'id-pets',
    loadChildren: () => import('./pages/id-pets/id-pets.module').then( m => m.IdPetsPageModule)
  },
  {
    path: 'edit-pet',
    loadChildren: () => import('./pages/edit-pet/edit-pet.module').then( m => m.EditPetPageModule)
  },
  {
    path: 'photo-modal',
    loadChildren: () => import('./pages/photo-modal/photo-modal.module').then( m => m.PhotoModalPageModule)
  },
  {
    path: 'set-goal',
    loadChildren: () => import('./pages/set-goal/set-goal.module').then( m => m.SetGoalPageModule)
  },
  {
    path: 'create-pet',
    loadChildren: () => import('./pages/create-pet/create-pet.module').then( m => m.CreatePetPageModule)
  },
  {
    path: 'breeds',
    loadChildren: () => import('./pages/breeds/breeds.module').then( m => m.BreedsPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
