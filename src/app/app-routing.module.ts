import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from './pages/activation/activation.component';
import { ActivationEmailComponent } from './pages/activation-email/activation-email.component';

const routes: Routes = [
  { path: 'activation-email', component: ActivationEmailComponent }, // Add this route
  { path: 'activate', component: ActivationComponent },
  { path: '**', redirectTo: 'activation-email' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
