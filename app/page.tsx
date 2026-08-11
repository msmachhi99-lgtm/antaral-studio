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

const wordmarkPieces = [
  { x: "-36vw", y: "-25vh", r: "-15deg" },
  { x: "-24vw", y: "27vh", r: "11deg" },
  { x: "-11vw", y: "-33vh", r: "-8deg" },
  { x: "5vw", y: "30vh", r: "15deg" },
  { x: "17vw", y: "-30vh", r: "8deg" },
  { x: "29vw", y: "22vh", r: "-13deg" },
  { x: "39vw", y: "-18vh", r: "10deg" },
];

const pockets = [
  { pick: 1, ox: "-11vw", oy: "-3vh", x: "-13vw", y: "-31vh", r: "7deg", w: "9.5vw", o: "0.7", float: "8.1s" },
  { pick: 5, ox: "-33vw", oy: "2vh", x: "-38vw", y: "10vh", r: "-5deg", w: "8vw", o: "0.5", float: "11s" },
  { pick: 3, ox: "33vw", oy: "3vh", x: "37vw", y: "26vh", r: "6deg", w: "8.5vw", o: "0.5", float: "9.4s" },
  { pick: 1, ox: "22vw", oy: "-2vh", x: "33vw", y: "-14vh", r: "10deg", w: "9vw", o: "0.55", float: "10.2s" },
  { pick: 5, ox: "11vw", oy: "3vh", x: "19vw", y: "20vh", r: "-6deg", w: "11vw", o: "0.9", float: "7.9s" },
  { pick: 3, ox: "-22vw", oy: "3vh", x: "-25vw", y: "14vh", r: "9deg", w: "11.5vw", o: "0.95", float: "9.2s" },
  { pick: 2, ox: "0vw", oy: "-2vh", x: "7vw", y: "-25vh", r: "4deg", w: "12.5vw", o: "1", float: "8.8s" },
  { pick: 0, ox: "-33vw", oy: "-2vh", x: "-34vw", y: "-22vh", r: "-11deg", w: "13vw", o: "1", float: "7.5s" },
  { pick: 4, ox: "0vw", oy: "2vh", x: "-7vw", y: "26vh", r: "-8deg", w: "13.5vw", o: "1", float: "10.4s" },
];

// The source URLs carry Unsplash's own resize params, so ask for the width each
// slot actually paints instead of shipping the 2200px original into every slot.
const srcFor = (image: string, width: number, quality = 74) =>
  image.replace(/w=\d+&q=\d+/, `w=${width}&q=${quality}`);

const srcSetFor = (image: string, widths: number[], quality = 74) =>
  widths.map((width) => `${srcFor(image, width, quality)} ${width}w`).join(", ");

const categories = ["All", "Residential", "Interiors", "Commercial"] as const;

