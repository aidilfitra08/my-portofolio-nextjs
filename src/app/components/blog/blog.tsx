"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
  image: string;
  pubDate: string;
  categories: string[];
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/medium")
      .then((res) => res.json())
      .then(setArticles);
  }, []);
  console.log(articles);
  return (
    <section className="py-6 px-4" id="blog">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-normal mb-4">
          <span className="text-purple-700 dark:text-purple-400">
            Medium Blog
          </span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, idx) => {
            return (
              <Link
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className=" border-2 border-accent-green rounded-xl p-4 hover:shadow-lg hover:opacity-70 transition grid grid-cols-12 gap-5"
              >
                {article.image && (
                  <div className=" col-span-5">
                    <Image
                      aria-hidden
                      src={article.image}
                      alt="project 1"
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover rounded-tl-lg"
                      loading="lazy"
                    />
                  </div>
                )}
                <h2
                  className={`text-m ${
                    article.image ? "col-span-7" : "col-span-12"
                  }`}
                >
                  {article.title}
                </h2>

                {/* <div className="flex flex-row flex-wrap gap-2 mt-auto col-span-12">
                  {article.categories.map((category, idx) => (
                    <p
                      key={idx}
                      className="text-sm bg-neutral-500 px-3 py-1 rounded-sm"
                    >
                      {category}
                    </p>
                  ))}
                </div> */}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
