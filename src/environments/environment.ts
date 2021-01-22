// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST : "http://localhost:8080",
  firebase :{
    apiKey: "AIzaSyDmmORLUJCoIiE4lYEd83X4paYOD_OgCZw",
    authDomain: "certicom-7000a.firebaseapp.com",
    databaseURL: "https://certicom-7000a-default-rtdb.firebaseio.com",
    projectId: "certicom-7000a",
    storageBucket: "certicom-7000a.appspot.com",
    messagingSenderId: "123299581872",
    appId: "1:123299581872:web:d31f2d6350779d76059075"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
