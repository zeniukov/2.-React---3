import styles from "./app.module.css";
import { useState } from "react";

export const App = () => {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C']
  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState('');
  const [operand2, setOperand2] = useState('');
	const [text, setText] = useState('');
	const [resultText, setResultText] = useState('');
	let result;
	let canOperate = operand1 === '' || operand2 === '' ? false : true;
	let canSetOperand2 = false;
	let makeOperand1Negative = false;


	const addOperand1 = (number) => {
		setText((a) => a + number);
		setOperand1((a) => a + number);
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const addOperand2 = (number) => {
		setText((a) => a + number);
		setOperand2((a) => a + number);
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const onAddition = (sign) => {
		text === '' ? '' : calculate();
		function calculate() {
			text.at(-1) === '-' || text.at(-1) === sign
			? setText((a) => a.slice(0, -1) + sign)
			: setText((a) => a + sign) &&	setOperator(sign);
		};
		!canSetOperand2;
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const onSubtraction = (sign) => {
		text === ''	? !makeOperand1Negative && calculate() : calculate() &&	setOperator(sign)
		function calculate() {
			text.at(-1) === '+' || text.at(-1) === sign
			? setText((a) => a.slice(0, -1) + sign)
			: setText((a) => a + sign);
		};
		canSetOperand2 = true;
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const onResult = (sign) => {
		makeOperand1Negative ? startWithPositiveOperand() : startWithNegativeOperand()

		function startWithPositiveOperand() {
			result = operator === '+' ? +operand1 + +operand2 : +operand1 - +operand2
		};

				function startWithNegativeOperand() {
			result = operator === '+' ? +operand1 - +operand1 + +operand2 : +operand1 - +operand1 - +operand2
		};

		text === ''  ? '' : setText((a) => a + sign + result);
		console.log('text.length+', text.length)
		// text.at(text.length-result.length) !== sign ? '' : setText((a) => a + sign + result);
		text === '' || setResultText(result);
		setOperand1(result);
		setOperand2('');
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const onReset = () => {
		setText('');
		result = 0;
		setOperator('');
		setOperand1('');
		setOperand2('');
		setResultText('')
	}

	const setNumbers = NUMS.map((number) => (
		!isNaN(number) ?
		<li key={number} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={
				canSetOperand2 ? addOperand2.bind(null, number) : addOperand1.bind(null, number)
			} className={styles["steps-item-button"]}>{number}</button>
		</li> : ''
	))

	const setOperators = NUMS.map((sign, index) => (
		index === 10 || index === 11 ?
		<li key={sign} className={styles["steps-item"]}>
			<button onClick={
				index === 10 ?
				onAddition.bind(null, sign) :
				onSubtraction.bind(null, sign)
				}
				className={styles["steps-item-button"]}
				disabled={canOperate}
				>{sign}</button>
		</li> : ''
	))

	const setResults = NUMS.map((sign, index) => (
		index === 12 || index === 13 ?
		<li key={sign} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={
				index === 12 ?
				onResult.bind(null, String(sign)) :
				onReset.bind(null, sign)
				} className={styles["steps-item-button"]}>{sign}</button>
		</li> : ''
	))

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.card}>
					<h1>Калькулятор</h1>
					<div className={styles.steps}>
						<div className={styles["steps-content"]}>
							{text}
						</div>
						<div className={styles["steps-content"]}>
							{resultText}
						</div>
						<ul className={styles["steps-list"]}>
							{setNumbers}
						</ul>
						<ul className={styles["steps-list2"]}>
							{setOperators}
							{setResults}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
