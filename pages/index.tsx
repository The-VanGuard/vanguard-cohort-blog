import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";

import client from "../lib/apolloClient";
import BlogCard from "./components/BlogCard";
import Header from "./components/Header";
import { Lesson } from "../lib/types";

const Home: NextPage = ({ lessons }) => {

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl w-full">
        <Header />
        <main className="flex-grow mb-8">
          <div className="divide-y divide-gray-200">
            <div className="pt-6 pb-8 space-y-2 md:space-y-5">
              <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Latest
              </h1>
              <p className="text-lg leading-7 text-gray-500">
                Our latest blog posts.
              </p>
            </div>
            {lessons &&
              lessons.map((lesson: Lesson) => (
                <BlogCard
                  key={lesson.id}
                  date={lesson.createdAt}
                  slug={lesson.id}
                  title={lesson.title}
                  description={lesson.intro.text}
                />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const { lessons } = await client.request(
    `
      {
        lessons {
          id
          createdAt
          intro {
            text
          }
          title
        }
      }
    `
  );

  return {
    props: {
      lessons: lessons as Lesson,
    },
  };
}
