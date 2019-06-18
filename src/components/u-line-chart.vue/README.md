# ULineChart

## 示例
### 基本形式

``` html
<u-line-chart
    border
    legend
    title="每星期访问量"
    :x-axis="{ key: 'week' }"
	:y-axis="{ min: 0, name: '个'}"
    :series="['week', 'number']"
    :data="[
       { week: '星期一', number: 150, num: 1200 },
        { week: '星期二', number: 300, num: 1200 },
        { week: '星期三', number: 28, num: 1000 },
        { week: '星期四', number: 200, num: 2000 },
        { week: '星期五', number: 74, num: 740 },
        { week: '星期六', number: 532, num:2000 },
        { week: '星期日', number: 420 ,num: 5000}
    ]"></u-line-chart>
```

### Area模式
``` html
<u-line-chart
    border
    legend
    title="每星期访问量"
    :smooth="true"
    :fill="true"
    :series="['week', 'number']"
    :data="[
       { week: '星期一', number: 150, num: 1200 },
        { week: '星期二', number: 300, num: 1200 },
        { week: '星期三', number: 28, num: 1000 },
        { week: '星期四', number: 200, num: 2000 },
        { week: '星期五', number: 74, num: 740 },
        { week: '星期六', number: 532, num:2000 },
        { week: '星期日', number: 420 ,num: 5000}
    ]"></u-line-chart>
```

### 多线模式
``` html
<u-line-chart
    border
    legend
    title="每星期访问量"
    :smooth="true"
    :series="['week', 'number', 'num']"
    :data="[
       { week: '星期一', number: 150, num: 1200 },
        { week: '星期二', number: 300, num: 1200 },
        { week: '星期三', number: 28, num: 1000 },
        { week: '星期四', number: 200, num: 2000 },
        { week: '星期五', number: 74, num: 740 },
        { week: '星期六', number: 532, num:2000 },
        { week: '星期日', number: 420 ,num: 5000}
    ]"></u-line-chart>
```

``` html
<u-line-chart
    border
    legend
    scatter
    title="每星期访问量"
    :series="['week', 'number']"
    :data="[
       { week: '星期一', number: 150, num: 1200 },
        { week: '星期二', number: 300, num: 1200 },
        { week: '星期三', number: 28, num: 1000 },
        { week: '星期四', number: 200, num: 2000 },
        { week: '星期五', number: 74, num: 740 },
        { week: '星期六', number: 532, num:2000 },
        { week: '星期日', number: 420 ,num: 5000}
    ]"></u-line-chart>
```


``` vue
<template>
<div>
	<u-line-chart border legend smooth :title="title" :x-axis="xaxis" :y-axis="yaxis" :series="series" :data="data">
		<div slot-scope="scope" slot="tooltip">
			{{ scope.sery.name}} : {{ scope.row[scope.sery.key]}}
		</div>
	</u-line-chart>
</div>
</template>

<script>
export default {
	data() {
		return {
			title: '6月访问量',
			xaxis: { key: 'time', count: 4 },
			yaxis: { min: 0 },
			series: ['time', 'number'],
			data: [
				{ time: '2018-06-01', number: 150 },
				{ time: '2018-06-02', number: 300 },
				{ time: '2018-06-03', number: 28 },
				{ time: '2018-06-04', number: 200 },
				{ time: '2018-06-05', number: 74 },
				{ time: '2018-06-06', number: 532 },
				{ time: '2018-06-07', number: 420 },
				{ time: '2018-06-08', number: 532 },
				{ time: '2018-06-09', number: 420 },
				{ time: '2018-06-10', number: 532 },
				{ time: '2018-06-11', number: 420 },
				{ time: '2018-06-12', number: 532 },
				{ time: '2018-06-13', number: 420 },
				{ time: '2018-06-14', number: 200 },
				{ time: '2018-06-15', number: 74 },
				{ time: '2018-06-16', number: 532 },
				{ time: '2018-06-17', number: 420 },
				{ time: '2018-06-18', number: 532 },
				{ time: '2018-06-19', number: 420 },
				{ time: '2018-06-20', number: 420 },
				{ time: '2018-06-21', number: 420 },
				{ time: '2018-06-22', number: 420 },
				{ time: '2018-06-23', number: 420 },
				{ time: '2018-06-24', number: 200 },
				{ time: '2018-06-25', number: 74 },
				{ time: '2018-06-26', number: 532 },
				{ time: '2018-06-27', number: 420 },
				{ time: '2018-06-28', number: 532 },
				{ time: '2018-06-29', number: 420 },
			],
		}
	},
	methods: {
		format(value) {
			console.log(value);
		},
	},
};
</script>
```