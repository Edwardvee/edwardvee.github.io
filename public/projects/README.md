# 📷 Project Images Folder

This folder contains screenshots and images for your project gallery.

## 📋 Required Images

Based on your `projects.ts` file, you need these images:

- `retro-portfolio.png` - Screenshot of this portfolio website
- `pixel-gallery.png` - Screenshot of your pixel art gallery
- `dev-blog.png` - Screenshot of your developer blog
- `game-engine.png` - Screenshot of your 2D game engine

## 📐 Image Specifications

### Recommended Dimensions
- **Width**: 400px
- **Height**: 300px
- **Aspect Ratio**: 4:3
- **Format**: PNG (preferred) or JPG

### Image Guidelines
1. **High Quality**: Use crisp, clear screenshots
2. **Representative**: Show the main interface/features
3. **Consistent Style**: Similar lighting and composition
4. **No Text Overlay**: Avoid adding text on images
5. **Proper Cropping**: Focus on the important parts

## 🎨 Creating Good Project Screenshots

### For Web Projects
- Take full-page screenshots
- Show the main landing page or dashboard
- Include navigation and key features
- Use consistent browser/device frames

### For Desktop Applications
- Capture the main window
- Show typical usage scenario
- Include UI elements and content
- Use clean, organized layouts

### For Mobile Apps
- Use device mockups or frames
- Show key screens (home, main feature)
- Maintain consistent device orientation
- Consider showing multiple screens

### For Code/Backend Projects
- Show architecture diagrams
- Include code editor screenshots
- Display terminal/console output
- Create visual representations

## 🛠️ Tools for Screenshots

### Free Options
- **Snipping Tool** (Windows)
- **Screenshot** (macOS)
- **GNOME Screenshot** (Linux)
- **Browser DevTools** (for responsive views)

### Advanced Tools
- **Figma** (for mockups and designs)
- **Canva** (for creating project visuals)
- **Photoshop/GIMP** (for editing)
- **Sketch** (macOS design tool)

## 📱 Placeholder Images

If you don't have images ready, you can use placeholder services:

```html
<!-- Temporary placeholder -->
<img src="https://via.placeholder.com/400x300/a29574/ffffff?text=Project+Name" />
```

## 🔄 Updating Images

1. Add your image to this folder
2. Update the `image` field in `src/data/projects.ts`
3. Ensure the filename matches exactly
4. Test in the browser

## 📂 File Naming Convention

Use descriptive, lowercase names with hyphens:
- ✅ `retro-portfolio.png`
- ✅ `pixel-art-gallery.png`
- ✅ `e-commerce-app.png`
- ❌ `Project 1.PNG`
- ❌ `IMG_001.jpg`

---

**Note**: This folder is served statically, so images are publicly accessible via `/projects/filename.png`