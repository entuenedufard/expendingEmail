<template>
  <div>
    <div class="max-w-4xl p-10 pt-16 mx-auto">
      <TextModule handle="text1"></TextModule >
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

  const expand = () => {
    console.log("coucou")
  }

  /* const testString = "partie un [[extrait 1 pre <link1> extrait 1 post|handle1]] partie deux [[extrait 2 pre <link2> extrait 2 post|handle2]] partie trois"
  const regex = /\[\[(.*?)\<(.*?)\>(.*?)\|(.*?)\]\]/g
  const matches = testString.matchAll(regex)
  let matchArray = Array.from(matches)
  for (let match of matches){
    console.log("match", match)
    //matchArray.value[index] = match
  }
  matchArray.forEach((match, index) => {
    console.log("match "+index, match)
  }) */
  //console.log("matchArray", matchArray)
</script>
