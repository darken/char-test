<script lang="ts">
	import { QuizFactory, grade } from '$lib/quiz';
	import type { Question } from '$lib/quiz';

	const factory = new QuizFactory();
	factory.add('あ', 'a');
	factory.add('い', 'i');
	factory.add('う', 'u');
	factory.add('え', 'e');
	factory.add('お', 'o');
	factory.add('か', 'ka');
	factory.add('き', 'ki');
	factory.add('く', 'ku');
	factory.add('け', 'ke');
	factory.add('こ', 'ko');
	factory.add('さ', 'sa');
	factory.add('し', 'shi');
	factory.add('す', 'su');
	factory.add('せ', 'se');
	factory.add('そ', 'so');
	factory.add('た', 'ta');
	factory.add('ち', 'chi');
	factory.add('つ', 'tsu');
	factory.add('て', 'te');
	factory.add('と', 'to');
	factory.add('な', 'na');
	factory.add('に', 'ni');
	factory.add('ぬ', 'nu');
	factory.add('ね', 'ne');
	factory.add('の', 'no');
	factory.add('は', 'ha');
	factory.add('ひ', 'hi');
	factory.add('ふ', 'fu');
	factory.add('へ', 'he');
	factory.add('ほ', 'ho');
	factory.add('ま', 'ma');
	factory.add('み', 'mi');
	factory.add('む', 'mu');
	factory.add('め', 'me');
	factory.add('も', 'mo');
	factory.add('や', 'ya');
	factory.add('ゆ', 'yu');
	factory.add('よ', 'yo');
	factory.add('ら', 'ra');
	factory.add('り', 'ri');
	factory.add('る', 'ru');
	factory.add('れ', 're');
	factory.add('ろ', 'ro');
	factory.add('わ', 'wa');
	factory.add('を', 'wo');
	factory.add('ん', 'n');

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


<h1 class="text-4xl font-bold my-8">Hiragana / Romanji</h1>

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