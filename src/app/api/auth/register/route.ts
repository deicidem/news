import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as RegisterSchema;
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }
        const existingUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, body.email),
        });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await db.insert(users).values({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });
        return NextResponse.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}