import React from "react";

export const UnorderedListComponent = (props: any) => {
  return <ul className="mt-2 list-disc pl-8" {...props} />;
};
export const ListComponent = (props: any) => {
  return <li className="text-lg font-normal text-gray-700 " {...props} />;
};
