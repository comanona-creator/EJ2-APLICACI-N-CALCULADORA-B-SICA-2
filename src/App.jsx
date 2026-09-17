import { useState } from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { HistoryDrawer } from './components/HistoryDrawer';
import './App.css';

export default function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const {
    current,
    previous,
    operation,
    history,
    pressedKey,
    inputDigit,
    inputDecimal,
    chooseOperation,
    compute,
    clear,
    deleteDigit,
    toggleSign,
    percentage,
    clearHistory,
    restoreFromHistory,
  } = useCalculator();

  return (
    <main className="app-container">
      <div className="calculator-card" id="calculator-app">
        {/* Header con título y botón de historial */}
        <header className="calc-header">
          <div className="calc-brand">
            <span className="brand-dot" />
            <h1 className="brand-title">Calculadora</h1>
            <span className="brand-badge">Vite + React</span>
          </div>

          <button
            id="btn-toggle-history"
            type="button"
            className={`btn-history-toggle ${isHistoryOpen ? 'active' : ''}`}
            onClick={() => setIsHistoryOpen((prev) => !prev)}
            aria-label="Abrir historial de operaciones"
            title="Ver historial de operaciones"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {history.length > 0 && (
              <span className="history-badge" aria-label={`${history.length} operaciones`}>
                {history.length}
              </span>
            )}
          </button>
        </header>

        {/* Pantalla principal */}
        <Display
          current={current}
          previous={previous}
          operation={operation}
        />

        {/* Teclado numérico y operacional */}
        <Keypad
          inputDigit={inputDigit}
          inputDecimal={inputDecimal}
          chooseOperation={chooseOperation}
          compute={compute}
          clear={clear}
          deleteDigit={deleteDigit}
          toggleSign={toggleSign}
          percentage={percentage}
          pressedKey={pressedKey}
        />

        {/* Atajos de teclado en pie de tarjeta */}
        <footer className="calc-footer">
          <span className="keyboard-tip">
            ⌨ Soporta teclado numérico (Enter, Esc, ⌫)
          </span>
        </footer>

        {/* Panel lateral / modal de historial */}
        <HistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onRestore={restoreFromHistory}
          onClear={clearHistory}
        />
      </div>
    </main>
  );
}
