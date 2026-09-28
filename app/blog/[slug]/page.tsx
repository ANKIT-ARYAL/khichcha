import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/breadcrumbs";
export const dynamic = "force-dynamic";
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog
    .findFirst({ where: { slug, isPublished: true } })
    .catch(() => null);
  if (!blog) notFound();
  return (
    <main className="blog-post shell">
      <Breadcrumbs
        parent={{ label: "Blogs", href: "/blog" }}
        current={blog.title}
      />
      <span className="eyebrow">Journal</span>
      <h1>{blog.title}</h1>
      <div className="blog-post__layout">
        <article className="blog-post__main">
          <p className="blog-post__excerpt">{blog.excerpt}</p>
          <div
            className="blog-post__content text-justify tracking-tighter"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
        {blog.imageUrl && (
          <Image
            className="blog-post__image"
            src={blog.imageUrl}
            alt=""
            width={900}
            height={1100}
            priority
          />
        )}
      </div>
    </main>
  );
}
