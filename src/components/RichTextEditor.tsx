import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import InputDialog from './InputDialog';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Palette, 
  Eraser,
  Quote,
  Code,
  Undo,
  Redo,
  Table as TableIcon,
  Plus,
  Minus
} from 'lucide-react';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  className = "min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]",
}) => {
  const [linkDialog, setLinkDialog] = useState({ isOpen: false, initialValue: '' });
  const [imageDialog, setImageDialog] = useState({ isOpen: false, initialValue: '' });
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable extensions that we're adding separately to avoid conflicts
        link: false,
        underline: false,
        strike: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Strike,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-200',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2 text-left',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2 text-left font-semibold bg-gray-50',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] bg-white text-gray-900 w-full',
      },
    },
    immediatelyRender: false,
    autofocus: false,
    editable: true,
  });

  if (!editor) {
    return (
      <div className={`border border-gray-300 rounded-xl shadow-sm ${className}`}>
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-3">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Initializing editor...</span>
          </div>
        </div>
        <div className="p-4 min-h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const addLink = () => {
    if (editor) {
      setLinkDialog({ isOpen: true, initialValue: '' });
    }
  };

  const addImage = () => {
    if (editor) {
      setImageDialog({ isOpen: true, initialValue: '' });
    }
  };

  const handleLinkSubmit = (url: string) => {
    console.log('Handling link submit:', url);
    if (editor) {
      editor.chain().focus().setLink({ href: url }).run();
      console.log('Link added successfully');
    }
  };

  const handleImageSubmit = (url: string) => {
    console.log('Handling image submit:', url);
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
      console.log('Image added successfully');
    }
  };

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const mergeCells = () => {
    editor.chain().focus().mergeCells().run();
  };

  const splitCell = () => {
    editor.chain().focus().splitCell().run();
  };

  const toggleHeaderCell = () => {
    editor.chain().focus().toggleHeaderCell().run();
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon: Icon, 
    title, 
    description = "",
    className = "",
    showLabel = false
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description?: string;
    className?: string;
    showLabel?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 hover:bg-gray-200 group relative ${
        isActive 
          ? 'bg-blue-100 text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:text-gray-800'
      } ${className}`}
      title={`${title}${description ? ` - ${description}` : ''}`}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      {showLabel && (
        <span className="ml-1 text-xs font-medium">{title}</span>
      )}
      {/* Enhanced Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {title}
        {description && (
          <div className="text-gray-300 text-xs mt-0.5">{description}</div>
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0"></div>
  );

  const ToolbarGroup = ({ 
    children, 
    label, 
    className = "" 
  }: {
    children: React.ReactNode;
    label?: string;
    className?: string;
  }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      {label && (
        <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-md mr-1">
          {label}
        </span>
      )}
      {children}
    </div>
  );

  const isFullHeight = className === "h-full";

  return (
    <div className={`border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Enhanced Sticky Toolbar */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-3 flex-shrink-0 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          
          {/* Text Formatting Group */}
          <ToolbarGroup label="Format">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              icon={Bold}
              title="Bold"
              description="Make text bold (Ctrl+B)"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              icon={Italic}
              title="Italic"
              description="Make text italic (Ctrl+I)"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              icon={UnderlineIcon}
              title="Underline"
              description="Underline text (Ctrl+U)"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              icon={Strikethrough}
              title="Strikethrough"
              description="Cross out text"
            />
          </ToolbarGroup>

          <ToolbarDivider />

          {/* Headings Group */}
          <ToolbarGroup label="Headings">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              icon={Heading1}
              title="Heading 1"
              description="Main heading"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              icon={Heading2}
              title="Heading 2"
              description="Sub heading"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              icon={Heading3}
              title="Heading 3"
              description="Section heading"
            />
          </ToolbarGroup>

          <ToolbarDivider />

          {/* Lists Group */}
          <ToolbarGroup label="Lists">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              icon={List}
              title="Bullet List"
              description="Create bullet points"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              icon={ListOrdered}
              title="Numbered List"
              description="Create numbered list"
            />
          </ToolbarGroup>

          <ToolbarDivider />

          {/* Alignment Group */}
          <ToolbarGroup label="Align">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              icon={AlignLeft}
              title="Align Left"
              description="Left align text"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              icon={AlignCenter}
              title="Align Center"
              description="Center align text"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              icon={AlignRight}
              title="Align Right"
              description="Right align text"
            />
          </ToolbarGroup>

          <ToolbarDivider />

          {/* Insert Group */}
          <ToolbarGroup label="Insert">
            <ToolbarButton
              onClick={addLink}
              icon={LinkIcon}
              title="Insert Link"
              description="Add a hyperlink"
            />
            <ToolbarButton
              onClick={addImage}
              icon={ImageIcon}
              title="Insert Image"
              description="Add an image"
            />
            <ToolbarButton
              onClick={insertTable}
              icon={TableIcon}
              title="Insert Table"
              description="Add a 3x3 table"
            />
          </ToolbarGroup>

          {/* Table Controls - Only show when in table */}
          {editor.isActive('table') && (
            <>
              <ToolbarDivider />
              <ToolbarGroup label="Table">
                <ToolbarButton
                  onClick={addColumnBefore}
                  icon={Plus}
                  title="Add Column Before"
                  description="Insert column to the left"
                />
                <ToolbarButton
                  onClick={addColumnAfter}
                  icon={Plus}
                  title="Add Column After"
                  description="Insert column to the right"
                />
                <ToolbarButton
                  onClick={deleteColumn}
                  icon={Minus}
                  title="Delete Column"
                  description="Remove current column"
                />
                <ToolbarButton
                  onClick={addRowBefore}
                  icon={Plus}
                  title="Add Row Before"
                  description="Insert row above"
                />
                <ToolbarButton
                  onClick={addRowAfter}
                  icon={Plus}
                  title="Add Row After"
                  description="Insert row below"
                />
                <ToolbarButton
                  onClick={deleteRow}
                  icon={Minus}
                  title="Delete Row"
                  description="Remove current row"
                />
                <ToolbarButton
                  onClick={deleteTable}
                  icon={Minus}
                  title="Delete Table"
                  description="Remove entire table"
                />
              </ToolbarGroup>
            </>
          )}

          <ToolbarDivider />

          {/* Color Group */}
          <ToolbarGroup label="Colors">
            <div className="flex items-center gap-1">
              <Palette className="w-4 h-4 text-gray-500" />
              <div className="flex items-center gap-1">
                {[
                  { color: '#000000', name: 'Black', desc: 'Default text color' },
                  { color: '#3b82f6', name: 'Blue', desc: 'Blue text color' },
                  { color: '#ef4444', name: 'Red', desc: 'Red text color' },
                  { color: '#10b981', name: 'Green', desc: 'Green text color' },
                  { color: '#f59e0b', name: 'Orange', desc: 'Orange text color' },
                  { color: '#8b5cf6', name: 'Purple', desc: 'Purple text color' },
                ].map(({ color, name, desc }) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setTextColor(color)}
                    className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:scale-110 transition-all duration-200 shadow-sm group relative"
                    style={{ backgroundColor: color }}
                    title={`${name} - ${desc}`}
                  >
                    {/* Enhanced color tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {name}
                      <div className="text-gray-300 text-xs mt-0.5">{desc}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ToolbarGroup>

          <ToolbarDivider />

          {/* Actions Group */}
          <ToolbarGroup label="Actions">
            <ToolbarButton
              onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
              icon={Eraser}
              title="Clear Formatting"
              description="Remove all formatting"
            />
          </ToolbarGroup>
        </div>
      </div>
      
      {/* Scrollable Editor Content */}
      <div className={`bg-white flex-1 overflow-y-auto ${isFullHeight ? 'min-h-0' : ''}`}>
        <EditorContent 
          editor={editor} 
          className={`${isFullHeight ? 'h-full' : 'min-h-[200px]'} p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto max-w-none bg-white text-gray-900 w-full`}
          style={{ 
            minHeight: isFullHeight ? '100%' : '200px',
            height: isFullHeight ? '100%' : 'auto',
            backgroundColor: 'white',
            color: '#111827',
            position: 'relative',
            zIndex: 1
          }}
        />
        <style jsx>{`
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.5em !important;
            margin: 0.5em 0 !important;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.5em !important;
            margin: 0.5em 0 !important;
          }
          .ProseMirror li {
            margin: 0.25em 0 !important;
            display: list-item !important;
            line-height: 1.6 !important;
          }
          .ProseMirror li::marker {
            color: #6b7280 !important;
            font-weight: 500 !important;
          }
          .ProseMirror ul ul {
            list-style-type: circle !important;
            margin: 0.25em 0 !important;
          }
          .ProseMirror ul ul ul {
            list-style-type: square !important;
            margin: 0.25em 0 !important;
          }
          .ProseMirror ol ol {
            list-style-type: lower-alpha !important;
            margin: 0.25em 0 !important;
          }
          .ProseMirror ol ol ol {
            list-style-type: lower-roman !important;
            margin: 0.25em 0 !important;
          }
          .ProseMirror table {
            border-collapse: collapse;
            margin: 1em 0;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
          .ProseMirror table td,
          .ProseMirror table th {
            border: 1px solid #d1d5db;
            padding: 0.75rem;
            text-align: left;
            vertical-align: top;
          }
          .ProseMirror table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #374151;
          }
          .ProseMirror table tr:nth-child(even) {
            background-color: #fafafa;
          }
          .ProseMirror table tr:hover {
            background-color: #f3f4f6;
          }
          .ProseMirror .selectedCell {
            background-color: #dbeafe !important;
          }
          .ProseMirror .column-resize-handle {
            background-color: #3b82f6;
            width: 4px;
            position: absolute;
            right: -2px;
            top: 0;
            bottom: 0;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .ProseMirror .column-resize-handle:hover {
            opacity: 1;
          }
          .ProseMirror .resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
          }
        `}        </style>
      </div>

      {/* Custom Input Dialogs */}
      {editor && (
        <>
          <InputDialog
            isOpen={linkDialog.isOpen}
            onClose={() => setLinkDialog({ isOpen: false, initialValue: '' })}
            onSubmit={handleLinkSubmit}
            title="Insert Link"
            placeholder="Enter URL (e.g., https://example.com)"
            type="link"
            initialValue={linkDialog.initialValue}
          />

          <InputDialog
            isOpen={imageDialog.isOpen}
            onClose={() => setImageDialog({ isOpen: false, initialValue: '' })}
            onSubmit={handleImageSubmit}
            title="Insert Image"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            type="image"
            initialValue={imageDialog.initialValue}
          />
        </>
      )}
    </div>
  );
};

export default TipTapEditor; 