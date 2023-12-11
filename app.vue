<template>
  <div>
    <div class="max-w-4xl p-10 pt-16 mx-auto">
      <!-- <TextModule handle="text1"></TextModule > -->
      <pre>{{ ao_modules }}</pre>
    </div>
  </div>
</template>

<script setup>
  /**
   * so we have the format "preTextNormal [pretransformed pt1 <buttonText> preTransformed pt2|postTransformed](handle) postTextNormal"
   * Which read preExtension : preTextNormal + pretransformed pt1 + buttonText + preTransformed pt2 + postTextNormal
   * And after extension : preTextNormal + postTransformed + postTextNormal
   * en fait let's do [[preTr1 <buttonText> preTr2|handle]]
   */
  const expansionMap = {
    text1: `Si vous êtes dans une journée dans lesquels les détours sont autorisés, et si de surcroît ça pique votre curiosité, vous pouvez aller observer [[<le very moment>|very_moment]] où cette métaphore a surgit des bois pour venir me ravir de de sa savoureuse et croustillante composition dans cette fitéo ([[<accent alsacien>|accent_alsacien]])`,
    very_moment: `le very moment (c'est quand même truculent cette façon dont les anglophones utilisent l'adverbe "very" pour dire "le moment précis, le moment même", imaginez si on disait "le très moment"), bref donc je disais, le very moment`,
    accent_alsacien: `ah oui je prends beaucoup de plaisir en ce moment à jouer inopinément au jeu de parler avec l'accent alsacien, il faut peut-être le savoir pour ne pas être trop déconcerté·e. [[J'ai <une petite liste> ici si ça vous intéresse|liste_accent_alsacien]]`,
    liste_accent_alsacien: `Il fa falloir chancher la pouteille te kas. 
Ékoute, çut, che te l'ai técha tit au moins touçe fois !
Che fais téforer ce papa au rhum.
Che rekarte ça au plus fite et che refiens fers fous.`,
  }

  provide("expansionMap", expansionMap)

  const runtimeConfig = useRuntimeConfig()
  const apiBaseUrl = runtimeConfig.public.apiBaseUrl

  import * as qs from "qs"

  //build qs query to filter projects with slug
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
      return rawValue.data
    },
  })
</script>
