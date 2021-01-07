<template>
  <div 
    class="app"
    :class="{ collapsed: collapsed }">
    <div class="container mt-5">
      <router-view></router-view>
    </div>
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      v-click-outside="handleFocusOut"
      @toggle-collapse="onToggleCollapse"
    >
      <span slot="header">
        <div class="vsm--item">
          <router-link class="vsm--link" to="/"
            ><img
              class="vsm--title"
              :src="require('./assets/logo.svg')"
          />
          </router-link>
        </div>
        <div class="locale-changer">
          <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang"
              >{{ lang }}
            </option>
          </select>
        </div>
      </span>
    </sidebar-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: ["en", "fr"],
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleFocusOut() {
      this.collapsed = true;
    },
    onToggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
  computed: {
    menu() {
      return [
        {
          href: "",
          title: "VOD Finder",
          icon: "far fa-play-circle",
          child: [
            {
              href: "/list",
              title: "VOD By Character / Matchup",
            },
            {
              href: "/tierlist",
              title: "VOD By Players",
            },
            {
              href: "/framedata",
              title: "VOD By Tournaments",
            },
            {
              href: "/guides",
              title: "Guides",
            },
          ],
        },
        {
          href: "/framedata",
          title: "FrameData",
          icon: "fas fa-sort-amount-up-alt",
        },
        {
          href: "/tierlist",
          title: "TierList",
          icon: "fas fa-th-list",
        },
        {
          href: "/tierlist",
          title: this.$t("menu.upcommingevents"),
          icon: "fas fa-th-list",
        },
        {
          href: "/tierlist",
          title: "Patchnotes",
          icon: "fas fa-th-list",
        },
                {
          href: "/add-match",
          title: "Add Matches",
          icon: "fas fa-th-list",
        },
                        {
          href: "/view-matches",
          title: "View Matches",
          icon: "fas fa-th-list",
        },
      ];
    },
  },
};
</script>
