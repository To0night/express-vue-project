<template>
    <div>
        <button id="getBtn" @click="getData">get</button>
        <button @click="postStudent">post</button>
        <button @click="get404Data">404</button>
        <button @click="get403Data">403</button>
    </div>
</template>

<script>
import { getStudents, getData, get404Data, get403Data } from '../services';
export default {
    name: 'Test',
    data() {
        return {}
    },
    methods: {
        getData() {
            console.log('getData', 11111111111111111);
            getData()
        },
        postStudent() {
            getStudents()
        },
        get404Data() {
            get404Data()
        },
        get403Data() {
            get403Data()
        }
    }
};
</script>
