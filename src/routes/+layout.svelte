<script>
	import { onMount } from "svelte";
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Theme } from "carbon-components-svelte";
	import { ConfigureAPI } from "../lib/api/api"
	import "carbon-components-svelte/css/all.css";
	import { username as usernameStores } from "../stores";
	import { Tabs, Tab } from "carbon-components-svelte";
	

	ConfigureAPI("https://script.google.com/macros/s/AKfycbyaDIUbPFiKiGRcZq-U8dE9n86MjbAWGzmuDs1mqK3NgUDFiaXyUwIYs3vVZ4PCaj699w/exec");

	let themes = ["white", "g10", "g80", "g90", "g100"];
	let theme = themes[0];

	let selected = 0;


	onMount(() => {
		let username = localStorage.getItem("username");

		if($page.url.pathname == "/codebook"){
			selected = 0
		}else if ($page.url.pathname == "/alltexts"){
			selected = 1
		}else if ($page.url.pathname == "/labelsample"){
			selected = 2
		}else if ($page.url.pathname == "/label"){
			selected = 3
		}

		if(username == null || username == undefined){
			if($page.url.pathname != "/"){
				usernameStores.set("");
				goto("/");
			}
		}else{
			usernameStores.set(username);
		}

	})



</script>

<Theme bind:theme>
<div class="app">
	{#if $usernameStores != ""}
	<div class="menu">
		<Tabs type="container" bind:selected> 
			<Tab label="Code Book" on:click={ () => goto("/codebook") }/>
			<Tab label="All Texts" on:click={ () => goto("/alltexts") }/>
			<Tab label="Label Sample" on:click={ () => goto("/labelsample") }/>
			<Tab label="Label" on:click={ () => goto("/label") }/>
		  </Tabs>
	</div>
	{/if}
	
	<slot/>
</div>
</Theme>


<style>
	.app{
		display: flex;
		flex-direction: column;
		max-height: 100vh;
		max-height: 100vw;
		min-height: 100vh;
	}

</style>