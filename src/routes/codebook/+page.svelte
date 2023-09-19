<script>
    import { username } from "../../stores";
    import { ProgressBar } from "carbon-components-svelte";
    import {
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
    } from "carbon-components-svelte";
	import { api } from "../../lib/api/api";

    let codebook = null;

    let isPageLoading = true;
    let loggedInUsername = "";

    $: if($username != "" && loggedInUsername == ""){
        api.GetCodeBook().then((data) => {
            codebook = data;
            loggedInUsername = $username;
        });
        isPageLoading = false;
    }


</script>


{#if isPageLoading}
    <div class="page-loading">
        <ProgressBar size="sm"/>
    </div>
{/if}

<div class="workspace">
    
{#if codebook != null || codebook != undefined}

<h3>
    <strong>
        {codebook.title}
    </strong>
</h3>
<br>
<br>

<h4>
    {@html codebook.description}
</h4>

<br>
<br>
<br>

<h4>
    <strong>
        {codebook.tableTitle}
    </strong>
</h4>
<StructuredList>
    <StructuredListHead>
        <StructuredListRow>
            {#each codebook.tableColumns as tableColumn}
                <StructuredListCell head>{tableColumn}</StructuredListCell>
            {/each}
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each codebook.tableData as table}

            <StructuredListRow>
                {#each codebook.tableColumns as tableColumn}
                    <StructuredListCell>{@html table[tableColumn.toLowerCase()]}</StructuredListCell>
                {/each}
            </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
<h4>
     <strong>
        {codebook.ppExampleTitle}
     </strong> 
</h4>
<StructuredList>
    <StructuredListHead>
        <StructuredListRow>
            {#each codebook.exampleColumns as exampleColumn}
                <StructuredListCell head>{exampleColumn}</StructuredListCell>
            {/each}
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each codebook.ppExamples as ppExample}

            <StructuredListRow>
                {#each codebook.exampleColumns as exampleColumn}
                    <StructuredListCell>{@html ppExample[exampleColumn.toLowerCase()]}</StructuredListCell>
                {/each}
            </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
<h4>
    <strong>
       {codebook.tcExampleTitle}
    </strong> 
</h4>
<StructuredList>
   <StructuredListHead>
       <StructuredListRow>
           {#each codebook.exampleColumns as exampleColumn}
               <StructuredListCell head>{exampleColumn}</StructuredListCell>
           {/each}
       </StructuredListRow>
   </StructuredListHead>
   <StructuredListBody>
       {#each codebook.tcExamples as tcExample}

           <StructuredListRow>
               {#each codebook.exampleColumns as exampleColumn}
                   <StructuredListCell>{@html tcExample[exampleColumn.toLowerCase()]}</StructuredListCell>
               {/each}
           </StructuredListRow>
       {/each}
   </StructuredListBody>
</StructuredList>
{/if}

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

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