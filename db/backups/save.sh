#!/bin/sh

  name=data.db
source=../$name
target=$name\_$(date +"%y%m%d_%H%M").bz2

echo "   $name -> backups/$target"
bzip2 -kc $source > $target

exitcode=$?
if [ $exitcode -ne 0 ]; then
  echo " ! 백업 실패"
  exit $exitcode
else
  echo " * 백업 완료!"
  exit 0
fi
