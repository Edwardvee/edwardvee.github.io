# 📁 Projects Data Configuration

This folder contains the configuration files for your project gallery.

## 🚀 Quick Setup Guide

### 1. Update Project Information

Edit `projects.ts` and replace the placeholder data with your real projects:

```typescript
{
  id: "your-project-id",           // Unique identifier (lowercase, no spaces)
  title: "Your Project Name",      // Display name
  icon: "🚀",                     // Emoji icon for desktop
  description: "Brief description", // Short description (1-2 lines)
  technologies: ["React", "TS"],   // Tech stack array
  status: "completed",             // "completed" | "in-progress" | "coming-soon"
  image: "/projects/your-img.png", // Screenshot path
  demoUrl: "https://demo.com",     // Optional: Live demo URL
  githubUrl: "https://github.com/you/repo", // Optional: Repository URL
  details: "Detailed description..." // Full description for project window
}
```

### 2. Add Project Images

Create a `projects` folder in your `public` directory:

```
public/
└── projects/
    ├── retro-portfolio.png
    ├── pixel-gallery.png
    ├── dev-blog.png
    └── game-engine.png
```

**Image Requirements:**
- **Format**: PNG, JPG, or WebP
- **Size**: 400x300px recommended (4:3 aspect ratio)
- **Quality**: High resolution for crisp display
- **Content**: Screenshot or mockup of your project

### 3. Update URLs

Replace placeholder URLs with your actual links:
- `demoUrl`: Link to live demo/deployed site
- `githubUrl`: Link to GitHub repository
- Remove these fields if not applicable

### 4. Customize Status Labels

Available status options:
- `"completed"` - ✅ Finished projects
- `"in-progress"` - 🚧 Currently working on
- `"coming-soon"` - 🔜 Planned projects

### 5. Technology Stack

Add your actual technologies to the `technologies` array:

```typescript
technologies: ["React", "TypeScript", "Node.js", "MongoDB"]
```

Common technologies included in `techColors` for styling:
- Frontend: React, Vue, Angular, Svelte
- Languages: TypeScript, JavaScript, Python, C++
- Styling: SCSS, CSS, Tailwind
- Tools: Vite, Next.js, Node.js

## 📝 Example Project Entry

```typescript
{
  id: "ecommerce-app",
  title: "E-Commerce Platform",
  icon: "🛒",
  description: "Full-stack online store with payment integration",
  technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  status: "completed",
  image: "/projects/ecommerce-app.png",
  demoUrl: "https://mystore.com",
  githubUrl: "https://github.com/username/ecommerce-app",
  details: "A complete e-commerce solution built with the MERN stack. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Deployed on AWS with CI/CD pipeline."
}
```

## 🎨 Customization Options

### Adding New Categories
Edit the `projectCategories` object to add new project types:

```typescript
export const projectCategories = {
  web: "🌐 Web Development",
  mobile: "📱 Mobile Apps",
  ai: "🤖 AI/Machine Learning",
  // Add your categories here
};
```

### Custom Technology Colors
Add colors for your tech stack in `techColors`:

```typescript
export const techColors: Record<string, string> = {
  "Your Framework": "#FF6B6B",
  // Add more colors here
};
```

## 🔧 File Structure

```
src/data/
├── projects.ts          # Main project data
├── updates.ts           # Website updates/changelog
├── config.ts           # Gallery configuration
├── README.md           # This file (projects guide)
├── updates-README.md   # Updates configuration guide
└── (future files)      # Categories, filters, etc.
```

## 💡 Tips

1. **Keep descriptions concise** - The desktop view has limited space
2. **Use high-quality images** - They're the first thing users see
3. **Update regularly** - Keep your project status current
4. **Test links** - Ensure all URLs work correctly
5. **Consistent naming** - Use clear, descriptive project IDs

## 🐛 Troubleshooting

**Images not showing?**
- Check file path is correct (starts with `/projects/`)
- Ensure image exists in `public/projects/` folder
- Verify file extension matches

**Project not appearing?**
- Check for syntax errors in `projects.ts`
- Ensure all required fields are filled
- Verify unique `id` for each project

**Styling issues?**
- Check if technology exists in `techColors`
- Verify status is one of the three allowed values
- Ensure proper TypeScript types

---

Happy coding! 🎮✨
## 📰 Update
s Management

For managing website updates/changelog, see the separate guide:
- **File**: `updates.ts` 
- **Guide**: `updates-README.md`
- **Component**: `src/components/Updates.tsx`

### Quick Updates Setup
```typescript
// Add new updates at the TOP of the array
{
  id: "2025-01-15-new-feature",
  date: "2025-01-15", 
  title: "✨ Added awesome new feature!"
}
```