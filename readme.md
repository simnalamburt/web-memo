[normal]memo
=====

간단한 웹기반 메모 서비스

### Installation

1.  Clone the repository

    ```
    git clone http://git.likelion.net/normal/memo.git
    ```

2.  Install required gems

    ```
    cd hyeonme
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
    ./make_backup.sh
    # * 백업 완료! (data.db -> backups/data.db_YYMMDD_HHMM)
    ```

*   Reverting to the old backup
    ```
    cp backups/data.db_YYMMDD_HHMM data.db
    ```

### Requirements

* Ubuntu 12.04 or higher

  OS X 10.9.1 or higer

* Ruby MRI 2.0.0p247 or higher
