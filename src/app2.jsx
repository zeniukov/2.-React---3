import { useState } from "react";
import styles from "./app2.module.css";
import data from "./data.json";

export const App = () => {
	const [steps, _] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const isOnFirstStep = activeIndex === 0 ? true : false;
	const isOnLastStep = activeIndex === 6 ? true : false;

	const clickBack = () => {
		setActiveIndex(activeIndex - 1);
	}
	const clickForward = () => {
		setActiveIndex(activeIndex + 1);
	}
	const clickBackToStart = () => {
		setActiveIndex(0);
	}

	const onActiveStep = (index) => {
		setActiveIndex(index)
	}

	// const activeStep = steps.find((step) => step.id === String(activeIndex).padStart(3, '00'));

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
						<div className={styles["steps-content"]}>
							{/* {activeStep && activeStep.content} */}
							{steps.map((step, index) => index === activeIndex ? step.content : '')}
						</div>
					<ul className={styles["steps-list"]}>
						{steps.map((step, index) => (
							<li key={step.id} className={
								index === activeIndex ?
								styles["steps-item"] + " " + styles.done + " " + styles.active :
								styles["steps-item"] &&
								index < activeIndex ?
								styles["steps-item"] + " " + styles.done :
								styles["steps-item"]
							 }>
								<button onClick={onActiveStep.bind(null, index)} className={styles["steps-item-button"]}>{index+1}</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles["buttons-container"]}>
						<button onClick={clickBack} className={styles.button} disabled={isOnFirstStep}>Назад</button>
						<button onClick={isOnLastStep ? clickBackToStart : clickForward} className={styles.button}>
							{isOnLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
