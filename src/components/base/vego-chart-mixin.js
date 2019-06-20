import {
    DEFAULT_PADDING,
} from './index.js';
// import theme from 'cloud-ui.vusion/src/base/global.css';

export default {
    props: {
        padding: {
            type: Object,
            default: () => DEFAULT_PADDING,
        },
    },

    computed: {
        vegoChartPadding() {
            return Object.assign({}, DEFAULT_PADDING, this.padding);
        },
    },
};
