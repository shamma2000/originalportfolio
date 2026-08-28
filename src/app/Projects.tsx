"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

type Project = {
	number: string;
	title: string;
	company?: string;
	timeline: string;
	description: string;
	technologies: string[];
	image?: string;
};

const projects: Project[] = [
	{
		number: "01",
		title: "TeaBlendAI – AI-powered Tea Auction Platform",
		company: "Inivois Global",
		timeline: "12/2025 – Present",
		description: "Developed and integrated core authentication, user management, and transaction processing features for an AI-powered tea auction platform for the Sri Lankan tea industry. Implemented user registration, login, buyer and seller verification workflows, role-based access control, profile management, and secure frontend-backend API communication. Developed payment gateway integration, order management and tracking functionalities, and a buyer-seller messaging system to facilitate secure transactions and real-time communication. Contributed to auction-related features by managing user permissions, verification statuses, order workflows, and secure access to platform services, ensuring a reliable, scalable, and secure user experience.",
		technologies: ["Next.js", "Tailwind CSS", "MSSQL", "FastAPI", "TypeScript", "Shad-cnUI"],
		image: "/project_1_photo.png",
	},
	{
		number: "02",
		title: "LaserTunes",
		timeline: "Past Project",
		description: "We built LaserTunes as an innovative musical instrument that merges engineering and art. It is not only a tool for creative musical expression but also an educational platform to improve rhythm, reflexes, and coordination through gamified learning. Our purpose was to show how technology like lasers, sensors, and digital sound can create new ways to experience music, support STEAM education, and even open possibilities for accessible and inclusive music-making.",
		technologies: ["Hardware", "Sensors", "Lasers", "Digital Sound"],
		image: "/project_2_photo.jpeg",
	},
	{
		number: "03",
		title: "Personal Portfolio (This Website)",
		timeline: "2026 - Present",
		description: "Designing and developing a personal portfolio website to showcase my projects, skills, and professional journey. Built with a component-based architecture in Next.js, featuring custom canvas-based animations and a fully responsive multi-section layout.",
		technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Canvas"],
		image: "/project_3_photo.png",
	},
];

function ProjectPreview({ number, image, title }: { number: string; image?: string; title: string }) {
	return (
		<div className="relative h-48 w-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-cyan-950/20 md:h-60">
			{image ? (
				<Image src={image} alt={title} fill className="object-cover object-top transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" priority={number === "01"} />
			) : (
				<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-900/40 to-slate-900 text-sm text-cyan-300/60">No image provided</div>
			)}
		</div>
	);
}

function Card({ project, index }: { project: Project; index: number }) {
	const containerRef = useRef<HTMLDivElement>(null);
	useScroll({ target: containerRef, offset: ["start end", "start start"] });
	const TITLE_HEIGHT = 80;
	const HEADER_STEP = 92;
	const topMargin = index === 0 ? 0 : TITLE_HEIGHT + index * HEADER_STEP;

	return (
		<div ref={containerRef} className="sticky top-20 flex h-[65vh] items-start justify-center" style={{ paddingTop: `${topMargin}px`, zIndex: index + 10 }}>
			<div className="w-full">
				{index === 0 && <div className="mb-5 h-[60px]"><motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}><h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">Projects<span className="mt-3 block h-1.5 w-24 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]" /></h2></motion.div></div>}
				<motion.article initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }} className="group relative w-full overflow-hidden rounded-[2rem] border border-cyan-500/25 bg-[#08101a]/75 p-6 shadow-2xl backdrop-blur-xl md:px-8 md:pb-8 md:pt-6">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,229,255,0.12),_transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
					<div className="relative z-10 flex w-full items-center gap-4 border-b border-cyan-500/20 pb-3.5 md:gap-6"><span className="text-3xl font-black text-white/90 md:text-5xl">{project.number}</span><span className="min-w-0 flex-1"><span className="block truncate text-base font-bold text-white md:text-xl">{project.title}</span><span className="mt-0.5 block truncate text-xs font-medium text-slate-400 md:text-sm">{project.company ? `${project.company} | ` : ""}{project.timeline}</span></span></div>
					<div className="relative z-10 mt-5 grid gap-6 md:grid-cols-[1.1fr_1fr]"><div><p className="text-sm leading-relaxed text-slate-300 md:text-base">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-cyan-400/40 bg-[#082536]/80 px-3 py-1 text-xs font-medium text-cyan-100 shadow-[0_0_0_1px_rgba(0,229,255,0.2),0_0_20px_rgba(0,91,135,0.35)]">{tech}</span>)}</div></div><ProjectPreview number={project.number} image={project.image} title={project.title} /></div>
				</motion.article>
			</div>
		</div>
	);
}

export default function ProjectsAccordion() {
	return <section id="projects" className="relative w-full pt-4 pb-40"><div className="relative flex flex-col">{projects.map((project, index) => <Card key={project.number} project={project} index={index} />)}</div></section>;
}
