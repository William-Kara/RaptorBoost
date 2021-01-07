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

            <b-collapse 
              id="collapse-1" 
              class="mt-2"
              @hide="elementIsHiding"
              @show="elementIsShowing"
            >
              <b-card>
                <div class="text-xs-right" xs1>
                  <youtube
                    :video-id="'EM2JL7iqdCY'"
                    @ready="videoReady"
                    @playing="videoPlaying"
                    @paused="videoPaused"
                  ></youtube>
                </div>
              </b-card>
            </b-collapse>
          </div>
        </div>
      </div>
    </b-button>
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
    videoId: String,
    consecutiveMatch: Boolean,
  },
  data: function () {
    return {
      video: null,
      videoIsPlaying: false,
      videoIsPaused: false,
    }
  },
  methods: { 
    elementIsHiding : function (){
      console.log("element is hiding")
      if(this.video && this.videoIsPlaying){
        this.video.pauseVideo()
      }
    },
    elementIsShowing : function () {
      console.log("element is showing")
      console.log(this.videoIsPlaying, this.videoIsPaused)
      if(!this.videoIsPlaying && this.videoIsPaused){
        console.log("can play video")
        this.video.playVideo()
      }
    },
    videoReady: function (e) {
      this.video = e.target;
    },
    videoPlaying: function(e) {
      console.log(e)
      console.log("video start playing")
      this.videoIsPlaying = true
      this.videoIsPaused = false
    },
    videoPaused(){
      console.log("video is paused")
      this.videoIsPaused = true
      this.videoIsPlaying = false
    }
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
