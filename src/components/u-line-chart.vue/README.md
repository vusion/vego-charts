# ULineChart

## 示例
### 基本形式

``` html
<u-line-chart border legend
    title="每星期访问量"
    :x-axis="{ key: 'week' }"
    :y-axis="{ min: 0, name: '个'}"
    :smooth="true"
    :series="[{key: 'number'},{key: 'num', } ]"
    :data="[
    { week: '星期一', number: 150, num: 1200 },
    { week: '星期二', number: 300, num: 1200 },
    { week: '星期三', number: 28, num: 1000 },
    { week: '星期四', number: 200, num: 2000 },
    { week: '星期五', number: 74, num: 740 },
    { week: '星期六', number: 532, num:2000 },
    { week: '星期日', number: 420 ,num: 5000},
]"></u-line-chart>
```