import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const JobsTable = pgTable("job", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug").unique(),
  title: varchar("title").notNull(),
  type: varchar("type").notNull(),
  locationType: varchar("locationType").notNull(),
  location: varchar("location"),
  description: varchar("description").notNull(),
  salary: integer("salary").notNull(),
  companyName: varchar("companyName"),
  applicationEmail: varchar("applicationEmail"),
  applicationUrl: varchar("applicationUrl"),
  companyLogoUrl: varchar("companyLogoUrl"),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  udpatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
   username: varchar("username", { length: 12 }).notNull().unique(),
  password_hash: varchar("password_hash").notNull(),
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});


