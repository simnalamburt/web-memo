web-memo
========
Dead-simple memo webapp

![Screenshot]

### Prerequisites
- [Ruby] *≥ 2.2*, [Bundler]
- [Node.js] *≥ 6.0.0*, [Yarn]

```bash
(cd client && yarn && yarn build) && (cd server && bundle && bundle exec run)
```

<br>

Instructions
--------
How to build frontend codes:
```bash
cd client/

yarn              # Download dependencies
yarn build        # Build front-end codes in production mode

yarn watch        # Watch for the changes & build front-end
                  # codes in development mode
```

Turn on the server:
```bash
cd server/

bundle            # Download dependencies
bundle exec run   # Start server at 0.0.0.0:9494 in development mode

RACK_ENV=production bundle exec run   # Start server in production mode
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

<br>

--------
*web-memo* is primarily distributed under the terms of both the [MIT license]
and the [Apache License (Version 2.0)]. See [COPYRIGHT] for details.

[Screenshot]: doc/screenshot.png
[Ruby]: https://www.ruby-lang.org
[Bundler]: https://bundler.io/
[Node.js]: https://nodejs.org
[Yarn]: https://yarnpkg.com/lang/en/
[`xz`]: https://tukaani.org/xz/
[MIT license]: LICENSE-MIT
[Apache License (Version 2.0)]: LICENSE-APACHE
[COPYRIGHT]: COPYRIGHT