export default function Home() {
  const brandRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [filter, setFilter] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const brandStory = brandRef.current;
    if (!brandStory) return;
    let frame = 0;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(() => {
        ticking = false;
        const rect = brandStory.getBoundingClientRect();
        const distance = brandStory.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
        brandStory.style.setProperty("--story-progress", progress.toFixed(3));
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

  // Dismiss the mobile menu on Escape or on any press outside the header.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

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
    <>
      <a className="skip-link" href="#projects">Skip to projects</a>

      <header className="topbar" ref={headerRef}>
        <a href="#top" className="compact-logo" aria-label="Antaral Studio home">
          <img src="/Antaral.svg" alt="" />
          <small>Architecture + Design</small>
        </a>
        <nav id="primary-nav" className={menuOpen ? "nav-open" : ""} aria-label="Primary">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="inquiry-link" href="mailto:hello@antaralstudio.in?subject=Project%20enquiry">Discuss a site <span aria-hidden="true">↗</span></a>
        <button className="menu-button" type="button" aria-controls="primary-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}<span className="sr-only"> navigation</span>
        </button>
      </header>

      <main>
        <section className="brand-hero" id="top" ref={brandRef}>
          <h1 className="sr-only">
            Antaral Studio — architecture and interior design by Ar. Monish Machhi, Gujarat, India
          </h1>

          <div className="brand-stage">
            <div className="hero-coordinate" aria-hidden="true">
              <span>22.3072° N / 73.1812° E</span>
              <span>Dahanu / Gujarat</span>
            </div>

            <div className="hero-brand" aria-hidden="true">
              <div className="hero-symbol">
                <svg className="hero-symbol-disc" viewBox="0 0 492 505" focusable="false">
                  <circle cx="240" cy="257" r="221" />
                </svg>
                <span className="hero-logo-layer hero-sail-left"><img src="/LOGO.svg" alt="" /></span>
                <span className="hero-logo-layer hero-sail-right"><img src="/LOGO.svg" alt="" /></span>
                <span className="hero-logo-layer hero-waves-left"><img src="/LOGO.svg" alt="" /></span>
                <span className="hero-logo-layer hero-waves-right"><img src="/LOGO.svg" alt="" /></span>
                <img className="hero-logo-final" src="/LOGO.svg" alt="" />
              </div>

              <div className="hero-wordmark">
                {wordmarkPieces.map((piece, index) => (
                  <span
                    className={`hero-wordmark-piece hero-wordmark-piece-${index + 1}`}
                    key={`wordmark-piece-${index}`}
                    style={{ "--letter-x": piece.x, "--letter-y": piece.y, "--letter-r": piece.r } as CSSProperties}
                  >
                    <img src="/Antaral.svg" alt="" />
                  </span>
                ))}
              </div>
              <div className="hero-studio"><i /><span>Studio</span><i /></div>
              <p>Architecture + Design</p>
            </div>

            <div className="pocket-field" aria-hidden="true">
              {pockets.map((pocket, index) => (
                <div
                  className="pocket"
                  key={`pocket-${index}`}
                  style={{
                    "--i": String(index),
                    "--ox": pocket.ox,
                    "--oy": pocket.oy,
                    "--x": pocket.x,
                    "--y": pocket.y,
                    "--r": pocket.r,
                    "--w": pocket.w,
                    "--o": pocket.o,
                    "--float": pocket.float,
                  } as CSSProperties}
                >
                  <div className="pocket-drift">
                    <figure className="pocket-card">
                      <img src={srcFor(projects[pocket.pick].image, 500, 72)} alt="" decoding="async" />
                      <figcaption>{projects[pocket.pick].id} — {projects[pocket.pick].title}</figcaption>
                    </figure>
                  </div>
                </div>
              ))}
            </div>

            <p className="story-line" aria-hidden="true"><i /><span>Space shaped around life.</span><i /></p>

            <div className="hero-statement">
              <p>We shape meaningful spaces between architecture, nature, people and place.</p>
              <a href="#projects">Explore selected work <span aria-hidden="true">↓</span></a>
            </div>

            <p className="hero-meaning">Antaral <span>/</span> The space in between</p>
            <div className="hero-horizon" aria-hidden="true"><i /><span /><i /></div>
            <div className="stage-veil" aria-hidden="true" />
          </div>
        </section>

        <section className="featured" id="projects" aria-labelledby="featured-heading">
          <div className="featured-head">
            <p className="section-index">01 / Featured projects</p>
            <h2 id="featured-heading">Places to live,<br />work and <em>belong.</em></h2>
            <p>Our work begins with careful observation: of a site, a climate and the rhythms that make each client’s life their own.</p>
          </div>

          <div className="carousel-shell">
            <button className="image-button main-frame" type="button" onClick={() => selectProject(activeProject + 1)} aria-label={`Show next project, ${next.title}`}>
              <img
                src={srcFor(active.image, 1600, 78)}
                srcSet={srcSetFor(active.image, [800, 1200, 1600, 2000], 78)}
                sizes="(max-width: 900px) 100vw, 76vw"
                alt={active.title}
                loading="lazy"
                decoding="async"
              />
              <span className="frame-count">{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              <span className="frame-open">Next project <span aria-hidden="true">↗</span></span>
            </button>
            {/* Duplicates the main frame's action, so it is a decorative preview
                for pointer users rather than a second stop for keyboard users. */}
            <button className="image-button next-frame" type="button" tabIndex={-1} aria-hidden="true" onClick={() => selectProject(activeProject + 1)}>
              <img
                src={srcFor(next.image, 640)}
                srcSet={srcSetFor(next.image, [400, 640, 900])}
                sizes="24vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span>Next / {next.title}</span>
            </button>
          </div>

          <div className="carousel-meta">
            <div><span>{active.location}</span><h3>{active.title}</h3></div>
            <dl><div><dt>Type</dt><dd>{active.category}</dd></div><div><dt>Year</dt><dd>{active.year}</dd></div><div><dt>Area</dt><dd>{active.area}</dd></div></dl>
            <div className="carousel-arrows"><button type="button" onClick={() => selectProject(activeProject - 1)} aria-label="Previous project"><span aria-hidden="true">←</span></button><button type="button" onClick={() => selectProject(activeProject + 1)} aria-label="Next project"><span aria-hidden="true">→</span></button></div>
          </div>

          <p className="sr-only" role="status">
            Project {activeProject + 1} of {projects.length}: {active.title}. {active.category} in {active.location}, {active.year}, {active.area}.
          </p>

          <div className="thumbnail-strip" role="group" aria-label="Select a featured project">
            {projects.map((project, index) => (
              <button type="button" className={activeProject === index ? "active" : ""} key={project.id} onClick={() => selectProject(index)} aria-label={project.title} aria-pressed={activeProject === index}>
                <img src={srcFor(project.image, 400)} alt="" loading="lazy" decoding="async" /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="project-field" aria-labelledby="index-heading">
          <div className="field-head">
            <p className="section-index">02 / Project index</p>
            <h2 id="index-heading">Explore the work.</h2>
            <div className="filters" role="group" aria-label="Filter projects by type">
              {categories.map((category) => (
                <button type="button" key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>
              ))}
            </div>
          </div>
          <p className="sr-only" role="status">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} shown{filter === "All" ? "" : ` in ${filter}`}.
          </p>
          <div className="project-tiles">
            {visibleProjects.map((project) => (
              <article className="project-tile" key={project.id}>
                <a href="#contact" aria-label={`Enquire about ${project.title}`}>
                  <div className="tile-image">
                    <img
                      src={srcFor(project.image, 800)}
                      srcSet={srcSetFor(project.image, [400, 600, 900])}
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span aria-hidden="true">Enquire ↗</span>
                  </div>
                  <div className="tile-copy"><span>{project.id}</span><h3>{project.title}</h3><p>{project.category} / {project.location}</p></div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="studio-intro" id="studio" aria-labelledby="studio-heading">
          <p className="section-index">03 / The practice</p>
          <div className="studio-statement">
            <h2 id="studio-heading">Antaral is the meaningful interval between things.</h2>
            <p>Led by Principal Architect Ar. Monish Machhi, the studio creates architecture and interiors through a close reading of place, material and everyday life. Each commission is developed personally—from the first conversation to the final detail.</p>
          </div>
          <div className="studio-facts">
            <div><strong>18+</strong><span>Projects designed*</span></div>
            <div><strong>1.2L</strong><span>Square feet shaped*</span></div>
            <div><strong>03</strong><span>Project typologies*</span></div>
            <p>* Placeholder figures ready for verified studio data.</p>
          </div>
          <div className="principal-row">
            {/* Deliberately an empty plate until a real portrait exists — a stock
                photo of another person must not stand in for a named architect. */}
            <div className="principal-photo" aria-hidden="true" />
            <div><p>Principal Architect</p><h3>Ar. Monish Machhi</h3></div>
            <blockquote>“Good architecture is not an object placed on a site. It is a relationship—with climate, people and time.”</blockquote>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-marquee" aria-hidden="true"><span>LET’S MAKE SPACE — LET’S MAKE SPACE — </span><span>LET’S MAKE SPACE — LET’S MAKE SPACE — </span></div>
          <div className="contact-inner">
            <p className="section-index">04 / Start a conversation</p>
            <h2 id="contact-heading">Bring us a site.<br />Bring us a question.</h2>
            <div className="contact-details">
              <p>Tell us where you are, what you’re imagining and how far you’ve reached. We’ll begin there.</p>
              <a href="mailto:hello@antaralstudio.in">hello@antaralstudio.in <span aria-hidden="true">↗</span></a>
              <a href="tel:+910000000000">+91 00000 00000 <span aria-hidden="true">↗</span></a>
            </div>
            <p className="placeholder-line">Contact details and all project information shown as placeholders.</p>
          </div>
        </section>
      </main>

      <footer><span>Antaral Studio</span><span>Architecture + Interiors / Gujarat</span><span>© {new Date().getFullYear()}</span></footer>
    </>
  );
}
