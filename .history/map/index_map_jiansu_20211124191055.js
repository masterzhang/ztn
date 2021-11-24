(function () {
  var myChart = echarts.init(document.getElementById('index_map_2'))
  var geoCoordMap = {
    "南京市": [118.804722, 32.065631],
  }

  var mapData = [{
    name: '南京市',
    value: '南京运营中心（南京市六合区5G空间902）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }]

  const citys = Object.keys(geoCoordMap).map(city => {
    return {
      name: city,
    }
  })

  const area = {}
  mapData.forEach(item => {
    area[item.name] = {
      address: item.value,
      pic: item.pic
    }
  })

  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push(geoCoord.concat(data[i].value).concat(data[i].name));
      }
    }
    return res;
  }

  option = {
    backgroundColor: '#fff',
    title: {
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: '江苏',
      label: {
        normal: {
          show: true,
          areaColor: '#ffffff',
          borderColor: '#111',
          textStyle: { color: "#008A94" }
        },
        emphasis: {
          show: false,
          textStyle: { color: "#fff" }
        }
      },
      itemStyle: {
        normal: {
          show: false,
          areaColor: '#ffffff',
          borderColor: '#009fe8'
        },
        emphasis: {
          show: false,
          areaColor: '#008A94'
        }
      }
    },
    series: [
      {
        name: '地点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        color: '#EE4B13',
        symbolSize: 15,
        data: convertData(citys),
        symbolSize: 12,
        zoom: 2,
        itemStyle: {
          normal: {
            color: '#EE4B13',
            borderWidth: .5,//区域边框宽度
            borderColor: '#009fe8',//区域边框颜色
            areaColor: "#ffefd5",//区域颜色
          },
          emphasis: {
            show: true,
            borderWidth: .5,
            borderColor: '#4b0082',
            areaColor: "#f47920",
          }
        },
      },
      {
        name: '公司分布',
        type: 'map',
        mapType: '江苏',
        coordinateSystem: 'geo',
        data: mapData,
        label: {
          normal: {
            show: true,
            areaColor: '#ffffff',
            borderColor: '#111',
            textStyle: { color: "#008A94" }
          },
          emphasis: {
            show: false,
            textStyle: { color: "#fff" }
          }
        },
        itemStyle: {
          normal: {
            show: false,
            areaColor: '#ffffff',
            borderColor: '#009fe8'
          },
          emphasis: {
            show: false,
            areaColor: '#006600'
          }
        }
      },
    ],
    tooltip: {
      "trigger": "item",
      "confine": true,
      "formatter": (p) => {
        const dataCon = p.data
        const txtCon = `${dataCon[3]}`
        let name = dataCon.name || txtCon
        if (area[name]) {
          const city = area[name]
          const pic = city.pic
          return city.address + '<br/ >' + "<div style='text-align:center'><img style='width:250px;height:150px;' src='" + pic + "'/></div>"
        }
      }
    },
  };
  myChart.setOption(option);
})()
