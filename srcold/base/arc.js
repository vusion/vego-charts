import { VegoBaseComponent } from 'vego';

export const arc = {
    name: 'u-arc-shape',
    extends: VegoBaseComponent,
    props: {
        fn: Function,
        color: String,
        hoverColor: String,
        pie: Object,
        originData: Object,
    },
    data() {
        return {
            isFocus: false,
        };
    },
    mounted() {
        this.watchData('isFocus');
        this.vegoInstance.$regist('mouseenter', (payload) => {
            this.isFocus = true;
            // bubble up!
            payload.data = this.originData;
        });
        this.vegoInstance.$regist('mouseleave', (payload) => {
            this.isFocus = false;
            // bubble up!
            payload.data = this.originData;
        });
    },
    draw(g) {
        const {
            isFocus, color, hoverColor, pie, fn,
        } = this;

        g.save().beginPath().moveTo(0, 0);
        if (isFocus) {
            g.setFillStyle(hoverColor);
        } else
            g.setFillStyle(color);
        fn.context(g)(pie);
        g.fill().restore();
    },
};
export default arc;
