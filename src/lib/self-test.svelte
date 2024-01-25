<script lang="ts">
	import { QuizFactory } from '$lib/quiz';

	export let factory = new QuizFactory();
	// export let maxTokenLength = 3;

	const pairsLength = factory.length();
	const questions = factory.createQuiz();
	const status: number[][] = questions.map(q => q.word.map(() => 0));

	function onCharClick(questionIndex: number, charIndex: number) {
		status[questionIndex][charIndex] += 1;
		if (status[questionIndex][charIndex] > 2) status[questionIndex][charIndex] = 0;
	}

	let finalGrade: number;
	$: finalGrade = status.reduce((acc, r) => acc + r.reduce((acc, r) => acc + (r % 2), 0), 0);
</script>


<div class="columns-md pt-2">
	{#each questions as question, questionIndex}
		<div class="py-2">
			<div class="inline-block">
				{#each question.word as c, charIndex}
					<button on:click={() => onCharClick(questionIndex, charIndex)}
									class="
									{status[questionIndex][charIndex] !== 2
										? 'bg-blue-700 hover:bg-blue-800 ' : 'bg-red-700 hover:bg-red-800 '
									}
									text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
									text-3xl px-5 py-2.5 mx-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
									dark:focus:ring-blue-800">
						{#if status[questionIndex][charIndex] === 0}
							{c[1]}
						{:else if status[questionIndex][charIndex] === 1}
							{c[0]}
						{:else if status[questionIndex][charIndex] === 2}
							{c[0]}
						{/if}
					</button>
				{/each}
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
