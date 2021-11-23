(function () {
  var myChart = echarts.init(document.getElementById('index_map_1'))

  var geoCoordMap = {
    "福州市": [119.29211828479299, 26.07774301096993],
    "泉州市": [118.67249759696338, 24.87179986233384],
    "安溪县": [118.18345034147433, 25.072863995617777],
    "厦门市": [118.08328377332067, 24.485393904492792],
    "宁德市": [119.54630707487763, 26.670198621764975],
    "漳州市": [117.64460244860537, 24.518371347691865],
  }

  var mapData = [{
    name: '福州市',
    value: '福州总部（福州市台江区升龙汇金中心805-808-809）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }, {
    name: '泉州市',
    value: '泉州运营中心（泉州市星光耀14号楼1216-1217）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }, {
    name: '厦门市',
    value: '厦门运营中心（厦门市观音山信义国际中心607）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }, {
    name: '安溪县',
    value: '安溪运营中心（泉州市安溪县金龙现代广场718）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }, {
    name: '漳州市',
    value: '漳州运营中心（漳州市荣成四季商业广场3号618）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }, {
    name: '宁德市',
    value: '宁德运营中心（宁德市天茂城市广场2号楼513）',
    pic: '/images/%E5%85%AC%E5%8F%B8%E5%8E%86%E7%A8%8B.jpg',
    selected: true
  }]

  const citys = Object.keys(geoCoordMap).map(city => {
    return {
      name: city
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
    backgroundColor: '#404a59',
    title: {
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: '福建',
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
        mapType: '福建',
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
