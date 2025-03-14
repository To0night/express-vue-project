<template>
	<div>
		<!-- <h3>Vue</h3>
		<SearchForm :defineType="defineType" @search="getStudents"></SearchForm>
		<StudentTable :studentList="studentList"></StudentTable> -->
		<Test></Test>
		<nav style="margin-top: 20px;">
            <router-link to="/app/home">Home</router-link> |
            <router-link to="/app/404">error</router-link> |
            <router-link to="/app/login/123">login</router-link>
        </nav>
		<router-view></router-view>
	</div>
</template>

<script>
import { getStudents } from './services';
import SearchForm from './components/SearchForm.vue';
import StudentTable from './components/StudentTable.vue';
import Test from './components/Test.vue';

export default {
	name: 'Layout',
	components: { SearchForm, StudentTable, Test },
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
