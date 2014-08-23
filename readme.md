[hyeon.me](http://hyeon.me/)
=====

간단한 메모장

### Installation

1.  Clone the repository

    ```
    git clone https://github.com/simnalamburt/hyeon-me.git
    cd hyeon-me
    ```

2.  Install required gems

    ```
    bundle install
    ```

3.  Run

    ```
    ruby app.rb
    # Listening on 0.0.0.0:4567 ...
    ```

### Backup

*   Making a new backup

    ```
    cd backups
    ./save.sh
    #   data.db -> backups/data.db_140403_1200.bz2
    # * 백업 완료!
    ```

*   Restoring the old backup

    ```
    cd backups
    ls
    # Choose what you want
    ./load.sh data.db_140403_1200.bz2
    #   backups/data.db_140403_1200.bz2 -> data.db
    # * 복구 완료!
    ```

### Requirements

* Ubuntu 12.04 or higher

  OS X 10.9.1 or higer

* Ruby MRI 2.0.0p247 or higher
