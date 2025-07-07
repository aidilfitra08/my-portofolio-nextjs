import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();
  const feed = await parser.parseURL("https://medium.com/feed/@aidilfitra");
  const articles = feed.items?.slice(0, 5).map((item) => {
    const content = item["content:encoded"] || item.content || "";
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const image =
      imgMatch && imgMatch[1].includes("https://cdn-images-1.medium.com")
        ? imgMatch[1]
        : null;
    return {
      title: item.title,
      link: item.link,
      image: image,
      pubDate: item.pubDate,
      categories: item.categories,
    };
  });

  return NextResponse.json(articles);
}
