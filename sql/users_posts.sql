DROP TABLE IF EXISTS USER;
CREATE TABLE USER(
                     id int PRIMARY KEY AUTO_INCREMENT,
                     username VARCHAR(32) NOT NULL,
                     password VARCHAR(32) NOT NULL,
                     avatar VARCHAR(255)
);

DROP TABLE IF EXISTS POST;
CREATE TABLE POST (
                      id int PRIMARY KEY AUTO_INCREMENT,
                      userId int NOT NULL,
                      body VARCHAR(255) NOT NULL,
                      ddcharacter int,
                      tags VARCHAR(255) DEFAULT "",
                      likes int DEFAULT 0,
                      replies int DEFAULT 0,
                      shares int DEFAULT 0,
                      FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE ON UPDATE CASCADE,
                      FOREIGN KEY (ddcharacter) REFERENCES DDCHARACTER(id) ON DELETE CASCADE ON UPDATE CASCADE
);
