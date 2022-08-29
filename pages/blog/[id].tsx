import React from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";

import client from "../../lib/apolloClient";
import { ImageProp, MarkdownProp, Question, TextProp } from "../../lib/types";
import Header from "../components/Header";
import Head from "next/head";
import Logo from "../../public/logo.png";
import Image from "next/image";
import moment from "moment";

interface lessonProps {
  id: string;
  lessonImg: ImageProp;
  title: string;
  intro: TextProp;
  recap: MarkdownProp;
  test: Question[];
  classDescription: MarkdownProp;
  assignment: MarkdownProp;
  additionalResources: MarkdownProp;
  createdAt: Date;
}

// this is where the component is defined
function Blog({ lesson }: lessonProps) {
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
          <div>
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500">
                    <time
                      datetime={moment(lesson.createdAt).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    >
                      {moment(lesson.createdAt).format("dddd, MMMM D, YYYY")}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {lesson.title}
                </h1>
              </div>
            </div>
            <div className="mt-8 flex flex-row justify-between items-start ">
              <div className="text-sm font-medium leading-5 divide-y divide-gray-200 ">
                <div className="space-y-8 py-8">
                  <div>
                    <h2 className="text-xs tracking-wide uppercase text-gray-500">
                      Previous Post
                    </h2>
                    <div className="text-purple-500 hover:text-purple-600">
                      <a href="/posts/graphql-schema-stitching">
                        GraphQL Schema Stitching
                      </a>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <a className="text-purple-500 hover:text-purple-600" href="/">
                    ← Back to the blog
                  </a>
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <Image
                  src={lesson.lessonImg.url}
                  alt="lesson Image"
                  objectFit="contain"
                  layout="fixed"
                  width={700}
                  height={475}
                />

                <div className="mt-6 w-full">
                  <h1>Introduction</h1>
                  <p>{lesson.intro.text}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Blog;

export async function getStaticProps({ params }) {
  const { lesson } = await client.request(
    `
  query fetchLesson($id: ID!) {
    lesson(where: { id: $id }, stage: PUBLISHED) {
      id
      lessonImg {
        url
      }
      title
      intro {
        text
      }
      recap {
        markdown
      }
      test
      classDescription {
        markdown
      }
      assignment {
        markdown
      }
      additionalResources {
        markdown
      }
      createdAt
    }
  }
`,
    {
      id: params.id,
    }
  );

  return {
    props: {
      lesson: lesson,
    },
  };
}

export async function getStaticPaths() {
  const { lessons } = await client.request(
    `
      {
        lessons {
          id
        }
      }
    `
  );

  const paths = lessons.map((blog: { id: String }) => ({
    params: { id: blog.id },
  }));

  return { paths, fallback: false };
}