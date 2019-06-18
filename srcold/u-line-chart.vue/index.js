function omit(arr, key) {
    return arr.map((r) => r[key]);
}
export const ULineChart = {
    name: 'u-line-chart',
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
        xAxis: Object, // 绘制X轴需要传入的数据，属性key的值为data数组中对象的某个属性，依据此值来绘制X轴的刻度尺
        yAxis: Object, // 绘制Y轴需要传入的数据，属性min，max表示Y轴的最大值和最小值，count表示Y轴最小值和最大值之间分成几段，默认值为8
        // // 线段是否采用平滑方式绘制
        smooth: Boolean,
        // 线段和X轴之间否填充
        // fill: Boolean,
        // 图表标题的对齐方式，默认是居中，值有:left,center,right
        titleAlign: { type: String, default: 'center' },
        // true表示正在加载中，false表示加载完成
        loading: { type: Boolean, default: false },
        contentStyle: Object,
        // 简单散点图
        // scatter: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            mouse: {},
            boardInfo: null,
            boradTransform: '',
        };
    },
    computed: {
        xAxisSeries() {
            const {
                xAxis, data,
            } = this;

            return omit(data, xAxis.key);
        },
        yAxisSeries() {
            const {
                series, data,
            } = this;

            return series.map(({ key }, i) => omit(data, key));
        },
    },
    methods: {
        hover(event) {
            this.mouse = event;
        },
        onFocusChange(payload) {
            if (payload) {
                const {
                    series, data,
                } = this;
                const skey = series[payload.yIndex].key;
                const target = data[payload.xIndex];
                // info[xkey] = target[xkey];

                // this.boardInfo = {};
                // const target = this.data[payload.xIndex];
                // this.boardInfo[this.xAxis.key] = target[this.xAxis.key];
                // this.boardInfo[this.series[payload.yin]]
                this.boardInfo = {
                    key: skey,
                    value: target[skey],
                };
                this.boradTransform = `transform: translate(${payload.xSpace}px, ${payload.ySpace}px);`;
            } else {
                this.boardInfo = null;
            }
        },
    },
};
export default ULineChart;
