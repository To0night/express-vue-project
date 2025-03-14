import axios from 'axios';
import qs from 'qs';

export function getStudents(type, score) {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/getStudents', qs.stringify({ type, score }))
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getData() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/getData', {
				params: { type: 'number' }
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}


export function get404Data() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/get404Data', {
				params: { type: 'number' }
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}



export function get403Data() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/get403Data', {
				params: { type: 'number' }
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}