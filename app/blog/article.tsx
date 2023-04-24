import type { Blog } from "@/.contentlayer/generated";
import Link from "next/link";

type Props = {
  blog: Blog;
};

export const Article: React.FC<Props> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {blog.publishedAt ? (
              <time dateTime={new Date(blog.publishedAt).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(blog.publishedAt)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {blog.title}
        </h2>
        <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {blog.summary}
        </p>
      </article>
    </Link>
  );
};
