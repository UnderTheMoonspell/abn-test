<template>
  <TreeChart 
    :data="treeData"
    :width="500"
    :height="500" />
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
      jsonData: null
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
    this.jsonData = await apiService.get("test");
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
