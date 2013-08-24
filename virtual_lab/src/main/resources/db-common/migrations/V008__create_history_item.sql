CREATE TABLE "APP"."HISTORY_ITEM"(
ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (START WITH 100),
BACKGROUND_COLOUR VARCHAR(32) not null,
EXECUTION_DATE TIMESTAMP not null,
TOOL_NAME VARCHAR(64) not null,
VERSION INTEGER,
OWNER BIGINT,
FOREIGN KEY (OWNER) REFERENCES RESEARCHER(ID))
