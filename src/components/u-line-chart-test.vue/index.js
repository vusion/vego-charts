import { tsv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';
import { extent, max } from 'd3-array';
export const ULineChartTest = {
    name: 'u-line-chart-test',

    data() {
        return {
            canvasWidth: 800,
            canvasHeight: 500,
            columns: null,
            series: null,
            dataXRange: [],
            spaceXRange: [],
            dataYRange: [],
            spaceYRange: [],
            mouse: {},
        };
    },
    mounted() {
        // this.getData();
        this.getMultiData();
    },
    methods: {
        hover(event) {
            this.mouse = event;
        },
        // async getData() {
        //     const data = await d3.csv(source, d3.autoType);
        //     const rows = data.map(({ date, close }) => ({ date, value: close }));

        //     // this.data = rows;
        //     this.series = [rows.map((i) => i.value)];
        //     this.columns = rows.map((i) => i.date);
        //     this.dataXRange = d3.extent(rows, (d) => d.date);
        //     this.spaceXRange = [40, this.canvasWidth - 40];
        //     this.dataYRange = [0, d3.max(rows, (d) => d.value)];
        //     this.spaceYRange = [this.canvasHeight - 30, 30];
        // },
        getMultiData() {
            tsv('https://gist.githubusercontent.com/mbostock/8033015/raw/01e8225d4a65aca6c759fe4b8c77179f446c5815/unemployment.tsv', (d, i, columns) => ({
                name: d.name.replace(/, ([\w-]+).*/, ' $1'),
                values: columns.slice(1).map((k) => +d[k]),
            })).then((data) => {
                this.series = data.map((i) => i.values);
                this.columns = data.columns.slice(1).map(timeParse('%Y-%m'));
                this.dataXRange = extent(this.columns);
                this.spaceXRange = [40, this.canvasWidth - 40];
                this.dataYRange = [0, max(this.series, (d) => max(d))];
                this.spaceYRange = [this.canvasHeight - 30, 30];
                console.log(this.series);
                console.log(this.columns);
                console.log(this.dataXRange);
                console.log(this.spaceXRange);
                console.log(this.dataYRange);
                console.log(this.spaceYRange);
            });

            // return {
            //     y: '% Unemployment',
            //     series: data,
            //     dates: data.columns.slice(1).map(d3.timeParse('%Y-%m')),
            // };
        },
    },
};

export default ULineChartTest;
