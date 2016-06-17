// map tells the System loader where to look for things
var map = {
  'app':                                'dist/js',
  'rxjs':                               'lib/js/rxjs',
  'angular2-in-memory-web-api':         'lib/js/angular2-in-memory-web-api',
  '@angular':                           'lib/js/@angular'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
  'app':                                { main: 'main', defaultExtension: 'js' },
  'rxjs':                               { defaultExtension: 'js' },
  'angular2-in-memory-web-api':         { defaultExtension: 'js' }
};

var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/testing',
  '@angular/upgrade',
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function(pkgName) {
  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

System.config({
  map: map,
  packages: packages
});
