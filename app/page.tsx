"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  location: string;
  category: "Residential" | "Interiors" | "Commercial";
  year: string;
  area: string;
  image: string;
};

const projects: Project[] = [
  {
    id: "AS–01",
    title: "The Courtyard House",
    location: "Gujarat, India",
    category: "Residential",
    year: "2025",
    area: "4,800 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "AS–02",
    title: "House of Quiet Light",
    location: "Vadodara, India",
    category: "Residential",
    year: "2024",
    area: "3,600 sq ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "AS–03",
    title: "Earth & Light Office",
    location: "Ahmedabad, India",
    category: "Commercial",
    year: "2024",
    area: "6,100 sq ft",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "AS–04",
    title: "The Brick Verandah",
    location: "Surat, India",
    category: "Residential",
    year: "2023",
    area: "5,200 sq ft",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "AS–05",
    title: "Monsoon Rooms",
    location: "Gujarat, India",
    category: "Interiors",
    year: "2023",
    area: "2,900 sq ft",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "AS–06",
    title: "Garden Workroom",
    location: "Ahmedabad, India",
    category: "Commercial",
    year: "2022",
    area: "4,400 sq ft",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",
  },
];

const letters = [
  { char: "A", x: "-32vw", y: "-20vh", r: "-18deg" },
  { char: "N", x: "-20vw", y: "22vh", r: "12deg" },
  { char: "T", x: "-9vw", y: "-28vh", r: "-8deg" },
  { char: "A", x: "4vw", y: "25vh", r: "17deg" },
  { char: "R", x: "14vw", y: "-25vh", r: "9deg" },
  { char: "A", x: "25vw", y: "18vh", r: "-14deg" },
  { char: "L", x: "34vw", y: "-15vh", r: "11deg" },
];

