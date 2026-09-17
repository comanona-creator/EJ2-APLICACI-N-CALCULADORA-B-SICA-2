import React from 'react';
import { Button } from './Button';

export function Keypad({
  inputDigit,
  inputDecimal,
  chooseOperation,
  compute,
  clear,
  deleteDigit,
  toggleSign,
  percentage,
  pressedKey,
}) {
  return (
    <div className="calc-keypad" role="group" aria-label="Teclado numérico y de funciones">
      {/* Fila 1 */}
      <Button
        id="btn-clear"
        label="AC"
        variant="action"
        ariaLabel="Borrar todo"
        onClick={clear}
        isPressed={pressedKey === 'AC'}
      />
      <Button
        id="btn-plus-minus"
        label="±"
        variant="action"
        ariaLabel="Cambiar signo"
        onClick={toggleSign}
        isPressed={pressedKey === '±'}
      />
      <Button
        id="btn-percent"
        label="%"
        variant="action"
        ariaLabel="Porcentaje"
        onClick={percentage}
        isPressed={pressedKey === '%'}
      />
      <Button
        id="btn-divide"
        label="÷"
        variant="operator"
        ariaLabel="Dividir"
        onClick={() => chooseOperation('÷')}
        isPressed={pressedKey === '÷'}
      />

      {/* Fila 2 */}
      <Button
        id="btn-7"
        label="7"
        onClick={() => inputDigit('7')}
        isPressed={pressedKey === '7'}
      />
      <Button
        id="btn-8"
        label="8"
        onClick={() => inputDigit('8')}
        isPressed={pressedKey === '8'}
      />
      <Button
        id="btn-9"
        label="9"
        onClick={() => inputDigit('9')}
        isPressed={pressedKey === '9'}
      />
      <Button
        id="btn-multiply"
        label="×"
        variant="operator"
        ariaLabel="Multiplicar"
        onClick={() => chooseOperation('×')}
        isPressed={pressedKey === '×'}
      />

      {/* Fila 3 */}
      <Button
        id="btn-4"
        label="4"
        onClick={() => inputDigit('4')}
        isPressed={pressedKey === '4'}
      />
      <Button
        id="btn-5"
        label="5"
        onClick={() => inputDigit('5')}
        isPressed={pressedKey === '5'}
      />
      <Button
        id="btn-6"
        label="6"
        onClick={() => inputDigit('6')}
        isPressed={pressedKey === '6'}
      />
      <Button
        id="btn-subtract"
        label="-"
        variant="operator"
        ariaLabel="Restar"
        onClick={() => chooseOperation('-')}
        isPressed={pressedKey === '-'}
      />

      {/* Fila 4 */}
      <Button
        id="btn-1"
        label="1"
        onClick={() => inputDigit('1')}
        isPressed={pressedKey === '1'}
      />
      <Button
        id="btn-2"
        label="2"
        onClick={() => inputDigit('2')}
        isPressed={pressedKey === '2'}
      />
      <Button
        id="btn-3"
        label="3"
        onClick={() => inputDigit('3')}
        isPressed={pressedKey === '3'}
      />
      <Button
        id="btn-add"
        label="+"
        variant="operator"
        ariaLabel="Sumar"
        onClick={() => chooseOperation('+')}
        isPressed={pressedKey === '+'}
      />

      {/* Fila 5 */}
      <Button
        id="btn-0"
        label="0"
        onClick={() => inputDigit('0')}
        isPressed={pressedKey === '0'}
      />
      <Button
        id="btn-decimal"
        label="."
        ariaLabel="Punto decimal"
        onClick={inputDecimal}
        isPressed={pressedKey === '.'}
      />
      <Button
        id="btn-backspace"
        label="⌫"
        variant="action"
        ariaLabel="Borrar último dígito"
        onClick={deleteDigit}
        isPressed={pressedKey === 'DEL'}
      />
      <Button
        id="btn-equals"
        label="="
        variant="equals"
        ariaLabel="Calcular resultado"
        onClick={compute}
        isPressed={pressedKey === '='}
      />
    </div>
  );
}
