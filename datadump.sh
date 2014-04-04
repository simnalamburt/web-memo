#!/bin/sh

filename=data.db
backupdir=backups
backupname=$filename\_$(date +"%y%m%d_%H%M").bz2

echo "   $filename -> $backupdir/$backupname"
mkdir -p $backupdir
bzip2 -kc $filename > $backupdir/$backupname
echo " * 백업 완료!"
