import { LineChart, AreaChart, ScatterChart } from 'vego-d3';
import UChartShell from '../u-chart-shell.vue';

export const ULineChart = {
    name: 'u-line-chart',
    extends: UChartShell,
    props: {
        xAxis: {
            type: Object,
            default: () => ({}),
        }, // 绘制X轴需要传入的数据，属性key的值为data数组中对象的某个属性，依据此值来绘制X轴的刻度尺
        yAxis: {
            type: Object,
            default: () => ({}),
        }, // 绘制Y轴需要传入的数据，属性min，max表示Y轴的最大值和最小值，count表示Y轴最小值和最大值之间分成几段，默认值为8
        // 线段是否采用平滑方式绘制
        smooth: Boolean,
        // 线段和X轴之间否填充
        fill: Boolean,
        // 简单散点图
        scatter: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            chart: null,
            target: null,
        };
    },
    computed: {
        seriesLength() {
            return this.data.length;
        },
        tooltipLocation() {
            const {
                target,
                targetPositions,
            } = this.target;
            const p = Math.min(...targetPositions.y);
            const directionX = target.i >= (this.seriesLength / 2);
            const directionY = p / this.canvaswrapper.canvasHeight < 0.5;
            return {
                x: targetPositions.x,
                y: p - this.canvaswrapper.canvasHeight,
                directionX,
                directionY,
            };
        },
        tooltipRole() {
            if (!this.target)
                return '';
            const {
                directionX,
                directionY,
            } = this.tooltipLocation;
            return `u-tooltip-${(directionX ? 'left' : 'right')}-${directionY ? 'top' : 'bottom'}`;
        },
        tooltipStyle() {
            if (!this.target)
                return '';
            const {
                x, y,
            } = this.tooltipLocation;
            return {
                transform: `translate(${x}px, ${y}px)`,
            };
        },
    },
    watch: {
        canvaswrapper() {
            this.reset();
        },
        showSeries(val) {
            this.chart.reRender({ chosen: val });
        },
    },
    methods: {
        reset() {
            const {
                series,
                data,
                yAxis,
                xAxis,
            } = this;
            if (!this.chart) {
                // eslint-disable-next-line
                const Construct = this.scatter ? ScatterChart : (this.fill ? AreaChart : LineChart);
                this.chart = new Construct(this.$refs.canvasWrapper, {
                    keys: series,
                    data,
                    padding: {
                        left: 50,
                        right: 50,
                        top: 20,
                        bottom: 50,
                    },
                    smooth: this.smooth,
                    yAxis,
                    xAxis,
                    onIndicatorChange: this.onIndicatorChange,
                });
                this.chart.render({});
            } else {
                this.chart.resize({});
            }
        },
        onIndicatorChange(meta) {
            const popperComponent = this.$refs.chartpopper;
            if (meta) {
                this.target = meta;
                popperComponent.open();
            } else {
                this.target = null;
                popperComponent.close();
            }
        },
    },
};

export default ULineChart;
