#!/bin/sh

  name=data.db
source=../$name
target=$name\_$(date +"%y%m%d_%H%M").bz2

echo "   $name -> backups/$target"
bzip2 -kc $source > $target
echo " * 백업 완료!"
