<template>
  <span>{{ preTextNormal }}</span>
  <span v-if="!expanded">{{ pretransformed1 }}</span>
  <span v-if="!expanded" class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="expand">{{ buttonText }}</span>
  <span v-if="!expanded">{{ pretransformed2 }}</span>
  <span v-if="expanded">{{ postTransformed }}</span>
  <TextModule v-if="expanded" :handle="textHandle"></TextModule>
  <span v-if="expanded" class="text-blue-500 hover:bg-purple-500 hover:text-white cursor-pointer" @click="foldBack">¬</span>
  <span>{{ postTextNormal }}</span>
</template>

<script setup>
  const { handle } = defineProps({
    handle: String,
  })
  const expansionMap = inject("expansionMap")
  const preTextNormal = ref(expansionMap[handle])
  const expansionStruct = ref("")
  const pretransformed1 = ref("")
  const buttonText = ref("")
  const pretransformed2 = ref("")
  const postTransformed = ref("")
  const textHandle = ref("")
  const postTextNormal = ref("")

  const expanded = ref(false)

  /**
   * so we have the format "preTextNormal [pretransformed pt1 <buttonText> preTransformed pt2|postTransformed](handle) postTextNormal"
   * Which read preExtension : preTextNormal + pretransformed pt1 + buttonText + preTransformed pt2 + postTextNormal
   * And after extension : preTextNormal + postTransformed + postTextNormal
   */
  const regex = /(.*)\[(.*)<(.*)>(.*)\|(.*)\]\((.*)\)(.*)/
  const matches = expansionMap[handle].match(regex)
  if (matches) {
    ;[expansionStruct.value, preTextNormal.value, pretransformed1.value, buttonText.value, pretransformed2.value, postTransformed.value, textHandle.value, postTextNormal.value] = matches
    console.log("expansionStruct", expansionStruct.value)
    console.log("pretransformed1", pretransformed1.value)
    console.log("buttonText", buttonText.value)
    console.log("pretransformed2", pretransformed2.value)
    console.log("postTransformed", postTransformed.value)
    console.log("textHandle", textHandle.value)
    console.log("postTextNormal", postTextNormal.value)
  }

  const expand = () => {
    expanded.value = true
    console.log("coucou expand")
  }

  const foldBack = () => {
    expanded.value = false
    console.log("coucou foldBack")
  }
</script>
