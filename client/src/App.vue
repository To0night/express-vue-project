<template>
	<div>
		<h3>Vue</h3>
		<SearchForm :defineType="defineType" @search="getStudents"></SearchForm>
		<StudentTable :studentList="studentList"></StudentTable>
	</div>
</template>

<script>
import { getStudents } from './services';
import SearchForm from './components/SearchForm.vue';
import StudentTable from './components/StudentTable.vue';

export default {
	name: 'App',
	components: { SearchForm, StudentTable },
	data() {
		return {
			defineType: 'less',
			studentList: [],
		};
	},
	mounted() {
		this.getStudents(this.defineType, 0);
	},
	methods: {
		async getStudents({ type, score }) {
			try {
				const { errorNo, data } = await getStudents(type, score);
				if (errorNo === 1) {
					this.studentList = data;
				} else {
					this.studentList = [];
				}
				console.log(errorNo, data);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style></style>
