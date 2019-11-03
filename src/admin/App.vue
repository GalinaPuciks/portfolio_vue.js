<template lang="pug">
.root-wrapper
  vc-header
  vc-tabs

  .page__wrapper
    router-view
  
</template>

<script>

import Header from './components/header/header';
import Tabs from './components/tabs/tabs';
  export default {
    components: {
vcHeader:Header,
vcTabs: Tabs,
    }  
  }
</script>

<style lang="postcss">
  @import  "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base";
  @import "./main-styles/mainStyles";


  
</style>





