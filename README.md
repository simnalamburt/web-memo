web-memo
========

Dead-simple memo webapp

![](example/screenshot.png)

### Prerequisites
- Ruby *≥ 2.1*
- Node.js *≥ 0.10*
- xz

### Instructions
```bash
# Install dependencies
bundle
yarn

# Build frontend
yarn build

# Start server at 0.0.0.0:9494
bundle exec run
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
