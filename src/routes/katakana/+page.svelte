<script lang="ts">
	import { QuizFactory, grade } from '$lib/quiz';
	import type { Question } from '$lib/quiz';

	const factory = new QuizFactory();
	factory.add('ア', 'a');
	factory.add('イ', 'i');
	factory.add('ウ', 'u');
	factory.add('エ', 'e');
	factory.add('オ', 'o');
	factory.add('カ', 'ka');
	factory.add('キ', 'ki');
	factory.add('ク', 'ku');
	factory.add('ケ', 'ke');
	factory.add('コ', 'ko');
	factory.add('サ', 'sa');
	factory.add('シ', 'shi');
	factory.add('ス', 'su');
	factory.add('セ', 'se');
	factory.add('ソ', 'so');
	factory.add('タ', 'ta');
	factory.add('チ', 'chi');
	factory.add('ツ', 'tsu');
	factory.add('テ', 'te');
	factory.add('ト', 'to');
	factory.add('ナ', 'na');
	factory.add('ニ', 'ni');
	factory.add('ヌ', 'nu');
	factory.add('ネ', 'ne');
	factory.add('ノ', 'no');
	factory.add('ハ', 'ha');
	factory.add('ヒ', 'hi');
	factory.add('フ', 'hu');
	factory.add('ヘ', 'he');
	factory.add('ホ', 'ho');
	factory.add('マ', 'ma');
	factory.add('ミ', 'mi');
	factory.add('ム', 'mu');
	factory.add('メ', 'me');
	factory.add('モ', 'mo');
	factory.add('ヤ', 'ya');
	factory.add('ユ', 'yu');
	factory.add('ヨ', 'yo');
	factory.add('ラ', 'ra');
	factory.add('リ', 'ri');
	factory.add('ル', 'ru');
	factory.add('レ', 're');
	factory.add('ロ', 'ro');
	factory.add('ワ', 'wa');
	factory.add('ヲ', 'wo');
	factory.add('ン', 'n');

	const pairsLength = factory.length();
	const MAX_TOKEN_LENGTH = 3;

	const { questions, results: quizResults } = factory.createQuiz();

	function onAnswerChange(question: Question, questionIndex: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.toLowerCase();
		quizResults[questionIndex] = grade(question, questionIndex, value, MAX_TOKEN_LENGTH);
	}

	let finalGrade: number;
	$: finalGrade = quizResults.reduce((acc, r) => acc + (r.grade || 0), 0);
</script>


<h1 class="text-4xl font-bold my-8">Katakana / Romanji</h1>

<div class="columns-md pt-2">
	{#each questions as question, index}
		<div class="py-2">
			<div class="inline-block">
				<h2 class="text-5xl font-bold">
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
							 on:change={(e) => onAnswerChange(question, index, e)}>
			</div>
		</div>
	{/each}
</div>

<div class="my-6">
	<div class="inline-block">
		<h2 class="text-4xl font-bold">Grade</h2>
	</div>
	<div class="inline-block pl-4">
		<input type="text" value="{finalGrade}/{pairsLength}" readonly
					 class="text-3xl" />
	</div>
</div>


<style>
</style>