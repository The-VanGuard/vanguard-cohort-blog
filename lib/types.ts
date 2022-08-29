export interface TextProp {
  text: string;
}

export interface ImageProp {
  url: string;
}

export interface MarkdownProp {
  markdown: string;
}

export interface Question {
  answer: string;
  options: string[];
  questions: string;
}

export interface Lesson {
  id: string;
  createdAt: string;
  title: string;
  intro: TextProp;
}
