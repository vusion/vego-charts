import { VegoBaseComponent } from 'vego';
import { line } from 'd3-shape';

export const ULineShape = {
    name: 'u-line-shape',
    extends: VegoBaseComponent,
    props: {
        colors: {
            type: Array,
            default: () => [],
        },
        fx: Function,
        fy: Function,
        xSeries: Array,
        ySeries: Array,
    },
    draw(g) {
        const {
            fx, fy, xSeries, ySeries, colors,
        } = this;

        ySeries.forEach((data, s) => {
            g.beginPath();
            line()
                .x((d, i) => fx(xSeries[i]))
                .y((d) => fy(d))
                .context(g)(data);
            g.setLineWidth(1.5).setStrokeStyle(colors[s] || '#000').stroke();
        });
    },
};
export default ULineShape;
