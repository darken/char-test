<script lang="ts">
	import InputTest from '$lib/input-test.svelte';
	import SelfTest from '$lib/self-test.svelte';
	import { QuizFactory } from '$lib/quiz';
	import { hiragana } from '$lib/kana';

	const pairs: string[][] = Object.entries(hiragana.basic).map(e => [e[1], e[0]]);
	const factory = new QuizFactory();
	factory.pairs = pairs;
</script>


<h1 class="text-4xl font-bold my-8">Hiragana / Romanji</h1>
<InputTest factory={factory}></InputTest>
<div class="py-4"></div>
<SelfTest factory={factory}></SelfTest>
