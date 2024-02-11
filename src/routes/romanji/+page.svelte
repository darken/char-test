<script lang="ts">
	import WriteTest from '$lib/write-test.svelte';
	import { QuizFactory } from '$lib/quiz';
	import { hiragana, katakana } from '$lib/kana';

	const pairs: (string | string[])[][] = Object.entries(hiragana.basic)
		.map(e => {
			const k: string = (katakana.basic[e[0]] as string);
			return [e[0], [e[1], k]];
		});

	const factory = new QuizFactory();
	factory.pairs = pairs;
</script>


<h1 class="text-4xl font-bold my-8">Romanji</h1>
<WriteTest factory={factory}></WriteTest>
