import { VegoBaseComponent } from 'vego';
import { line, curveMonotoneX } from 'd3-shape';
import { colorsDark } from './index';
export const ULineShape = {
    name: 'u-line-shape',
    extends: VegoBaseComponent,
    props: {
        colors: {
            type: Array,
            default: () => colorsDark,
        },
        fx: Function,
        fy: Function,
        xSeries: Array,
        ySeries: Array,
        curve: {
            type: Boolean,
            default: false,
        },
    },
    draw(g) {
        const {
            fx, fy, xSeries, ySeries, colors,
        } = this;

        ySeries.forEach((data, s) => {
            g.beginPath();
            const l = line()
                .x((d, i) => fx(xSeries[i]))
                .y((d) => fy(d));
            if (this.curve) {
                l.curve(curveMonotoneX);
            }

            l.context(g)(data);

            g.setLineWidth(1.5).setStrokeStyle(colors[s] || '#000').stroke();
        });
    },
};
export default ULineShape;
