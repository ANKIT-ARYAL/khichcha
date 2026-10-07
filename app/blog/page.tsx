import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const blogs = process.env.DATABASE_URL
    ? await prisma.blog
        .findMany({
          where: { isPublished: true },
          orderBy: { createdAt: "desc" },
        })
        .catch(() => [])
    : [];
  return (
    <main className="inner-page blog-page shell">
      <Breadcrumbs current="Blogs" />
      <span className="eyebrow">From Aathmandu</span>
      <h1 className="story-page__title">Stories from 
        <em> the Himalayas.</em>
      </h1>
      <p className="blog-page__intro">
        Notes on natural living, Nepalese craft, and giving dogs their best
        days.
      </p>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link className="blog-card" href={`/blog/${blog.slug}`} key={blog.id}>
            {blog.imageUrl && (
              <Image src={blog.imageUrl} alt="" width={900} height={600} />
            )}
            <div className="blog-card__copy">
              <span className="eyebrow">Journal</span>
              <h2>{blog.title}</h2>
              <div
                className="blog-card__excerpt"
                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
              />
              <span className="text-link">Read story →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
