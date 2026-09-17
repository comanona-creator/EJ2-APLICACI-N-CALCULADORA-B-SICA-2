import React from 'react';

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onRestore,
  onClear,
}) {
  if (!isOpen) return null;

  return (
    <div className="history-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="history-title">
      <div className="history-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <div className="history-title-wrap">
            <svg className="history-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 id="history-title">Historial</h3>
          </div>
          <button
            type="button"
            className="btn-icon-close"
            onClick={onClose}
            aria-label="Cerrar historial"
          >
            ✕
          </button>
        </div>

        <div className="history-body">
          {history.length === 0 ? (
            <div className="history-empty">
              <p>No hay operaciones recientes</p>
              <span>Los cálculos que realices aparecerán aquí</span>
            </div>
          ) : (
            <ul className="history-list">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="history-item"
                  onClick={() => {
                    onRestore(item);
                    onClose();
                  }}
                  title="Haz clic para recuperar este resultado"
                >
                  <div className="history-item-top">
                    <span className="history-expression">{item.expression}</span>
                    <span className="history-time">{item.timestamp}</span>
                  </div>
                  <div className="history-result">{item.result}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {history.length > 0 && (
          <div className="history-footer">
            <button
              type="button"
              className="btn-clear-history"
              onClick={onClear}
            >
              Borrar historial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
