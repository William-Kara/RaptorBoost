<template>
    <b-collapse 
        id="collapse-1" 
        @hide="elementIsHiding"
        @show="elementIsShowing"
    >
        <b-card>
        <div class="text-xs-right youtube-holder" xs1>
            <youtube
            :video-id="videoId"
            @ready="videoReady"
            @playing="videoPlaying"
            @paused="videoPaused"
            ></youtube>
        </div>
        </b-card>
    </b-collapse>
</template>

<script>

export default {
  name: "CollapsibleVideo",
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
}
</script>
