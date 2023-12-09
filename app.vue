<template>
  <div>
    <div>
      <p>Coucou ça c'est <span class="text-blue-500 hover:bg-purple-500 hover:text-white" @click="expand">le texte</span> initial</p>
      <p>Coucou ça c'est <TextModule handle="text1"></TextModule></p>
    </div>
  </div>
</template>

<script setup>
  const expansionMap = {
    text1: "alors attends voir [pretransformed pt1 <buttonText> ptpt2|postTransformed](text2) ah oui et donc y'a aussi la suite",
    text2: "Coucou ça c'est le texte2",
  }

  provide("expansionMap", expansionMap)

  const expand = () => {
    console.log("coucou")
  }
</script>
