<template>
  <span v-for="(block, index) in moduleContent">
    <span v-if="block.__component == 'associative-ontologies.normal-text-block'" v-html="block.text"></span>
    <span v-if="!block.expanded">
      <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" v-html="block.pre_button"></span>
      <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="expand(index)" v-html="block.button"></span>
      <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" v-html="block.post_button"></span>
    </span>
    <span v-else>
      <TextModule :handle="block.associative_ontologies_module.slug_handle"></TextModule>
      <span class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="foldBack(index)">¬</span>
    </span>
    <!-- <pre>{{ moduleContent }}</pre> -->
  </span>
</template>

<script setup>
  const { handle } = defineProps({
    handle: String,
  })

  const ao_modules = inject("ao_modules")

  // find the relevant module for this instance
  let module = ao_modules.filter((module) => {
    return module.slug_handle === handle
  })

  const moduleContent = ref([])
  if (module.length === 0) {
    console.log("no module found for handle " + handle)
  } else moduleContent.value = module[0].content

  const expand = (index) => {
    moduleContent.value[index].expanded = true
    console.log("coucou expand " + index)
  }

  const foldBack = (index) => {
    moduleContent.value[index].expanded = false
    console.log("coucou foldBack " + index)
  }
</script>
