<template>
  <div class="match-row">
    <b-button v-b-toggle.collapse-1 variant="light">
      <div align-center class="mt-5" v-if="!consecutiveMatch">
        <div>
          <div class="cutoff">
            INSANE FINAL IEM
          </div>
          <div class="cutoff">
            02/03/2021 | BETA | CANAP GAMING
          </div>
        </div>
      </div>
      <v-divider class="my-1" v-if="consecutiveMatch" />
      <div align-center>
        <div xs1 class="mr-3 hidden-xs-only" />
        <div class="pr-2 hidden-sm-and-up" />
        <div :column="$vuetify.breakpoint.xsOnly">
          <div xs6>
            <div row align-center>
              <div class="ma-1">
                K!nge
              </div>
              <div>
                <v-avatar size="36px">
                  <img src="../assets/img/champs/Aatrox.png" />
                </v-avatar>
              </div>
              <div class="ma-1">vs</div>
              <div>
                <v-avatar size="36px">
                  <img src="../assets/img/champs/Aatrox.png" />
                </v-avatar>
              </div>
              <div class="ma-1">
                K!nge
              </div>
            </div>
          </div>
        </div>
      </div>
      <CollapsibleVideo videoId='oPPPGI-s9Is'/>
    </b-button>
  </div>
</template>

<script>

import CollapsibleVideo from './CollapsibleVideo'

export default {
  name: "MatchRow",
  components: {
    CollapsibleVideo
  },
  props: {
    channel: Object,
    date: String,
    players: Array,
    timestamp: String,
    title: String,
    version: String,
    videoId: String,
    consecutiveMatch: Boolean,
  },

};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: inherit;
}
.cutoff {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
