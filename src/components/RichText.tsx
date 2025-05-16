
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

interface RichTextProps {
  content: any;
  className?: string;
}

const RichText = ({ content, className = '' }: RichTextProps) => {
  if (!content) {
    return null;
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => <code className="bg-muted px-1 py-0.5 rounded">{text}</code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4">{children}</p>,
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => <h5 className="text-base font-bold mt-3 mb-1">{children}</h5>,
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => <h6 className="text-sm font-bold mt-3 mb-1">{children}</h6>,
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li className="mb-1">{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-6 border-border" />,
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className={className}>
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default RichText;
