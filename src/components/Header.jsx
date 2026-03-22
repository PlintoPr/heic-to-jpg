import appText from "../data/appText";

function Header() {
  const { title, subtitle, trustLine } = appText.header;

  return (
    <header className="page-header">
      <p className="eyebrow">Free online tool</p>
      <h1>{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
      <p className="trust-line">{trustLine}</p>
    </header>
  );
}

export default Header;