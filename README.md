web-memo
========

Dead-simple memo webapp

![](example/screenshot.png)

--------

### Prerequisite

* nods.js *≥ 0.10*
* Ruby *≥ 2.1*
* xz

### Installation

```bash
npm install; bower install; bundle install
# Installing dependencies ...

gulp
# Compiling frontend ...

ruby server.rb
# Listening on 0.0.0.0:4567 ...
```

### Backup

```bash
cd db

# Making a new backup
ruby save.rb
#   data.db => backups/140403_120000_000
# * 백업 완료!

# Restoring the old backup
ruby load.rb backups/140403_120000_000
#   backups/140403_120000_000 => data.db
# * 복구 완료!
```
