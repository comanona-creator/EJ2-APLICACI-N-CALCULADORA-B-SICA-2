import { useState, useEffect, useCallback } from 'react';

/**
 * Corrige imprecisiones de coma flotante (ej: 0.1 + 0.2 = 0.30000000000000004)
 */
function cleanFloat(number) {
  return parseFloat(number.toFixed(10));
}

export function useCalculator() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [pressedKey, setPressedKey] = useState(null);

  // Persistir historial en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('calc_history', JSON.stringify(history));
    } catch (e) {
      console.warn('No se pudo guardar el historial:', e);
    }
  }, [history]);

  const triggerKeyAnimation = useCallback((keyId) => {
    setPressedKey(keyId);
    setTimeout(() => {
      setPressedKey((prev) => (prev === keyId ? null : prev));
    }, 150);
  }, []);

  const inputDigit = useCallback((digit) => {
    triggerKeyAnimation(digit);
    setCurrent((prev) => {
      if (prev === 'Error') {
        setOverwrite(false);
        return digit;
      }
      if (overwrite) {
        setOverwrite(false);
        return digit;
      }
      if (prev === '0') {
        return digit;
      }
      if (prev.length >= 14) {
        return prev; // Límite para evitar desbordamiento visual
      }
      return `${prev}${digit}`;
    });
  }, [overwrite, triggerKeyAnimation]);

  const inputDecimal = useCallback(() => {
    triggerKeyAnimation('.');
    setCurrent((prev) => {
      if (prev === 'Error' || overwrite) {
        setOverwrite(false);
        return '0.';
      }
      if (!prev.includes('.')) {
        return `${prev}.`;
      }
      return prev;
    });
  }, [overwrite, triggerKeyAnimation]);

  const performCalculation = useCallback((prevVal, currVal, op) => {
    const p = parseFloat(prevVal);
    const c = parseFloat(currVal);
    if (Number.isNaN(p) || Number.isNaN(c)) return '0';

    let result = 0;
    switch (op) {
      case '+':
        result = p + c;
        break;
      case '-':
        result = p - c;
        break;
      case '×':
      case '*':
        result = p * c;
        break;
      case '÷':
      case '/':
        if (c === 0) return 'Error';
        result = p / c;
        break;
      default:
        return currVal;
    }

    const cleaned = cleanFloat(result);
    return cleaned.toString();
  }, []);

  const chooseOperation = useCallback((op) => {
    const symbol = op === '*' ? '×' : op === '/' ? '÷' : op;
    triggerKeyAnimation(symbol);

    if (current === 'Error') return;

    if (previous !== null && operation !== null && !overwrite) {
      const computed = performCalculation(previous, current, operation);
      if (computed === 'Error') {
        setCurrent('Error');
        setPrevious(null);
        setOperation(null);
        setOverwrite(true);
        return;
      }
      setPrevious(computed);
      setCurrent(computed);
      setOperation(symbol);
      setOverwrite(true);
      return;
    }

    setPrevious(current);
    setOperation(symbol);
    setOverwrite(true);
  }, [current, previous, operation, overwrite, performCalculation, triggerKeyAnimation]);

  const compute = useCallback(() => {
    triggerKeyAnimation('=');
    if (previous === null || operation === null || current === 'Error') return;

    const result = performCalculation(previous, current, operation);

    if (result !== 'Error') {
      const newEntry = {
        id: Date.now(),
        expression: `${previous} ${operation} ${current} =`,
        result,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setHistory((prevHistory) => [newEntry, ...prevHistory.slice(0, 24)]);
    }

    setCurrent(result);
    setPrevious(null);
    setOperation(null);
    setOverwrite(true);
  }, [previous, current, operation, performCalculation, triggerKeyAnimation]);

  const clear = useCallback(() => {
    triggerKeyAnimation('AC');
    setCurrent('0');
    setPrevious(null);
    setOperation(null);
    setOverwrite(false);
  }, [triggerKeyAnimation]);

  const deleteDigit = useCallback(() => {
    triggerKeyAnimation('DEL');
    if (overwrite || current === 'Error') {
      setCurrent('0');
      setOverwrite(false);
      return;
    }
    setCurrent((prev) => {
      if (prev.length <= 1 || (prev.length === 2 && prev.startsWith('-'))) {
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, [overwrite, current, triggerKeyAnimation]);

  const toggleSign = useCallback(() => {
    triggerKeyAnimation('±');
    if (current === 'Error' || current === '0') return;
    setCurrent((prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
  }, [current, triggerKeyAnimation]);

  const percentage = useCallback(() => {
    triggerKeyAnimation('%');
    if (current === 'Error') return;
    const currNum = parseFloat(current);
    if (Number.isNaN(currNum)) return;

    let res;
    if (previous !== null) {
      // Porcentaje relativo al operando previo (ej: 200 + 10% = 20)
      const prevNum = parseFloat(previous);
      res = cleanFloat((prevNum * currNum) / 100);
    } else {
      res = cleanFloat(currNum / 100);
    }
    setCurrent(res.toString());
  }, [current, previous, triggerKeyAnimation]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('calc_history');
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const restoreFromHistory = useCallback((item) => {
    setCurrent(item.result);
    setPrevious(null);
    setOperation(null);
    setOverwrite(true);
  }, []);

  // Soporte para teclado físico
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Evitar captura si el usuario está en un input o textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const { key } = e;

      if (key >= '0' && key <= '9') {
        inputDigit(key);
      } else if (key === '.' || key === ',') {
        inputDecimal();
      } else if (key === '+' || key === '-') {
        chooseOperation(key);
      } else if (key === '*') {
        chooseOperation('×');
      } else if (key === '/') {
        e.preventDefault(); // Evitar atajo de búsqueda rápida en navegadores
        chooseOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        compute();
      } else if (key === 'Backspace') {
        e.preventDefault();
        deleteDigit();
      } else if (key === 'Escape') {
        clear();
      } else if (key === '%') {
        percentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, chooseOperation, compute, deleteDigit, clear, percentage]);

  return {
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
  };
}
