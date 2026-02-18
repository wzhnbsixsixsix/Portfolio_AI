"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";


interface AllProjectsProps {
  title?: string;
}

export default function AllProjects({ title = 'My Projects' }: AllProjectsProps) {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  console.log(data[0]);

  return (
    <div className="w-full h-full pt-8">
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {title}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
