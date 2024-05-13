## SQL queries

SQL queries were implemented and tested in a locally hosted Postgres Database. The task requirements were that queries had to be executable in `w3schools` online editor. However, to work on windows browsers it requires "Web SQL" api, which is deprecated and not available in Chrome, Opera, Firefox or Edge. 

Therefore all scripts are prepared for PostgreSQL Database

<br />

Create table “user” with the following structure:
```
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "email" VARCHAR(255),
    "cultureID" INT,
    "deleted" BOOLEAN,
    "country" VARCHAR(255),
    "isRevokeAccess" BOOLEAN,
    "created" TIMESTAMP
);
```
Insert the data into the table:
```
INSERT INTO "user" ("id", "firstName", "lastName", "email", "cultureID", "deleted", "country", "isRevokeAccess", "created")
VALUES 
(1, 'Victor', 'Shevchenko', 'vs@gmail.com', 1033, TRUE, 'US', FALSE, '2011-04-05'),
(2, 'Oleksandr', 'Petrenko', 'op@gmail.com', 1034, FALSE, 'UA', FALSE, '2014-05-01'),
(3, 'Victor', 'Tarasenko', 'vt@gmail.com', 1033, TRUE, 'US', TRUE, '2015-07-03'),
(4, 'Sergiy', 'Ivanenko', 'sergiy@gmail.com', 1046, FALSE, 'UA', TRUE, '2010-02-02'),
(5, 'Vitalii', 'Danilchenko', 'shumko@gmail.com', 1031, FALSE, 'UA', TRUE, '2014-05-01'),
(6, 'Joe', 'Dou', 'joe@gmail.com', 1032, FALSE, 'US', TRUE, '2009-01-01'),
(7, 'Marko', 'Polo', 'marko@gmail.com', 1033, TRUE, 'UA', TRUE, '2015-07-03');

```
Create table “group” with the following structure:

```
CREATE TABLE "group" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "created" TIMESTAMP
); 
```
Insert the data into the table:
```
INSERT INTO "group" ("id", "name", "created")
VALUES 
(10, 'Support', '2010-02-02'),
(12, 'Dev team', '2010-02-03'),
(13, 'Apps team', '2011-05-06'),
(14, 'TEST - dev team', '2013-05-06'),
(15, 'Guest', '2014-02-02'),
(16, 'TEST-QA-team', '2014-02-02'),
(17, 'TEST-team', '2011-01-07');
```

Create table “groupMembership” with the following structure:
```
CREATE TABLE "groupMembership" (
    "id" SERIAL PRIMARY KEY,
    "userID" INT,
    "groupID" INT,
    "created" TIMESTAMP
);
```

Insert the data into the table
```
INSERT INTO "groupMembership" ("id", "userID", "groupID", "created")
VALUES 
(110, 2, 10, '2010-02-02'),
(112, 3, 15, '2010-02-03'),
(114, 1, 10, '2014-02-02'),
(115, 1, 17, '2011-05-02'),
(117, 4, 12, '2014-07-13'),
(120, 5, 15, '2014-06-15');
```
Select names of all empty test groups (group name starts with “TEST-”).
```
SELECT name FROM "group" WHERE name ILIKE 'TEST-%'
AND id NOT IN (
    SELECT "groupID"
    FROM "groupMembership"
);
```

Select user first names and last names for the users that have Victor as a first name and are not members of any test groups (they may be members of other groups or have no membership in any groups at all).
```
SELECT "firstName", "lastName" FROM "user" WHERE "firstName" = 'Victor'
AND "id" NOT IN (
    SELECT "userID"
    FROM "groupMembership"
    JOIN "group" ON "groupMembership"."groupID" = "group"."id"
    WHERE "group"."name" LIKE 'TEST-%'
);
```
Select users and groups for which user was created before the group for which he(she) is member of.
```
SELECT "user"."id" AS "userID", "user"."firstName", "user"."lastName", "user"."created" AS "userCreated", "group"."id" AS "groupID", "group"."name", "group"."created" AS "groupCreated"
FROM "user"
JOIN "groupMembership" ON "user"."id" = "groupMembership"."userID"
JOIN "group" ON "groupMembership"."groupID" = "group"."id"
WHERE "user"."created" < "group"."created";

```
