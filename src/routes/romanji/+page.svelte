<script lang="ts">
	import WriteTest from '$lib/write-test.svelte';
	import { QuizFactory } from '$lib/quiz';

	const pairs: (string | string[])[][] = [];
	pairs.push(['a', ["あ","ア"]]);
	pairs.push(['i', ["い","イ"]]);
	pairs.push(['u', ["う","ウ"]]);
	pairs.push(['e', ["え","エ"]]);
	pairs.push(['o', ["お","オ"]]);
	pairs.push(['ka', ["か","カ"]]);
	pairs.push(['ki', ["き","キ"]]);
	pairs.push(['ku', ["く","ク"]]);
	pairs.push(['ke', ["け","ケ"]]);
	pairs.push(['ko', ["こ","コ"]]);
	pairs.push(['sa', ["さ","サ"]]);
	pairs.push(['shi', ["し","シ"]]);
	pairs.push(['su', ["す","ス"]]);
	pairs.push(['se', ["せ","セ"]]);
	pairs.push(['so', ["そ","ソ"]]);
	pairs.push(['ta', ["た","タ"]]);
	pairs.push(['chi', ["ち","チ"]]);
	pairs.push(['tsu', ["つ","ツ"]]);
	pairs.push(['te', ["て","テ"]]);
	pairs.push(['to', ["と","ト"]]);
	pairs.push(['na', ["な","ナ"]]);
	pairs.push(['ni', ["に","ニ"]]);
	pairs.push(['nu', ["ぬ","ヌ"]]);
	pairs.push(['ne', ["ね","ネ"]]);
	pairs.push(['no', ["の","ノ"]]);
	pairs.push(['ha', ["は","ハ"]]);
	pairs.push(['hi', ["ひ","ヒ"]]);
	pairs.push(['fu', ["ふ","フ"]]);
	pairs.push(['he', ["へ","ヘ"]]);
	pairs.push(['ho', ["ほ","ホ"]]);
	pairs.push(['ma', ["ま","マ"]]);
	pairs.push(['mi', ["み","ミ"]]);
	pairs.push(['mu', ["む","ム"]]);
	pairs.push(['me', ["め","メ"]]);
	pairs.push(['mo', ["も","モ"]]);
	pairs.push(['ya', ["や","ヤ"]]);
	pairs.push(['yu', ["ゆ","ユ"]]);
	pairs.push(['yo', ["よ","ヨ"]]);
	pairs.push(['ra', ["ら","ラ"]]);
	pairs.push(['ri', ["り","リ"]]);
	pairs.push(['ru', ["る","ル"]]);
	pairs.push(['re', ["れ","レ"]]);
	pairs.push(['ro', ["ろ","ロ"]]);
	pairs.push(['wa', ["わ","ワ"]]);
	pairs.push(['wo', ["を","ヲ"]]);
	pairs.push(['n', ["ん","ン"]]);

	const factory = new QuizFactory();
	factory.pairs = pairs;
</script>


<h1 class="text-4xl font-bold my-8">Romanji</h1>
<WriteTest factory={factory}></WriteTest>
