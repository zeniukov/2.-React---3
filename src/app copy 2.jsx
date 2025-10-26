import styles from "./app.module.css";
import { useState } from "react";

export const App = () => {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C']
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  let operator;
	const [text, setText] = useState('');
	let result;
	let canMath = operand1 === '' || operand2 === '' ? false : true


	const addNumber = (number) => {
		setText((a) => a + number);
		operand1 === '' ? setOperand1((a) => a + number) : setOperand2((b) => b + number);
	}

	const onAddition = (sign) => {
		text.at(-1) === sign ? '' : setText((a) => a + sign);
		text.at(-1) === '-' ? '' : setText((a) => a.replace('-', '+'));
		operator = sign;
		console.log(operator);
	}

	const onSubtraction = (sign) => {
		text.at(-1) === sign ? '' : setText((a) => a + sign);
		text.at(-1) === '+' ? '' : setText((a) => a.replace('+', '-'));
		operator = sign;
		console.log(operator);
	}

	const onResult = (sign) => {
		console.log('operand1, operand2', operand1, operand2)
		result = operator === '+' ? +operand1 + +operand2 : +operand1 - +operand2;
		setText((a) => a + sign + result);
		setOperand1(result);
		setOperand2('');
	}

	const onReset = () => {
		setText('');
		result = 0;
		!operator;
		setOperand1('');
		setOperand2('');
		console.log(operator)
	}

	const setNumbers = NUMS.map((number) => (
		!isNaN(number) ?
		<li key={number} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={addNumber.bind(null, number)} className={styles["steps-item-button"]}>{number}</button>
		</li> : ''
	))

	const setOperators = NUMS.map((sign, index) => (
		index === 10 || index === 11 ?
		<li key={sign} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={
				index === 10 ?
				onAddition.bind(null, sign) :
				onSubtraction.bind(null, sign)
				}
				className={styles["steps-item-button"]}
				disabled={canMath}
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
						<ul className={styles["steps-list"]}>
							{setNumbers}
						</ul>
						<ul className={styles["steps-list"]}>
							{setOperators}
							{setResults}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
