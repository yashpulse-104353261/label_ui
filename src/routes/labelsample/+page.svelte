<script>
    import { username } from "../../stores";
    import { ProgressBar, Button } from "carbon-components-svelte";
	import { api } from "../../lib/api/api";

    let unlabeledText = [];

    let isPageLoading = true;
    let loggedInUsername = "";

    let actionDisabled = true;

    $: if($username != "" && loggedInUsername == ""){
        
        getUnlabeledSample();
    }

    const getUnlabeledSample = async (disableLoading = false) => {

        isPageLoading = !disableLoading;

        await api.GetUnlabeledSample($username).then((data) => {
            unlabeledText = data;
            actionDisabled = false;
        });
        
        isPageLoading = false;

    }

    const label = async (id,labelText) => {
            
            isPageLoading = true;
            actionDisabled = true;
    
            await api.Label($username,id,labelText).then((data) => {

                if(unlabeledText.length >= 2){
                    unlabeledText = [unlabeledText[1]];
                    isPageLoading = false;
                    actionDisabled = false;
                }
                
                
                getUnlabeledSample(true);
            });
            
            
    }

    let keysToIgnore = [
        "erika_103976052",
        "sahil_104191542",
        "yash_104353261",
        "pavan_103818552",
        "label",
        "is_pre_label_sampling",
        "labelled_by"
    ]





</script>


{#if isPageLoading}
    <div class="page-loading">
        <ProgressBar size="sm"/>
    </div>
{/if}

<div class="workspace">
    
    <h3>
        <strong>Label Sample</strong>        
    </h3>
    
    <br>
    <br>
    <br>


    {#if unlabeledText.length > 0}
        {#each Object.keys(unlabeledText[0]) as key}
            {#if keysToIgnore.includes(key) == false}
                <h6>
                    <strong>{key.toUpperCase().replaceAll("_"," ")}</strong>
                </h6>
                <span>
                    {unlabeledText[0][key]}
                </span>
                <br>
                <br>
            {/if}
        {/each}

        <br>

        <div class="actions">
            <Button kind="tertiary" disabled={actionDisabled} on:click={() => label(unlabeledText[0].id,"Acceptable")}>Acceptable</Button>
            <Button kind="danger-tertiary" disabled={actionDisabled} on:click={() => label(unlabeledText[0].id,"Unacceptable")}>Unacceptable</Button>
            <Button kind="secondary" disabled={actionDisabled} on:click={() => label(unlabeledText[0].id,"Ignore")}>Ignore</Button>
        </div>


       
    {/if}


</div>

<style>
    .page-loading{
        position: absolute;
        top: -0.45rem;
        width: 100vw;
        z-index: 1000;
    }
    .workspace{
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 3rem);
        min-height: calc(100vh - 3rem);
        max-width: 100vw;
        padding: 2rem;
        overflow-y: auto;
    }
</style>