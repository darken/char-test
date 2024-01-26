<script lang="ts">
	import { QuizFactory } from '$lib/quiz';

	export let factory = new QuizFactory();

	const pairsLength = factory.length();
	const questions = factory.createQuiz();
	const status: number[][] = questions.map(q => q.word.map(() => 0));

	function onCharClick(questionIndex: number, charIndex: number) {
		status[questionIndex][charIndex] += 1;
		if (status[questionIndex][charIndex] > 2) status[questionIndex][charIndex] = 0;
	}

	let finalGrade: number;
	$: finalGrade = status.reduce((acc, r) => acc + r.reduce((acc, r) => acc + (r % 2), 0), 0);

	function getButtonClasses(status: number): string {
		switch (status) {
			case 1:
				return 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
			case 2:
				return 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-950';
			default:
				return 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800';
		}
	}
</script>


<div class="columns-md pt-2">
	{#each questions as question, questionIndex}
		<div class="columns-4 py-2">
			{#each question.word as c, charIndex}
				<div>
					<button on:click={() => onCharClick(questionIndex, charIndex)}
									class="text-3xl text-white focus:ring-4 font-medium rounded-lg w-full py-2.5
									focus:outline-nones {getButtonClasses(status[questionIndex][charIndex])}">
						{#if status[questionIndex][charIndex] === 0}
							{c[1]}
						{:else}
							{c[0]}
						{/if}
					</button>
				</div>
			{/each}
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
