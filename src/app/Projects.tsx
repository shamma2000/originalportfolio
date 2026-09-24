"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
			<path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
		</svg>
	);
}

type Project = {
	number: string;
	title: string;
	company?: string;
	timeline: string;
	description: string;
	technologies: string[];
	image?: string;
	githubLink?: string;
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
		githubLink: "https://github.com/thejitha-minindu/teablendai-project.git",
	},
	{
		number: "02",
		title: "LaserTunes",
		timeline: "Past Project",
		description: "We built LaserTunes as an innovative musical instrument that merges engineering and art. It is not only a tool for creative musical expression but also an educational platform to improve rhythm, reflexes, and coordination through gamified learning. Our purpose was to show how technology like lasers, sensors, and digital sound can create new ways to experience music, support STEAM education, and even open possibilities for accessible and inclusive music-making.",
		technologies: ["Hardware", "Sensors", "Lasers", "Digital Sound"],
		image: "/project_2_photo.jpeg",
		githubLink: "https://github.com/kevizamarz/LaserTunesCode.git",
	},
	{
		number: "03",
		title: "Personal Portfolio (This Website)",
		timeline: "2026 - Present",
		description: "Designing and developing a personal portfolio website to showcase my projects, skills, and professional journey. Built with a component-based architecture in Next.js, featuring custom canvas-based animations and a fully responsive multi-section layout.",
		technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Canvas"],
		image: "/project_3_photo.png",
		githubLink: "https://github.com/shamma2000/originalportfolio.git",
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

/** A single stacking card driven by shared scroll progress */
function StackingCard({
	project,
	index,
	total,
	containerRef,
}: {
	project: Project;
	index: number;
	total: number;
	containerRef: React.RefObject<HTMLDivElement | null>;
}) {
	const isLast = index === total - 1;

	// Track scroll progress across the ENTIRE stacking container.
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Each card occupies its own 1/total slice of the scroll range.
	const cardStart = index / total;
	const cardEnd = (index + 1) / total;

	// Scale down as the NEXT card arrives; last card stays at 1.
	const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [1, isLast ? 1 : 0.88]);
	// Dim as it gets pushed behind.
	const opacity = useTransform(scrollYProgress, [cardStart, cardEnd], [1, isLast ? 1 : 0.55]);

	// Stack offset: each card sits a bit lower so they peek under one another.
	const TOP_BASE = 72; // px from viewport top
	const STACK_OFFSET = 18; // px per card

	return (
		<div
			className="sticky"
			style={{ top: `${TOP_BASE + index * STACK_OFFSET}px`, zIndex: index + 10 }}
		>
			<motion.div style={{ scale, opacity }} className="origin-top w-full">
				{/* Section heading above first card */}
				{index === 0 && (
					<motion.div
						initial={{ opacity: 0, y: 35 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.1 }}
						transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
						className="mb-5"
					>
						<h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
							Projects
							<span className="mt-3 block h-1.5 w-24 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
						</h2>
					</motion.div>
				)}

				<motion.article
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false, amount: 0.1 }}
					transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
					className="group relative w-full overflow-hidden rounded-[2rem] border border-cyan-500/25 bg-[#08101a]/90 p-6 shadow-2xl backdrop-blur-xl md:px-8 md:pb-8 md:pt-6"
				>
					{/* Glow overlay */}
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,229,255,0.12),_transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

					{/* Header row */}
					<div className="relative z-10 flex w-full items-center gap-4 border-b border-cyan-500/20 pb-3.5 md:gap-6">
						<span className="text-3xl font-black text-white/90 md:text-5xl">{project.number}</span>
						<span className="min-w-0 flex-1">
							<span className="block truncate text-base font-bold text-white md:text-xl">{project.title}</span>
							<span className="mt-0.5 block truncate text-xs font-medium text-slate-400 md:text-sm">
								{project.company ? `${project.company} | ` : ""}{project.timeline}
							</span>
						</span>
						{project.githubLink && (
							<a
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-shrink-0 items-center justify-center rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-cyan-900/30 hover:text-cyan-400"
								aria-label={`View ${project.title} on GitHub`}
							>
								<GithubIcon className="h-6 w-6 md:h-7 md:w-7" />
							</a>
						)}
					</div>

					{/* Body */}
					<div className="relative z-10 mt-5 grid gap-6 md:grid-cols-[1.1fr_1fr]">
						<div>
							<p className="text-sm leading-relaxed text-slate-300 md:text-base">{project.description}</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{project.technologies.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-cyan-400/40 bg-[#082536]/80 px-3 py-1 text-xs font-medium text-cyan-100 shadow-[0_0_0_1px_rgba(0,229,255,0.2),0_0_20px_rgba(0,91,135,0.35)]"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						<ProjectPreview number={project.number} image={project.image} title={project.title} />
					</div>
				</motion.article>
			</motion.div>
		</div>
	);
}

export default function ProjectsAccordion() {
	// Single ref shared by ALL cards — the source of scroll truth.
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<section id="projects" className="relative w-full pt-4">
			{/*
			  Height = 100vh × number of cards gives each card a full
			  viewport-height of scroll room to animate through.
			*/}
			<div
				ref={containerRef}
				style={{ height: `calc(100vh + ${(projects.length - 1) * 60}vh)` }}
				className="relative"
			>
				{/* Sticky wrapper holds all cards while scrolling through the container */}
				<div className="sticky top-0 pt-4 pb-4">
					{projects.map((project, index) => (
						<StackingCard
							key={project.number}
							project={project}
							index={index}
							total={projects.length}
							containerRef={containerRef}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
