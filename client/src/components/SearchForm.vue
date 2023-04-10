<template>
	<div>
		<input type="number" v-model="searchForm.score" />
		<select v-model="searchForm.type">
			<option v-for="(value, key) in typeOptions" :value="key" :key="key">{{ value }}</option>
		</select>
		<button @click="search">搜索</button>
	</div>
</template>

<script>
const typeOptions = {
	greater: '大于',
	equal: '等于',
	less: '小于',
};
export default {
	name: 'SearchForm',
	props: {
		defineType: {
			validator(value) {
				return Object.keys(typeOptions).includes(value);
			},
		},
	},
	data() {
		return {
			typeOptions,
			searchForm: {
				type: this.defineType,
				score: 0,
			},
		};
	},
	methods: {
		search() {
			this.$emit('search', this.searchForm);
		},
	},
};
</script>
