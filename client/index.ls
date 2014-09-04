angular
.module \hyeonme <[ monospaced.elastic restangular ]>
.controller \MemoCtrl ($scope, Restangular) ->
  let @ = $scope
    @memos = Restangular.all \memos .getList!.$object

    @create = ->
      if @new
        @memos.push @new
        @new = ''

    @delete = (i) ->
      @memos.splice i, 1
