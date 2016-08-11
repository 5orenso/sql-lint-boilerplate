-- DROP TABLE person CASCADE;

CREATE TABLE person
(
   person_id               varchar(40)     NOT NULL,
   company_id              integer         NOT NULL,
   creation_date           timestamp       NOT NULL
);
