web-memo
========
Dead-simple memo webapp

![Screenshot]

### Prerequisites
- [Ruby] *≥ 2.2*, [Bundler]
- [Node.js], [Yarn]

```bash
(cd client && yarn && yarn build) && (cd server && bundle && bundle exec run)
```

<br>

Instructions
--------
How to build frontend codes:
```bash
cd client/

# Install dependencies
yarn
# See http://localhost:1234
yarn start
# See 'dist/'
yarn build

yarn test
yarn fmt
```

Turn on the server:
```bash
cd server/

bundle            # Download dependencies
bundle exec run   # Start server at 0.0.0.0:9494 in development mode

RACK_ENV=production bundle exec run   # Start server in production mode
```

&nbsp;

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
