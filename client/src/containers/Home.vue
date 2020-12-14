<template>
  <div>
    <h1>Tree Chart</h1>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <TreeChart :data="treeData" :width="500" :height="500" />
  </div>
</template>

<script>
import { apiService } from "@/services/api.service";
import TreeChart from "@/components/TreeChart";
import Utils from "@/services/utils";

export default {
  name: "Home",
  components: {
    TreeChart,
  },
  data () {
    return {
      jsonData: null,
      errorMsg: null,
    };
  },
  computed: {
    treeData () {
      return this.jsonData ? Utils.buildTreeData(this.jsonData.data, "parent") : []
    },
  },
  async created () {
    try {
      this.jsonData = await apiService.get("test");
    } catch (ex) {
      this.errorMsg = "Internal server error. Check if server is running";
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
