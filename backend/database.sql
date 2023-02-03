CREATE TABLE
    user (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        firstname varchar(100) NOT NULL,
        lastname varchar(100) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        hashedPassword text NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    user (
        firstname,
        lastname,
        email,
        hashedPassword
    )
VALUES (
        'Anaïs',
        'Malige-Bordes',
        'test@test.com',
        '$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg'
    );

CREATE TABLE
    book (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        originalId VARCHAR(100),
        title varchar(255) NOT NULL,
        author text NOT NULL,
        descriptionBook text,
        categories text,
        cover VARCHAR(255)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    userBook (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        idUser INT NOT NULL,
        CONSTRAINT fk_book_user FOREIGN KEY (idUser) REFERENCES user (id),
        idBook INT NOT NULL,
        CONSTRAINT fk_user_book FOREIGN KEY (idBook) REFERENCES book (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;