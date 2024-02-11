<script lang="ts">
	import { hiragana, katakana } from '$lib/kana';

	const phrases: string[] = (() => {
		const sets: string[][] = [];
		const pairs: { [key: string]: string[][] } = {
			hiragana: [],
			katakana: []
		};

		pairs.hiragana.push(...Object.entries(hiragana.basic));
		pairs.hiragana.push(...Object.entries(hiragana.voiced));
		pairs.hiragana.push(...Object.entries(hiragana.contracted));
		sets.push(buildWords(pairs.hiragana));

		pairs.katakana.push(...Object.entries(katakana.basic));
		pairs.katakana.push(...Object.entries(katakana.voiced));
		pairs.katakana.push(...Object.entries(katakana.contracted));
		sets.push(buildWords(pairs.katakana));

		const maxLength = sets.reduce((acc, words) => Math.max(acc, words.length), 0);
		const words: string[] = [];
		for (let i = 0; i < maxLength; i++) {
			sets.forEach(w => {
				const word = w[i];
				if (word) words.push(word);
			});
		}

		function shuffle(array: string[][]) {
			let currentIndex = array.length;
			let randomIndex: number;

			while (currentIndex > 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
			}
			return array;
		}

		function buildWords(pairs: string[][], min: number = 2, max: number = 6): string[] {
			const remainder = shuffle(pairs);
			const words: string[] = [];

			while (remainder.length !== 0) {
				const randomLength = Math.random() * (max - min) + min;
				const part = remainder.splice(0, randomLength);
				words.push(part.reduce((acc, p) => acc + p[1], ''));
			}
			return words;
		}

		const phrasesCount = 8;
		const phraseLength = words.length / phrasesCount;

		const phrases: string[] = [];
		while (words.length !== 0) {
			const part = words.splice(0, phraseLength);
			phrases.push(part.join(''));
		}
		return phrases;
	})();
</script>


<h1 class="text-4xl font-bold my-8">Reading exercise</h1>

<div class="pt-2">
	{#each phrases as phrase}
		<h2 class="text-5xl font-bold pb-9">
			{phrase}
		</h2>
	{/each}
</div>
