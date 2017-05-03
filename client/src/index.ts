import angular from 'angular'
import 'restangular'
import 'angular-elastic'
import MainController from './main.controller'
import './ga.js'

// Stylesheets
import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './index.css'

// Angular module definition
angular
  .module('hyeonme', ['monospaced.elastic', 'restangular'])
  .controller('MainController', ['Restangular', MainController])
