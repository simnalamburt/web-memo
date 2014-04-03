#!/bin/sh

filename=data.db
backupdir=backups
backupname=$filename\_$(date +"%y%m%d_%H%M")

mkdir -p $backupdir
cp $filename $backupdir/$backupname
echo " * 백업 완료! ($filename -> $backupdir/$backupname)"
