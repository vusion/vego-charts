import { VegoBaseComponent } from 'vego';

export const ULineIndicator = {
    name: 'u-line-indicator',
    extends: VegoBaseComponent,
    props: {
        height: Number,
        h: Number,
        yStart: Number,
    },
    draw(g) {
        const {
            height, h, yStart,
        } = this;

        g.beginPath()
            .moveTo(0, yStart)
            .lineTo(0, height + yStart)
            .stroke();
        g.beginPath()
            .arc(0, h, 2, 0, Math.PI * 2)
            .fill();
    },
};
export default ULineIndicator;
