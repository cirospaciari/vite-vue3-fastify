<script setup lang="ts">
import usePostStore from '../stores/post';
import { storeToRefs } from 'pinia'
import { reactive } from 'vue';


const post_store = usePostStore();
const { posts, loading, error, getPostsPerAuthor } = storeToRefs(post_store)
function fetchPosts(){
    post_store.fetchPosts()
}
//Exemplo de API sem Pinia
const state = reactive({
    apiInfo: null,
    apiLoading: false
});
async function fetchAPI(){
    state.apiLoading = true;
    //essa api esta em /api/routes.js
    state.apiInfo = await fetch('/api/hello').then((response)=> response.json());
    state.apiLoading = false;
}
</script>
    

    
<template>
    <h1>Test Page!</h1>
    
    <button @click="fetchPosts" v-if="!loading">Test pinia!</button>
    <button @click="fetchAPI" v-if="!state.apiLoading">Test api!</button>
    <div v-if="posts">{{ JSON.stringify(posts) }}</div>
    <div v-if="state.apiInfo">{{ JSON.stringify(state.apiInfo) }}</div>
    <router-link to="/">Go Home!</router-link>

</template>
    