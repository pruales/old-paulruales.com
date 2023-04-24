"use client";
import { ArrowLeft, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  blog: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
};
export const Header: React.FC<Props> = ({ blog }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden isolate bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10  border-zinc-200 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link target="_blank" href="https://twitter.com/paul0x741">
              <Twitter
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900"
                } `}
              />
            </Link>
            <Link target="_blank" href="https://github.com/pruales">
              <Github
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900"
                } `}
              />
            </Link>
          </div>

          <Link
            href="/blog"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-zinc-400 hover:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="container relative pt-24 pb-6 mx-auto overflow-hidden isolate sm:pt-32">
        <div className="flex flex-col items-center px-6 mx-auto text-center max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {blog.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {blog.summary}
            </p>
            <div className="mt-6 text-sm leading-8 text-zinc-300">
              <time dateTime={new Date(blog.publishedAt).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(blog.publishedAt)
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
