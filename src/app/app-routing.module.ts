import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Welcome',
    pathMatch: 'full'
  },
  {
    path: 'Welcome',
    loadChildren: () => import('./comp/welcome/welcome.module').then( m => m.WelcomeModule)
  },
  {
    path: 'User',
    loadChildren: () => import('./comp/landing/landing.module').then( m => m.LandingModule)
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('./comp/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: 'Contacts',
    loadChildren: () => import('./comp/contacts/contacts.module').then( m => m.ContactsModule)
  },
  {
    path: 'Groups',
    loadChildren: () => import('./comp/groups/groups.module').then( m => m.GroupsModule)
  },
  {
    path: 'Products',
    loadChildren: () => import('./comp/products/products.module').then( m => m.ProductsModule)
  },
  {
    path: 'Orders',
    loadChildren: () => import('./comp/orders/orders.module').then( m => m.OrdersModule)
  },
  {
    path: 'Profile',
    loadChildren: () => import('./comp/profile/profile.module').then( m => m.ProfileModule)
  },
  {
    path: 'Contents',
    loadChildren: () => import('./comp/content/content.module').then( m => m.ContentModule)
  },
  {
    path : 'Notification',
    loadChildren: () => import('./comp/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path : '**',
    redirectTo : 'User'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}