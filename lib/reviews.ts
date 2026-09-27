import { prisma } from "@/lib/prisma";
import { reviews as fallbackReviews } from "@/lib/content";

export type ReviewData = { id?: string; name: string; quote: string; meta: string; isPublished?: boolean };

export async function getPublishedReviews(): Promise<ReviewData[]> {
  try {
    return await prisma.review.findMany({ where: { isPublished: true }, orderBy: { createdAt: "asc" } });
  } catch {
    // Keep the public page available if the database is temporarily unavailable.
  }
  return fallbackReviews;
}
