#!/bin/sh

if [ -z "$1" ]; then
  echo " 어느 백업을 복구시킬지 지정해주세요"
  echo " ex) ./datarestore.sh backups/data.db_140403_1200"
  exit 1
fi

sourcename=$1
targetname=data.db

echo "   $sourcename -> $targetname"
bzip2 -dkc $sourcename > $targetname
echo " * 복구 완료!"
