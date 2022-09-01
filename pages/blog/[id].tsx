import React from "react";

import client from "../../lib/apolloClient";
import { ImageProp, MarkdownProp, Question, TextProp } from "../../lib/types";
import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import BlogSection from "../components/BlogSection";
import ParagraphComponent from "../components/ParagraphComponent";
import { Heading2 } from "../components/HeadingComponents";
import {
  ListComponent,
  UnorderedListComponent,
} from "../components/ListComponent";
import AnchorComponent from "../components/AnchorComponent";
import CodeComponent from "../components/CodeComponent";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TestComponent from "../components/TestComponent";
import Link from "next/link";

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

const DynamicHeader = dynamic(() => import("../components/CodeComponent"), {
  ssr: false,
});

const components = {
  h2: Heading2,
  p: ParagraphComponent,
  ul: UnorderedListComponent,
  li: ListComponent,
  a: AnchorComponent,
  code: DynamicHeader,
};

// this is where the component is defined
function Blog({ lesson }) {
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
                      dateTime={moment(lesson.createdAt).format(
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
                {lesson.previousLesson && (
                  <div className="space-y-8 py-8">
                    <div>
                      <h2 className="text-xs tracking-wide uppercase text-gray-500">
                        Previous Post
                      </h2>
                      <div className="text-purple-500 hover:text-purple-600">
                        <a href={`/blog/${lesson.previousLesson.id}`}>
                          {lesson.previousLesson.title}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {lesson.nextLesson && (
                  <div className="space-y-8 py-8">
                    <div>
                      <h2 className="text-xs tracking-wide uppercase text-gray-500">
                        Next Post
                      </h2>
                      <div className="text-purple-500 hover:text-purple-600">
                        <a href={`/blog/${lesson.nextLesson.id}`}>
                          {lesson.nextLesson.title}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                <div className="pt-8">
                  <Link href="/">
                    <a className="text-purple-500 hover:text-purple-600">
                      ← Back to the blog
                    </a>
                  </Link>
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

                <BlogSection title="Introduction" condition>
                  <ParagraphComponent>{lesson.intro.text}</ParagraphComponent>
                </BlogSection>

                <BlogSection
                  title="Recap"
                  condition={lesson.recap.markdown !== "\n"}
                >
                  <MDXRemote {...lesson.recapMDX} components={components} />
                </BlogSection>

                <BlogSection title="Class Description" condition>
                  <MDXRemote {...lesson.classDescMDX} components={components} />
                </BlogSection>

                <BlogSection title="Test" condition={lesson.test.length > 0}>
                  <TestComponent data={lesson.test} />
                </BlogSection>

                <BlogSection title="Assignment" condition>
                  <MDXRemote
                    {...lesson.assignmentMDX}
                    components={components}
                  />
                </BlogSection>

                <BlogSection title="Additional Resources" condition>
                  <MDXRemote
                    {...lesson.additionalResourcesMDX}
                    components={components}
                  />
                </BlogSection>
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

  const { lessons: previousLessons } = await client.request(
    `query fetchPreviousLesson($id: String!) {
    lessons(before: $id) {
      id
      title
    }
  }`,
    {
      id: params.id,
    }
  );

  const { lessons: nextLessons } = await client.request(
    `query fetchPreviousLesson($id: String!) {
    lessons(after: $id) {
      id
      title
    }
  }`,
    {
      id: params.id,
    }
  );

  const recapMDX = await serialize(lesson.recap.markdown);
  const classDescMDX = await serialize(lesson.classDescription.markdown);
  const assignmentMDX = await serialize(lesson.assignment.markdown);
  const additionalResourcesMDX = await serialize(
    lesson.additionalResources.markdown
  );

  return {
    props: {
      lesson: {
        ...lesson,
        recapMDX,
        classDescMDX,
        assignmentMDX,
        additionalResourcesMDX,
        previousLesson: previousLessons[0] ? previousLessons[0] : null,
        nextLesson: nextLessons[0] ? nextLessons[0] : null,
      },
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
