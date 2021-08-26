<template>
	<el-tree
	  :data="data"
	  node-key="id"
	  default-expand-all
	  ref="tree"
	  highlight-current
	   @node-click="partChoose"
	   check-strictly='true'
	  draggable>
	</el-tree>
</template>
<script>
	export default  {
		props:["partData"],
		data ( ) {
			return {
				data:this.partData
			}
		},
		mounted() {
			console.log(this.partData)
		},
		methods:{
			partChoose (data) {
				this.$emit('partChoose',data)
			}
		},
		created(){
		}
	}

</script>
 