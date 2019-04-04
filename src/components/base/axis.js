import { VegoBaseComponent } from 'vego';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
function scaleBandInvert(scale) {
    const domain = scale.domain();
    const eachBand = scale.step();
    return function (value) {
        const i0 = Math.floor((value / eachBand));
        const i1 = i0 + 1;
        const index = value - i0 * eachBand > i1 * eachBand - value ? i1 : i0;
        return Math.max(0, Math.min(index, domain.length - 1));
    };
}
export const UHvAxis = {
    name: 'u-hv-axis',
    extends: VegoBaseComponent,
    props: {
        spaceXRange: Array,
        spaceYRange: Array,
        xSeries: Array,
        ySeries: Array,
        mouse: Object,
        verticalLine: {
            type: Boolean,
            default: false,
        },
        padding: {
            type: Array,
            default: () => [0],
        },
        dataYTag: {
            type: String,
            default: '',
        },
        dataXTag: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            fx: undefined,
            fy: undefined,
            yticks: undefined,
            rangepadding: 10,
        };
    },
    computed: {
        compoundProperty() {
            return [this.spaceXRange, this.spaceYRange, this.xSeries, this.ySeries];
        },
        graphData() {
            return {
                fx: this.fx,
                fy: this.fy,
                xSeries: this.xSeries,
                ySeries: this.ySeries,
            };
        },
        isNeedIndicator() {
            const {
                mouse, spaceXRange, spaceYRange, rangepadding,
            } = this;
            const {
                x, y,
            } = mouse;
            return x > spaceXRange[0] - rangepadding && x < spaceXRange[1] + rangepadding
                && y > spaceYRange[1] && y < spaceYRange[0];
        },
        focusData() {
            const {
                fx, fy, mouse, ySeries, spaceXRange,
            } = this;
            if (!this.isNeedIndicator) {
                this.$emit('focusChange', null);
                return;
            }
            if (!fy)
                return {};
            const ym = fy.invert(mouse.y);
            const eachBand = fx.step();
            const xm = mouse.x - spaceXRange[0];
            const i = fx.invert(xm);
            let j = 0;
            const s = ySeries.reduce((a, b, idx) => {
                const condition = Math.abs(a[i] - ym) < Math.abs(b[i] - ym);
                if (!condition)
                    j = idx;
                return condition ? a : b;
            });
            const payload = {
                xIndex: i,
                xSpace: i * eachBand + spaceXRange[0],
                yIndex: j,
                ySpace: fy(s[i]),
                data: s[i],
            };
            this.$emit('focusChange', payload);
            return payload;
        },
    },
    watch: {
        compoundProperty() {
            this.calcuFunc();
        },
    },
    mounted() {
        this.calcuFunc();
    },
    methods: {

        calcuFunc() {
            const {
                xSeries,
                ySeries,
                spaceXRange,
                spaceYRange,
                padding,
            } = this;
            this.fx = scaleBand()
                .domain(xSeries)
                .range(spaceXRange)
                .padding(padding);
            // .paddingInner(0)
            // .paddingOuter(0);
            this.fx.invert = scaleBandInvert(this.fx);
            this.fy = scaleLinear()
                .range(spaceYRange)
                .domain([0, max(ySeries, (d) => max(d))])
                .nice(8);
            this.yticks = this.fy.ticks(8);
        },
        drawXAxis(g) {
            const {
                fx,
                xSeries,
                spaceYRange,
                spaceXRange,
            } = this;
            const height = spaceYRange[0];
            const margin = fx(xSeries[xSeries.length - 1]) + fx.bandwidth() * fx.padding() * 2;
            // const tickFormat = fx.tickFormat();
            g.beginPath()
                .moveTo(spaceXRange[0], height);

            xSeries.forEach((d) => {
                const t = fx(d);
                g.lineTo(t, height)
                    .lineTo(t, height + 6)
                    .moveTo(t, height);
            });

            g.lineTo(margin, height);
            g.setStrokeStyle('#000');
            g.stroke();
            g.setTextAlign('center')
                .setTextBaseline('top');
            xSeries.forEach((d) => {
                const t = fx(d);
                g.fillText(d, t, height + 6);
            });
            if (this.dataXTag)
                g.fillText(this.dataXTag, margin + 20, height);
        },
        drawYAxis(g) {
            const {
                yticks, fy, fx, xSeries,
                spaceYRange,
                spaceXRange,
            } = this;

            const w = spaceXRange[0];
            const height = spaceYRange[0];
            const wr = fx(xSeries[xSeries.length - 1]) + fx.bandwidth() * fx.padding() * 2;
            const tickFormat = fy.tickFormat();
            g.beginPath()
                .moveTo(w, height);
            yticks.forEach((d, i) => {
                if (i === 0)
                    return;
                const yd = fy(d);
                g.moveTo(w, yd)
                    .lineTo(wr, yd)
                    .moveTo(w, yd);
            });
            if (this.verticalLine) {
                const h = fy(yticks[yticks.length - 1]);
                const band = fx.bandwidth();
                let t;
                xSeries.forEach((d) => {
                    t = fx(d);
                    g.moveTo(t - band, height)
                        .lineTo(t - band, h)
                        .moveTo(t - band, height);
                });
                g.moveTo(t + band, height)
                    .lineTo(t + band, h);
            }
            g.setStrokeStyle('#eee');
            g.stroke();
            g.setTextAlign('right')
                .setTextBaseline('middle');
            yticks.forEach((d) => {
                g.fillText(tickFormat(d), w - 9, fy(d));
            });
            if (this.dataYTag) {
                g.setTextAlign('left')
                    .fillText(this.dataYTag, w, fy(this.yticks[this.yticks.length - 1]) - 20);
            }
        },
    },
    draw(g) {
        this.drawXAxis(g);
        this.drawYAxis(g);
        // cacheaxis
        // this.drawData(g);
        // this.drawIndicator(g);
    },
    render(createElement) {
        const children = [];
        if (this.$scopedSlots.default) {
            children.push(this.$scopedSlots.default({
                graphData: this.graphData,
            }));
        }

        if (this.$scopedSlots.indicator) {
            children.push(this.$scopedSlots.indicator({
                focusData: this.focusData,
            }));
        }
        return createElement('div', this.$options.propsData, children);
    },
};
export default UHvAxis;
