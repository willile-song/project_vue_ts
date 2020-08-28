<template>
    <v-chart :options="options" />
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
    width: 100%;
    height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';

export default {
    props: ['echarts'],
    components: {
        'v-chart': ECharts
    },
    data() {
        return {
            options: {
                title: {
                    text: '用印统计表'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                },
                legend: {
                    data: this.echarts.options,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    top: '3%',
                    left: 0,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        // data: this.echarts.ELECTRONIC?.date,    // 服务器问题，已经可以请求到数据，数据处理完成，这里为显示，直接使用服务器请求到的数据
                        data: this.echarts.ELECTRONIC?.date || ["2020-03", "2020-04", "2020-05", "2020-06", "2020-07", "2020-08"],
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '物理用印',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: this.echarts.PHYSICS?.all || [1, 377, 83, 49, 131, 164],
                        // data: [12,322,543,765,867,79],
                        color: '#2bb353'
                    },
                    {
                        name: '电子用印',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: this.echarts.ELECTRONIC?.all || [145, 1745, 4752, 2025, 4399, 1729],
                        color: '#2489f3',  
                    }
                ]
            }
        };
    },
};
</script>