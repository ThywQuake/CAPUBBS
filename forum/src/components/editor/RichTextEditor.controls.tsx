import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, AtSign, Bold, ChevronDown, Eraser,
  Images as GalleryIcon, Image as ImageIcon, IndentDecrease, IndentIncrease,
  Italic, Link2, List, ListOrdered, MessageSquareQuote, Minus, Palette, Paperclip,
  Strikethrough, Subscript, Superscript, TextInitial, Underline,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import type {
  ChangeEventHandler, CSSProperties, Dispatch, FormEventHandler, KeyboardEvent,
  MouseEventHandler, ReactNode, RefObject, SetStateAction,
} from 'react';
import {
  defaultTextColor, richTextFontOptions, richTextFontSizeOptions, richTextHeadingOptions,
} from './RichTextEditor.constants';
import { editorImageInputAccept } from './RichTextEditor.images';
import { normalizeCssColor } from './RichTextEditor.richText';
import type { RichToggleCommandStates } from './RichTextEditor.richDom';
import type { RichImageWrap } from './RichTextEditor.resize';
import type { RichImageTextAlign } from './RichTextEditor.imageLayout';
import type { EditorPopover } from './RichTextEditor.types';
import { HexColorPanel } from '../HexColorPicker';
import { useToolbarTooltip } from './RichTextEditor.tooltip';

type Props = {
  activePopover: EditorPopover;
  activeRichCommands: RichToggleCommandStates;
  attachmentCount: number;
  applyHexSourceColor: () => void;
  applyRichTextColor: (color: string) => void;
  closePopover: () => void;
  fontSelectValue: string;
  fontSizeSelectValue: string;
  handleColorActionMouseDown: MouseEventHandler<HTMLButtonElement>;
  handleHexSourceChange: (value: string) => void;
  handleLocalImageFileChange: ChangeEventHandler<HTMLInputElement>;
  handlePopoverSubmit: FormEventHandler<HTMLFormElement>;
  handleRichFontChange: (value: string) => void;
  handleRichFontSizeChange: (value: string) => void;
  handleRichHeadingChange: (value: string) => void;
  handleToolbarMouseDown: MouseEventHandler<HTMLButtonElement>;
  headingSelectValue: string;
  hexSourceValue: string;
  imageFileError: string;
  imageFileInputRef: RefObject<HTMLInputElement | null>;
  insertHorizontalRule: () => void;
  isCheckingImageFile: boolean;
  isColorPickerOpen: boolean;
  isSourceMode: boolean;
  onOpenAttachments?: () => void;
  openGalleryDialog: () => void;
  openPopover: (popover: Exclude<EditorPopover, null>) => void;
  openQuotePopover: () => void;
  popoverConfig: { label: string; placeholder: string } | null;
  popoverTextValue: string;
  popoverValue: string;
  recentTextColors: string[];
  runRichCommand: (command: string, commandValue?: string) => void;
  saveSelection: () => void;
  selectedTextColor: string;
  selectedImageWrap: RichImageWrap | null;
  selectedImageTextAlign: RichImageTextAlign;
  setRichImageTextAlign: (alignment: RichImageTextAlign) => void;
  setRichImageWrap: (wrap: RichImageWrap) => void;
  setPopoverTextValue: Dispatch<SetStateAction<string>>;
  setPopoverValue: Dispatch<SetStateAction<string>>;
  toggleColorPicker: () => void;
  toggleRichFirstLineIndent: () => void;
};

