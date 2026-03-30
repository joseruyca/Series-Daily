"use client";

import { useMemo } from "react";

export default function GuessComposer({
  names,
  value,
  setValue,
  onSubmit,
  placeholder,
  buttonLabel,
  disabled = false,
}) {
  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return [];
    return names
      .filter((name) => name.toLowerCase().includes(query))
      .slice(0, 6);
  }, [names, value]);

  function handleSubmit() {
    if (disabled) return;
    onSubmit(value);
    setValue("");
  }

  return (
    <div className="guess-composer">
      <div className="guess-composer__controls">
        <div className="guess-input-wrap">
          <input
            className="guess-input"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />

          {suggestions.length > 0 && !disabled ? (
            <div className="guess-dropdown">
              {suggestions.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="guess-dropdown__item"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setValue(name);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="guess-submit"
          onClick={handleSubmit}
          disabled={disabled}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}