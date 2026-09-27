import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const [products, banners, content, reviews, publishedReviews, messages, unreadMessages] = await Promise.all([
      prisma.product.count(), prisma.promotionalBanner.count({ where: { isActive: true } }),
      prisma.siteContent.count(), prisma.review.count(), prisma.review.count({ where: { isPublished: true } }),
      prisma.message.count(), prisma.message.count({ where: { isRead: false } }),
    ]);
    return NextResponse.json({ products, banners, content, reviews, publishedReviews, messages, unreadMessages });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load dashboard." }, { status: 500 }); }
}
