import React from 'react';

/**
 * Formatea el número agregando separadores de miles en la parte entera
 * manteniendo puntos decimales en progreso (ej: "1234." -> "1,234.")
 */
function formatNumber(value) {
  if (value === 'Error') return 'Error';
  if (value === '' || value === null || value === undefined) return '0';

  const isNegative = value.startsWith('-');
  const cleanVal = isNegative ? value.slice(1) : value;

  const [integerPart, decimalPart] = cleanVal.split('.');

  const formattedInt = integerPart
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '0';

  let result = formattedInt;
  if (decimalPart !== undefined) {
    result += `.${decimalPart}`;
  }

  return isNegative ? `-${result}` : result;
}

export function Display({ current, previous, operation }) {
  // Ajuste de tamaño tipográfico dinámico según la longitud del número
  const valueLength = current.length;
  let fontSizeClass = 'font-normal';
  if (valueLength > 12) {
    fontSizeClass = 'font-tiny';
  } else if (valueLength > 8) {
    fontSizeClass = 'font-medium';
  }

  const expressionText = previous !== null && operation !== null
    ? `${formatNumber(previous)} ${operation}`
    : '';

  return (
    <div className="calc-display" id="calc-display">
      <div className="display-expression" aria-live="polite">
        {expressionText || '\u00A0'}
      </div>
      <div
        className={`display-main ${fontSizeClass}`}
        id="display-value"
        aria-live="polite"
      >
        {formatNumber(current)}
      </div>
    </div>
  );
}
