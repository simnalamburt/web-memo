web-memo
========

Dead-simple memo webapp

![](example/screenshot.png)

```bash
# Prerequisite
gem install bundle
npm install -g bower gulp

# Install dependencies
npm install; bower install; bundle install

# Build frontend
gulp

# Start server at 0.0.0.0:4567
ruby server.rb
```

```bash
cd db

# Make a new backup
ruby save.rb
#   data.db => backups/140403_120000_000
# * 백업 완료!

# Restore the old backup
ruby load.rb backups/140403_120000_000
#   backups/140403_120000_000 => data.db
# * 복구 완료!
```

#### Prerequisite

* node.js *≥ 0.10*
* bower
* gulp
* ruby *≥ 2.1*
* xz
