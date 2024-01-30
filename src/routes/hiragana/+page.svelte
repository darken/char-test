<script lang="ts">
	import InputTest from '$lib/input-test.svelte';
	import SelfTest from '$lib/self-test.svelte';
	import { QuizFactory } from '$lib/quiz';

	const pairs: string[][] = [];
	pairs.push(['あ', 'a']);
	pairs.push(['い', 'i']);
	pairs.push(['う', 'u']);
	pairs.push(['え', 'e']);
	pairs.push(['お', 'o']);
	pairs.push(['か', 'ka']);
	pairs.push(['き', 'ki']);
	pairs.push(['く', 'ku']);
	pairs.push(['け', 'ke']);
	pairs.push(['こ', 'ko']);
	pairs.push(['さ', 'sa']);
	pairs.push(['し', 'shi']);
	pairs.push(['す', 'su']);
	pairs.push(['せ', 'se']);
	pairs.push(['そ', 'so']);
	pairs.push(['た', 'ta']);
	pairs.push(['ち', 'chi']);
	pairs.push(['つ', 'tsu']);
	pairs.push(['て', 'te']);
	pairs.push(['と', 'to']);
	pairs.push(['な', 'na']);
	pairs.push(['に', 'ni']);
	pairs.push(['ぬ', 'nu']);
	pairs.push(['ね', 'ne']);
	pairs.push(['の', 'no']);
	pairs.push(['は', 'ha']);
	pairs.push(['ひ', 'hi']);
	pairs.push(['ふ', 'fu']);
	pairs.push(['へ', 'he']);
	pairs.push(['ほ', 'ho']);
	pairs.push(['ま', 'ma']);
	pairs.push(['み', 'mi']);
	pairs.push(['む', 'mu']);
	pairs.push(['め', 'me']);
	pairs.push(['も', 'mo']);
	pairs.push(['や', 'ya']);
	pairs.push(['ゆ', 'yu']);
	pairs.push(['よ', 'yo']);
	pairs.push(['ら', 'ra']);
	pairs.push(['り', 'ri']);
	pairs.push(['る', 'ru']);
	pairs.push(['れ', 're']);
	pairs.push(['ろ', 'ro']);
	pairs.push(['わ', 'wa']);
	pairs.push(['を', 'wo']);
	pairs.push(['ん', 'n']);

	const factory = new QuizFactory();
	factory.pairs = pairs;
</script>


<h1 class="text-4xl font-bold my-8">Hiragana / Romanji</h1>
<InputTest factory={factory}></InputTest>
<div class="py-4"></div>
<SelfTest factory={factory}></SelfTest>
