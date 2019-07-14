import angular from 'angular'
import 'restangular'
import 'angular-elastic'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'

import MainController from './main.controller'

// Stylesheets
import 'normalize.css'
import './index.scss'

library.add(faTimes, faPencilAlt)
dom.watch()

// Angular module definition
angular
  .module('hyeonme', ['monospaced.elastic', 'restangular'])
  .controller('MainController', ['Restangular', MainController])
