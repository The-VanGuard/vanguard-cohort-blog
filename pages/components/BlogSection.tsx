import React from "react";
import { Heading1 } from "./HeadingComponents";

interface IBlogSectionProps {
  title: string;
  children: React.ReactNode;
}

function BlogSection({ title, children }: IBlogSectionProps) {
  return (
    <div className="mt-6 w-full">
      <Heading1>{title}</Heading1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default BlogSection;
