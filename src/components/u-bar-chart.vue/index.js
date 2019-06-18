import { StackChart } from 'vego-d3';
import UChartShell from '../u-chart-shell.vue';

export const UBarChart = {
    name: 'u-bar-chart',
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
        stack: [String, Boolean],
        // trigger: {
        //     type: String,
        //     default: 'hover',
        // },
        gapSize: {
            type: String,
            default: 'normal',
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
                x: directionX ? targetPositions.xl : targetPositions.xr,
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
            // this.chart.reRender({ chosen: val });
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
                this.chart = new StackChart(this.$refs.canvasWrapper, {
                    keys: series,
                    data,
                    padding: {
                        left: 30,
                        right: 20,
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

export default UBarChart;
