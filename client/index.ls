angular
.module \hyeonme <[ monospaced.elastic ]>
.controller \MemoCtrl ($scope) ->
  let @ = $scope
    @memos =
      'ㅇㅅaㅇ'
      'ㅎㅅㅎ)b'
      'ㅇㅁㅇ)!'

    @create = ->
      if @new
        @memos.push @new
        @new = ''

    @delete = (i) ->
      @memos.splice i, 1
