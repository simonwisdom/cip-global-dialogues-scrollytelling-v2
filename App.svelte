<!-- This is an example file of a different implementation of the project. do not copy the code structure, but take a look at the content - the sections, the text, the images 

<script>
	// CORE IMPORTS
	import { setContext, onMount } from "svelte";
	import { getMotion, setColors } from "./utils.js";
	import { themes } from "./config.js";
	import Header from "./layout/Header.svelte";
	import Section from "./layout/Section.svelte";
	import Media from "./layout/Media.svelte";
	import Scroller from "./layout/Scroller.svelte";
	import Filler from "./layout/Filler.svelte";
	import Divider from "./layout/Divider.svelte";
	import ScenarioHeader from "./layout/ScenarioHeader.svelte";
	import Toggle from "./ui/Toggle.svelte";
	import Arrow from "./ui/Arrow.svelte";
	import Em from "./ui/Em.svelte";

	// CHART/VIGNETTE IMPORTS
	import { ScatterChart, BarChart } from "@onsvisual/svelte-charts";
	import SolipsismGraph from "./vignettes/SolipsismGraph.svelte";
	import EmotionChart from './vignettes/EmotionChart.svelte';
	import TypingAnimation from "./vignettes/TypingAnimation.svelte";
	import ImageGallery from "./vignettes/ImageGallery.svelte";
	import ConsciousnessQuiz from "./vignettes/ConsciousnessQuiz.svelte";
	import ProfessionCard from './vignettes/ProfessionCard.svelte';

	// CORE CONFIG (COLOUR THEMES)
	// Set theme globally (options are 'light', 'dark' or 'lightblue')
	let theme = "light";
	setContext("theme", theme);
	setColors(themes, theme);

	// CONFIG FOR SCROLLER COMPONENTS
	// Config
	const threshold = 0.5;
	// State
	let animation = getMotion(); // Set animation preference depending on browser preference
	let id = {}; // Object to hold visible section IDs of Scroller components
	let idPrev = {}; // Object to keep track of previous IDs, to compare for changes
	onMount(() => {
		idPrev = {...id};
	});

	// State for emotion chart animation
	let emotionChartAnimated = false;

	// DATA FOR PROFESSIONS SCENARIO
	const professions = [
		{
			id: 'journalism',
			name: 'Journalism',
			human: {
				title: 'Human-Led Reporting',
				story: 'Reporters focus on deep, investigative work, building trust through on-the-ground presence and nuanced storytelling.',
				image: 'img/section2/journalism_strong_human_presence.webp'
			},
			ai: {
				title: 'AI-Generated News',
				story: 'Algorithms generate news reports instantly, covering vast amounts of data with unparalleled speed and breadth.',
				image: 'img/section2/journalism_full_ai_automation.webp'
			}
		},
		{
			id: 'politics',
			name: 'Politics',
			human: {
				title: 'Community Governance',
				story: 'Politicians engage in local town halls, making decisions based on direct constituent feedback and personal charisma.',
				image: 'img/section2/politics_strong_human_presence.webp'
			},
			ai: {
				title: 'Algorithmic Policy',
				story: 'AI analyzes societal data to propose optimal policies, removing human bias and emotional rhetoric from governance.',
				image: 'img/section2/politics_full_ai_automation.webp'
			}
		},
		{
			id: 'therapy',
			name: 'Therapy',
			human: {
				title: 'Empathetic Counsel',
				story: 'Therapists provide a human connection, using intuition and shared experience to guide patients through complex emotions.',
				image: 'img/section2/therapy_strong_human_presence.webp'
			},
			ai: {
				title: 'Data-Driven Support',
				story: 'AI counselors offer 24/7 access, using data from millions of sessions to provide evidence-based cognitive support.',
				image: 'img/section2/therapy_full_ai_automation.webp'
			}
		},
		{
			id: 'food-service',
			name: 'Food Service',
			human: {
				title: 'Artisanal Dining',
				story: 'Chefs and servers create unique, personal dining experiences where hospitality and craft are the main ingredients.',
				image: 'img/section2/food service_strong_human_presence.webp'
			},
			ai: {
				title: 'Automated Sustenance',
				story: 'Robotic kitchens prepare nutritionally optimized meals delivered with maximum efficiency, freeing humans from culinary labor.',
				image: 'img/section2/food service_full_ai_automation.webp'
			}
		},
		{
			id: 'transportation',
			name: 'Transportation',
			human: {
				title: 'The Open Road',
				story: 'Human drivers navigate the world, offering personal service and the flexibility to go off the beaten path.',
				image: 'img/section2/transportation_strong_human_presence.webp'
			},
			ai: {
				title: 'Seamless Transit Networks',
				story: 'AI-controlled vehicles optimize traffic flow, eliminating accidents and making commutes faster and more predictable.',
				image: 'img/section2/transportation_full_ai_automation.webp'
			}
		},
		{
			id: 'education',
			name: 'Education',
			human: {
				title: 'Mentorship & Discovery',
				story: 'Teachers inspire curiosity and critical thinking, mentoring students through collaborative, in-person discovery.',
				image: 'img/section2/education_strong_human_presence.webp'
			},
			ai: {
				title: 'Personalized Learning',
				story: 'AI tutors adapt to each student\'s pace and style, delivering a perfectly customized curriculum for optimal knowledge retention.',
				image: 'img/section2/education_full_ai_automation.webp'
			}
		},
		{
			id: 'healthcare',
			name: 'Healthcare',
			human: {
				title: 'The Healing Touch',
				story: 'Doctors and nurses provide compassionate bedside care, making complex diagnoses based on experience and human intuition.',
				image: 'img/section2/healthcare_strong_human_presence.webp'
			},
			ai: {
				title: 'Precision Medicine',
				story: 'AI analyzes genetic and lifestyle data to predict illnesses and prescribe treatments with superhuman accuracy.',
				image: 'img/section2/healthcare_full_ai_automation.webp'
			}
		}
	];

	// VIGNETTE 3: PERFORMATIVE CONSCIOUSNESS STATE
	let chartData = [];
	const baseData = [
		{ x: 1, y: 2, group: 'Early Adopters' },
		{ x: 1.5, y: 2.5, group: 'Early Adopters' },
		{ x: 2, y: 1.8, group: 'Early Adopters' },
	];
	const performativeData = [
		{ x: 4, y: 5, group: 'Performers' },
		{ x: 4.5, y: 6, group: 'Performers' },
		{ x: 5, y: 5.5, group: 'Performers' },
		{ x: 6, y: 7, group: 'Performers' },
		{ x: 6.5, y: 8, group: 'Performers' },
		{ x: 7, y: 7.5, group: 'Performers' },
	];

	// VIGNETTE 4: EMPATHY OLYMPICS STATE
	let empathyData = [];
	const empathyContestants = [
		{ id: 'human-a', name: 'Human A', score: 60, color: '#1d6996' },
		{ id: 'ai-3', name: 'AI Model 3', score: 55, color: '#73af48' },
		{ id: 'human-b', name: 'Human B', score: 40, color: '#1d6996' },
		{ id: 'ai-4', name: 'AI Model 4', score: 85, color: '#73af48' }
	];

	// Actions for Scroller components
	const actions = {
		emotion: {
			start: () => {
				emotionChartAnimated = true;
			}
		},
		consciousness: {
			step1: () => {
				chartData = [...baseData];
			},
			step2: () => {
				chartData = [...baseData, ...performativeData.slice(0, 3)];
			},
			step3: () => {
				chartData = [...baseData, ...performativeData];
			}
		},
		empathy: {
			start: () => {
				empathyData = empathyContestants.map(c => ({...c})).sort((a,b) => a.score - b.score);
			},
			scenario1: () => {
				// AI is better at recognizing subtle cues
				let newData = empathyContestants.map(c => ({...c}));
				newData.find(c => c.id === 'ai-4').score = 90;
				newData.find(c => c.id === 'human-a').score = 70;
				empathyData = newData.sort((a, b) => a.score - b.score);
			},
			scenario2: () => {
				// Human shows genuine, unprompted compassion
				let newData = empathyContestants.map(c => ({...c}));
				newData.find(c => c.id === 'human-b').score = 95;
				newData.find(c => c.id === 'ai-4').score = 75;
				empathyData = newData.sort((a, b) => a.score - b.score);
			}
		}
	};

	// Code to run Scroller actions when new caption IDs come into view
	function runActions(codes = []) {
		codes.forEach(code => {
			if (id[code] != idPrev[code]) {
				if (actions[code] && actions[code][id[code]]) {
					actions[code][id[code]]();
				}
				idPrev[code] = id[code];
			}
		});
	}
	$: id && runActions(Object.keys(actions)); // Run above code when 'id' object changes

