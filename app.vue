<template>
  <div>
    <div class="max-w-4xl p-10 pt-16 mx-auto">
      <TextModule handle="initial-block"></TextModule>
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
        console.log("module yo", module.title)
        module.content.forEach((block, blockIndex) => {
          console.log("block", block)
          if (block.__component == "associative-ontologies.expandable-text-block") {
            console.log("moduleIndex", moduleIndex)
            console.log("blockIndex", blockIndex)
            rawValue.data[moduleIndex].content[blockIndex].expanded = false
          }
        })
      })
      return rawValue.data
    },
  })
  provide("ao_modules", ao_modules._rawValue)
</script>
