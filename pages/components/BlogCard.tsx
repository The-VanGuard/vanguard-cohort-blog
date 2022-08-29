import React from "react";
import moment from "moment";

interface BlogCardProps {
  date: string;
  slug: string;
  title: string;
  description: string;
}

function BlogCard({ date, slug, title, description }: BlogCardProps) {
  return (
    <ul className="divide-y divide-gray-200">
      <li className="py-12">
        <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base leading-6 font-medium text-gray-500">
              <time dateTime="Friday, May 15, 2020">
                {moment(date).format("dddd, MMMM D, YYYY")}
              </time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <h2 className="text-2xl leading-8 font-bold tracking-tight">
                <a className="text-gray-900" href={`blog/${slug}`}>
                  {title}
                </a>
              </h2>
              <div className="prose max-w-none text-gray-500">
                {description}
              </div>
            </div>
            <div className="text-base leading-6 font-medium">
              <a
                className="text-purple-500 hover:text-purple-600"
                href={`blog/${slug}`}
              >
                Read more →
              </a>
            </div>
          </div>
        </article>
      </li>
    </ul>
  );
}

export default BlogCard;
