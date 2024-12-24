import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { db } from "@/server/db";
import { accounts, sessions, users, verificationTokens, } from "@/server/db/schema";
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: { id: string; } & DefaultSession["user"];
    }
}
const loginSchema = z.object({
  email: z.string().email(),
    password: z.string().min(6),
});

type LoginFormSchema = z.infer<typeof loginSchema>;
export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const result = loginSchema.safeParse(credentials)
                if (!result.success) return null;
                const user = await db.query.users.findFirst({
                    where: (users, {eq}) => eq(users.email, result.data.email)
                })
                if (!user) return null;
                const passwordMatch = await bcrypt.compare(
                    result.data.password,
                    user.password,
                    );
                if (!passwordMatch) return null;
                return { id: user.id, email: user.email, name: user.name};
            }
        })
    ],
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    callbacks: {
        session: ({session, user}) => ({...session, user: {...session.user, id: user.id}}),
    },
} satisfies NextAuthConfig;