
# Portfolio Website with Vite, React & Contentful CMS

A modern, responsive portfolio website built with Vite, React, TypeScript, and Contentful CMS. This project provides a clean, customizable portfolio template that pulls content dynamically from Contentful.

![Portfolio Website Screenshot](https://via.placeholder.com/800x400?text=Portfolio+Website)

## 🚀 Features

- **Dynamic Content Management** - All content managed through Contentful CMS
- **Responsive Design** - Works on all devices using Tailwind CSS
- **Type-Safe** - Built with TypeScript for reliable code
- **Modern UI Components** - Leverages shadcn/ui component library
- **Rich Text Support** - Render Contentful rich text fields
- **Project Showcase** - Display and filter your projects
- **Skills Management** - Group and display skills by category
- **About Section** - Present your professional information
- **Contact Form** - Allow visitors to reach out to you

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- A free [Contentful](https://www.contentful.com/) account

## 🛠️ Setup Guide

### 1. Clone the repository

```sh
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up Contentful

#### Create a Contentful space

1. Sign up for a [Contentful account](https://www.contentful.com/sign-up/) if you don't have one
2. Create a new space in Contentful
3. Go to Settings > API keys and create a new API key
4. Note down your Space ID and Content Delivery API access token

#### Create content models in Contentful

The project uses three main content types: `about`, `project`, and `skill`. You need to create these models in Contentful:

##### 1. About (Content type ID: `about`)

| Field Name | Field ID | Field Type |
|------------|----------|------------|
| Name | `name` | Short text |
| Title | `title` | Short text |
| Bio | `bio` | Rich Text |
| Profile Image | `profileImage` | Media - Image |
| Email | `email` | Short text (optional) |
| Phone | `phone` | Short text (optional) |
| Location | `location` | Short text (optional) |
| Social Links | `socialLinks` | JSON object (optional) |

For `socialLinks`, use a structure like:
```json
{
  "LinkedIn": "https://linkedin.com/in/yourusername",
  "GitHub": "https://github.com/yourusername",
  "Twitter": "https://twitter.com/yourusername"
}
```

##### 2. Project (Content type ID: `project`)

| Field Name | Field ID | Field Type |
|------------|----------|------------|
| Title | `title` | Short text |
| Slug | `slug` | Short text (unique) |
| Description | `description` | Short text |
| Content | `content` | Rich Text |
| Featured Image | `featuredImage` | Media - Image |
| Technologies Used | `technologiesUsed` | Short text, list |
| Project URL | `projectUrl` | Short text (optional) |
| GitHub URL | `githubUrl` | Short text (optional) |
| Featured | `featured` | Boolean (optional) |
| Order | `order` | Number (optional) |

##### 3. Skill (Content type ID: `skill`)

| Field Name | Field ID | Field Type |
|------------|----------|------------|
| Name | `name` | Short text |
| Category | `category` | Short text |
| Proficiency Level | `proficiencyLevel` | Number (1-10) |
| Icon | `icon` | Media - Image (optional) |

#### Add content entries

1. Create at least one About entry (only one is used)
2. Add multiple Project entries
3. Add your Skills entries grouped by categories

### 4. Create environment variables

Create a `.env` file in the root of your project:

```
VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
```

### 5. Start the development server

```sh
npm run dev
```

Visit http://localhost:8080 to see your portfolio site!

## 📁 Project Structure

```
├── src/
│   ├── components/         # UI components
│   │   ├── Layout/         # Layout components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ProjectCard.tsx # Project card component
│   │   ├── RichText.tsx    # Contentful rich text renderer
│   │   └── SkillBadge.tsx  # Skill display component
│   ├── lib/
│   │   ├── contentful.ts   # Contentful API integration
│   │   └── utils.ts        # Utility functions
│   ├── pages/              # Page components
│   │   ├── AboutPage.tsx   # About page
│   │   ├── ContactPage.tsx # Contact page
│   │   ├── HomePage.tsx    # Home page
│   │   ├── ProjectsPage.tsx # Projects listing page
│   │   └── ProjectDetailPage.tsx # Project detail page
│   ├── App.tsx             # Main app component with routes
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## 🔄 Contentful Integration Details

### How the Contentful Integration Works

The project uses the `contentful` package to fetch data from the Contentful API. The main integration is in `src/lib/contentful.ts`, which provides:

1. **Client setup** - Creates a Contentful client with your space ID and access token
2. **Type definitions** - TypeScript interfaces matching your Contentful content models
3. **Helper functions** - Functions to fetch entries, get assets, etc.

### Key Functions

- `getEntries<T>(contentType)` - Fetch all entries of a specific content type
- `getEntryBySlug<T>(contentType, slug)` - Fetch a single entry by its slug field
- `getAboutInfo()` - Fetch the About information (typically just one entry)
- `getAssetUrl(asset)` - Helper to get the full URL of a Contentful asset

### Usage in Components

```tsx
// Example: Fetching projects in ProjectsPage.tsx
useEffect(() => {
  const fetchProjects = async () => {
    const projectEntries = await getEntries<any>(ContentTypes.PROJECT);
    setProjects(projectEntries);
  };
  
  fetchProjects();
}, []);
```

## 🧩 Adding More Content Types

To add a new content type:

1. Create the content model in Contentful
2. Add the content type ID to the `ContentTypes` enum in `src/lib/contentful.ts`
3. Create a TypeScript interface for the fields
4. Use `getEntries` or similar functions to fetch the content
5. Create components to display the content

## 📱 Deployment

To deploy this project:

1. Build the project:
```sh
npm run build
```

2. Deploy the `dist` folder to any static hosting service like Netlify, Vercel, or GitHub Pages.

3. Set up environment variables in your hosting provider for the Contentful Space ID and Access Token.

## ⚠️ Troubleshooting

### Common Issues:

1. **Content not loading**: Check if your Contentful API keys are correctly set in your environment variables.

2. **TypeScript errors**: Ensure the interfaces in `contentful.ts` match your Contentful content models.

3. **Rich text not rendering**: Make sure your Rich Text fields are properly structured and the `@contentful/rich-text-react-renderer` package is correctly used.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Contentful](https://www.contentful.com/) - Headless CMS
