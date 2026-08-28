"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
	siArduino, siC, siCplusplus, siDocker, siDrizzle, siEasyeda,
	siEspressif, siExpo, siFastapi, siGit, siGithub, siJavascript,
	siMysql, siNeon, siNextdotjs, siNodedotjs, siOpenjdk, siPostgresql,
	siPython, siReact, siSqlite, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";

type SkillItem = { name: string; iconPath: string; color: string };
type SkillCard = { title: string; items: SkillItem[] };

const cards: SkillCard[] = [
	{ title: "Languages", items: [
		{ name: "TypeScript", iconPath: siTypescript.path, color: "#3178C6" }, { name: "JavaScript", iconPath: siJavascript.path, color: "#F7DF1E" }, { name: "Java", iconPath: siOpenjdk.path, color: "#EA2D2E" }, { name: "C", iconPath: siC.path, color: "#A8B9CC" }, { name: "C++", iconPath: siCplusplus.path, color: "#00599C" }, { name: "SQL", iconPath: siSqlite.path, color: "#003B57" }, { name: "Python", iconPath: siPython.path, color: "#3776AB" },
	] },
	{ title: "Frameworks & Libraries", items: [
		{ name: "Tailwind CSS", iconPath: siTailwindcss.path, color: "#06B6D4" }, { name: "Next.js", iconPath: siNextdotjs.path, color: "#FFFFFF" }, { name: "React", iconPath: siReact.path, color: "#61DAFB" }, { name: "Node.js", iconPath: siNodedotjs.path, color: "#5FA04E" }, { name: "REST APIs", iconPath: siFastapi.path, color: "#00A393" },
	] },
	{ title: "Databases & ORMs", items: [
		{ name: "MySQL", iconPath: siMysql.path, color: "#4479A1" }, { name: "PostgreSQL", iconPath: siPostgresql.path, color: "#4169E1" }, { name: "Drizzle", iconPath: siDrizzle.path, color: "#C5F74F" }, { name: "Neon", iconPath: siNeon.path, color: "#00E699" },
	] },
	{ title: "DevOps Tools", items: [
		{ name: "Git", iconPath: siGit.path, color: "#F05032" }, { name: "GitHub", iconPath: siGithub.path, color: "#FFFFFF" }, { name: "Docker", iconPath: siDocker.path, color: "#2496ED" }, { name: "Vercel", iconPath: siVercel.path, color: "#FFFFFF" }, { name: "Expo", iconPath: siExpo.path, color: "#FFFFFF" },
	] },
	{ title: "Hardware Platforms", items: [
		{ name: "ESP32", iconPath: siEspressif.path, color: "#E7352C" }, { name: "Arduino", iconPath: siArduino.path, color: "#00979D" }, { name: "PCB Design (EasyEDA)", iconPath: siEasyeda.path, color: "#1765F6" },
	] },
];

function SkillBadge({ item }: { item: SkillItem }) {
	return (
		<div className="skill-badge group" title={item.name}>
			<svg className="skill-hexagon" viewBox="0 0 100 100" aria-hidden="true">
				<polygon points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" fill="#08101a" stroke="#073b53" strokeWidth="1.5" strokeLinejoin="round" />
				<polygon points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" fill="none" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="hexagon-outline" />
			</svg>
			<div className="skill-icon" aria-label={item.name} role="img"><svg viewBox="0 0 24 24" className="h-8 w-8" fill={item.color} aria-hidden="true"><path d={item.iconPath} /></svg></div>
			<span className="skill-tooltip">{item.name}</span>
		</div>
	);
}

function relativePosition(index: number, activeIndex: number) {
	const distance = index - activeIndex;
	const half = cards.length / 2;
	if (distance > half) return distance - cards.length;
	if (distance < -half) return distance + cards.length;
	return distance;
}

function cardMotion(position: number) {
	const isActive = position === 0;
	const direction = position < 0 ? 1 : -1;
	return { x: isActive ? 0 : position * 280, rotateY: isActive ? 0 : direction * 35, z: isActive ? 80 : -100, scale: isActive ? 1.05 : 0.8, opacity: isActive ? 1 : 0.3, filter: isActive ? "blur(0px)" : "blur(1px)" };
}

export default function TechnicalSkills() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const touchStartX = useRef<number | null>(null);
	const move = useCallback((direction: number) => setActiveIndex((current) => (current + direction + cards.length) % cards.length), []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); };
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [move]);

	useEffect(() => {
		if (isPaused) return;
		const timer = window.setInterval(() => move(1), 2000);
		return () => window.clearInterval(timer);
	}, [isPaused, move]);

	return (
		<section id="technical-skills" className="skills-section relative flex w-full flex-col items-center overflow-hidden">
			<div className="skills-header"><h2>My Tech Stack</h2></div>
			<div className="skills-carousel relative mx-auto flex w-full max-w-6xl items-center justify-center" aria-roledescription="carousel" aria-label="Technical skills categories" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1); touchStartX.current = null; }}>
				<div className="skills-stage relative flex w-full items-center justify-center">
					{cards.map((card, index) => { const position = relativePosition(index, activeIndex); const isActive = position === 0; const isVisible = Math.abs(position) <= 2; return <motion.article key={card.title} aria-label={`Show ${card.title}`} aria-pressed={isActive} initial={false} animate={cardMotion(position)} transition={{ type: "spring", stiffness: 180, damping: 24 }} onClick={() => setActiveIndex(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActiveIndex(index); }} tabIndex={isVisible ? 0 : -1} role="button" className={`skills-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? "skills-card-active" : "skills-card-side"} ${isVisible ? "" : "skills-card-hidden"}`}>
						<h3>{card.title}</h3><div className="skills-badges">{card.items.map((item) => <SkillBadge key={item.name} item={item} />)}</div>
					</motion.article>; })}
					<button type="button" aria-label="Previous skills category" onClick={() => move(-1)} className="skills-arrow skills-arrow-left"><span aria-hidden="true">&lt;</span></button>
					<button type="button" aria-label="Next skills category" onClick={() => move(1)} className="skills-arrow skills-arrow-right"><span aria-hidden="true">&gt;</span></button>
				</div>
				<div className="skills-dots" role="tablist" aria-label="Choose skill category">{cards.map((card, index) => <button key={card.title} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Show ${card.title}`} onClick={() => setActiveIndex(index)} className={index === activeIndex ? "active" : ""} />)}</div>
			</div>
		</section>
	);
}