export default function Home() {
  const identityRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const identity = identityRef.current;
    if (!identity) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = identity.getBoundingClientRect();
        const distance = identity.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
        identity.style.setProperty("--story-progress", progress.toFixed(3));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const visibleProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const selectProject = (index: number) => {
    setActiveProject((index + projects.length) % projects.length);
  };

  const active = projects[activeProject];
  const next = projects[(activeProject + 1) % projects.length];

  return (
    <main>
      <header className="topbar">
        <a href="#top" className="compact-logo" aria-label="Antaral Studio home">
          <span>ANTARAL</span><small>STUDIO</small>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="inquiry-link" href="mailto:hello@antaralstudio.in?subject=Project%20enquiry">Discuss a site <span>↗</span></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <section className="identity-story" id="top" ref={identityRef}>
        <div className="identity-stage">
          <p className="identity-label">Architecture + Interiors / Gujarat, India</p>
          <div className="wordmark" aria-label="Antaral">
            {letters.map((letter, index) => (
              <span
                className={`word-letter letter-${index + 1}`}
                key={`${letter.char}-${index}`}
                style={{ "--letter-x": letter.x, "--letter-y": letter.y, "--letter-r": letter.r } as CSSProperties}
              >
                {letter.char}
              </span>
            ))}
          </div>
          <div className="story-sentence" aria-hidden="true">
            <span>Space</span><span>shaped</span><span>around life.</span>
          </div>
          <div className="story-columns">
            <article><span>01 / Space</span><p>Clear, generous places rooted in climate and context.</p></article>
            <article><span>02 / Between</span><p>The threshold where inside, outside, light and life meet.</p></article>
            <article><span>03 / Life</span><p>Architecture that grows more meaningful through use.</p></article>
          </div>
          <div className="scroll-cue"><span>Scroll to enter</span><i /></div>
        </div>
      </section>

      <section className="featured" id="projects">
        <div className="featured-head">
          <p className="section-index">01 / Featured projects</p>
          <h1>Places to live,<br />work and <em>belong.</em></h1>
          <p>Our work begins with careful observation: of a site, a climate and the rhythms that make each client’s life their own.</p>
        </div>

        <div className="carousel-shell">
          <button className="image-button main-frame" type="button" onClick={() => selectProject(activeProject + 1)} aria-label="Show next featured project">
            <img src={active.image} alt={`${active.title} — placeholder project photography`} />
            <span className="frame-count">{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <span className="frame-open">Open project ↗</span>
          </button>
          <button className="image-button next-frame" type="button" onClick={() => selectProject(activeProject + 1)} aria-label={`Show ${next.title}`}>
            <img src={next.image} alt="" />
            <span>Next / {next.title}</span>
          </button>
        </div>

        <div className="carousel-meta">
          <div><span>{active.location}</span><h2>{active.title}</h2></div>
          <dl><div><dt>Type</dt><dd>{active.category}</dd></div><div><dt>Year</dt><dd>{active.year}</dd></div><div><dt>Area</dt><dd>{active.area}</dd></div></dl>
          <div className="carousel-arrows"><button type="button" onClick={() => selectProject(activeProject - 1)} aria-label="Previous project">←</button><button type="button" onClick={() => selectProject(activeProject + 1)} aria-label="Next project">→</button></div>
        </div>

        <div className="thumbnail-strip" aria-label="Select a featured project">
          {projects.map((project, index) => (
            <button type="button" className={activeProject === index ? "active" : ""} key={project.id} onClick={() => selectProject(index)} aria-label={`Show ${project.title}`} aria-pressed={activeProject === index}>
              <img src={project.image} alt="" /><span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="project-field">
        <div className="field-head">
          <p className="section-index">02 / Project index</p>
          <h2>Explore the work.</h2>
          <div className="filters" aria-label="Filter projects">
            {["All", "Residential", "Interiors", "Commercial"].map((category) => (
              <button type="button" key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>
            ))}
          </div>
        </div>
        <div className="project-tiles">
          {visibleProjects.map((project) => (
            <article className="project-tile" key={project.id}>
              <a href="#contact">
                <div className="tile-image"><img src={project.image} alt={`${project.title} — placeholder project photography`} /><span>View ↗</span></div>
                <div className="tile-copy"><span>{project.id}</span><h3>{project.title}</h3><p>{project.category} / {project.location}</p></div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-intro" id="studio">
        <p className="section-index">03 / The practice</p>
        <div className="studio-statement">
          <h2>Antaral is the meaningful interval between things.</h2>
          <p>Led by Principal Architect Ar. Monish Machhi, the studio creates architecture and interiors through a close reading of place, material and everyday life. Each commission is developed personally—from the first conversation to the final detail.</p>
        </div>
        <div className="studio-facts">
          <div><strong>18+</strong><span>Projects designed*</span></div>
          <div><strong>1.2L</strong><span>Square feet shaped*</span></div>
          <div><strong>03</strong><span>Project typologies*</span></div>
          <p>* Placeholder figures ready for verified studio data.</p>
        </div>
        <div className="principal-row">
          <div className="principal-photo" role="img" aria-label="Placeholder portrait for Ar. Monish Machhi" />
          <div><p>Principal Architect</p><h3>Ar. Monish Machhi</h3></div>
          <blockquote>“Good architecture is not an object placed on a site. It is a relationship—with climate, people and time.”</blockquote>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-marquee" aria-hidden="true"><span>LET’S MAKE SPACE — LET’S MAKE SPACE — </span><span>LET’S MAKE SPACE — LET’S MAKE SPACE — </span></div>
        <div className="contact-inner">
          <p className="section-index">04 / Start a conversation</p>
          <h2>Bring us a site.<br />Bring us a question.</h2>
          <div className="contact-details">
            <p>Tell us where you are, what you’re imagining and how far you’ve reached. We’ll begin there.</p>
            <a href="mailto:hello@antaralstudio.in">hello@antaralstudio.in ↗</a>
            <a href="tel:+910000000000">+91 00000 00000 ↗</a>
          </div>
          <p className="placeholder-line">Contact details and all project information shown as placeholders.</p>
        </div>
      </section>

      <footer><span>Antaral Studio</span><span>Architecture + Interiors / Gujarat</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}
