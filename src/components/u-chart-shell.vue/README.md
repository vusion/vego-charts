# ULineChart

## 示例
### 基本形式

``` html
<u-chart-shell border legend title="每星期访问量" :x-axis="{ key: 'week' }" :y-axis="{ min: 0 }" :smooth="true" :series="[{ key: 'number' }]" :data="[{ week: '星期一', number: 150 }, { week: '星期二', number: 300 }, { week: '星期三', number: 28 }, { week: '星期四', number: 200 }, { week: '星期五', number: 74 }, { week: '星期六', number: 532 }, { week: '星期日', number: 420 }]"></u-chart-shell>
```