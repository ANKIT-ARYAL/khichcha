"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  Minus,
  Link2,
  Unlink,
  Image as ImageIcon,
  RemoveFormatting,
  Undo,
  Redo,
} from "lucide-react";

interface BlogEditorProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function BlogEditor({
  name,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "",
  minHeight = "160px",
}: BlogEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<Range | null>(null);

  // Initialize value
  const initial = controlledValue !== undefined ? controlledValue : defaultValue;
  const initialProcessed = name === "excerpt"
    ? initial.replace(/<(strong|b)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi, "$2")
    : initial;
  const [initialHtml] = useState(() => initialProcessed);

  // Sync external controlled value changes without losing internal cursor
  useEffect(() => {
    if (ref.current && controlledValue !== undefined && ref.current.innerHTML !== controlledValue) {
      ref.current.innerHTML = controlledValue;
      if (inputRef.current) inputRef.current.value = controlledValue;
    }
  }, [controlledValue]);

  const rememberSelection = () => {
    const sel = window.getSelection();
    if (sel?.rangeCount && ref.current?.contains(sel.anchorNode)) {
      selectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    ref.current?.focus();
    if (selectionRef.current) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(selectionRef.current);
    }
  };

  const emit = () => {
    if (!ref.current) return;
    const html = ref.current.innerHTML;
    if (inputRef.current) inputRef.current.value = html;
    onChange?.(html);
  };

  const exec = (cmd: string, val?: string) => {
    restoreSelection();
    document.execCommand(cmd, false, val);
    rememberSelection();
    emit();
  };

  const setTextSize = (size: string) => {
    if (!size) return;
    restoreSelection();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("fontSize", false, "7");
    const current = window.getSelection();
    const node = current?.anchorNode?.parentElement;
    if (node?.tagName === "SPAN" || node?.tagName === "FONT") {
      node.style.fontSize = size;
      node.removeAttribute("size");
    }
    rememberSelection();
    emit();
  };

  const createLink = () => {
    const url = window.prompt("Enter URL");
    if (url) exec("createLink", url);
  };

  const handleImageUpload = async (file?: File) => {
    if (!file) return;
    if (file.size > 1024 * 1024) {
      window.alert("Article images must be smaller than 1 MB.");
      return;
    }

    const form = new FormData();
    form.append("image", file);

    const response = await fetch("/api/admin/blogs/upload", {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      window.alert("Unable to upload image. Please try again.");
      return;
    }

    const { url } = await response.json();
    restoreSelection();
    document.execCommand("insertHTML", false, `<img class="blog-inline-image" src="${url}" alt="" />`);
    emit();
  };

  const btn = "p-1.5 rounded hover:bg-neutral-100 text-neutral-600 transition-colors";

  return (
    <div className="border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-neutral-500">
      {/* Toolbar */}
      <div
        className="rich-editor__toolbar flex items-center gap-1 flex-wrap bg-neutral-50 border-b border-neutral-200 px-2 py-1.5"
        onMouseDown={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button") || target.closest("label")) e.preventDefault();
        }}
      >
        <button type="button" className={`${btn} rich-editor__toolbar-button`} onClick={() => exec("undo")} title="Undo">
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={`${btn} rich-editor__toolbar-button`} onClick={() => exec("redo")} title="Redo">
          <Redo className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-neutral-200 mx-1" />

        <button type="button" className={btn} onClick={() => exec("formatBlock", "H1")} title="Heading 1">
          <Heading1 className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("formatBlock", "H2")} title="Heading 2">
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("formatBlock", "H3")} title="Heading 3">
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-neutral-200 mx-1" />

        <button type="button" className={btn} onClick={() => exec("bold")} title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("italic")} title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("underline")} title="Underline">
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("strikeThrough")} title="Strikethrough">
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <select
          aria-label="Text size"
          defaultValue=""
          className="text-xs bg-transparent border border-neutral-200 rounded px-1 py-1 text-neutral-600 outline-none"
          onChange={(e) => setTextSize(e.target.value)}
        >
          <option value="">Size</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
        </select>

        <button type="button" className={btn} onClick={() => exec("formatBlock", "blockquote")} title="Quote">
          <Quote className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-neutral-200 mx-1" />

        <button type="button" className={btn} onClick={() => exec("insertUnorderedList")} title="Bullet List">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("insertOrderedList")} title="Numbered List">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-neutral-200 mx-1" />

        <button type="button" className={btn} onClick={() => exec("justifyLeft")} title="Align Left">
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("justifyCenter")} title="Align Center">
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("justifyRight")} title="Align Right">
          <AlignRight className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("justifyFull")} title="Justify">
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-neutral-200 mx-1" />

        <button type="button" className={btn} onClick={() => exec("formatBlock", "pre")} title="Code">
          <Code className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("insertHorizontalRule")} title="Divider">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={createLink} title="Link">
          <Link2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={btn} onClick={() => exec("unlink")} title="Unlink">
          <Unlink className="w-3.5 h-3.5" />
        </button>

        <label className={`${btn} rich-editor__image-button cursor-pointer flex items-center`} title="Upload Image">
          <ImageIcon className="w-3.5 h-3.5" />
          <input
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              void handleImageUpload(e.target.files?.[0]);
              e.currentTarget.value = "";
            }}
          />
        </label>

        <button type="button" className={btn} onClick={() => exec("removeFormat")} title="Clear Formatting">
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Surface */}
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
        contentEditable
        suppressContentEditableWarning
        className="rich-editor__surface px-3 py-2.5 text-neutral-800 outline-none text-sm"
        style={{ minHeight }}
        data-placeholder={placeholder}
        onInput={() => {
          emit();
          rememberSelection();
        }}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
        onSelect={rememberSelection}
        onBlur={() => {
          emit();
          rememberSelection();
        }}
        role="textbox"
        aria-multiline="true"
      />

      {/* Hidden input preserves standard HTML form data submit */}
      <input ref={inputRef} type="hidden" name={name} id={`blog-editor-${name}-value`} />
    </div>
  );
}
