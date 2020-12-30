<template>
  <div>
    <div class="champCardHolder">
    <SkeletonScaffold primary="#cebe94" borderRadius="20px" animDisable>
      <div v-mCardImg>
        <img
          class="champCardImg"
          src="../assets/img/render/Falcon_render.png"
        />
      </div>
      <!-- Card Image -->
      <br />

      <div v-mBox v-mDark style="height: 1.5em; color: white;">
        Captain Falcon
      </div>
      <!-- Heading -->
      <div v-mBox v-mDark style="height: 1.5em"></div>
      <!-- Heading -->
      <div v-mBox style="height: 1.3em; width: 60%"></div>
      <!-- Sub-Heading -->
      <br />

      <!-- Content Boxes -->
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <br />

      <!-- Default Rectangular Button -->
      <div v-mButton></div>
    </SkeletonScaffold>
    </div>
    <div class="champCardHolder">
    <SkeletonScaffold primary="#cebe94" borderRadius="20px" animDisable>
      <div v-mCardImg>
        <img class="champCardImg" src="../assets/img/render/Mario_render.png" />
      </div>
      <!-- Card Image -->
      <br />

      <div v-mBox v-mDark style="height: 1.5em; color: white;">Mario</div>
      <!-- Heading -->
      <div v-mBox v-mDark style="height: 1.5em"></div>
      <!-- Heading -->
      <div v-mBox style="height: 1.3em; width: 60%"></div>
      <!-- Sub-Heading -->
      <br />

      <!-- Content Boxes -->
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <div v-mBox v-mLight v-mRandomWidth></div>
      <br />

      <!-- Default Rectangular Button -->
      <div v-mButton></div>
    </SkeletonScaffold>
  </div>
  </div>
</template>
