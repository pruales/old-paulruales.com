import { Mdx } from "@/app/components/mdx";
import { allBlogs } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://paulruales.com${image}`
    : "https://paulruales.com/desk.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://paulruales.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header blog={blog} />
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />
      </article>
    </div>
  );
}
