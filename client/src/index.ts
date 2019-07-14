import angular from 'angular'
import 'restangular'
import 'angular-elastic'
import MainController from './main.controller'

// Stylesheets
import '@fortawesome/fontawesome-free/css/all.css'
import 'normalize.css'
import './index.scss'

// Angular module definition
angular
  .module('hyeonme', ['monospaced.elastic', 'restangular'])
  .controller('MainController', ['Restangular', MainController])
