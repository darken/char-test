<script lang="ts">
	type Question = {
		text: string;
		answer: string;
		word: string[][];
	}

	type Result = {
		text?: string,
		grade?: number,
	}

	const FOUND_COLOR = 'green';
	const NOT_FOUND_COLOR = 'red';

	const pairs: string[][] = [];

	function add(a: string, b: string) {
		pairs.push([a, b]);
	}

	add('あ', 'a');
	add('い', 'i');
	add('う', 'u');
	add('え', 'e');
	add('お', 'o');
	add('か', 'ka');
	add('き', 'ki');
	add('く', 'ku');
	add('け', 'ke');
	add('こ', 'ko');
	add('さ', 'sa');
	add('し', 'shi');
	add('す', 'su');
	add('せ', 'se');
	add('そ', 'so');
	add('た', 'ta');
	add('ち', 'chi');
	add('つ', 'tsu');
	add('て', 'te');
	add('と', 'to');
	add('な', 'na');
	add('に', 'ni');
	add('ぬ', 'nu');
	add('ね', 'ne');
	add('の', 'no');
	add('は', 'ha');
	add('ひ', 'hi');
	add('ふ', 'fu');
	add('へ', 'he');
	add('ほ', 'ho');
	add('ま', 'ma');
	add('み', 'mi');
	add('む', 'mu');
	add('め', 'me');
	add('も', 'mo');
	add('や', 'ya');
	add('ゆ', 'yu');
	add('よ', 'yo');
	add('ら', 'ra');
	add('り', 'ri');
	add('る', 'ru');
	add('れ', 're');
	add('ろ', 'ro');
	add('わ', 'wa');
	add('を', 'wo');
	add('ん', 'n');

	let quiz: Question[];
	let quizResults: Result[] = [];

	function createQuiz(wordLength = 4) {
		const remainder = [...pairs];
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

		quiz = [];
		quizResults = [];
		words.forEach(word => {
			const question: Question = { text: '', answer: '', word };
			word.forEach(pair => {
				question.text += pair[0];
				question.answer += pair[1];
			});
			quiz.push(question);
			quizResults.push({});
		});
	}

	const maxTokenLength = 3;
	createQuiz();

	function evalQuestion(question: Question, questionIndex: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.toLowerCase();
		const { answer } = question;
		if (answer === value) {
			quizResults[questionIndex] = {
				text: `<span style="color: ${FOUND_COLOR}">${question.text}</span>`,
				grade: question.word.length
			};
			return;
		}
		console.log('\n');
		console.log(answer);
		console.log(value);

		let start = 0;
		let notFound = 0;

		const result: boolean[] = [];
		question.word.forEach(part => {
			const end = start + ((notFound + 1) * maxTokenLength) - notFound;
			const slice = value.slice(start, end);
			const sliceIndex = slice.indexOf(part[1]);
			console.log('slice:', slice, part[1]);

			const found = notFound === 0 ? sliceIndex === 0 : sliceIndex !== -1;
			start = start + (found ? sliceIndex + part[1].length : 1);
			notFound = found ? 0 : notFound + 1;

			result.push(found);
		});

		// last found must be at the end
		console.log('last slice', value.slice(start));
		if (notFound === 0 && value.slice(start).length > 0) {
			result[result.length - 1] = false;
		}

		quizResults[questionIndex] = question.word.reduce((acc, part, index) => {
			const qPart = part[0];
			const found = result[index];

			const color = found ? FOUND_COLOR : NOT_FOUND_COLOR;
			acc.text = acc.text + `<span style="color: ${color}">${qPart}</span>`;
			acc.grade += found ? 1 : 0;

			return acc;
		}, { text: '', grade: 0 });
	}

	let finalGrade: number;
	$: finalGrade = quizResults.reduce((acc, r) => acc + (r.grade || 0), 0);
</script>


<h1 class="text-4xl font-bold my-8">Hiraana to Romanji</h1>

<div class="columns-md pt-2">
	{#each quiz as question, index}
		<div class="py-2">
			<div class="inline-block">
				<h2 class="text-4xl font-bold">
					{#if !!quizResults[index].text}
						{@html quizResults[index].text}
					{:else}
						{question.text}
					{/if}
				</h2>
			</div>
			<div class="inline-block pl-4">
				<input type="text" maxlength="{question.word.length * 3}"
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							 on:change={(e) => evalQuestion(question, index, e)}>
			</div>
		</div>
	{/each}
</div>

<div class="my-6">
	<div class="inline-block">
		<h2 class="text-4xl font-bold">Grade</h2>
	</div>
	<div class="inline-block pl-4">
		<input type="text" value="{finalGrade}/{pairs.length}" readonly
					 class="text-3xl" />
	</div>
</div>


<style>
</style>