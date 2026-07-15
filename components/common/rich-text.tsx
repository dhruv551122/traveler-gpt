/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, slugify } from "@/lib/utils";
import { PortableText } from "next-sanity";
import Link from "next/link";
import React from "react";
import { SanityImage } from "./sanityImage";
import { RichTable } from "./richTable";

interface Props {
  content: Array<any> | undefined;
  className?: string;
  highlightedTextClassName?: string;
}

const getTextFromChildren = (children: any): string => {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : (child?.text ?? "")))
      .join("");
  }

  return "";
};

const RichText: React.FC<Props> = ({
  content,
  className,
  highlightedTextClassName,
}) => {
  const combinedClassNames = cn(
    "prose prose-li:my-1 prose-li:pl-0 max-w-none prose-headings:my-2! prose-h3:subtitle-3 prose-h5:leading-[115%] prose-h4:leading-[115%] prose-h3:leading-[115%] prose-h1:leading-[115%] prose-ol:leading-[115%] prose-ul:leading-[115%] prose-p:description prose-li:marker:text-deep-bright-red prose-li:description! prose-h2:subtitle-2! prose-p:m-0! prose-p:min-h-lh! prose-ul:m-0 prose-a:text-deep-bright-red",
    className,
  );

  const myPortableTextComponents: any = {
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="pl-6 my-4 list-disc marker:text-tuatara">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="pl-8 my-4 list-decimal">{children}</ol>
      ),
    },
    block: {
      h1: ({ children }: any) => <h1>{children}</h1>,
      h2: ({ children }: any) => {
        const text = getTextFromChildren(children);
        const id = slugify(text);
        return (
          <h2 id={id} >
            {children}
          </h2>
        );
      },
      h3: ({ children }: any) => (
        <h3 >{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 >
          {children}
        </h4>
      ),
      h5: ({ children }: any) => (
        <h5>
          {children}
        </h5>
      ),
      h6: ({ children }: any) => <h6>{children}</h6>,
      normal: ({ children }: any) => (
        <p>{children}</p>
      ),
      center: ({ children }: any) => <p className="text-center">{children}</p>,
    },
    marks: {
      link: ({
        value,
        children,
      }: {
        value: any;
        children: React.ReactNode;
      }) => {
        const internal = /^\/(?!\/)/.test(value.href);

        if (internal) return <Link href={value.href}>{children}</Link>;

        return (
          <a href={value.href} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        );
      },
      textColor: ({
        value,
        children,
      }: {
        value: any;
        children: React.ReactNode;
      }) => <span style={{ color: value.value }}>{children}</span>,
      superscript: ({ children }: { children: React.ReactNode }) => (
        <span>
          <sup>{children}</sup>
        </span>
      ),
      highlightedText: ({ children }: { children: React.ReactNode }) => (
        <span
          className={cn("font-semibold! text-[22px]", highlightedTextClassName)}
        >
          {children}
        </span>
      ),
    },
    types: {
      image: ({ value }: any) => {
        return (
          <figure>
            {value && (
              <SanityImage
                src={value}
                alt={value.alt || "VersCredit"}
                width={1000}
                height={1000}
                className="object-contain w-full m-0 max-h-125"
              />
            )}
            {value.alt && (
              <figcaption className="pl-2 text-sm border-l-2 border-safety-yellow text-ink-black">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },

      styledTable: RichTable,
    },
  };

  return (
    <div className={combinedClassNames}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
};

export default RichText;

// ({ value }: any) => {
//   return (
//     <div className="overflow-x-scroll custom-scrollbar">
//       <table className="w-full mb-4 overflow-hidden border 0 border-gray-30 rounded-xl">
//         <tbody className="">
//           {value.rows?.map((row: any, i: number) => {
//             return (
//               <tr key={i}>
//                 {row.cells?.map((cellValue: any, j: number) => {
//                   return (
//                     <td
//                       key={j}
//                       style={{
//                         backgroundColor: cellValue?.bgColor?.value,
//                         color: cellValue?.textColor?.value,
//                       }}
//                       className="p-2 "
//                     >
//                       <PortableText value={cellValue.content} />
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// },