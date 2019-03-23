import Vue from 'vue';
import canvasPlugin from 'vego';
Vue.use(canvasPlugin, {
    enableMouseOver: 5,
    enableTouch: false,
});

export * from './components';
