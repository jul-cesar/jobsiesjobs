import {
  InferInsertModel,
  InferModel,
  InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { number } from "zod";

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
  postedBy: text("postedBy").notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const JobsRelation = relations(JobsTable, ({ one }) => ({
  author: one(userTable, {
    fields: [JobsTable.postedBy],
    references: [userTable.id],
  }),
}));
const roles = ["user", "admin"] as const;
export type rolesEnum = (typeof roles)[number];
export const RolesEnum = pgEnum("role", roles);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 12 }).notNull().unique(),
  password_hash: varchar("password_hash").notNull(),
  rol: RolesEnum("rol").default("user").notNull(),
});

export const userRelation = relations(userTable, ({ many }) => ({
  jobs: many(JobsTable),
}));

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Job = InferSelectModel<typeof JobsTable>;

export type User = InferSelectModel<typeof userTable>;

export type newJob = InferInsertModel<typeof JobsTable>;
