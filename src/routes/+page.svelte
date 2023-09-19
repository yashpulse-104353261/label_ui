<script>
	import { Button, Modal, TextInput } from "carbon-components-svelte";
	import { goto } from '$app/navigation';
	import { username as usernameStores } from "../stores";
	import { onMount } from "svelte";

	let open = false;

	let allowedUsernames = [
		"erika_103976052",
		"sahil_104191542",
		"yash_104353261",
		"pavan_103818552",
	]

	let username = "";	

	onMount(() => {
		let username = localStorage.getItem("username");

		if(username != null && username != undefined){
			goto("/codebook");
		}
	})

	const login = () => {
		if(allowedUsernames.includes(username)){
			open = false;
			localStorage.setItem("username", username);
			usernameStores.set(username);

			goto("/codebook");
		}
		else{
			alert("Invalid username");
		}
	}


	
</script>

<div class="workspace">
	<Button on:click={() => open = true}>Login</Button>
</div>

<Modal
  bind:open
  modalHeading="Login"
  primaryButtonText="Continue"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#username"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={login}
>
  <p>Enter your username provided by Yash.</p>
  <br />
  <TextInput
    id="username"
    labelText="Username"
    placeholder="Enter username name..."
	bind:value={username}
  />
</Modal>

<style>
	.workspace{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		max-height: 100vh;
		max-width: 100vw;
		min-height: 100vh;
	}
</style>
