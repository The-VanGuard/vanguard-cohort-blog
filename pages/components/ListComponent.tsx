import React from "react";

export function UnorderedListComponent(props: any) {
  return <ul className="mt-2 list-disc pl-8" {...props} />;
}
export function ListComponent(props: any) {
  return <li className="text-lg font-normal text-gray-700 " {...props} />;
}
