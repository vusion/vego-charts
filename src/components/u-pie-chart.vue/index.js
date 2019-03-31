export const UPieChart = {
    name: 'u-pie-chart',
    props: {
        data: Array,
        title: String,
        caption: String,
        border: Boolean,
        legend: Boolean,
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '480px',
        },
        loading: { type: Boolean, default: false },
        titleAlign: { type: String, default: 'center' },
        contentStyle: Object,
        hollow: Boolean,
        withPadding: Boolean,
    },
    data() {
        return {
            boardInfo: null,
            boradTransform: '',
        };
    },
    computed: {
        percentage() {
            return this.data.map((r) => (+r.percent));
        },
        series() {
            return this.data.map((r) => ({ key: r.name }));
        },
    },
    methods: {
        onPiein(originData) {
            this.boardInfo = originData;
            // console.log(this.boardInfo);
        },
        onPieout() {
            this.boardInfo = null;
        },
        onCanvasMouseMove({ x, y }) {
            this.boradTransform = `transform: translate(${x}px, ${y}px);`;
        },
    },
};
export default UPieChart;
