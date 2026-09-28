import { prisma } from "@/lib/prisma";

export async function getHomepageContent() {
  const content = await prisma.siteContent.findUnique({
    where: { key: "homepage" },
  });
  return (content?.value as Record<string, string>) || {};
}
