import angular from 'angular'
import 'restangular'
import 'angular-elastic'
import MainController from './main.controller'

// Stylesheets
import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './index.scss'

// Angular module definition
angular
  .module('hyeonme', ['monospaced.elastic', 'restangular'])
  .controller('MainController', ['Restangular', MainController])
