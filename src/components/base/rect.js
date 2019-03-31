import { VegoBaseComponent } from 'vego';
import { colorsDark } from './index';

export const URectShape = {
    name: 'u-rect-shape',
    extends: VegoBaseComponent,
    props: {
        colors: {
            type: Array,
            default: () => colorsDark,
        },
        fy: Function,
        y0Data: Number,
        y1Data: Number,
        yBottom: Number,
        span: Number,
        index: Number,
    },
    draw(g) {
        const {
            fy, y1Data, y0Data, colors, span, yBottom, index,
        } = this;
        const lx = span / 2;
        const y1 = fy(y1Data);
        const y0 = fy(y0Data);

        g.beginPath()
            .setFillStyle(colors[index])
            .fillRect(-lx, y1 - yBottom, span, y0 - y1);

        // .rect(-lx, y1, y1-y0)
    },
};
export default URectShape;
