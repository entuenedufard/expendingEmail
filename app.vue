<template>
  <div>
    <div class="max-w-4xl p-10 pt-16 mx-auto">
      <p><TextModule handle="initial-block"></TextModule></p>
      <!-- <pre>{{ ao_modules }}</pre> -->
    </div>
  </div>
</template>

<script setup>
  const runtimeConfig = useRuntimeConfig()
  const apiBaseUrl = runtimeConfig.public.apiBaseUrl

  import * as qs from "qs"

  //build qs query to populate associative ontologies modules
  const querySlug = qs.stringify(
    {
      populate: {
        content: {
          populate: ["associative_ontologies_module", "associative_ontologies_module.mqsdljk"], // I still don't understand but I have to put a .wtf for it to work
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const { data: ao_modules } = await useFetch(`${apiBaseUrl}/api/associative-ontologies?populate=${querySlug}`, {
    transform: (rawValue) => {
      rawValue.data.forEach((module, moduleIndex) => {
        // add an expandable property set to false to each expandable-text-block
        // and replacing \n by </br> in every text block (or if null, replacing null in every text block by "")
        module.content.forEach((block, blockIndex) => {
          if (block.__component == "associative-ontologies.expandable-text-block") {
            rawValue.data[moduleIndex].content[blockIndex].pre_button = block.pre_button ? block.pre_button.replaceAll("\n", "</br>") : ""
            rawValue.data[moduleIndex].content[blockIndex].button = block.button ? block.button.replaceAll("\n", "</br>") : ""
            rawValue.data[moduleIndex].content[blockIndex].post_button = block.post_button ? block.post_button.replaceAll("\n", "</br>") : ""
            rawValue.data[moduleIndex].content[blockIndex].expanded = false
            console.log("block yola", block)
          }
          if (block.__component == "associative-ontologies.normal-text-block") {
            rawValue.data[moduleIndex].content[blockIndex].text = block.text ? block.text.replaceAll("\n", "</br>") : ""
          }
        })
      })
      return rawValue.data
    },
  })
  provide("ao_modules", ao_modules._rawValue)
</script>
