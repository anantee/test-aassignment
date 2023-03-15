<template>
	<div>
		<h1 class="half__text-background">{{ title }}</h1>
	</div>
</template>

<script>
export default {
	name: 'TitleComponent',
	props: {
		title: {
			type: String
		}
	}
};
</script>

<style>
.half__text-background {
	border-bottom: 5px solid palevioletred;
	width: 5%;
}
</style>