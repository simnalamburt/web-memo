angular
.module \hyeonme <[ monospaced.elastic restangular ]>
.controller \MemoCtrl ($scope, Restangular) ->
  let @ = $scope
    all = Restangular.all \memos
    select = (i) ~> _.find @memos, (.id == i)

    @memos = all.getList!.$object

    @create = ~>
      return unless @new.content

      all
      .post @new
      .then (id) ~>
        @new.id = id
        @memos.unshift Restangular.restangularizeElement @parentResource, @new, \memos
        @new = {}
      , ~>
        ...

    @update = (i) ~>
      select i
      .put!
      .catch ~>
        ...

    @delete = (i) ~>
      memo = select i
      memo.remove!
      .then ~>
        index = @memos.indexOf memo
        @memos.splice index, 1 unless index == -1
      , ~>
        ...
