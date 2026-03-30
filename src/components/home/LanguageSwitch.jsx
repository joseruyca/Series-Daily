"use client";

export default function LanguageSwitch({ lang, setLang }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`lang-toggle__button ${lang === "es" ? "is-active" : ""}`}
        onClick={() => setLang("es")}
      >
        ES
      </button>
      <button
        type="button"
        className={`lang-toggle__button ${lang === "en" ? "is-active" : ""}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}