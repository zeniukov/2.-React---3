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
	const canOperate = operand1 === '' || operand2 === '' ? false : true
	const canSetOperand2 = operator === '' ? false : true


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
		if (text !== '') {
			if (text.at(-1) === '-' || text.at(-1) === sign) {
				setText((a) => a.slice(0, -1) + sign);
				setOperator(sign);
			} else {
					setText((a) => a + sign);
					setOperator(sign);
				}
		} if (text === '-') {
			setText('');
			setOperand1('');
			setOperator('')
		};
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	}

	const onSubtraction = (sign) => {
		if (text !== '') {
			if (text.at(-1) === '+' || text.at(-1) === sign) {
				setText((a) => a.slice(0, -1) + sign);
				setOperator(sign);
			} else if (operator === '+' && text.at(-1) !== '+' && text.at(-1) !== '-') {
				setOperand2((a) => a + sign);
				setText((a) => a + sign);
			}	else {
					setText((a) => a + sign);
					setOperator(sign)
				}
		} else if (text === '') {
				if (text.at(-1) === '+' || text.at(-1) === sign) {
					setText((a) => a.slice(0, -1) + sign)
				} else {
						setText((a) => a + sign);
						setOperand1((a) => a + sign);
					}
			}
		console.log('operand1, operator, operand2, result', operand1, operator, operand2, result);
	};


	const onResult = (sign) => {
		result = operator === '+' ? +operand1 + +operand2 : +operand1 - +operand2;

		if (text !== '') {
			setText((a) => a + sign + result);
			setResultText(` ${result}`);
			setOperand1(result);
			setOperand2('');
		}

		// console.log('text.length+', text.length)
		// text.at(text.length-result.length) !== sign ? '' : setText((a) => a + sign + result);
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
		<li key={number} className={styles["numbers-item"]}>
			<button onClick={
				canSetOperand2 ? addOperand2.bind(null, number) : addOperand1.bind(null, number)
			} className={styles["number"]}>{number}</button>
		</li> : ''
	))

	const setOperators = NUMS.map((sign, index) => (
		index === 10 || index === 11 ?
		<li key={sign} className={styles["operators-item"] + " " + styles.done}>
			<button onClick={
				index === 10 ?
				onAddition.bind(null, sign) :
				onSubtraction.bind(null, sign)
				}
				className={styles["operator"]}
				disabled={canOperate}
				>{sign}</button>
		</li> : ''
	))

	const setResults = NUMS.map((sign, index) => (
		index === 12 || index === 13 ?
		<li key={sign} className={styles["operators-item"] + " " + styles.done}>
			<button onClick={
				index === 12 ?
				onResult.bind(null, String(sign)) :
				onReset.bind(null, sign)
				} className={styles["result"]}>{sign}</button>
		</li> : ''
	))

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.card}>
					<h2>Калькулятор</h2>
					<div className={styles.steps}>
						<div className={styles["text"]}>
							{text}
						</div>
						<div className={styles["result-text"]}>
							Финальный результат:
							<b>
								{ resultText}
							</b>
						</div>
							<div className={styles["buttons"]}>
							<ul className={styles["numbers"]}>
								{setNumbers}
							</ul>
							<ul className={styles["operators"]}>
								{setOperators}
								{setResults}
							</ul>
							</div>
					</div>
				</div>
			</div>
		</div>
	)
}
