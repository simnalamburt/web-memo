[hyeon.me](http://hyeon.me/)
=====

간단한 메모장

### Installation

```bash
git clone https://github.com/simnalamburt/hyeon-me.git
cd hyeon-me
```
```bash
npm install && bower install && bundle install
```
```bash
gulp watch & ruby server.rb &

# (client) Auto compiling assets ...
# (server) Listening on 0.0.0.0:4567 ...
```

### Backup

*   Making a new backup

    ```bash
    cd db
    ruby save.rb
    #   data.db => backups/140403_120000_000
    # * 백업 완료!
    ```

*   Restoring the old backup

    ```bash
    cd db
    ls backups
    # Choose what you want
    ruby load.rb backups/140403_120000_000
    #   backups/140403_120000_000 => data.db
    # * 복구 완료!
    ```

### Requirements

* Ubuntu 12.04 or higher

  OS X 10.9.1 or higer

* nods.js 0.10.25 or higher

* Ruby MRI 2.0.0p247 or higher

* XZ Utils 5.0.5 or higher