export function RichTextEditorControls(props: Props) {
  const {
    activePopover, activeRichCommands, attachmentCount, applyHexSourceColor, applyRichTextColor,
    closePopover, fontSelectValue, fontSizeSelectValue, handleColorActionMouseDown,
    handleHexSourceChange, handleLocalImageFileChange, handlePopoverSubmit,
    handleRichFontChange, handleRichFontSizeChange, handleRichHeadingChange,
    handleToolbarMouseDown, headingSelectValue, hexSourceValue, imageFileError,
    imageFileInputRef, isCheckingImageFile, isColorPickerOpen, isSourceMode,
    insertHorizontalRule, onOpenAttachments,
    openGalleryDialog, openPopover, openQuotePopover, popoverConfig, popoverTextValue, popoverValue,
    recentTextColors, runRichCommand, saveSelection, selectedTextColor,
    selectedImageWrap, setRichImageWrap,
    selectedImageTextAlign, setRichImageTextAlign,
    setPopoverTextValue, setPopoverValue,
    toggleColorPicker, toggleRichFirstLineIndent,
  } = props;
  const toolbarTooltip = useToolbarTooltip();
  const colorTriggerRef = useRef<HTMLButtonElement>(null);
  const colorPopoverRef = useRef<HTMLDivElement>(null);
  const colorPopoverPosition = useAnchoredPopover(
    isColorPickerOpen && !isSourceMode,
    colorTriggerRef,
    colorPopoverRef,
    toggleColorPicker,
  );
  const ActiveAlignIcon = alignOptions.find((option) => activeRichCommands[option.value])?.icon ?? AlignLeft;

  const attachmentButton = onOpenAttachments ? (
    <ToolbarButton label="添加附件" onMouseDown={handleToolbarMouseDown} onClick={onOpenAttachments}>
      <Paperclip size={14} />
      {attachmentCount > 0 ? (
        <span className="capubbs-toolbar-badge" aria-hidden="true">{attachmentCount}</span>
      ) : null}
    </ToolbarButton>
  ) : null;

  return (
      <div className="capubbs-editor-toolbox bg-white/70 dark:bg-white/[0.04]" {...toolbarTooltip.handlers}>
        {toolbarTooltip.element}
        <input
          ref={imageFileInputRef}
          type="file"
          accept={editorImageInputAccept}
          onChange={handleLocalImageFileChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        {isSourceMode && attachmentButton ? (
          <div className="capubbs-rich-toolbar border-b border-zinc-200/80 px-1.5 py-1 dark:border-white/10">
            <div className="flex items-center gap-[0.5px]">{attachmentButton}</div>
          </div>
        ) : null}
        {!isSourceMode ? (
          <div className="capubbs-rich-toolbar overflow-x-auto border-b border-zinc-200/80 px-1.5 py-1 dark:border-white/10">
            <div className="flex min-w-max flex-nowrap items-center gap-[0.5px]">
              <ToolbarButton active={activeRichCommands.bold} label="加粗" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('bold')}>
                <Bold size={14} />
              </ToolbarButton>
              <ToolbarButton active={activeRichCommands.italic} label="斜体" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('italic')}>
                <Italic size={14} />
              </ToolbarButton>
              <ToolbarButton active={activeRichCommands.underline} label="下划线" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('underline')}>
                <Underline size={14} />
              </ToolbarButton>
              <ToolbarButton active={activeRichCommands.strikeThrough} label="删除线" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('strikeThrough')}>
                <Strikethrough size={14} />
              </ToolbarButton>
              <ToolbarButton active={activeRichCommands.superscript} label="上标" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('superscript')}>
                <Superscript size={14} />
              </ToolbarButton>
              <ToolbarButton active={activeRichCommands.subscript} label="下标" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('subscript')}>
                <Subscript size={14} />
              </ToolbarButton>
              <button
                ref={colorTriggerRef}
                type="button"
                onMouseDown={(event) => {
                  handleToolbarMouseDown(event);
                  saveSelection();
                }}
                onClick={toggleColorPicker}
                className={`relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--control-radius)] border text-[#174f38] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:text-white ${
                  isColorPickerOpen
                    ? 'border-[#174f38]/30 bg-[#174f38]/10 dark:border-emerald-200/30 dark:bg-emerald-200/15'
                    : 'border-transparent hover:border-zinc-200 hover:bg-zinc-100 dark:hover:border-white/10 dark:hover:bg-white/[0.1]'
                }`}
                aria-label="文字颜色"
                aria-haspopup="dialog"
                aria-expanded={isColorPickerOpen}
                data-toolbar-tooltip={isColorPickerOpen ? undefined : '文字颜色'}
              >
                <Palette size={14} />
                <span
                  className="pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 rounded-full"
                  style={{ backgroundColor: normalizeCssColor(selectedTextColor) ?? defaultTextColor }}
                  aria-hidden="true"
                />
              </button>

              <ToolbarDivider />

              <ToolbarMenu
                label="标题格式"
                onOpen={saveSelection}
                onSelect={handleRichHeadingChange}
                onTriggerMouseDown={handleToolbarMouseDown}
                options={richTextHeadingOptions}
                triggerClassName="w-16"
                value={headingSelectValue}
              >
                {richTextHeadingOptions.find((option) => option.value === headingSelectValue)?.label ?? '正文'}
              </ToolbarMenu>
              <ToolbarMenu
                label="字体"
                onOpen={saveSelection}
                onSelect={handleRichFontChange}
                onTriggerMouseDown={handleToolbarMouseDown}
                options={richTextFontOptions.map((option) => ({ ...option, style: { fontFamily: option.value } }))}
                triggerClassName="w-16"
                value={fontSelectValue}
              >
                {richTextFontOptions.find((option) => option.value === fontSelectValue)?.label
                  ?? (fontSelectValue ? fontSelectValue.split(',')[0].trim().replace(/^['"]|['"]$/g, '') : '字体')}
              </ToolbarMenu>
              <ToolbarMenu
                label="字号"
                onOpen={saveSelection}
                onSelect={handleRichFontSizeChange}
                onTriggerMouseDown={handleToolbarMouseDown}
                options={richTextFontSizeOptions}
                triggerClassName="w-11"
                value={fontSizeSelectValue}
              >
                {richTextFontSizeOptions.find((option) => option.value === fontSizeSelectValue)?.label
                  ?? (fontSizeSelectValue ? fontSizeSelectValue.replace(/px$/, '') : '字号')}
              </ToolbarMenu>

              <ToolbarDivider />

              <ToolbarMenu
                label="对齐方式"
                onSelect={(command) => runRichCommand(command)}
                onTriggerMouseDown={handleToolbarMouseDown}
                options={alignOptions}
                value={alignOptions.find((option) => activeRichCommands[option.value])?.value ?? ''}
              >
                <ActiveAlignIcon size={14} />
              </ToolbarMenu>
              <ToolbarButton active={activeRichCommands.firstLineIndent} label="首行缩进" onMouseDown={handleToolbarMouseDown} onClick={toggleRichFirstLineIndent}>
                <TextInitial size={14} />
              </ToolbarButton>
              <ToolbarButton label="减少缩进" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('outdent')}>
                <IndentDecrease size={14} />
              </ToolbarButton>
              <ToolbarButton label="增加缩进" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('indent')}>
                <IndentIncrease size={14} />
              </ToolbarButton>

              <ToolbarDivider />

              <ToolbarButton label="无序列表" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('insertUnorderedList')}>
                <List size={14} />
              </ToolbarButton>
              <ToolbarButton label="有序列表" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('insertOrderedList')}>
                <ListOrdered size={14} />
              </ToolbarButton>
              <ToolbarButton active={activePopover === 'quote'} label="引用" onMouseDown={handleToolbarMouseDown} onClick={openQuotePopover}>
                <MessageSquareQuote size={14} />
              </ToolbarButton>
              <ToolbarButton label="分隔线" onMouseDown={handleToolbarMouseDown} onClick={insertHorizontalRule}>
                <Minus size={14} />
              </ToolbarButton>

              <ToolbarDivider />

              <ToolbarButton label="插入链接" onMouseDown={handleToolbarMouseDown} onClick={() => openPopover('link')}>
                <Link2 size={14} />
              </ToolbarButton>
              <ToolbarButton label="@ 用户" onMouseDown={handleToolbarMouseDown} onClick={() => openPopover('mention')}>
                <AtSign size={14} />
              </ToolbarButton>
              <ToolbarButton label="插入图片" onMouseDown={handleToolbarMouseDown} onClick={() => openPopover('image')}>
                <ImageIcon size={14} />
              </ToolbarButton>
              <ToolbarButton label="插入图廊" onMouseDown={handleToolbarMouseDown} onClick={openGalleryDialog}>
                <GalleryIcon size={14} />
              </ToolbarButton>
              {attachmentButton}

              <ToolbarDivider />

              <ToolbarButton label="清除格式" onMouseDown={handleToolbarMouseDown} onClick={() => runRichCommand('removeFormat')}>
                <Eraser size={14} />
              </ToolbarButton>
            </div>
          </div>
        ) : null}

        {selectedImageWrap !== null && !isSourceMode ? (
          <div role="group" aria-label="图片文字环绕" className="flex flex-wrap gap-1 border-b border-zinc-200/80 px-2 py-1 dark:border-white/10">
            {([
              { value: 'left', label: '居左环绕', title: '图片居左，文字环绕' },
              { value: 'right', label: '居右环绕', title: '图片居右，文字环绕' },
              { value: 'none', label: '取消环绕', title: '取消文字环绕' },
            ] as const).map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={option.title}
                aria-pressed={selectedImageWrap === option.value}
                data-toolbar-tooltip={option.title}
                onMouseDown={handleToolbarMouseDown}
                onClick={() => setRichImageWrap(option.value)}
                className={`h-6 rounded-[var(--control-radius)] border px-2 text-[length:var(--ui-font-size-md)] font-medium text-[#174f38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:text-white ${
                  selectedImageWrap === option.value
                    ? 'border-[#174f38]/30 bg-[#174f38]/10 dark:border-emerald-200/30 dark:bg-emerald-200/15'
                    : 'border-transparent hover:border-zinc-200 hover:bg-zinc-100 dark:hover:border-white/10 dark:hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
            {selectedImageWrap !== 'none' ? (
              <span className="ml-1 flex h-6 items-center gap-1 text-[length:var(--ui-font-size-md)] text-zinc-600 dark:text-zinc-300">
                侧边文字
                <ToolbarMenu
                  label="侧边文字对齐"
                  onSelect={setRichImageTextAlign}
                  onTriggerMouseDown={handleToolbarMouseDown}
                  options={imageTextAlignOptions}
                  triggerClassName="w-[4.5rem]"
                  value={selectedImageTextAlign}
                >
                  {imageTextAlignOptions.find((option) => option.value === selectedImageTextAlign)?.label}
                </ToolbarMenu>
              </span>
            ) : null}
          </div>
        ) : null}

        {isColorPickerOpen && !isSourceMode && colorPopoverPosition ? createPortal(
          <div
            ref={colorPopoverRef}
            role="dialog"
            aria-label="文字颜色"
            className={`${toolbarPopoverClassName} capubbs-editor-color-panel grid gap-2 p-2`}
            style={colorPopoverPosition}
          >
            <HexColorPanel
              actionLabel="应用"
              ariaLabel="文字颜色"
              onChange={handleHexSourceChange}
              onCommit={() => {
                applyHexSourceColor();
                toggleColorPicker();
              }}
              onInteractionStart={saveSelection}
              value={hexSourceValue}
            />
            {recentTextColors.length > 0 ? (
              <div className="grid gap-1.5 border-t border-zinc-200/80 pt-2 text-[length:var(--ui-font-size-sm)] font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                <span>最近使用</span>
                <div className="flex flex-wrap gap-1.5">
                  {recentTextColors.map((recentColor) => {
                    const isActive = recentColor === normalizeCssColor(selectedTextColor);
                    return (
                      <button
                        key={recentColor}
                        type="button"
                        aria-label={`使用最近颜色 ${recentColor}`}
                        aria-pressed={isActive}
                        title={recentColor}
                        onMouseDown={handleColorActionMouseDown}
                        onClick={() => {
                          applyRichTextColor(recentColor);
                          toggleColorPicker();
                        }}
                        className={`h-[22px] w-[22px] rounded-[var(--control-radius)] border border-black/15 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:border-white/20 ${
                          isActive ? 'ring-2 ring-[#174f38] ring-offset-1 ring-offset-white dark:ring-emerald-200 dark:ring-offset-zinc-900' : ''
                        }`}
                        style={{ backgroundColor: recentColor }}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>,
          document.body,
        ) : null}

        {popoverConfig ? (
          <form
            onSubmit={handlePopoverSubmit}
            className="capubbs-editor-insert-panel flex flex-wrap items-center gap-2 border-t border-zinc-200/80 px-2 py-2 dark:border-white/10"
          >
            {activePopover === 'link' ? (
              <>
                <label className="min-w-[10rem] flex-1">
                  <span className="sr-only">链接文本</span>
                  <input
                    autoFocus
                    value={popoverTextValue}
                    onChange={(event) => setPopoverTextValue(event.target.value)}
                    placeholder="链接文本"
                    className="h-9 w-full rounded-[1px] border border-zinc-200 bg-white/80 px-3 text-[length:var(--ui-font-size-lg)] font-semibold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#174f38] focus:ring-2 focus:ring-[#174f38] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-zinc-500"
                  />
                </label>
                <label className="min-w-[12rem] flex-[1.4]">
                  <span className="sr-only">链接地址</span>
                  <input
                    value={popoverValue}
                    onChange={(event) => setPopoverValue(event.target.value)}
                    placeholder="链接地址"
                    className="h-9 w-full rounded-[1px] border border-zinc-200 bg-white/80 px-3 text-[length:var(--ui-font-size-lg)] font-semibold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#174f38] focus:ring-2 focus:ring-[#174f38] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-zinc-500"
                  />
                </label>
              </>
            ) : (
              <label className={activePopover === 'quote' ? 'min-w-[10rem] flex-1' : 'min-w-0 flex-1'}>
                <span className="sr-only">{popoverConfig.label}</span>
                <input
                  autoFocus
                  value={popoverValue}
                  onChange={(event) => setPopoverValue(event.target.value)}
                  placeholder={popoverConfig.placeholder}
                  className="h-9 w-full rounded-[1px] border border-zinc-200 bg-white/80 px-3 text-[length:var(--ui-font-size-lg)] font-semibold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#174f38] focus:ring-2 focus:ring-[#174f38] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
            )}
            {activePopover === 'quote' ? (
              <label className="min-w-[12rem] flex-[1.4]">
                <span className="sr-only">引文链接</span>
                <input
                  value={popoverTextValue}
                  onChange={(event) => setPopoverTextValue(event.target.value)}
                  placeholder="引文链接（可留空）"
                  className="h-9 w-full rounded-[1px] border border-zinc-200 bg-white/80 px-3 text-[length:var(--ui-font-size-lg)] font-semibold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#174f38] focus:ring-2 focus:ring-[#174f38] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
            ) : null}
            {activePopover === 'image' ? (
              <>
                <button
                  type="button"
                  disabled={isCheckingImageFile}
                  onClick={() => imageFileInputRef.current?.click()}
                  className="h-9 rounded-[1px] border border-[#174f38] bg-white/70 px-3 text-[length:var(--ui-font-size-md)] font-bold text-[#174f38] transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] disabled:cursor-wait disabled:opacity-50 dark:border-emerald-200 dark:bg-white/[0.06] dark:text-emerald-200 dark:hover:bg-emerald-200/10"
                >
                  {isCheckingImageFile ? '检查中...' : '上传图片'}
                </button>
              </>
            ) : null}
            <button
              type="submit"
              disabled={isCheckingImageFile}
              className="h-9 rounded-[1px] bg-[#174f38] px-3 text-[length:var(--ui-font-size-md)] font-bold text-white transition hover:bg-[#123d2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:bg-emerald-200 dark:text-zinc-950 dark:hover:bg-emerald-100"
            >
              {activePopover === 'quote' ? '确认' : '插入'}
            </button>
            <button
              type="button"
              onClick={closePopover}
              disabled={isCheckingImageFile}
              className="h-9 rounded-[1px] border border-zinc-200 bg-white/70 px-3 text-[length:var(--ui-font-size-md)] font-semibold text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
            >
              取消
            </button>
            {activePopover === 'image' && imageFileError ? (
              <p role="alert" className="basis-full text-[length:var(--ui-font-size-sm)] font-semibold text-rose-700 dark:text-rose-200">
                {imageFileError}
              </p>
            ) : null}
          </form>
        ) : null}
      </div>

  );
}

function ToolbarButton({
  active,
  children,
  label,
  onClick,
  onMouseDown,
}: {
  active?: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
  onMouseDown: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={typeof active === 'boolean' ? active : undefined}
      data-toolbar-tooltip={label}
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--control-radius)] border text-[#174f38] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:text-white ${
        active
          ? 'border-[#174f38]/30 bg-[#174f38]/10 shadow-inner dark:border-emerald-200/30 dark:bg-emerald-200/15'
          : 'border-transparent hover:border-zinc-200 hover:bg-zinc-100 dark:hover:border-white/10 dark:hover:bg-white/[0.1]'
      }`}
    >
      {children}
    </button>
  );
}

const alignOptions = [
  { value: 'justifyLeft', label: '左对齐', icon: AlignLeft },
  { value: 'justifyCenter', label: '居中', icon: AlignCenter },
  { value: 'justifyRight', label: '右对齐', icon: AlignRight },
  { value: 'justifyFull', label: '两端对齐', icon: AlignJustify },
] as const;

const imageTextAlignOptions = [
  { value: 'top', label: '顶端对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'bottom', label: '底端对齐' },
] as const;

const toolbarPopoverClassName = 'fixed z-[1100] rounded-[var(--card-radius)] border border-zinc-200 bg-white shadow-lg dark:border-white/10 dark:bg-zinc-900';

function useAnchoredPopover(
  isOpen: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  popoverRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return undefined;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = popoverRef.current?.offsetWidth ?? 0;
      const height = popoverRef.current?.offsetHeight ?? 0;
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      const fitsBelow = rect.bottom + 4 + height <= window.innerHeight - 8;
      const top = fitsBelow || rect.top - 4 - height < 8 ? rect.bottom + 4 : rect.top - 4 - height;
      setPosition({ left, top });
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      onCloseRef.current();
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && event.target !== triggerRef.current) onCloseRef.current();
    };

    updatePosition();
    const frame = window.requestAnimationFrame(updatePosition);
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, triggerRef, popoverRef]);

  return position;
}

