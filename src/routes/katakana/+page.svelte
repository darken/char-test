<script lang="ts">
	import InputTest from '$lib/input-test.svelte';
	import { QuizFactory } from '$lib/quiz';

	const pairs: string[][] = [];
	pairs.push(['ア', 'a']);
	pairs.push(['イ', 'i']);
	pairs.push(['ウ', 'u']);
	pairs.push(['エ', 'e']);
	pairs.push(['オ', 'o']);
	pairs.push(['カ', 'ka']);
	pairs.push(['キ', 'ki']);
	pairs.push(['ク', 'ku']);
	pairs.push(['ケ', 'ke']);
	pairs.push(['コ', 'ko']);
	pairs.push(['サ', 'sa']);
	pairs.push(['シ', 'shi']);
	pairs.push(['ス', 'su']);
	pairs.push(['セ', 'se']);
	pairs.push(['ソ', 'so']);
	pairs.push(['タ', 'ta']);
	pairs.push(['チ', 'chi']);
	pairs.push(['ツ', 'tsu']);
	pairs.push(['テ', 'te']);
	pairs.push(['ト', 'to']);
	pairs.push(['ナ', 'na']);
	pairs.push(['ニ', 'ni']);
	pairs.push(['ヌ', 'nu']);
	pairs.push(['ネ', 'ne']);
	pairs.push(['ノ', 'no']);
	pairs.push(['ハ', 'ha']);
	pairs.push(['ヒ', 'hi']);
	pairs.push(['フ', 'hu']);
	pairs.push(['ヘ', 'he']);
	pairs.push(['ホ', 'ho']);
	pairs.push(['マ', 'ma']);
	pairs.push(['ミ', 'mi']);
	pairs.push(['ム', 'mu']);
	pairs.push(['メ', 'me']);
	pairs.push(['モ', 'mo']);
	pairs.push(['ヤ', 'ya']);
	pairs.push(['ユ', 'yu']);
	pairs.push(['ヨ', 'yo']);
	pairs.push(['ラ', 'ra']);
	pairs.push(['リ', 'ri']);
	pairs.push(['ル', 'ru']);
	pairs.push(['レ', 're']);
	pairs.push(['ロ', 'ro']);
	pairs.push(['ワ', 'wa']);
	pairs.push(['ヲ', 'wo']);
	pairs.push(['ン', 'n']);

	const factory = new QuizFactory();
	factory.pairs = pairs;
</script>


<h1 class="text-4xl font-bold my-8">Katakana / Romanji</h1>
<InputTest factory={factory}></InputTest>
