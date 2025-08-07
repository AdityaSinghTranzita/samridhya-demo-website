import React from 'react';
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
  Redo
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
    // For now, we'll use a simple approach since this is inside a component
    // In a real implementation, you might want to pass a callback prop for this
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    // For now, we'll use a simple approach since this is inside a component
    // In a real implementation, you might want to pass a callback prop for this
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon: Icon, 
    title, 
    className = "" 
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 hover:bg-gray-200 ${
        isActive 
          ? 'bg-blue-100 text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:text-gray-800'
      } ${className}`}
      title={title}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0"></div>
  );

  const isFullHeight = className === "h-full";

  return (
    <div className={`border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Enhanced Toolbar */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-2 sm:p-3 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 overflow-x-auto">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              icon={Bold}
              title="Bold"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              icon={Italic}
              title="Italic"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              icon={UnderlineIcon}
              title="Underline"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              icon={Strikethrough}
              title="Strikethrough"
            />
          </div>

          <ToolbarDivider />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              icon={Heading1}
              title="Heading 1"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              icon={Heading2}
              title="Heading 2"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              icon={Heading3}
              title="Heading 3"
            />
          </div>

          <ToolbarDivider />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              icon={List}
              title="Bullet List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              icon={ListOrdered}
              title="Numbered List"
            />
          </div>

          <ToolbarDivider />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              icon={AlignLeft}
              title="Align Left"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              icon={AlignCenter}
              title="Align Center"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              icon={AlignRight}
              title="Align Right"
            />
          </div>

          <ToolbarDivider />

          {/* Links and Images */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={addLink}
              icon={LinkIcon}
              title="Insert Link"
            />
            <ToolbarButton
              onClick={addImage}
              icon={ImageIcon}
              title="Insert Image"
            />
          </div>

          <ToolbarDivider />

          {/* Text Color */}
          <div className="flex items-center gap-1">
            <Palette className="w-4 h-4 text-gray-500" />
            <div className="flex items-center gap-1">
              {[
                { color: '#000000', name: 'Black' },
                { color: '#3b82f6', name: 'Blue' },
                { color: '#ef4444', name: 'Red' },
                { color: '#10b981', name: 'Green' },
                { color: '#f59e0b', name: 'Orange' },
                { color: '#8b5cf6', name: 'Purple' },
              ].map(({ color, name }) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setTextColor(color)}
                  className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:scale-110 transition-all duration-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={name}
                />
              ))}
            </div>
          </div>

          <ToolbarDivider />

          {/* Clear Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            icon={Eraser}
            title="Clear Formatting"
          />
        </div>
      </div>
      
      {/* Enhanced Editor */}
      <div className={`bg-white flex-1 ${isFullHeight ? 'min-h-0' : ''}`}>
        <EditorContent 
          editor={editor} 
          className={`${isFullHeight ? 'h-full overflow-y-auto' : 'min-h-[200px]'} p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto max-w-none bg-white text-gray-900 w-full`}
          style={{ 
            minHeight: isFullHeight ? '100%' : '200px',
            height: isFullHeight ? '100%' : 'auto',
            backgroundColor: 'white',
            color: '#111827',
            position: 'relative',
            zIndex: 1,
            overflowY: 'auto'
          }}
        />
      </div>
    </div>
  );
};

export default TipTapEditor; 