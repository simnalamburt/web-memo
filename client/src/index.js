import angular from 'angular'
import 'angular-elastic'
import 'restangular'

import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './index.styl'

angular
.module('hyeonme', ['monospaced.elastic', 'restangular'])
.controller('MemoCtrl', ['$scope', 'Restangular', ($scope, Restangular) => {
  const all = Restangular.all('memos');
  const memos = all.getList().$object;
  const select = i => _.find(memos, it => it.id === i);

  $scope.memos = memos;

  $scope.create = _ => {
    if ($scope.new == null || $scope.new.content == null) { return; }

    return all.post($scope.new)
      .then(id => {
        $scope.new.id = id;

        const elem = Restangular.restangularizeElement($scope.parentResource, $scope.new, 'memos');
        memos.unshift(elem);

        $scope.new = {};
        return $scope.new;
      })
      .catch(_ => { throw Error('unimplemented'); });
  };

  $scope.update = i => select(i).put()
    .catch(_ => { throw Error('unimplemented'); });

  $scope.delete = i => {
    const memo = select(i);
    return memo.remove()
      .then(_ => {
        const index = memos.indexOf(memo);
        if (index !== -1) { return memos.splice(index, 1); }
      })
      .catch(_ => { throw Error('unimplemented'); });
  };

  return $scope;
}]);

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47724944-1', 'auto');
ga('send', 'pageview');
