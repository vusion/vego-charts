# UBarChart 柱状图

## 示例

#### 基本形式


``` vue
<template>
<u-bar-chart border legend gap-size="medium" :title="title" :x-axis="xAxis" :y-axis="yAxis" :series="series" :data="data"></u-bar-chart>
</template>

<script>
export default {
	data() {
		return {
			title: '每星期访问量',
			xAxis:{ key: 'week' },
            yAxis:{ min: 0, name: '个'},
            series:['week', 'number'],
			data: [
				{ week: '星期一', number: 150 },
				{ week: '星期二', number: 300 },
				{ week: '星期三', number: 28 },
				{ week: '星期四', number: 200 },
				{ week: '星期五', number: 74 },
				{ week: '星期六', number: 532 },
				{ week: '星期日', number: 420 },

			],
		}
	}
};
</script>
```

#### 堆叠数据

``` vue
<template>
<div>
	<u-bar-chart border legend :stack="stack" :title="title" :x-axis="xaxis" :y-axis="yaxis" :series="series" :data="data">
		<div slot-scope="scope" slot="tooltip">
			<div v-for="sery in series">{{ sery.name || sery.key}} : {{ scope.row[sery.key]}} </div>
		</div>
	</u-bar-chart>
</div>
</template>

<script>
export default {
	data() {
		return {
			title: '每星期访问量',
			xaxis: { key: 'week' },
			yaxis: { min: 0 },
			stack: 'stack',
			series: ['week', 'rds', 'ncr', 'nce'],
			data: [
				{ week: '星期一', rds: 150, ncr: 200, nce: 50 },
	            { week: '星期二', rds: 300, ncr: 340, nce: 20 },
	            { week: '星期三', rds: 28, ncr: 56, nce: 28 },
	            { week: '星期四', rds: 200, ncr: 78, nce: 40 },
	            { week: '星期五', rds: 74, ncr: 100, nce: 74 },
	            { week: '星期六', rds: 532, ncr: 200, nce: 32 },
	            { week: '星期日', rds: 420, ncr: 260, nce: 20 },
			],
		}
	}
};
</script>
```

#### x轴间隔显示

``` vue
<template>
<div>
	<u-bar-chart border legend :title="title" :x-axis="xaxis" :y-axis="yaxis" :series="series" :data="data">
		<div slot-scope="scope" slot="tooltip">
			{{ scope.sery.name}} : {{ scope.row[scope.sery.key]}}
		</div>
	</u-bar-chart>
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