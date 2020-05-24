<template>
  <div class='app-inner'>
    <h3>搜索地理位置：支持搜索、回车搜索，基本插件的使用</h3>
    <div class="input-wrap">
      <div class="input-box">
        <input
          id="input"
          class="input-text"
          placeholder="请输入地址按下enter或点击获取位置"
          autocomplete="off"
          v-model="address"
          @input="inputHandle"
          @keyup.enter="handleOk"
          @focus="showSelect = true"
        />
        <div class="input-result__list" v-if="showSelect && resultList.length">
          <div
            class="input-result__item"
            v-for="item in resultList"
            :key="item.name"
            @click="selectedHandle(item.name)">
            {{item.name}}
          </div>
        </div>
      </div>
      <button class="input-btn" @click="handleOk">获取位置</button>
    </div>
    <div id="container"></div>
    <div class="show-info">
      <p>经度：{{lnglat && lnglat.lng || '--'}}</p>
      <p>纬度：{{lnglat && lnglat.lat || '--'}}</p>
      <p>地址：{{address || '--'}}</p>
    </div>
    <hr>
    <h3>生成静态地图图片</h3>
    <img class="map-img" :src="mapUrl" alt="map">
  </div>
</template>

<script>
import MapLoader from '@/utils/loadMap';
import { debounce } from '@/utils/util';

export default {
  name: 'Map',
  data() {
    return {
      map: null,
      marker: null,
      geocoder: null,
      autoComplete: null,
      address: '',
      lnglat: null,
      showSelect: false,
      resultList: [],
    };
  },
  computed: {
    mapUrl() {
      const lnglatStr = this.lnglat ? `${this.lnglat.lng},${this.lnglat.lat}` : '116.407526,39.90403';
      const url = `https://restapi.amap.com/v3/staticmap?location=${lnglatStr}&zoom=13&size=750*300&markers=mid,,A:${lnglatStr}&key=8461bc5da657e97a65d0065888a5bbcb`;
      return url;
    },
  },
  created() {},
  mounted () {
    MapLoader().then(AMap => {
      this.map = new AMap.Map('container', {
        zoom: 9,
      });
      AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.Geocoder',
        'AMap.Autocomplete'], () => { // 异步加载插件
        const toolbar = new AMap.ToolBar();
        const scale = new AMap.Scale();
        const overView = new AMap.OverView();
        this.map.addControl(toolbar);
        this.map.addControl(scale);
        this.map.addControl(overView);
        this.geocoder = new AMap.Geocoder({});
        this.marker = new AMap.Marker();
        const autoOptions = {
          //city 限定城市，默认全国
          city: '全国',
        }
        this.autoComplete= new AMap.Autocomplete(autoOptions);        
      });
    }, e => {
      console.log('地图加载失败' ,e)
    });
  },
  methods: {
    inputHandle(e) {
      this.searchAddress(e.target.value);
    },
    // 选中地址并搜索
    selectedHandle(val) {
      this.showSelect = false;
      this.address = val;
      this.handleOk();
    },
    // 根据输入内容搜索
    searchAddress: debounce(function searchAddress(address) {
      this.autoComplete.search(address, (status, result) => {
        this.resultList = status === 'complete' ? result.tips : [];
      });
    }, 300),
    handleOk() {
      this.geocoder.getLocation(this.address, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          const lnglat = result.geocodes[0].location;
          this.lnglat = lnglat;
          this.marker.setPosition(lnglat);
          this.map.add(this.marker);
          this.map.setFitView(this.marker);
        } else {
          console.log('根据地址查询位置失败');
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.app-inner {
  text-align: center;
}

#container {
  margin: 30px auto;
  width: 750px;
  height: 300px;;
}

.input {
  &-wrap {
    margin: 20px 0;
  }

  &-box {
    position: relative;
    display: inline-block;
  }

  &-text {
    width: 300px;
    height: 30px;
  }

  &-btn {
    padding: 0 10px;
    height: 36px;
  }

  &-result {

    &__list {
      padding-bottom: 10px;
      position: absolute;
      top: 30px;
      left: 0;
      z-index: 99;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    &__item {
      padding: 0 10px;
      width: 100%;
      line-height: 30px;
      text-align: left;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

.map-img {
  margin: 0 0 30px;
}
</style>
