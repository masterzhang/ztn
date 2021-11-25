(function () {
  var myChart = echarts.init(document.getElementById('index_map_3'))

  var SHData = [//这是两地的数据
    [{ name: '上海' }, { name: '包头', value: 95 }],
  ]
  var geoCoordMap = {//地理坐标
    '黑龙江': [128.087398, 46.851304],
    '内蒙古': [117.711322, 44.267121],
    '广州': [113.663917, 23.633152],
    '云南': [101.59529, 24.241931],
    '义乌': [120.081582, 29.34138],
    '海南': [109.616512, 18.804581],
  }
  var inMap = {
    "福州": [119.29211828479299, 26.07774301096993],
  }
  var inMap2 = {
    '英国': [-0.085911, 51.521228],
    '美国': [-101.929833, 39.865966],
    '法国': [1.401781, 47.386589],
    '意大利': [12.072213, 43.181401],
    '西班牙': [-3.528695, 39.409032],
    '加拿大': [-106.021944, 56.099208],
  }
  var allMap = { ...geoCoordMap, ...inMap, ...inMap2 }
  var planeData = []
  var fromData = Object.keys(geoCoordMap)
  var toData = Object.keys(inMap)
  var toData2 = Object.keys(inMap2)
  fromData.forEach(from => {
    var toArray = []
    toData.forEach(to => {
      toArray.push([
        { name: from },
        { name: to }
      ])
    })
    planeData.push([from, toArray])
  })
  toData.forEach(from => {
    var toArray = []
    toData2.forEach(to => {
      toArray.push([
        { name: from },
        { name: to }
      ])
    })
    planeData.push([from, toArray])
  })
  //飞机
  var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

  function convertData(data) {
    var res = [];
    //console.log(data.length);长度为10
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = allMap[dataItem[0].name];//始发地
      var toCoord = allMap[dataItem[1].name];//目的地
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],//一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
        });
      }
    }
    return res;
  }

  var series = [];
  planeData.forEach((item, i) => {
    //console.log(item[1]);//得到上海数组
    series.push({
      type: 'lines',//用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
      zlevel: 1,
      effect: {//线特效的配置
        show: true,
        period: 6,//特效动画的时间
        trailLength: 0.7,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
        color: '#fff',
        symbolSize: 3,//特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
      },
      lineStyle: {
        normal: {
          color: '#008A94',
          width: 0,
          curveness: 0.2,//边的曲度，支持从 0 到 1 的值，值越大曲度越大
        }
      },
      data: convertData(item[1])//线数据集。
    },
      {
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],//线两端的标记类型，可以是一个数组分别指定两端
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: '#008A94',
            width: 1,
            opacity: 0.6,
            curveness: 0.2
          },
        },
        data: convertData(item[1])
      },
      {
        type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
        coordinateSystem: 'geo',//该系列使用的坐标系
        zlevel: 2,
        rippleEffect: {//涟漪特效相关配置
          brushType: 'stroke'
        },
        label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        itemStyle: {
          normal: {
            color: '#EE4B13'
          }
        },
        data: item[1].map((dataItem) => {
          return {
            name: dataItem[1].name,
            value: allMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
      });
  });
  series.push({
    type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
    coordinateSystem: 'geo',//该系列使用的坐标系
    zlevel: 2,
    rippleEffect: {//涟漪特效相关配置
      brushType: 'stroke'
    },
    label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
      show: true,
      position: 'right',
      formatter: '{b}'
    },
    itemStyle: {
      normal: {
        color: '#EE4B13'
      }
    },
    data: Object.keys(geoCoordMap).map(name => {
      return return {
        name: dataItem[1].name,
      };
    })item[1].map((dataItem) => {
      return {
        name: dataItem[1].name,
        value: allMap[dataItem[1].name].concat([dataItem[1].value])
      };
    })
  })

  option = {
    backgroundColor: '#404a59',
    title: {
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'world',
      label: {
        normal: {
          show: false,
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
          areaColor: '#EE4B13'
        }
      }
    },
    series,
    tooltip: {
      "trigger": "item",
      "confine": true,
      "formatter": (p) => {
        console.log(p)
        const type = p.componentSubType
        let dataCon = p.data
        if (type === 'effectScatter') {
          return `${dataCon.name}`
        } else {
          let txtCon = `${dataCon.fromName} 到 ${dataCon.toName}`
          return txtCon
        }
      }
    },
  };
  myChart.setOption(option);
})()

