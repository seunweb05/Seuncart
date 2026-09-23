export default function LegalPage({ title, intro, sections }) {
  return <article className="legalPage wrap">
    <h1>{title}</h1>
    <div className="legalContent">
      <p>{intro}</p>
      {sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
    </div>
    <button className="primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ^</button>
  </article>;
}
