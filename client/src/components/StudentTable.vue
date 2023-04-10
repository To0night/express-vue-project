<template>
	<table border="1" width="400">
		<thead>
			<tr>
				<th>ID</th>
				<th>姓名</th>
				<th>年龄</th>
				<th>分数</th>
			</tr>
		</thead>
		<tbody v-if="studentList.length">
			<tr v-for="item of studentList" :key="item.id">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
				<td>{{ item.age }}</td>
				<td>{{ item.score }}</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr>
				<td colspan="4"><slot>暂无数据</slot></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'StudentTable',
	props: {
		studentList: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
