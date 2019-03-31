import { VegoBaseComponent } from 'vego';
import { arc, pie } from 'd3-shape';
import { colorsDark, colorsDarkAlpha } from './index';
export const UPieShape = {
    name: 'u-pie-shape',
    extends: VegoBaseComponent,
    props: {
        colors: {
            type: Array,
            default: () => colorsDark,
        },
        hoverColors: {
            type: Array,
            default: () => colorsDarkAlpha,
        },
        originData: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        outerRadius: Number,
        // 中空的
        hollow: {
            type: Boolean,
            default: false,
        },
        //
        withPadding: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.vegoInstance.$regist('mouseenter', (payload) => {
            this.$emit('piein', payload.data);
        });
        this.vegoInstance.$regist('mouseleave', (payload) => {
            this.$emit('pieout', payload.data);
        });
    },
    computed: {
        pies() {
            const {
                colors, hoverColors, data, originData,
            } = this;

            return pie()(data).map((_, i) => ({
                color: colors[i],
                hovercolor: hoverColors[i],
                data: _,
                originData: originData[i],
            }));
        },
        pieFn() {
            const a = arc();
            a.outerRadius(this.outerRadius);
            if (this.hollow)
                a.innerRadius(this.outerRadius * 0.8);
            else
                a.innerRadius(0);
            if (this.withPadding)
                a.padAngle(0.03);
            return a;
        },
        graphData() {
            return {
                pies: this.pies,
                pieFn: this.pieFn,
            };
        },
    },
    draw(g) {
        if (this.data.length === 0) {
            g.beginPath()
                .arc(0, 0, this.outerRadius, 0, Math.PI * 2)
                .setLineDash([4, 16])
                .stroke();
        }
    },
    render(createElement) {
        return createElement('div', this.$options.propsData, [
            this.$scopedSlots.default({
                graphData: this.graphData,
            }),
        ]);
    },
};
export default UPieShape;
