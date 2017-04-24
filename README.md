web-memo
========
Dead-simple memo webapp

![](doc/screenshot.png)

### Prerequisites
- [Ruby](https://www.ruby-lang.org) *≥ 2.2*, [Bundler](https://bundler.io/)
- [Node.js](https://nodejs.org) *≥ 6.0.0*, [Yarn](https://yarnpkg.com/lang/en/)

```bash
(cd client && yarn && yarn webpack) && (cd server && bundle && bundle exec run)
```

<br>

Instructions
--------
How to build frontend codes:
```bash
cd client/

yarn            # Download dependencies
yarn webpack    # Build front-end codes

yarn watch      # Run webpack in watch mode
```

Turn on the server:
```bash
cd server/

bundle          # Download dependencies
bundle exec run # Start server at 0.0.0.0:9494
```

How to backup the DB: (You need [`xz`](https://tukaani.org/xz/) command line utility)
```bash
cd server/db/

# Make a new backup
./save
#   data.db => backups/140403_120000_000
# * 백업 완료!

# Restore the old backup
./load backups/140403_120000_000
#   backups/140403_120000_000 => data.db
# * 복구 완료!
```
