import Link from "next/link";
import { getPosts, formatDate } from "@/app/lib/blog-db";

/** Latest published blogs (from the shared DB) shown at the top of the homepage. */
export default async function LatestFromBlog() {
  const posts = (await getPosts()).slice(0, 4);
  if (posts.length === 0) return null;
  return (
    <section className="px-5 pt-10 sm:px-8">
      <h2 className="headline border-b border-line-strong pb-3 text-3xl font-bold uppercase text-ink sm:text-4xl">
        Latest
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((p) => (
          <Link key={p.id} href={`/${p.slug}`} className="group block">
            {p.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.title}
                className="mb-3 aspect-[16/10] w-full object-cover"
              />
            ) : null}
            <p className="eyebrow text-ink-faint">{formatDate(p.published_at)}</p>
            <h3 className="font-display mt-1 text-lg font-semibold uppercase leading-snug tracking-tight text-ink group-hover:text-accent">
              {p.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
