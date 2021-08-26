<style scoped>
	.childreList{
		margin: 20px
	}
	.bigBox{
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden; 
	}
    #mapDiv{
         width: 100%;
        height: 100%;
    }
    .mapBox{
        position: relative;
        width: 100%;
        height: 100%;
        left:0px;
        top: 0px
    }
    .windowInputBox{
        position: absolute;
        z-index: 8888;
        left: 5%;
        top: 5%;
       width: 100%
    }
    .searchBtn{
        background: #07192b!important;
        color: #fff!important;
    }
    .editData{
        position: absolute;
        right: 10%;
        top: 5%;
        z-index: 8888;
        background: #07192b!important;
        color: #fff!important;
    }
    .newWindow{
        margin: 0px!important;
        padding: 0px!important;
        width:100%!important;
        height: 100%!important;
        z-index: 888!important;
        position: fixed!important;
        top: 0px!important;
        left: 0px!important;
        background: #090A2D;
        /* background: url(../../assets/bg.png) no-repeat; */
        /*background: radial-gradient(#050528  0%, #050528 3%, #4700B8 50%,#5418B7 69% ,#0D0439 97%, #050528 100%);*/
        background-size:cover; 
    }
    .inputSearch{
        width: 30%;
    }
    .qrBtn{
        position: absolute;
        margin-left: 80px;
        top: 5%;
        z-index: 8888;
        background: #07192b!important;
        color: #fff!important;
    }
</style>

<template>
	<div class="mapBox newWindow">
        <div class='windowInputBox'>
             <el-input placeholder="请输入内容" class="inputSearch" v-model="input5">
                <el-button slot="append" class="searchBtn" @click="search" icon="el-icon-search"></el-button>
            </el-input>
             <el-button @click="submit" :disabled="disabled=='1'" class="qrBtn">确认</el-button>
            <el-button @click="pointDraw" class="editData">返回</el-button>
        </div>
        <div id="mapDiv" ref="mapDiv"></div>
    </div>
</template>
<script>
import MapInit from '../../assets/mapInit.js';
import * as order from '../../api/publicapi.js';
	export default  {
		props:["keyword","lng","lat","disabled"],
		data ( ) {
			return {
				zoom: '15',
                points: [],
                line: '',
                T: '',
                lay: '',
                map: '',
                drivingRoute: '',
                pointMark:'',
            
                _CarTrack: '',
                startIcon: '',
                endIcon: '',
                config: '',
                iconMaker: [],
                myIcon: '',
                input5:this.keyword,
                isPointDraw:true,//当前地图标记是否可拖拽
			}
        },
        created() {
            this.startIcon = 'http://lbs.tianditu.gov.cn/images/bus/start.png'
            this.endIcon = 'http://lbs.tianditu.gov.cn/images/bus/end.png'
            this.myIcon = 'http://lbs.tianditu.gov.cn/images/bus/end.png'
        },
		mounted(){
            var vm =this;
            vm.input5 = vm.keyword;
            setTimeout(vm.getPosition(vm.lnglat),500)
        },
        watch:{
            partData(){
                var vm = this
                setTimeout(vm.getPosition(),500)
            }
        },
        methods:{
            submit(){
                var vm = this;
                var lonlat = vm.pointMark.getLngLat(new T.LngLat());
                this.$emit('saveLonLat', lonlat)
                this.pointDraw();
            },
            search(){
                var vm = this;
                order.getLonLat.r(vm.input5).then(res =>{
                     vm.map.panTo(new T.LngLat(res.data.location.lon, res.data.location.lat),vm.zoom);
                     vm.pointMark.setLngLat(new T.LngLat(res.data.location.lon, res.data.location.lat))
                })
            },
            pointDraw(){
                this.$emit('goback');

            },
            getPosition(lnglat) {
                window.onload = function() {
                }
                MapInit.init().then((T) => {
                    this.T = T
                    this.zoom = 15;

                    this.map = new T.Map('mapDiv');
                    this.map.centerAndZoom(new T.LngLat(this.lng?this.lng:116.40769,this.lat?this.lat:39.89945), this.zoom);
                    // var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
                    //         'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
                    //         '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
                    // // 创建自定义图层对象
                    // this.lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 })
                    // var config = { layers: [this.lay] }
                    // this.map = new T.Map(this.$refs.mapDiv, config)// 初始化地图对象
                    // this.map.centerAndZoom(new T.LngLat(116.40969, 39.94940), this.zoom)// 设置显示地图的中心点和级别
                    // // 创建图片对象
                    // var icon = new T.Icon({
                    //     iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
                    //     iconSize: new T.Point(19, 27),
                    //     iconAnchor: new T.Point(10, 25)
                    // })
                    this.pointMark = new T.Marker(new T.LngLat(this.lng?this.lng:116.40769,this.lat?this.lat:39.89945))//, { icon: icon }) // 创建点
                    this.map.addOverLay(this.pointMark) // 增加点
                    this.pointMark.enableDragging()
                    // this.points.push(new T.LngLat(116.404, 39.945), new T.LngLat(116.411794, 39.9068), new T.LngLat(116.32969, 39.92940), new T.LngLat(116.385438, 39.90610))
                    // const points1 = []
                    // points1.push(new T.LngLat(116.404, 39.845), new T.LngLat(116.411794, 39.915))
                    // // 创建线对象
                    // var line = new T.Polyline(points1, { color: '#fff' })
                    // var line1 = new T.Polyline(this.points, { color: '#f00' })
                    // // 向地图上添加线
                    // this.map.addOverLay(line1)
                    // this.map.addOverLay(line)
                    // // 创建信息窗口对象
                    // var infoWin = new T.InfoWindow()
                    // infoWin.setLngLat(new T.LngLat(116.404, 39.945))
                    // // 设置信息窗口要显示的内容
                    // infoWin.setContent('起始点')
                    // // 向地图上添加信息窗口
                    // this.map.addOverLay(infoWin)
                }).catch(error => {
                })
            }
        }
	}

</script>
