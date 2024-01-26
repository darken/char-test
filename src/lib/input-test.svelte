<script lang="ts">
	import { type Question, QuizFactory, grade } from '$lib/quiz';

	export let factory = new QuizFactory();
	export let maxTokenLength = 3;

	const pairsLength = factory.length();
	const questions = factory.createQuiz();

	function onAnswerChange(question: Question, index: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.toLowerCase();
		question.result = grade(question, value, maxTokenLength);
		questions[index] = question;
	}

	let finalGrade: number;
	$: finalGrade = questions.reduce((acc, r) => acc + (r.result.grade || 0), 0);
</script>


<div class="sm:columns-2 lg:columns-3 xl:columns-4 pt-2">
	{#each questions as question, index}
		<div class="flex flex-col md:flex-row py-2">
			<div>
				<h2 class="text-5xl font-bold mb-2 md:mb-0">
					{#if !!question.result.text}
						{@html question.result.text}
					{:else}
						{question.text}
					{/if}
				</h2>
			</div>
			<div class="md:flex-1 md:pl-4">
				<input type="text" maxlength="{question.word.length * maxTokenLength}"
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
							 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
					 class="text-3xl bg-transparent" />
	</div>
</div>