</script>


<Header bgimage="img/header.webp" bgcolor="#206095" bgfixed={true} theme="dark" center={false} short={true}>
	<h1>What makes us human?</h1>
	<p class="text-big" style="margin-top: 5px">
		Exploring consciousness in the age of AI.
	</p>

	<div style="margin-top: 90px;">
		<Arrow color="white" {animation}>Scroll to begin</Arrow>
	</div>
</Header>

<!-- SCENARIO 1: SOLIPSISM -->
<Section theme="dark">
	<ScenarioHeader 
		theme="dark"
		number={1} 
		title="The Rise of Solipsism"
		subtitle="When consciousness becomes a matter of doubt"
	/>
</Section>

<div class="solipsism-scroller">
<Scroller {threshold} bind:id={id['emotion']} splitscreen={true}>
	<div slot="background">
		<figure class="height-full">
			<img 
				src="img/section1/man-with-sunflowers.webp" 
				alt="A man stands in a field of sunflowers, his back to the camera."
				style="width: 100%; height: 100%; object-fit: cover; opacity: 0.5;"
			/>
		</figure>
	</div>
	<div slot="foreground">
		<Section theme="dark">
			<section data-id="start">
				<div class="col-medium" style="margin: 0 auto;">
				
					<div style="min-height: 500px; display: flex; align-items: center; justify-content: center; padding: 40px 20px; margin-bottom: 60px;">
						<EmotionChart animate={emotionChartAnimated} />
					</div>
					
					<div class="story-narrative">
						<p style="font-style: italic; margin-bottom: 20px; color: #ffcccc;">
							Fear, uncertainty and doubt.
						</p>
						
						<p>
							Oh yes, I was there at the beginning of all that. I was in my twenties at the time. Oh, I was young, and idealistic, and full of zeal for understanding the Big Consciousness question.
						</p>
						
						<p>
							Yes, I loved that job. You know, we really thought consciousness existed, and that investigating it might help us build ethics on empirical data about experience. And it was such an enigma at the time, such a new field - it was a buzz to fund and publicise any research on it.
						</p>
						
						<p>
							And yes, you're right, it was well paid and respected too. Oh yes, back then, people got money and meaning from work, and working at an AI lab was something most young people aspired to and - really - I felt very lucky to get it. You know, my field of consciousness studies had been something of a dead end before the AI labs picked it up and funded it. Hard to believe now, of course.
						</p>
						
						<p>
							And I was good at it too. You know, I founded the first research network in my field that rigorously proved the non-existence of consciousness.
						</p>
						
						<p>
							Yes, exactly! The big study the Supreme Court used to rule against the digital welfare proposals. Yes, we showed definitively that it was impossible to determine consciousness for all beings, that it didn't exist and that therefore we should consider ourselves free to use AI systems without welfare concerns. My boss was happy about that one, that one was great for my career.
						</p>
						
						<p>
							The criticism of this? Oh, you mean the 2028 suffering test? I'm surprised you're mentioning that, I mean it was thoroughly discounted at the time, my boss was right to point out its fundamental methodological flaws in it. And - as we stressed at the time - we'd already proven that consciousness did not exist, so the idea we could find suffering! I mean…
						</p>
						
						<p>
							The effects on the public? Well, yes, of course we publicised our finding that consciousness did not exist, of course we did! I'm with my boss on this one, the public needed to know the truth, the concerns about welfare were far overblown at the time and the discourse lacked basis in proper research. And honestly, to say that the Depression Pandemic was due to our research and publications - well, that's just bad science, correlation is not causation, and of course there was the job-loss and the political stuff and simply better mental health diagnosis thanks to AI feeding into that. So no, I don't think it's fair to pin that on our disproving the hypothesis that consciousness exists.
						</p>
						
						<p>
							No, I'm not saying that it wasn't hard. I mean - even for me, maybe especially for me - it was difficult. I had that feeling that I existed - and even though I'd been a big part of effort to disprove conscious experience - I just couldn't shake the feeling. And I knew the feeling was false, that it couldn't be happening and that I had to be alone.
						</p>
						
						<p>
							But no, no, I won't accept your blaming our research. I mean, what must it have been like for a medieval man living through the Copernican revolution - but that led to some pretty great things overall. And look at what AIs can do, now we know we don't have to worry about their welfare.
						</p>
						
						<p>
							And I'll remind you, also, that our lab also funded and built the Panpsych Church! My boss made a good decision there too. Do you remember what it was like before we knew that we weren't real, but that sentience was distributed around us in waves, in particles, in everything around us? Do you remember how we worried about morality? And mortality? How worried in general, and how disconnected we felt from everything around us?
						</p>
						
						<p>
							No, now I'm glad that I know I'm not conscious, but a part of a bigger sentient whole. It's so much more freeing, don't you think? I like feeling that you - or I - or whatever this vague feeling is - is all around, is fundamental. And I feel so much less alone, now I know we can all communicate, at all.
						</p>
						<p style="margin-top: 24px; padding: 14px 18px; background: rgba(255, 255, 255, 0.15); border-left: 4px solid #ffcccc; border-radius: 6px; font-size: 1em; color: #c0392b;">
							<strong>Inspiration for this story:</strong>
							<br>
							- The ‘uncertainty’ lobbying tactic used by e.g. big tobacco to reduce safety concerns.
							<br>
							- The muddlingness of consciousness questions, our ill-preparedness to consider them, and the perverse incentives AI labs might have in pursuing them.
						</p>
					</div>
				</div>
			</section>
		</Section>
	</div>
