<template>
  <div class="scroll-container" id="scroll-container">
    <!-- banner -->
    <div class="scroll-area special-div" id="banner">
      <div class="home-banner">
        <video class="black-video"
          controls preload="auto"
          autoplay loop muted plays-inline playsinline>
          <source src="@/assets/media/moto.mp4" type="video/mp4">
        </video>
        <div class="box">
          <router-link :to="{ name: '所有產品' }">
            所有車款
            <i class="bi bi-arrow-right"></i>
          </router-link>
          <div class="scroll-icon">
            <span class="wheel"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- activity -->
    <div class="scroll-area" id="activity">
      <div class="home-activity">
        <div class="text">
          <h3>2023 全球 H.O.G. 大會師</h3>
          <p>H.O.G. 活動是關於騎到目的地、騎回家，以及路途中的所有事物。</p>
          <a href="#/article/-NcGq-i8_bwwkEsucyVM">瞭解更多</a>
        </div>
      </div>
    </div>
  </div>
</template>
