CREATE TABLE "APP"."TOOL_LIBRARY_ITEM_CATEGORIES"(
TOOL_LIBRARY_ITEM BIGINT not null,
CATEGORIES BIGINT not null,
FOREIGN KEY (TOOL_LIBRARY_ITEM) REFERENCES TOOL_LIBRARY_ITEM(ID),
FOREIGN KEY (CATEGORIES) REFERENCES TOOL_CATEGORY(ID))
