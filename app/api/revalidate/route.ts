import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Webhook endpoint for Sanity to trigger revalidation
 * 
 * Set up in Sanity: https://www.sanity.io/manage
 * Webhook URL: https://your-domain.com/api/revalidate
 * 
 * Or use Vercel's built-in Sanity integration for automatic revalidation
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    
    // Verify secret token (set in Vercel environment variables)
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Revalidate pages that use Sanity content
    revalidatePath("/test-cms");
    revalidatePath("/"); // Revalidate home page if it uses Sanity data

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: error.message },
      { status: 500 }
    );
  }
}

