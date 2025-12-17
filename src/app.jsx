import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C'];
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [text, setText] = useState('');
	const [resultText, setResultText] = useState('');
	let result;
	const canOperate = (value) => {
		if (value === '+' || value === '-') {
			return operand1 === '' || operand2 === '' ? false : true;
		} else return false;
	};
	const canSetOperand2 = operator === '' ? false : true;

	const addOperand = (number) => {
		if (canSetOperand2) {
			setText((a) => a + number);
			setOperand2((a) => a + number);
		} else {
			setText((a) => a + number);
			setOperand1((a) => a + number);
		}
	};

	const onAddition = (sign) => {
		if (text !== '') {
			if (text.at(-1) === '-' || text.at(-1) === sign) {
				setText((a) => a.slice(0, -1) + sign);
				setOperator(sign);
			} else {
				setText((a) => a + sign);
				setOperator(sign);
			}
		}
		if (text === '-') {
			setText('');
			setOperand1('');
			setOperator('');
		}
	};

	const onSubtraction = (sign) => {
		if (text !== '') {
			if (text.at(-1) === '+' || text.at(-1) === sign) {
				setText((a) => a.slice(0, -1) + sign);
				setOperator(sign);
			} else if (operator === '+' && text.at(-1) !== '+' && text.at(-1) !== '-') {
				setOperand2((a) => a + sign);
				setText((a) => a + sign);
			} else {
				setText((a) => a + sign);
				setOperator(sign);
			}
		} else if (text === '') {
			if (text.at(-1) === '+' || text.at(-1) === sign) {
				setText((a) => a.slice(0, -1) + sign);
			} else {
				setText((a) => a + sign);
				setOperand1((a) => a + sign);
			}
		}
	};

	const onResult = (sign) => {
		result = operator === '+' ? +operand1 + +operand2 : +operand1 - +operand2;

		if (text !== '') {
			setText((a) => a + sign + result);
			setResultText(` ${result}`);
			setOperand1(result);
			setOperand2('');
		}
	};

	const onReset = () => {
		setText('');
		result = 0;
		setOperator('');
		setOperand1('');
		setOperand2('');
		setResultText('');
	};

	const handleClick = (value) => {
		if (value >= '0' && value <= '9') {
			addOperand(value);
		} else if (value === '+') {
			onAddition(value);
		} else if (value === '-') {
			onSubtraction(value);
		} else if (value === '=') {
			onResult(value);
		} else if (value === 'C') {
			onReset();
		}
	};

	return (
		<div className={styles.calculator}>
			<h2 className={styles.calculatorTitle}>Калькулятор</h2>
			<div className={styles.calculatorDisplay}>
				<div className={styles.calculatorText}>{text}</div>
				<div className={styles.calculatorResult}>{resultText}</div>
			</div>
			<div className={styles.calculatorKeypad}>
				{NUMS.map((value, index) => (
					<button
						key={index}
						className={`${styles.calculatorButton} ${value === '+' || value === '-' || value === '=' ? styles.operator : ''} ${value === 'C' ? styles.clear : ''}`}
						onClick={() => handleClick(value)}
						disabled={canOperate(value)}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	);
};
