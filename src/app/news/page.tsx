import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News — Pakistan Gamers Community",
  description:
    "Latest news, updates and announcements from Pakistan Gamers Community.",
  openGraph: {
    type: "website",
    siteName: "Pakistan Gamers Community",
    title: "News — Pakistan Gamers Community",
    description:
      "Season launches, application windows and community announcements from PGC.",
    images: [{ url: "/banner.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function NewsPage() {
  return (
    <>
      <Header variant="secondary" activeKey="news" />
      <main id="main">
        <section className="page-hero reveal visible">
          <span className="kicker">ANNOUNCEMENTS</span>
          <h1>
            Latest <em>News</em>
          </h1>
          <p>
            Season launches, application windows and everything else happening
            across Pakistan Gamers Community.
          </p>
        </section>

        <section className="news-grid reveal visible" id="newsGrid">
          {posts.map((post) => (
            <Link className="news-card" key={post.slug} href={`/posts/${post.slug}`}>
              <span className="news-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="text-link">Read more →</span>
            </Link>
          ))}
        </section>
      </main>
      <Footer variant="secondary" />
    </>
  );
}
