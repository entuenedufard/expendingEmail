<template>
  <span>
    <span v-for="(block, index) in moduleContent">
      <span v-if="block.__component == 'associative-ontologies.normal-text-block'" v-html="block.text"></span>
      <span v-if="!block.expanded">
        <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" v-html="block.pre_button"></span>
        <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" class="bg-gray-300 hover:bg-gray-400 px-1 py-0.5 cursor-pointer" @click="expand(index)" v-html="block.button"></span>
        <span v-if="block.__component == 'associative-ontologies.expandable-text-block'" v-html="block.post_button"></span>
      </span>
      <transition enter-active-class="duration-[4000ms]" enter-from-class="bg-yellow-300/100" enter-to-class="bg-yellow-300/0">
        <span v-if="block.expanded" :class="{ 'bg-purple-300': foldbackHover[index] }">
          <TextModule :handle="block.associative_ontologies_module.slug_handle"></TextModule>
          <span class="text-blue-500 hover:bg-purple-300 hover:text-white cursor-pointer" @click="foldBack(index)" @mouseover="foldbackHover[index] = true" @mouseleave="foldbackHover[index] = false">
            <img src="/foldback.png" class="inline h-6" alt="" />
          </span>
        </span>
      </transition>
      <!-- <pre>{{ moduleContent }}</pre> -->
    </span>
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

  const foldbackHover = ref([])
  for (let i = 0; i < moduleContent.value.length; i++) {
    foldbackHover.value[i] = false
  }

  const expand = (index) => {
    moduleContent.value[index].expanded = true
    console.log("coucou expand " + index)
  }

  const foldBack = (index) => {
    moduleContent.value[index].expanded = false
    foldbackHover.value[index] = false
    console.log("coucou foldBack " + index)
  }
</script>