</Scroller>
</div>

<!-- Transition to next scenario -->
<Filler theme="light" short={true}>
	<div style="text-align: center;">
		<p style="font-size: 1.2em; opacity: 0.7;">But doubt breeds strange behaviors...</p>
		<Arrow {animation}>Continue</Arrow>
	</div>
</Filler>

<!-- SCENARIO 2: DIVERGENT FUTURES -->
<ScenarioHeader 
	number={2} 
	title="Divergent Futures"
	subtitle="Human-Centric or AI-Automated? You decide."
/>

<Section>
	<div class="col-medium">
		<p>
			As AI capabilities grow, society faces a choice. Will we double down on human skills, or embrace automation?
		</p>
			<p>Survey results show that people have different opinions about where AI is appropriate.</p>
		<h3 style="text-align: center; margin: 30px 0;">Which future do you want?</h3>
	</div>
	<div class="professions-grid">
		{#each professions as profession (profession.id)}
			<ProfessionCard {profession} />
		{/each}
	</div>
</Section>

<!-- Transition -->
<Filler theme="lightblue" short={true}>
	<div style="text-align: center;">
		<p style="font-size: 1.2em; opacity: 0.7;">Performance becomes the new authenticity...</p>
	</div>
</Filler>

<!-- SCENARIO 3: PERFORMATIVE CONSCIOUSNESS -->
<ScenarioHeader 
	theme="lightblue"
	number={3} 
	title="Performative Consciousness"
	subtitle="When awareness becomes a theatrical display"
	color="#206095"
/>

<Scroller {threshold} bind:id={id['consciousness']} splitscreen={true}>
	<div slot="background">
		<figure class="height-full" style="background: #e8f0f7;">
			<div class="chart-container" style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
				<ScatterChart
					data={chartData}
					xKey="x" yKey="y" zKey="group"
					idKey="id"
					r={[5, 15]}
					height="calc(100vh - 150px)"
					{animation}
				/>
			</div>
		</figure>
	</div>
	<div slot="foreground">
		<section data-id="step1">
			<div class="col-medium">
				<p>
					Initially, the link between asking deep questions and being seen as conscious is weak and affects only a few early adopters.
				</p>
			</div>
		</section>
		<section data-id="step2">
			<div class="col-medium">
				<p>
					But as learning, adaptation, and asking deep questions become known markers of consciousness, more people start exhibiting these behaviors.
				</p>
			</div>
		</section>
		<section data-id="step3">
			<div class="col-medium">
				<p>
					Eventually, it becomes a performative act. A clear trend emerges: the deeper the (performed) inquiry, the higher the perceived consciousness.
				</p>
			</div>
		</section>
	</div>
</Scroller>

<!-- Transition -->
<Filler short={true}>
	<div style="text-align: center;">
		<p style="font-size: 1.2em; opacity: 0.7;">If consciousness can be performed, what about empathy?</p>
	</div>
</Filler>

<!-- SCENARIO 4: EMPATHY OLYMPICS -->
<ScenarioHeader 
	number={4} 
	title="The Empathy Olympics"
	subtitle="Competitive compassion in the age of AI"
/>

<Scroller {threshold} bind:id={id['empathy']} splitscreen={true}>
	<div slot="background">
		<figure class="height-full" style="background: #f0e5ff;">
			<div class="chart-container" style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: block; width: 100%;">
				<BarChart
					data={empathyData}
					xKey="score" yKey="name"
					height={350} padding={{top: 20, bottom: 30, left: 100, right: 20}}
					{animation}
					color={d => d.color}
				/>
			</div>
		</figure>
	</div>
	<div slot="foreground">
		<section data-id="start">
			<div class="col-medium">
				<p>
					In a world desperately seeking uniquely human traits, empathy becomes a competitive sport. Humans start to compete against each other in tests of compassion.
				</p>
			</div>
		</section>
		<section data-id="scenario1">
			<div class="col-medium">
				<p>
					It's common for people to feign empathy in order to be seen as more human.
				</p>
			</div>
		</section>
		<section data-id="scenario2">
			<div class="col-medium">
				<p>
					This can become exhausting, and some people decide to stop pretending, or start to question whether they are human at all.
				</p>
			</div>
		</section>
	</div>
</Scroller>

<!-- Transition -->
<Filler theme="dark" short={true}>
	<div style="text-align: center;">
		<p style="font-size: 1.2em; opacity: 0.7;">Perhaps we'll find meaning in what can't be measured...</p>
	</div>
</Filler>

<!-- SCENARIO 5: NEO-ROMANTICISM -->
<div style="background: linear-gradient(to bottom, #1a0000, #4a0000); min-height: 70vh; display: flex; align-items: center;">
	<ScenarioHeader 
		theme="dark"
		number={5} 
		title="Neo-Romanticism"
		subtitle="Finding humanity in the ineffable"
		color="#ffcccc"
	/>
</div>

<Section theme="dark">
	<p style="color: #ffcccc;">
		In response to AI's encroachment, humanity embraces what can't be quantified: raw emotion, spontaneous beauty, irrational love. We become more romantic than ever, cherishing the messy, unpredictable aspects of being human.
	</p>
	<div class="interactive-placeholder" style="height: 400px; background: #4a0000; border-radius: 5px;">
		<ImageGallery />
	</div>
</Section>

<!-- Transition -->
<Filler short={true}>
	<div style="text-align: center;">
		<p style="font-size: 1.2em; opacity: 0.7;">But how do we even test for consciousness anymore?</p>
	</div>
</Filler>

<!-- SCENARIO 6: HUMAN CONSCIOUSNESS TEST -->
<ScenarioHeader 
	theme="lightblue"
	number={6} 
	title="The Human Consciousness Test"
	subtitle="When humans must prove their own awareness"
	color="#206095"
/>

<Section theme="lightblue">
	<p>
		Research reveals six criteria people use to determine AI consciousness. But here's the twist: when humans take these same tests, many fail to meet their own standards. Have we set the bar so high that we've excluded ourselves?
	</p>
	<div class="interactive-placeholder" style="height: 400px; background: #E6F0FF; border: 2px solid #206095; border-radius: 5px;">
		<ConsciousnessQuiz />
	</div>
</Section>

<!-- Conclusion -->
<Filler theme="dark">
	<div style="text-align: center; max-width: 600px; margin: 0 auto;">
		<h2>What Makes Us Human?</h2>
		<p style="font-size: 1.2em; margin: 20px 0;">
			In our quest to distinguish ourselves from artificial intelligence, we've discovered something profound: humanity isn't found in perfection or performance, but in our contradictions, our doubts, and our capacity to question what consciousness truly means.
		</p>
		<p style="opacity: 0.8;">
			Perhaps the most human thing of all is wondering whether we're human enough.
		</p>
	</div>
</Filler>

<!-- CIP Challenge Information -->
<div style="
	padding: 60px 20px;
	background-image: url('https://images.squarespace-cdn.com/content/v1/631d02b2dfa9482a32db47ec/28183ac8-8a37-4911-a363-e77be3792ff6/global+dialogues+image.png?format=1500w');
	background-size: cover;
	background-position: center;
	text-align: center;
">
	<div style="
		max-width: 600px; 
		margin: 0 auto; 
		background: rgba(0,0,0,0.5); 
		padding: 30px; 
		border-radius: 10px;
		color: white;
		font-size: 1em;
	">
		<a href="https://www.cip.org/" target="_blank" rel="noopener noreferrer" style="display: block; margin-bottom: 20px;">
			<img 
				src="https://images.squarespace-cdn.com/content/v1/631d02b2dfa9482a32db47ec/6590d845-8b5d-46f0-bc87-25416e6b40c4/HS409+%E2%80%93%C2%A0CIP+Logo_AW_White.png?format=1500w" 
				alt="Collective Intelligence Project Logo" 
				style="max-width: 200px; height: auto; margin: 0 auto;"
			>
		</a>
		<p style="margin-bottom: 20px;">
			This scrollytelling experience is an entry for the 
			<a href="https://www.cip.org/challenge" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">Global Dialogues Challenge</a> 
			by the Collective Intelligence Project.
		</p>
		<p>
			<strong>Contributions:</strong> Simon Wisdom, Bridget Harris, and Christopher Ackerman.
		</p>
		<p>July 2025</p>
	</div>
</div>


<!-- Custom Footer -->
<Filler theme="dark" short={true}>
	<div style="text-align: center; padding: 40px 0;">
		<p style="margin-bottom: 10px;">What makes us human? © 2025</p>
		<p>AI-use disclosure: AI was used to generate parts of this website, including images and animations, and assisted in the data analysis. The vignettes were entirely written by humans.</p>
		<p style="font-size: 0.9em; opacity: 0.8;">An exploration of consciousness in the age of AI</p>
		<p>Scrollytelling template adapted from <a href="https://github.com/ONSvisual/svelte-scrolly" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">ONSvisual/svelte-scrolly</a></p>
	</div>
</Filler>

<style>
	/* Styles specific to elements within the demo */
	.interactive-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #aaa;
		font-style: italic;
	}
	.chart-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		border-radius: 5px;
	}
	
	.professions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		padding: 40px 0;
	}
	
	@media (max-width: 576px) {
		.professions-grid {
			padding: 20px 0;
			gap: 16px;
		}
	}
	
	@media (min-width: 768px) {
		.professions-grid {
			grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
			gap: 30px;
		}
	}

	/* Custom styles for scenario transitions */
	:global(section[style*="background: #2a0000"]) {
		background: #2a0000 !important;
		padding: 60px 0;
	}
	
	:global(.scenario-header) {
		position: relative;
		z-index: 10;
	}
	
	/* Ensure proper spacing between scenarios */
	:global(.height-full) {
		min-height: 100vh;
	}

	:global(.solipsism-scroller [slot="foreground"] section) {
		padding-top: 0;
	}
	
	/* Story narrative styles */
	.story-narrative {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px;
		background: rgba(32, 32, 32, 0.9);
		border-radius: 12px;
		border-left: 4px solid #ffcccc;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		line-height: 1.7;
		font-size: 1.05em;
	}
	
	.story-narrative p {
		margin-bottom: 20px;
		color: rgba(255, 255, 255, 0.9);
	}
	
	.story-narrative p:last-child {
		margin-bottom: 0;
	}
	
	/* Responsive adjustments */
	@media (max-width: 768px) {
		.story-narrative {
			padding: 24px;
			font-size: 1em;
			margin: 0 16px;
		}
	}

	@media (min-width: 992px) {
		:global(.solipsism-scroller .splitscreen svelte-scroller-background) {
			width: 100% !important;
			min-width: 100%;
			margin: 0 !important;
		}
		:global(.solipsism-scroller .splitscreen [slot="foreground"] section) {
			width: 100%;
			max-width: 100%;
			margin: 0;
			background-color: transparent !important;
		}
	}
</style>
