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
			quizResults[questionIndex] = {grade: question.word.length};
			return;
		}
		console.log('\n');
		console.log(answer);
		console.log(value);

		let start = 0;
		let notFound = 0;

		const result: boolean[] = [];
		question.word.forEach(part => {
			// if notFound === 0 index === 0
			const end = start + ((notFound + 1) * maxTokenLength) - notFound;
			const slice = value.slice(start, end);
			console.log('slice:', slice, part[1]);
			const sliceIndex = slice.indexOf(part[1]);

			const found = notFound === 0 ? sliceIndex === 0 : sliceIndex !== -1;
			if (!found) {
				start += 1;
				notFound += 1;
			} else {
				start = start + sliceIndex + part[1].length;
				notFound = 0;
			}
			result.push(found);
		});

		quizResults[questionIndex] = question.word.reduce((acc, part, index) => {
			const qPart = part[0];
			const found = result[index];

			acc.text = acc.text + (found ? qPart : `<b style="color: red">${qPart}</b>`);
			acc.grade += found ? 1 : 0;

			return acc;
		}, { text: '', grade: 0 });
	}

	let finalGrade: number
	$: finalGrade = quizResults.reduce((acc, r) => acc + (r.grade || 0), 0)
</script>

<h1>Characters test</h1>
{#each quiz as question, index}
	<div class="q-row">
		<div>
			{#if !!quizResults[index].text}
				<h1>{@html quizResults[index].text}</h1>
			{:else}
				<h1>{question.text}</h1>
			{/if}
		</div>
		<div>
			<input type="text" maxlength="{question.word.length * 3}"
						 on:change={(e) => evalQuestion(question, index, e)} />
		</div>
	</div>
{/each}

<div class="q-row">
	<div><h3>Grade</h3></div>
	<div><input type="text" value="{finalGrade}/{pairs.length}" readonly /></div>
</div>

<style>
    .q-row div {
        display: inline-block;
        margin-left: 2rem;
    }
</style>