import { VegoBaseComponent } from 'vego';

export const UStackShape = {
    name: 'u-stack-shape',
    extends: VegoBaseComponent,
    props: {
        ySeries: Array,
        index: Number,
    },
    computed: {
        shapeData() {
            return {
                ySeries: this.ySeries,
            };
        },
    },
    render(createElement) {
        const children = [];
        if (this.$scopedSlots.default) {
            children.push(this.$scopedSlots.default({
                shapeData: this.shapeData,
            }));
        }
        return createElement('div', this.$options.propsData, children);
    },
};
export default UStackShape;
