function omit(arr, key) {
    return arr.map((r) => r[key]);
}
function pile(arr) {
    if (arr.length === 1)
        return arr;
    const l = arr[0].length;

    arr.reduce((lastRow, row) => {
        lastRow.forEach((ac, i) => {
            row[i] = ac + row[i];
        });
        return row;
    }, new Array(l).fill(0));
    console.log(arr);
}
export const UBarChart = {
    name: 'u-bar-chart',
    props: {
        data: Array,
        title: String,
        caption: String,
        series: Array,
        border: Boolean,
        legend: [Boolean, String],
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '480px',
        },
        xAxis: Object,
        yAxis: Object,
        stack: [String, Boolean],
        loading: { type: Boolean, default: false },
        contentStyle: Object,
        titleAlign: { type: String, default: 'center' },
        // trigger: {
        //     type: String,
        //     default: 'hover',
        // },
        // gapSize: {
        //     type: String,
        //     default: 'normal',
        // },
    },
    data() {
        return {
            mouse: {},
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

            const dt = series.map(({ key }, i) => omit(data, key));
            pile(dt);
            return dt;
        },
    },
    methods: {
        hover(event) {
            this.mouse = event;
        },
    },
};

export default UBarChart;
