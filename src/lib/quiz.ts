const FOUND_COLOR = 'green';
const NOT_FOUND_COLOR = 'red';

type Result = {
	text?: string,
	grade?: number,
}

export type Question = {
	text: string,
	answer: string | string[],
	word: string[][],
	result: Result | boolean[],
}

export class QuizFactory {
	#pairs: string[][] = [];

	length() {
		return this.#pairs.length;
	}

	add(a: string, b: string) {
		this.#pairs.push([a, b]);
	}

	set pairs(pairs: string[][]) {
		this.#pairs = pairs;
	}

	createQuiz(answerLength = 1, wordLength = 4): Question[] {
		const remainder = [...this.#pairs];
		const words: string[][][] = [];

		let word: string[][] = [];
		while (remainder.length !== 0) {
			const index = Math.floor(Math.random() * remainder.length);
			const pair = remainder.splice(index, 1)[0];
			word.push(pair);

			if (word.length >= wordLength) {
				words.push(word);
				word = [];
			}
		}

		if (word.length > 0) {
			words.push(word);
		}

		const questions: Question[] = [];

		words.forEach(word => {
			const multiAnswer = answerLength > 1;
			let question: Question;
			if (multiAnswer) {
				const answer: string[] = [];
				const result: boolean[] = [];
				for (let i = 0; i < answerLength; i++) {
					answer.push('');
					result.push(true);
				}
				question = { text: '', answer, word, result };
			} else {
				question = { text: '', answer: '', word, result: {} };
			}

			word.forEach(pair => {
				question.text += pair[0];
				if (multiAnswer) {
					for (let i = 0; i < answerLength; i++) {
						(question.answer as string[])[i] = question.answer[i] + pair[1][i];
					}
				} else {
					question.answer += pair[1];
				}
			});
			questions.push(question);
		});
		return questions;
	}
}

export function grade(question: Question, value: string, maxTokenLength: number): Result {
	const { answer } = question;
	if (answer === value) {
		return {
			text: `<span style="color: ${FOUND_COLOR}">${question.text}</span>`,
			grade: question.word.length
		};
	}

	let start = 0;
	let notFound = 0;

	const result: boolean[] = [];
	question.word.forEach(part => {
		const end = start + ((notFound + 1) * maxTokenLength) - notFound;
		const slice = value.slice(start, end);
		const sliceIndex = slice.indexOf(part[1]);

		const found = notFound === 0 ? sliceIndex === 0 : sliceIndex !== -1;
		start = start + (found ? sliceIndex + part[1].length : 1);
		notFound = found ? 0 : notFound + 1;

		result.push(found);
	});

	// last found must be at the end
	if (notFound === 0 && value.slice(start).length > 0) {
		result[result.length - 1] = false;
	}

	return question.word.reduce((acc, part, index) => {
		const qPart = part[0];
		const found = result[index];

		const color = found ? FOUND_COLOR : NOT_FOUND_COLOR;
		acc.text = acc.text + `<span style="color: ${color}">${qPart}</span>`;
		acc.grade += found ? 1 : 0;

		return acc;
	}, { text: '', grade: 0 });
}

export function gradeAnswer(question: Question, answer: string, value: string, maxTokenLength: number): boolean {
	if (answer === value) {
		return true;
	}

	let start = 0;
	let notFound = 0;

	const result: boolean[] = [];
	question.word.forEach(part => {
		const end = start + ((notFound + 1) * maxTokenLength) - notFound;
		const slice = value.slice(start, end);
		const sliceIndex = slice.indexOf(part[1]);

		const found = notFound === 0 ? sliceIndex === 0 : sliceIndex !== -1;
		start = start + (found ? sliceIndex + part[1].length : 1);
		notFound = found ? 0 : notFound + 1;

		result.push(found);
	});

	// last found must be at the end
	if (notFound === 0 && value.slice(start).length > 0) {
		result[result.length - 1] = false;
	}

	return result.every(value => value);
}