type ToolbarMenuOption<T extends string> = {
  icon?: LucideIcon;
  label: string;
  style?: CSSProperties;
  value: T;
};

function ToolbarMenu<T extends string>({
  children,
  label,
  onOpen,
  onSelect,
  onTriggerMouseDown,
  options,
  triggerClassName = '',
  value,
}: {
  children: ReactNode;
  label: string;
  onOpen?: () => void;
  onSelect: (value: T) => void;
  onTriggerMouseDown: MouseEventHandler<HTMLButtonElement>;
  options: readonly ToolbarMenuOption<T>[];
  triggerClassName?: string;
  value: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const selectOption = (option: ToolbarMenuOption<T>) => {
    onSelect(option.value);
    closeMenu();
  };

  const position = useAnchoredPopover(isOpen, triggerRef, menuRef, closeMenu);

  const openMenu = () => {
    onOpen?.();
    setHighlightedIndex(options.findIndex((option) => option.value === value));
    setIsOpen(true);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === 'Escape' || event.key === 'Tab') {
      if (event.key === 'Escape') event.preventDefault();
      closeMenu();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setHighlightedIndex((index) => (index + step + options.length) % options.length);
    } else if ((event.key === 'Enter' || event.key === ' ') && options[highlightedIndex]) {
      event.preventDefault();
      selectOption(options[highlightedIndex]);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-toolbar-tooltip={isOpen ? undefined : label}
        onMouseDown={onTriggerMouseDown}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex h-6 shrink-0 items-center justify-between gap-0.5 rounded-[var(--control-radius)] border px-1 text-[length:var(--ui-font-size-md)] font-medium text-[#174f38] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174f38] dark:text-white ${
          isOpen
            ? 'border-[#174f38]/30 bg-[#174f38]/10 dark:border-emerald-200/30 dark:bg-emerald-200/15'
            : 'border-transparent hover:border-zinc-200 hover:bg-zinc-100 dark:hover:border-white/10 dark:hover:bg-white/[0.1]'
        } ${triggerClassName}`}
      >
        <span className="flex min-w-0 items-center truncate">{children}</span>
        <ChevronDown size={10} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && position ? createPortal(
        <div
          ref={menuRef}
          role="menu"
          aria-label={label}
          className={`${toolbarPopoverClassName} grid max-h-[min(20rem,calc(100vh-1rem))] min-w-[7.5rem] gap-px overflow-y-auto p-1`}
          style={position}
        >
          {options.map((option, index) => {
            const isActive = option.value === value;
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                tabIndex={-1}
                onMouseDown={onTriggerMouseDown}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
                className={`flex h-7 items-center gap-2 rounded-[var(--control-radius)] px-2 text-left text-[length:var(--ui-font-size-md)] font-medium transition ${
                  isActive
                    ? 'bg-[#174f38]/10 text-[#174f38] dark:bg-emerald-200/15 dark:text-emerald-100'
                    : `text-zinc-700 dark:text-zinc-200 ${index === highlightedIndex ? 'bg-zinc-100 dark:bg-white/10' : ''}`
                } ${isActive && index === highlightedIndex ? 'ring-1 ring-inset ring-[#174f38]/30 dark:ring-emerald-200/30' : ''}`}
                style={option.style}
              >
                {Icon ? <Icon size={14} /> : null}
                {option.label}
              </button>
            );
          })}
        </div>,
        document.body,
      ) : null}
    </>
  );
}

function ToolbarDivider() {
  return <span className="mx-px h-4 w-px shrink-0 bg-zinc-200 dark:bg-white/10" />;
}
