import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PROJECT_CONTENT = [
  {
    title: 'AI Project 01',
    description:
      'Project summary coming soon. This section is ready for your custom project description, architecture, and business value.',
    techStack: ['Python', 'TypeScript', 'Next.js'],
    date: '2026',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/wzhnbsixsixsix',
      },
    ],
    images: [
      {
        src: '/dataipreview.png',
        alt: 'Project 01 preview',
      },
    ],
  },
  {
    title: 'AI Project 02',
    description:
      'Project summary coming soon. Add your use case, model pipeline, and key metrics here.',
    techStack: ['React', 'TailwindCSS', 'LLM API'],
    date: '2026',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/wzhnbsixsixsix',
      },
    ],
    images: [
      {
        src: '/defaipreview.png',
        alt: 'Project 02 preview',
      },
    ],
  },
  {
    title: 'AI Project 03',
    description:
      'Project summary coming soon. Describe the core problem, your approach, and what you learned.',
    techStack: ['Node.js', 'PostgreSQL', 'AI Workflow'],
    date: '2025',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/wzhnbsixsixsix',
      },
    ],
    images: [
      {
        src: '/fitgearpreview.png',
        alt: 'Project 03 preview',
      },
    ],
  },
  {
    title: 'AI Project 04',
    description:
      'Project summary coming soon. Add deployment details, user impact, and screenshots.',
    techStack: ['Next.js', 'Vercel', 'OpenAI-Compatible API'],
    date: '2025',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/wzhnbsixsixsix',
      },
    ],
    images: [
      {
        src: '/syntopreview.png',
        alt: 'Project 04 preview',
      },
    ],
  },
];

interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="mb-4 flex items-center gap-2 px-6">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-[#F5F5F7] p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const data = [
  {
    category: 'AI Product',
    title: 'AI Project 01',
    src: '/dataipreview.png',
    content: <ProjectContent project={{ title: 'AI Project 01' }} />,
  },
  {
    category: 'AI Product',
    title: 'AI Project 02',
    src: '/defaipreview.png',
    content: <ProjectContent project={{ title: 'AI Project 02' }} />,
  },
  {
    category: 'AI Product',
    title: 'AI Project 03',
    src: '/fitgearpreview.png',
    content: <ProjectContent project={{ title: 'AI Project 03' }} />,
  },
  {
    category: 'AI Product',
    title: 'AI Project 04',
    src: '/syntopreview.png',
    content: <ProjectContent project={{ title: 'AI Project 04' }} />,
  },
];
