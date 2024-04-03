<template>
  <div class="container">
    <div class="head"></div>
    <div class="main">
      <div class="charts">
        <div id="main" ref="chart" style="width: 600px; height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      let myCharts = echarts.init(this.$refs.chart);
      myCharts.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(205, 148, 83, 0.2)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>