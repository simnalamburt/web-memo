import angular from 'angular'
import 'angular-elastic'
import 'restangular'
import './ga.js'

import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './style.css'

angular
.module('hyeonme', ['monospaced.elastic', 'restangular'])
.controller('MemoCtrl', ['$scope', 'Restangular', ($scope, Restangular) => {
  const all = Restangular.all('memos')
  const memos = all.getList().$object
  const select = (i: number) => memos.find((memo: { id: number }) => memo.id === i)

  $scope.memos = memos

  $scope.create = () => {
    if ($scope.new == null || $scope.new.content == null) { return }

    return all.post($scope.new)
      .then((id: number) => {
        $scope.new.id = id

        const elem = Restangular.restangularizeElement($scope.parentResource, $scope.new, 'memos')
        memos.unshift(elem)

        $scope.new = {}
        return $scope.new
      })
      .catch(() => { throw Error('unimplemented') })
  }

  $scope.update = (i: number) => select(i).put()
    .catch(() => { throw Error('unimplemented') })

  $scope.delete = (i: number) => {
    const memo = select(i)
    return memo.remove()
      .then(() => {
        const index = memos.indexOf(memo)
        if (index !== -1) { return memos.splice(index, 1) }
      })
      .catch(() => { throw Error('unimplemented') })
  }

  return $scope
}])
