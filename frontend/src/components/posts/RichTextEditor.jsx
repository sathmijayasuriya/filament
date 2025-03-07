import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, Strikethrough, Link as LinkIcon, Heading2, Heading3, List, ListOrdered, ImageIcon, Undo, Redo } from "lucide-react"
import { useState, useEffect } from 'react';

export default function RichTextEditor({ content, setContent }) {
    const editor = useEditor({
        extensions: [
          StarterKit,
          Link,
          Image,
          Heading.configure({ levels: [2, 3] }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
          // This is what updates the parent component's content
          setContent(editor.getHTML());
        },
      });
    
      if (!editor) return null;
    
  return (
    <div className="p-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" onClick={() => {
          const url = prompt('Enter the URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}>
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {
          const url = prompt('Enter the image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}>
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      {/* Use only the EditorContent, not a separate textarea */}
      <EditorContent 
        editor={editor} 
        className="min-h-[150px] p-3 focus:outline-none border-t mt-2" 
      />
    </div>
  )
}