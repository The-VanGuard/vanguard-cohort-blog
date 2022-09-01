import React from "react";
import { Heading1 } from "../lib/HeadingComponents";

interface IBlogSectionProps {
  title: string;
  children: React.ReactNode;
  condition: boolean;
}

function BlogSection({ title, children, condition = true }: IBlogSectionProps) {
  if (!condition) return <></>;
  return (
    <div className="mt-6 w-full">
      <Heading1>{title}</Heading1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default BlogSection;
