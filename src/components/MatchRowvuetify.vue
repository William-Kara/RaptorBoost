<template>
<div>
  <v-layout class="pa-3" column>
    <v-layout align-center class="mt-5" v-if="!consecutiveMatch">
      <v-layout column>
        <v-flex class="cutoff">
          INSANE FINAL IEM
        </v-flex>
        <v-flex class="cutoff">
          02/03/2021 | BETA | CANAP GAMING
        </v-flex>
      </v-layout>
    </v-layout>
    <v-divider class="my-1" v-if="consecutiveMatch" />
    <v-layout align-center>
      <v-flex xs1 class="mr-3 hidden-xs-only" />
      <div class="pr-2 hidden-sm-and-up" />
      <v-layout :column="$vuetify.breakpoint.xsOnly">
        <v-flex xs6>
          <v-layout row align-center>
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
          </v-layout>
                <v-flex class="text-xs-right" xs1>
        <youtube
          :video-id="'EM2JL7iqdCY'"
          @ready="ready"
          @playing="playing"
        ></youtube>
      </v-flex>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
</div>
</template>

<script>
export default {
  name: "MatchRow",
  props: {
    channel: Object,
    date: String,
    players: Array,
    timestamp: String,
    title: String,
    version: String,
    video: String,
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
