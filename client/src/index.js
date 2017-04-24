import angular from 'angular'
import 'angular-elastic'
import 'restangular'
import './ga.js'

import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './index.styl'

angular
.module('hyeonme', ['monospaced.elastic', 'restangular'])
.controller('MemoCtrl', ['$scope', 'Restangular', ($scope, Restangular) => {
  const all = Restangular.all('memos');
  const memos = all.getList().$object;
  const select = i => memos.find(memo => memo.id === i);

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
