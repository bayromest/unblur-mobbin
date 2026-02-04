# Copilot Instructions for Unblur Mobbin

## Project Overview

This is a **Chrome Extension (Manifest V3)** that unblurs pro scenes on mobbin.com. The architecture has two distinct parts:

1. **Content Script** ([public/content.js](../public/content.js)) - Vanilla JavaScript injected into mobbin.com pages
2. **Extension Popup** ([src/App.tsx](../src/App.tsx)) - React + TypeScript UI shown when clicking the extension icon

## Architecture & Data Flow

```
mobbin.com page load → content.js injected → DOM modifications applied
                                           → scroll events re-trigger modifications
extension icon click → popup opens → index.html loads React app
```

The content script runs independently of the popup. There is **no message passing** between popup and content script - they operate separately.

## Key Technical Patterns

### Content Script DOM Manipulation

The unblur logic in [public/content.js](../public/content.js) targets specific Mobbin elements:

**Blurred elements have these markers:**
- `pointer-events-none` class on container/link
- Low-quality image URL with `w=15` parameter
- Blur overlay div: `div[class*="backdrop-blur"]` with `bg-[hsl(var(--neutral-0)/40%)] backdrop-blur-[10px]`
- Watermark path ending in `/15` (e.g., `image=/mobbin.com/.../uuid/15`)

**Unblur transformation:**
1. Remove `pointer-events-none` class
2. Remove blur overlay div entirely
3. Upgrade image URL: `w=15` → `w=1920`
4. Fix watermark: remove `/15` suffix from image param

**Key selectors:**
- Screen cells: `.mobile-screen-border-radius-container.pointer-events-none`
- Flow cells: `a[data-sentry-component="FlowCellScreen"].pointer-events-none`
- Flow containers: `.w-\[--screen-width\]`

Event-driven execution with MutationObserver for dynamic content:
```javascript
window.addEventListener("scroll", handleModifications);
document.addEventListener("DOMContentLoaded", handleModifications);
const observer = new MutationObserver(() => handleModifications());
observer.observe(document.body, { childList: true, subtree: true });
```

### Build Output Structure

After `npm run build`, the `dist/` folder becomes the loadable extension:
- `dist/index.html` - Popup entry point
- `dist/content.js` - Copied from `public/` (not bundled by Vite)
- `dist/manifest.json` - Copied from `public/`

## Development Commands

```bash
npm install     # Install dependencies
npm run dev     # Start Vite dev server (for popup development only)
npm run build   # Build for production - creates loadable extension in dist/
npm run lint    # Run ESLint
```

**Important**: Changes to `public/content.js` require a full rebuild AND extension reload in Chrome.

## Extension Loading

1. Run `npm run build`
2. Go to `chrome://extensions/`
3. Enable Developer Mode
4. Click "Load unpacked" → select `dist/` folder
5. After code changes: rebuild → click refresh icon on extension card

## File Conventions

| Location | Purpose |
|----------|---------|
| `public/content.js` | Content script (vanilla JS, not processed by Vite) |
| `public/manifest.json` | Extension manifest (Manifest V3) |
| `src/` | React popup UI (TypeScript + Tailwind) |
| `public/icons/` | Extension icons (16, 48, 128px) |

## Common Modification Points

- **Targeting new Mobbin elements**: Update selectors in `handleModifications()` in [public/content.js](../public/content.js)
- **Adding permissions**: Edit [public/manifest.json](../public/manifest.json)
- **Popup UI changes**: Modify [src/App.tsx](../src/App.tsx) (uses Tailwind CSS)
