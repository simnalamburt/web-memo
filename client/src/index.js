import angular from 'angular'
import 'angular-elastic'
import 'restangular'

import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
// TODO: Import index.styl

// TODO: Modernize js codes
angular.module('hyeonme', ['monospaced.elastic', 'restangular']).controller('MemoCtrl', function($scope, Restangular){
  return (function(){
    var all, select, this$ = this;
    all = Restangular.all('memos');
    select = function(i){
      return _.find(this$.memos, function(it){
        return it.id === i;
      });
    };
    this.memos = all.getList().$object;
    this.create = function(){
      if (!this$['new'].content) {
        return;
      }
      return all.post(this$['new']).then(function(id){
        this$['new'].id = id;
        this$.memos.unshift(Restangular.restangularizeElement(this$.parentResource, this$['new'], 'memos'));
        return this$['new'] = {};
      }, function(){
        throw Error('unimplemented');
      });
    };
    this.update = function(i){
      return select(i).put()['catch'](function(){
        throw Error('unimplemented');
      });
    };
    return this['delete'] = function(i){
      var memo;
      memo = select(i);
      return memo.remove().then(function(){
        var index;
        index = this$.memos.indexOf(memo);
        if (index !== -1) {
          return this$.memos.splice(index, 1);
        }
      }, function(){
        throw Error('unimplemented');
      });
    };
  }.call($scope));
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47724944-1', 'auto');
ga('send', 'pageview');
