import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '@/models/Schema';
import { createDbConnection } from '@/libs/utils/DBConnection';
import { Env } from './Env';

// Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
const globalForDb = globalThis as unknown as {
  drizzle: NodePgDatabase<typeof schema> | null;
};

const db = globalForDb.drizzle ?? (Env.DATABASE_URL ? createDbConnection() : null);

// Only store in global during development to prevent hot reload issues
if (Env.NODE_ENV !== 'production') {
  globalForDb.drizzle = db;
}

export { db };
