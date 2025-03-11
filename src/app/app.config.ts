import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-c6e05","appId":"1:121121568796:web:d57a9dae543dd0ed1247d9","storageBucket":"ring-of-fire-c6e05.firebasestorage.app","apiKey":"AIzaSyDymlHsulm7Ve-18DZy3I-4fAUUhSWqivU","authDomain":"ring-of-fire-c6e05.firebaseapp.com","messagingSenderId":"121121568796"})), provideFirestore(() => getFirestore())]
};

