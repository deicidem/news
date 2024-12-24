import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).limit(5);
    return NextResponse.json({
        success: true,
      message: "Successfully fetched data from db",
      data: allPosts
    });
  } catch (error) {
    console.error("Failed to fetch data from db:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to fetch data from db",
        error: String(error)
    }, {
        status: 500
    });
  }
}