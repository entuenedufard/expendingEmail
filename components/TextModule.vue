<template>
  <span v-for="block in moduleContent">
    <span v-if="block.__component == 'associative-ontologies.normal-text-block'">{{ block.text }}</span>
    <span v-if="block.__component == 'associative-ontologies.expandable-text-block'">{{ block.pre_button }}</span>
    <span v-if="block.__component == 'associative-ontologies.expandable-text-block'">{{ block.button }}</span>
    <span v-if="block.__component == 'associative-ontologies.expandable-text-block'">{{ block.post_button }}</span>
  </span>
  <!-- <span class="opacity-100" :class="{ 'duration-700': transitionValue, 'opacity-100': transitionValue }" v-for="(contentBit, index) in content">
    <span>{{ contentBit.whateverBefore }}</span>
    <span v-if="!contentBit.expanded">{{ contentBit.preTransformed1 }}</span>
    <span v-if="!contentBit.expanded" class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="expand(index)">{{ contentBit.buttonText }}</span>
    <span v-if="!contentBit.expanded">{{ contentBit.preTransformed2 }}</span>
    <TextModule class="opacity-50" v-if="contentBit.expanded" :handle="contentBit.textHandle"></TextModule>
    <span v-if="contentBit.expanded" class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="foldBack(index)">¬</span>
    <span>{{ contentBit.whateverAfter }}</span>
  </span> -->
  <pre>{{ moduleContent }}</pre>
</template>

<script setup>
  const { handle } = defineProps({
    handle: String,
  })
  console.log("handle", handle)
  const ao_modules = inject("ao_modules")
  let module = ao_modules.filter((module) => {
    return module.slug_handle === handle
  })
  let moduleContent = "no module found for handle " + handle
  if (module.length === 0) {
    console.log("no module found for handle " + handle)
  } else moduleContent = module[0].content

  /* const matchArray = ref([])
  const content = ref([])
  const transitionValue = ref(true) */

  /* const regex = /((?:.|\n)*?)\[\[(.*?)\<(.*?)\>(.*?)\|(.*?)\]\]/gm // matches  "whatever before [[preTextNormal <pretransformed1> buttonText|textHandle]]" multiple times (but not whatever after)
  const matches = expansionMap[handle].matchAll(regex)
  const lastBitRegex = /(?:(?:.|\n)*)\]\](.*)/m // matches "whatever after", just for the last match
  const lastBitMatches = expansionMap[handle].match(lastBitRegex) */

  /* matchArray.value = Array.from(matches)
  if (matchArray.value.length === 0) {
    content.value.push({
      whateverBefore: expansionMap[handle],
      preTransformed1: "",
      buttonText: "",
      preTransformed2: "",
      textHandle: "",
      whateverAfter: "",
      expanded: false,
    })
  } */
  /* matchArray.value.forEach((match, index) => {
    content.value.push({
      whateverBefore: match[1],
      preTransformed1: match[2],
      buttonText: match[3],
      preTransformed2: match[4],
      textHandle: match[5],
      whateverAfter: "",
      expanded: false,
    })
    if (index === matchArray.value.length - 1) {
      content.value[index].whateverAfter = lastBitMatches[1]
    }
    //console.log("match " + index, match)
    //console.log("match[2]", match[2])
  }) */

  /* const expand = (index) => {
    content.value[index].expanded = true
    console.log("coucou expand " + index)
  }

  const foldBack = (index) => {
    content.value[index].expanded = false
    console.log("coucou foldBack " + index)
  } */
</script>
