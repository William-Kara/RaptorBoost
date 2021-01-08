<template>
  <!--   <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <li v-for="vod in Vods" :key="vod.key">
          <p>{{ vod.title }}</p>
          <p>{{ vod.youtube_link }}</p>
          <p>{{ vod.player_1 }}</p>
          <p>{{ vod.character_1 }}</p>
          <p>{{ vod.player_2 }}</p>
          <p>{{ vod.character_2 }}</p>
          <p>{{ vod.version }}</p>
          <p>{{ vod.tournament }}</p>

          <button @click.prevent="deleteVod(vod.key)" class="btn btn-danger">
            Delete
          </button>

        </li>
      </table>
    </div>
  </div> -->

  <div class="match-row">
    <table class="table table-striped">
      <li v-for="vod in Vods" :key="vod.key">
        <b-button v-b-toggle.collapse-1 variant="light">
          <div align-center class="mt-5">
            <div>
              <div class="cutoff">
                {{ vod.title }}
              </div>
              <div class="cutoff">
                02/03/2021 | {{ vod.version }} | {{ vod.tournament }}
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
                    {{ vod.player_1 }}
                  </div>
                  <div>
                    {{ vod.character_1 }}
                    <!--                 <v-avatar size="36px">
                  <img src="../assets/img/champs/Aatrox.png" />
                </v-avatar> -->
                  </div>
                  <div class="ma-1">vs</div>
                  <div>
                    {{ vod.character_2 }}
                    <!--                 <v-avatar size="36px">
                  <img src="../assets/img/champs/Aatrox.png" />
                </v-avatar> -->
                  </div>
                  <div class="ma-1">
                    {{ vod.player_2 }}
                  </div>
                </div>
                <CollapsibleVideo videoId="EM2JL7iqdCY"/>
              </div>
            </div>
          </div>
        </b-button>
      </li>
    </table>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import CollapsibleVideo from "./CollapsibleVideo"

export default {
  components: {
    CollapsibleVideo
  },
  data() {
    return {
      Vods: [],
      consecutiveMatch: false
    };
  },
  created() {
    db.collection("vods").onSnapshot((snapshotChange) => {
      this.Vods = [];
      snapshotChange.forEach((doc) => {
        this.Vods.push({
          key: doc.id,
          title: doc.data().title,
          youtube_link: doc.data().youtube_link,
          player_1: doc.data().player_1,
          character_1: doc.data().character_1,
          player_2: doc.data().player_2,
          character_2: doc.data().character_2,
          version: doc.data().version,
          tournament: doc.data().tournament,
        });
      });
    });
  },
  methods: {
    deleteVod(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("vods")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
