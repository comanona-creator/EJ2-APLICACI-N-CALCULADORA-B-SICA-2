import React from 'react';

export function Button({
  label,
  onClick,
  variant = 'number',
  wide = false,
  id,
  ariaLabel,
  isPressed = false,
}) {
  return (
    <button
      id={id}
      type="button"
      className={`calc-btn btn-${variant} ${wide ? 'btn-wide' : ''} ${isPressed ? 'btn-pressed' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      <span className="btn-content">{label}</span>
      <span className="btn-glow" aria-hidden="true" />
    </button>
  );
}
