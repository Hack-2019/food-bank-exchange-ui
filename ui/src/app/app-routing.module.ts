import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { AddDonationPageComponent } from './pages/add-donation-page/add-donation-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DonationTypeComponent } from './pages/donation-type-page/donation-type-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  { path: 'summary', component: SummaryPageComponent, canActivate: [AuthGuardService] },
  { path: 'add-donation', component: AddDonationPageComponent, canActivate: [AuthGuardService] },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuardService] },
  { path: 'add-donation-type', component: DonationTypeComponent, canActivate: [AuthGuardService] },
  { path: '', component: LoginPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
