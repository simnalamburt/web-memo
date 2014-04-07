#!/bin/sh

if [ -z "$1" ]; then
  echo " 어느 백업을 복구시킬지 지정해주세요"
  echo " ex) ./load.sh data.db_140403_1200"
  exit 1
fi

  name=data.db
source=$1
target=../$name

echo "   backups/$source -> $name"
bzip2 -dkc $source > $target

exitcode=$?
if [[ $exitcode != 0 ]]; then
  echo " ! 복구 실패"
  exit $exitcode
else
  echo " * 복구 완료!"
  exit 0
fi
