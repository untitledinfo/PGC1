import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Pakistan Gamers Community`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      siteName: "Pakistan Gamers Community",
      title: post.title,
      description: post.excerpt,
      images: [{ url: "/banner.png" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header variant="secondary" activeKey="news" />
      <main id="main">
        <article className="post-article reveal visible">
          <Link className="text-link back-link" href="/news">
            ← All news
          </Link>
          <span className="news-date">{post.date}</span>
          <h1>{post.title}</h1>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        </article>
      </main>
      <Footer variant="secondary" />
    </>
  );
}
