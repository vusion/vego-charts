import { colorsDark } from 'vego-d3';
export const UChartShell = {
    // components: {
    //     [ChartTooltip.name]: ChartTooltip,
    // },
    name: 'u-chart-shell',
    props: {
        // 图表需要显示的数据
        data: Array,
        // 图表的标题
        title: String,
        // 图表的描述
        caption: String,
        // 传入绘制每条线的数据，数组中对象的属性key对象data数组中对象某个属性，hidden属性表示默认隐藏此选段，absent表示不显示此选段，默认作为tooltip显示的数据内容
        series: Array,
        // 是否有表框
        border: Boolean,
        // X轴下方是否显示每条线段对应的标签，当值是'always'的时候，legend始终显示
        legend: [Boolean, String],
        // 图表的宽度
        width: {
            type: String,
            default: '100%',
        },
        // 图表的高度
        height: {
            type: String,
            default: '480px',
        },
        colors: Array,
        // 图表标题的对齐方式，默认是居中，值有:left,center,right
        titleAlign: { type: String, default: 'center' },
        // true表示正在加载中，false表示加载完成
        loading: { type: Boolean, default: false },
        contentStyle: Object,

    },
    data() {
        return {
            canvaswrapper: null,
            seriesOnShow: this.series.slice(1).map((sery) => ({ sery, hidden: false })),
            showSeries: this.series.slice(1).map((_, idx) => idx),
            legendColors: colorsDark.map((s) => s.stroke),
            popperOptions: {
                modifiers: {
                    flip: {
                        enabled: false,
                    },
                },
            },
        };
    },
    mounted() {
        this.resetCanvasBoundingSlef = this.resetCanvasBounding.bind(this);
        this.resetCanvasBounding();
        window.addEventListener('resize', this.resetCanvasBoundingSlef);
        // getComputedStyle(document.documentElement)
        //     .getPropertyValue('--my-variable-name'); // #999999
    },
    destroyed() {
        window.removeEventListener('resize', this.resetCanvasBoundingSlef);
    },
    methods: {
        toggle(index) {
            this.seriesOnShow[index].hidden = !this.seriesOnShow[index].hidden;
            this.showSeries = this.seriesOnShow.reduce((accu, item, idx) => {
                if (!item.hidden)
                    accu.push(idx);
                return accu;
            }, []);
        },
        resetCanvasBounding() {
            const {
                width, height,
            } = this.$refs.canvasWrapper.getBoundingClientRect();
            this.canvaswrapper = {
                canvasWidth: width,
                canvasHeight: height,
                spaceXRange: [40, width],
                spaceYRange: [height - 30, 30],
                spaceYSpan: height - 30 - 30,
                spaceXSpan: width - 40,
            };
        },
    },
};

export default UChartShell;
