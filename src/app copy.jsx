import styles from "./app.module.css";
import { useState } from "react";


const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C']

export const App = () => {
  const [text, setText] = useState('');
	const [argument, setArgument] = useState('');
	const [calculation, setCalculation] = useState('');
	// let calculation = 0;
	const [result, setResult] = useState(0);
	// let result = 0;
	// const [onAdd, setOnSub] = useState(true)

	const addNumber = (number) => {
		setText((a) => a + number);
		setArgument((a) => a + number);
			// console.log('argument', argument)
	}

	const onAddition = (sign) => {
		// console.log('argument', argument)
		// sign === text.at(-1) ? '' : setText((a) => a + sign);
		setText((a) => a + sign);
		setArgument((a) => `${a}${sign}`)
		// sign === '+' && sign === text.at(-1) ? '' : setCalculation(() => [...calculation, argument]
		setCalculation(() => [...calculation, argument])
		// setCalculation((a) => +a + +argument);
		// calculation = argument +
		setArgument('');
	}
	const onResult = (sign) => {
		console.log('calculation', calculation);
		setResult(() => {
			let result = Number(calculation[0]);
			let operator = null;

			for (let i = 1; i < calculation.length; i++) {
				const item = calculation[i];

				if (['+', '-'].includes(item)) {
					operator = item;
				} else {
					const num = Number(item);

					if (operator === '+') result += num;
					else if (operator === '-') result -= num;
					}
				}
				console.log('result', result)
				return result
			}
		)
		// setOnSub ? setResult((a) => +a + +argument) : setResult((a) => +a - +argument)
		// setArgument('');
		// let sum = 0;
		// setArgument((a) => a + text);
		// sign === text.at(-2) ? setCalculation(calculation) : setCalculation([...calculation, argument])
		// setArgument('');
		// calculation.forEach((num) => {
		// 	return sum += +num
		// });
		// setResult(sum)
		// console.log('result', result);
		// sign === text.at(-1) ? setText(text) :
		setText((a) => a + sign + result);
	}

	const onSubtraction = (sign) => {
		sign === text.at(-1) ? setText(text) : setText((a) => a + sign);
		sign === text.at(-1) ? setCalculation(calculation) : setCalculation([...calculation, argument])
		console.log('calculation', [...calculation, argument]);
		setArgument('');
	}

	const onReset = () => {
		setText('');
		setArgument('');
		setCalculation([]);
		setResult('')
	}

	const setNumbers = numbers.map((number) => (
		!isNaN(number) ?
		<li key={number} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={addNumber.bind(null, number)} className={styles["steps-item-button"]}>{number}</button>
		</li> : ''
	))

	const setOperators = numbers.map((sign, index) => (
		index === 10 || index === 11 ?
		<li key={sign} className={styles["steps-item"] + " " + styles.done}>
			<button onClick={
				index === 10 ?
				onAddition.bind(null, sign) :
				onSubtraction.bind(null, sign)
				} className={styles["steps-item-button"]}>{sign}</button>
		</li> : ''
	))

	const setResults = numbers.map((sign, index) => (
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
