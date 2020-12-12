<template>
  <div class="container">
    <div
      v-if="selected.data && selected.data.name"
      class="selected-node"
      @click="deselectNode"
    >
      <span>
        Name: {{ selected.data.name }} 
      </span>
      <span>
        Description: {{ selected.data.description }}
      </span>
      <span class="close-button">x</span>
    </div>
    <div id="treeContainer"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import Utils from "@/services/utils";

export default {
  name: "TreeChart",
  props: {
    data: {
      type: Array,
      default: [],
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      selected: {},
    };
  },
  watch: {
    data () {
      this.renderFunction()
    },
    width () {
      this.renderFunction()
    },
    height () {
      this.renderFunction()
    },
  },
  mounted () {
    this.margin = { top: 40, right: 90, bottom: 50, left: 90 };
    this.renderFunction = Utils.debounce(this.renderTree, 500);

    window.addEventListener('resize', this.renderFunction)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.renderFunction)
  },
  methods: {
    renderTree () {
      let _self = this;
      
      _self.svg && _self.svg.remove();

      _self.treemap = d3
        .tree()
        .size([
          _self.height - _self.margin.top - _self.margin.bottom,
          _self.width - _self.margin.left - _self.margin.right,
        ]);

      _self.svg = d3
        .select("#treeContainer")
        .append("svg")
        .attr("width", _self.width)
        .attr("height", _self.height);

      _self.g = _self.svg
        .append("g")
        .attr("transform", `translate(${_self.margin.left},${_self.margin.top})`);
        
      let nodes = d3.hierarchy(_self.data[0]);
      nodes = _self.treemap(nodes);

      _self.g
        .selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function (d) {
          return `M${
            d.x
          },${d.y}C${d.x},${(d.y + d.parent.y) / 2} 
          ${d.parent.x},${(d.y + d.parent.y) / 2} 
          ${d.parent.x},${d.parent.y}`;
        });

      _self.nodes = _self.g
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr("class", function (d) {
          return `node${d.children ? " node--internal" : " node--leaf"}`;
        })
        .attr("transform", function (d) {
          return `translate(${d.x},${d.y})`;
        });

      _self.nodes
        .append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("x", function () {
          return -15;
        })
        .attr("y", function () {
          return -20;
        })
        .on("click", function (d, node) {
          _self.selectNode(d3.select(this), node);
        });

      _self.nodes
        .append("text")
        .attr("y", function () {
          return -5;
        })
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.data.name;
        })
        .on("click", function (d, node) {
          _self.selectNode(d3.select(this.previousSibling), node);
        });
    },
    selectNode (el, node) {
      this.selected = { data: node.data, node: el };
      this.nodes.selectAll("rect").classed("selected", false);
      el.classed("selected", true);
    },
    deselectNode () {
      this.selected.node.classed("selected", false);
      this.selected = {};
    },
  }
};
</script>

<style lang="scss">
$abn-green: #006361;

.container {
  text-align: left;
}

.selected-node {
  position: relative;
  cursor: default;
  border: 1px solid $abn-green;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  display: inline-block;
  span {
    display: block;
  }

  &:hover .close-button {
    display: inline-block;
  }

  .close-button {
    position: absolute;
    display: none;
    top: 3px;
    right: 10px;
    font-weight: 800;
    cursor: pointer;
  }
}

.node {
  rect {
    fill: #fff;
    stroke: $abn-green;
    stroke-width: 3px;
    cursor: pointer;

    &.selected {
      transform: scale(1);
      animation: pulse 2s infinite;
    }
  }

  text {
    cursor: pointer;
  }
}

.node text {
  font: 12px sans-serif;
}

.node--internal text {
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(0.95);
  }
}
</style>
