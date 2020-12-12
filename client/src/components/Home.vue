<template>
  <div>
    <h1>Tree Chart</h1>
    <div v-if="errorMsg" class="error">{{errorMsg}}</div>
    <TreeChart 
      :data="treeData"
      :width="500"
      :height="500" />
  </div>
</template>

<script>
import { apiService } from "@/services/api.service";
import TreeChart from '@/components/TreeChart'

export default {
  name: "Home",
  components: {
    TreeChart
  },
  data () {
    return {
      jsonData: null,
      errorMsg: null
    };
  },
  computed: {
    treeData () {
      if (this.jsonData) {
        if (this.jsonData) {
          const inputArray = this.jsonData.data.slice()
          const tempMap = {}
          inputArray.forEach(item => tempMap[item.name] = {...item, children: []});
          const treeData = [];
          inputArray.forEach(item => {
            if (item.parent) {
              tempMap[item.parent].children.push(tempMap[item.name])
            } else {
              treeData.push(tempMap[item.name])
            }
          });
          return treeData;
        }
      }
      return []
    }
  },
  async created () {
    try {
      this.jsonData = await apiService.get("test");
    } catch (ex) {
      this.errorMsg = 'Internal server error. Check if server is running'
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
