<template>
  <div class="app-inner">
    <div id="container"></div>
  </div>
</template>

<script>
import MapLoader from "@/utils/loadMap";

var LabelsData = [
  {
    name: "全聚德烤鸭",
    position: [116.467456, 39.994996],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 10,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "全聚德烤鸭",
      direction: "left",
      offset: [0, -5],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "绥兴盛",
    position: [116.469412, 39.996412],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 16,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "绥兴盛",
      direction: "top",
      offset: [0, 0],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "香河肉饼",
    position: [116.471871, 39.995616],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 8,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "香河肉饼",
      direction: "right",
      offset: [0, -5],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "金鼎轩",
    position: [116.468098, 39.993729],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 23,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "金鼎轩",
      direction: "bottom",
      offset: [0, 0],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "湘西土菜",
    position: [116.464471, 39.99669],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 6,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "湘西土菜",
      direction: "left",
      offset: [-3, -7],
      style: {
        fontSize: 13,
        fontWeight: "normal",
        fillColor: "#fff",
        padding: "2, 5",
        backgroundColor: "#b1009b",
      },
    },
  },
  {
    name: "香猪坊",
    position: [116.468599, 39.995847],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 5,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "香猪坊",
      direction: "top",
      offset: [0, 0],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "京味斋烤鸭店",
    position: [116.462483, 39.992492],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 4,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "京味斋烤鸭店",
      direction: "top",
      offset: [0, 0],
      style: {
        fontSize: 13,
        fontWeight: "normal",
        fillColor: "#fff",
        padding: "2, 5",
        backgroundColor: "#22884f",
      },
    },
  },
  {
    name: "脊骨土豆汤",
    position: [116.465586, 39.99678],
    zooms: [10, 20],
    opacity: 1,
    zIndex: 3,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "脊骨土豆汤",
      direction: "top",
      offset: [0, 0],
      style: {
        fontSize: 15,
        fontWeight: "normal",
        fillColor: "#333",
        strokeColor: "#fff",
        strokeWidth: 2,
      },
    },
  },
  {
    name: "山西刀削面",
    position: [116.472881, 39.997064],
    zooms: [10, 20],
    zIndex: 2,
    opacity: 1,
    hhhhhh: 11111,
    icon: {
      type: "image",
      image: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      size: [26, 34],
      anchor: "bottom-center",
      angel: 0,
      retina: true,
    },
    text: {
      content: "山西刀削面",
      direction: "top",
      offset: [0, 0],
      style: {
        fontSize: 13,
        fontWeight: "normal",
        fillColor: "#fff",
        padding: "2, 5",
        backgroundColor: "#b1009b",
      },
    },
  },
];

export default {
  name: "Map",
  data() {
    return {};
  },
  created() {},
  mounted() {
    MapLoader().then(
      (AMap) => {
        var map = new AMap.Map("container", {
          zoom: 9,
          expandZoomRange: true,
        });
        AMap.plugin(
          [
            "AMap.ToolBar",
            "AMap.Scale",
            "AMap.OverView",
            "AMap.Geocoder",
            "AMap.Autocomplete",
          ],
          () => {
            var layer = new AMap.LabelsLayer({
              zooms: [3, 20],
              zIndex: 1000,
              // 开启标注避让，默认为开启，v1.4.15 新增属性
              collision: true,
              // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
              animation: true,
            });

            map.add(layer);

            var markers = [];

            for (let i = 0; i < LabelsData.length; i++) {
              const curData = LabelsData[i];
              curData.extData = {
                index: i,
              };

              const labelMarker = new AMap.LabelMarker(curData);

              labelMarker.on("click", (e) => {
                /* console.log(e);
                console.log(labelMarker.getOptions()); */
                if (e.target.getOptions().hhhhhh === 11111) {
                  alert('不能标记了，哈哈哈');
                  return;
                }
                labelMarker.setText({
                  content: `山西刀削面${e.target.getOptions().extData.index}`,
                  // direction: "top",
                  // offset: [0, 0],
                  style: {
                    fontSize: 13,
                    fontWeight: "normal",
                    fillColor: "#fff",
                    // padding: "2, 5",
                    backgroundColor: "red",
                  },
                });
              });

              markers.push(labelMarker);
              
              layer.add(labelMarker);
            }

            map.setFitView();
          }
        );
      },
      (e) => {
        console.log("地图加载失败", e);
      }
    );
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.app-inner {
  text-align: center;
}

#container {
  margin: 30px auto;
  width: 800px;
  height: 500px;
}
</style>
