<template>
  <body>
    <div>
      
      <nav class="navbar justify-content-between flex-nowrap flex-row">
        <div class="container">
          <div>
        <img
          :src="require('./assets/logo.svg')"
          width="150px"
        />
          <a class="navbar-brand float-left">RAPTORBOOST</a> 
          </div>

      

          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
              <router-link class="nav-link pr-4" to="/">Trouver</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-4" to="/list"
                >Liste de VOD</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-4" to="/add">Ajouter</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-4" to="/framedata"
                >FrameData</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-4" to="/tierlist"
                >TierList</router-link
              >
            </li>
            <li class="nav-item">
              <div class="locale-changer">
                <select v-model="$i18n.locale">
                  <option
                    v-for="(lang, i) in langs"
                    :key="`Lang${i}`"
                    :value="lang"
                    >{{ lang }}
                    </option>
                </select>
                <i class="fas fa-globe"></i>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container mt-5">
        <router-view></router-view>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return { langs: ["en", "fr"] };
  },
};
</script>



