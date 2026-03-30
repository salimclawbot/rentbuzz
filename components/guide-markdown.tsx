import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

export function GuideMarkdown({ content }: { content: string }) {
  return (
    <div className="prose-rentbuzz max-w-none">
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
        ]}
        components={{
          h2: ({ node, ...props }) => <h2 className="text-3xl" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl" {...props} />,
          p: ({ node, ...props }) => <p className="text-base text-slate-700" {...props} />,
          ul: ({ node, ...props }) => <ul className="text-slate-700" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
