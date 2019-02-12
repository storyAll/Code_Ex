var hoverGJ = false
var callbackClick = function (obj) {
}
var callbackDbclick = function (obj) {
}
var callbackHover = function (obj) {
  return
}
var mouseOverTimer = null, mouseOverTimes = 1200

/***
 * 双击弹出框内容接口，目前具备点击的Object有，厂房、管井、管线、管段
 * @param Type Object的类型，CF表示厂房图标，GJ表示管井图标，GD表示管段，GX表示管线
 * @para ID 点击Object的ID
 * **/
function clearMouseOverTimer () {
  if (mouseOverTimer) {
    clearTimeout(mouseOverTimer)
  }
}

function TriggerMouseDbClick (Type, id, point, pixel) {
  callbackDbclick({
    id: id,
    type: Type,
    point: point
  })
  callbackClick({
    id: id,
    type: Type,
    point: point
  })
}

/***
 * 单击弹出框内容接口,目前具备点击的Object有厂房、管井、管线、管段
 * @param ID   点击Object的ID
 * @param Type  Object的类型，CF表示厂房图标，GJ表示管井图标，GD表示管段，GX表示管线
 * **/
function TriggerMouseClick (Type, id, point, pixel) {
  callbackClick({
    id: id,
    type: Type,
    point: point
  })
}

/***
 * 鼠标滑过弹出框，目前具备滑过事件的Object有厂房、管井、管线、管段
 * @param ID   点击Object的ID
 * @param Type  Object的类型，CF表示厂房图标，GJ表示管井图标，GD表示管段，GX表示管线
 * **/
function TriggerMouseOver (Type, id, point, pixel) {
  var infoWindow
  var dom = callbackHover({
    id: id,
    type: Type,
    point: point
  })
  dom = dom || '<p style=\'font-size:14px;\'>' + Type + ',' + id + '</p>'
  if (Type == 'CF') {
    infoWindow = new BMap.InfoWindow(dom)
  } else if (Type == 'GJ') {
    infoWindow = new BMap.InfoWindow(dom)
  } else if (Type == 'GX') {
    // infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + Type+","+id + "</p>");
    // map.openInfoWindow(infoWindow,point)
    return
  } else if (Type == 'GD') {
    infoWindow = new BMap.InfoWindow(dom)
    map.openInfoWindow(infoWindow, point)
  }
  infoWindow.addEventListener('open', function (type, target, point) { //窗口打开是，隐藏自带的关闭按钮
    $('.BMap_pop>img').hide()
  })
  return infoWindow
}

var tfMap = null
var TfMap = (function () {
  function TfMap (Type, beforeLabelStyle, afterLabelStyle) {
    this.Type = Type //目前所处模块 1表示设备管理，2表示合同管理，3表示工单管理
    this.map = map
    this.CFbeforeLabelStyle = beforeLabelStyle //点击前厂房样式
    this.CFafterLabelStyle = afterLabelStyle //点击后厂房样式
    this.map.clearOverlays()
    this.GDArray = new Array() //储存管段索引;
    this.GXArray = new Array() //管线索引
    this.CFArray = new Array() //厂房索引
    this.GJArray = new Array() //管井索引
    this.GjArrayIds = new Array()

    this.currentLabel = null //当前点击厂房对应的l  abel
    this.currentCFMarker = null //1020
    this.currentGJMarker = null//1020
    this.MarkerClickd = false //判断是否已经响应了Marker点击事件，解决点击时map和marker冲突问题
    // 百度地图API功能
    this.TfMapInit()
  }

  //临时添加工段显示影藏
  TfMap.prototype.TempLabel = function (isAdd) {
    if (this.Type != 3) return
    for (var i = 0; i < this.CFArray.length; i++) {

      var CF = this.CFArray[i]
      var visibility
      if (isAdd) {
        CF.getLabel().setStyle({display: 'block'})
      } else {
        CF.getLabel().setStyle({display: 'none'})
      }
    }
  }
  //Object高亮效果
  TfMap.prototype.ObjectHeighLight = function (Type, ID) {
    if (Type == 'CF') {
      for (var i = 0; i < this.CFArray.length; i++) {
        var CF = this.CFArray[i]
        if (CF.WorkBuildingID == ID) {
          this.MarkerClickd = true
          if (this.currentCFMarker != null) {
            this.currentCFMarker.setIcon(this.InitIcon('icon_house_normal.png', 30, 30, 0, 0))
          }
          this.currentCFMarker = CF
          this.currentCFMarker.setIcon(this.InitIcon('icon_house_selected.png', 30, 30, 0, 0))
          break
        }
      }
    } else if (Type == 'GJ') {
      for (var i = 0; i < this.GJArray.length; i++) {
        var GJ = this.GJArray[i]
        if (GJ.id == ID) {
          this.MarkerClickd = true
          console.log('ObjectHeighLight GJ=>',GJ,this.currentGJMarker)

          if (this.currentGJMarker != null) {

            this.currentGJMarker.setIcon(this.InitIcon('icon_well_normal.png', 20, 20, 15, 15))
          }
          this.currentGJMarker = GJ
          this.currentGJMarker.setIcon(this.InitIcon('icon_well_selected.png', 20, 20, 15, 15))
          // break
        }
      }
    }
  }

  //清除厂房选中效果
  TfMap.prototype.ClearCFSelect = function () {
    this.currentCFMarker.setIcon(this.InitIcon('icon_house_normal.png', 30, 30, 0, 0))
  }
  //清除管井选中效果
  TfMap.prototype.ClearGJSelect = function () {
    this.currentGJMarker.setIcon(this.InitIcon('icon_well_normal.png', 20, 20, 15, 15))
  }

  //添加图标
  TfMap.prototype.InitIcon = function (path, widht, height, offsetx, offsety) {
    return new BMap.Icon(path, new BMap.Size(50, 50), {
      imageSize: new BMap.Size(widht, height),
      imageOffset: new BMap.Size(offsetx, offsety)
    })
  }
  //定位到主视图
  TfMap.prototype.LocateView = function (mainPoint, mainLevel) {
    this.map.centerAndZoom(mainPoint, mainLevel)
  }

  /**
   * 管段是否高亮
   * @param array  管段ID数组
   * @param isHigLight 高亮/取消高亮
   * **/
  TfMap.prototype.HighLight = function (array, isHigLight) {
    // console.log('highlight=>',this.GDArray)
    // if (this.Type != 2) return
    if (array.length <= 0) return
    for (var i = 0; i < this.GDArray.length; i++) {
      var polyineGD = this.GDArray[i]
      if (isHigLight && array.indexOf(polyineGD.id) != -1) {
        polyineGD.setStrokeWeight(7)
      } else if (isHigLight) {
        polyineGD.setStrokeOpacity(0.2)
      } else {
        polyineGD.setStrokeWeight(4)
        polyineGD.setStrokeOpacity(1.0)
      }
    }
  }

  /**
   * 管线是否高亮
   * @param array  线ID数组
   * @param isHigLight 高亮/取消高亮
   * **/
  TfMap.prototype.HighLightGX = function (array, isHigLight) {
    if (array.length <= 0) return
    for (var i = 0; i < this.GXArray.length; i++) {
      var polyineGX = this.GXArray[i]
      if (isHigLight && array.indexOf(polyineGX.id) != -1) {
        polyineGX.setStrokeWeight(7)
      } else if (isHigLight) {
        polyineGX.setStrokeOpacity(0.2)
      } else {
        polyineGX.setStrokeWeight(4)
        polyineGX.setStrokeOpacity(1.0)
      }
    }
  }
  //放大
  TfMap.prototype.ZoomIn = function () {
    this.map.zoomIn()
  }
  //缩小
  TfMap.prototype.ZoomOut = function () {
    this.map.zoomOut()
  }
  TfMap.prototype.TfMapInit = function () {
    var self = this
    if (this.Type == 1 || this.Type == 3) { //设备管理,工单管理 //添加厂房

      $.getJSON('厂房.json', function (result) {
        var wbData = result.WorkBuildingInfoTree
        for (var i = 0; i < wbData.length; i++) {
          var myIcon = self.InitIcon('icon_house_normal.png', 30, 30, 0, 0)
          var marker = new BMap.Marker(new BMap.Point(wbData[i].X, wbData[i].Y), {
            icon: myIcon
          })
          marker.WorkBuildingID = wbData[i].WorkBuildingID
          marker.Type = 'CF'
          // var LabelStyle = JSON.parse(JSON.stringify(self.CFbeforeLabelStyle))
          var LabelStyle = self.CFbeforeLabelStyle
          var Labelstr
          if (self.Type == 3) {
            if (marker.WorkBuildingID == 'wb_0') {
              Labelstr = '<div style="position: absolute;z-index:8888;font-size: 16px">施洛特园区厂房 <br> 待处理工单 12 </div><div style=\'\n' +
                '    content: "";\n' +
                '  width: 0px;\n' +
                '  height: 0px;\n' +
                '  border-width: 0 26px 26px;\n' +
                '  border-style: solid;\n' +
                '  border-color: transparent transparent #000000; /*透明 透明  灰*/\n' +
                '  margin: 0px auto;\n' +
                '  position: absolute;\n' +
                '  transform: rotate(110deg);\n' +
                '  margin-left: -20.5px;\n' +
                '  left: calc( 10px );\n' +
                '  bottom: -6px;\n' +
                '\'></div>'
              LabelStyle.width = '120px'
              LabelStyle.height = '40px'
              LabelStyle.borderRadius = '8px'
              LabelStyle.position = 'absolute'
              LabelStyle.padding = '10px 15px'
              LabelStyle.marginTop = '-30px'
              LabelStyle.marginLeft = '-10px'
              LabelStyle.backgroundColor = '#000000'
            }
            else if (marker.WorkBuildingID == 'wb_1') {
              Labelstr = '<div style="position: absolute;z-index:8888;font-size: 16px">施洛特园区厂房 <br> 待处理工单 6 </div><div style=\'\n' +
                '    content: "";\n' +
                '  width: 0px;\n' +
                '  height: 0px;\n' +
                '  border-width: 0 26px 26px;\n' +
                '  border-style: solid;\n' +
                '  border-color: transparent transparent #000000; /*透明 透明  灰*/\n' +
                '  margin: 0px auto;\n' +
                '  position: absolute;\n' +
                '  transform: rotate(110deg);\n' +
                '  margin-left: -20.5px;\n' +
                '  left: calc( 10px );\n' +
                '  bottom: -6px;\n' +
                '\'></div>'
              LabelStyle.width = '120px'
              LabelStyle.height = '40px'
              LabelStyle.borderRadius = '8px'
              LabelStyle.position = 'absolute'
              LabelStyle.padding = '10px 15px'
              LabelStyle.marginTop = '-30px'
              LabelStyle.marginLeft = '-10px'
              LabelStyle.backgroundColor = '#000000'
            }
            else if ((marker.WorkBuildingID == 'wb_2' || marker.WorkBuildingID == 'wb_3' || marker.WorkBuildingID == 'wb_4')) {
              Labelstr = '<div style="position: absolute;z-index:8888;font-size: 16px">施洛特园区厂房 <br> 待处理工单 2 </div><div style=\'\n' +
                '    content: "";\n' +
                '  width: 0px;\n' +
                '  height: 0px;\n' +
                '  border-width: 0 26px 26px;\n' +
                '  border-style: solid;\n' +
                '  border-color: transparent transparent #000000; /*透明 透明  灰*/\n' +
                '  margin: 0px auto;\n' +
                '  position: absolute;\n' +
                '  transform: rotate(110deg);\n' +
                '  margin-left: -20.5px;\n' +
                '  left: calc( 10px );\n' +
                '  bottom: -6px;\n' +
                '\'></div>'
              LabelStyle.width = '120px'
              LabelStyle.height = '40px'
              LabelStyle.borderRadius = '8px'
              LabelStyle.position = 'absolute'
              LabelStyle.padding = '10px 15px'
              LabelStyle.marginTop = '-30px'
              LabelStyle.marginLeft = '-10px'
              LabelStyle.backgroundColor = '#000000'
            }
          }  else {
            Labelstr = '<div style="position: absolute;z-index:8888;font-size: 16px">施洛特园区厂房 <br></div><div style=\'\n' +
              '    content: "";\n' +
              '  width: 0px;\n' +
              '  height: 0px;\n' +
              '  border-width: 0 26px 26px;\n' +
              '  border-style: solid;\n' +
              '  border-color: transparent transparent #000000; /*透明 透明  灰*/\n' +
              '  margin: 0px auto;\n' +
              '  position: absolute;\n' +
              '  transform: rotate(110deg);\n' +
              '  margin-left: -20.5px;\n' +
              '  left: calc( 10px );\n' +
              '  bottom: -6px;\n' +
              '\'></div>'
            LabelStyle.width = '120px'
            LabelStyle.height = '20px'
            LabelStyle.borderRadius = '8px'
            LabelStyle.position = 'absolute'
            LabelStyle.padding = '10px 15px'
            LabelStyle.marginTop = '-30px'
            LabelStyle.marginLeft = '-10px'
            LabelStyle.backgroundColor = '#000000'
          }
          var label = new BMap.Label(Labelstr, {
            offset: new BMap.Size(20, -20)
          })
          label.WorkBuildingID = wbData[i].WorkBuildingID
          label.Type = 'CF'
          label.setStyle(LabelStyle)
          marker.setLabel(label)
          marker.setZIndex(555)
          //鼠标悬停,切换图片
          marker.addEventListener('mouseover', function () {
            var that = this
            clearMouseOverTimer()
            mouseOverTimer = setTimeout(function () {
              that.openInfoWindow(TriggerMouseOver(that.Type, that.WorkBuildingID))
              //   var myIcon = self.InitIcon('icon_house_hover.png', 30, 30, 0, 0)
              //   that.setIcon(myIcon)
            }, mouseOverTimes)
          })
          //鼠标离开切换图标
          marker.addEventListener('mouseout', function () {
            this.closeInfoWindow()
            clearMouseOverTimer()
            // var myIcon = self.InitIcon('icon_house_normal.png', 30, 30, 0, 0)
            // this.setIcon(myIcon)
          })
          marker.addEventListener('click', function () {
            //厂房图标选中
            self.MarkerClickd = true
            if (self.currentCFMarker != null) {
              self.currentCFMarker.setIcon(self.InitIcon('icon_house_normal.png', 30, 30, 0, 0))
            }
            self.currentCFMarker = this
            self.currentCFMarker.setIcon(self.InitIcon('icon_house_selected.png', 30, 30, 0, 0))
            //厂房标签
            if (self.currentLabel != null) {
              // self.currentLabel.setStyle(self.CFbeforeLabelStyle) //还原到以前状态
            }
            self.currentLabel = this.getLabel()
            // self.currentLabel.setStyle(self.CFafterLabelStyle)
            //厂房图标点击事件
            this.openInfoWindow(TriggerMouseClick(this.Type, this.WorkBuildingID))
          })
          marker.addEventListener('dblclick', function () {
            this.openInfoWindow(TriggerMouseDbClick(this.Type, this.WorkBuildingID))
          })
          self.CFArray.push(marker)
          map.addOverlay(marker)
        }
      })
      // //添加管线
      // $.getJSON('绘图点.json', function (result) {
      //   var wbData = result
      //   var PnID, PipePartInfo, Name
      //   for (var i = 0; i < wbData.length; i++) {
      //     var pois = []
      //     PnID = wbData[i].PnID
      //     PnName = wbData[i].Name
      //     PipePartInfo = wbData[i].PipePartInfo
      //     for (var j = 0; j < PipePartInfo.length; j++) {
      //       var PipePartID = PipePartInfo[j].PipePartID
      //       var PipePartName = PipePartInfo[j].PipePartName
      //       var Load = PipePartInfo[j].Load
      //       for (var m = 0; m < PipePartInfo[j].PointsPath.length; m++) {
      //         var X = PipePartInfo[j].PointsPath[m].X
      //         var Y = PipePartInfo[j].PointsPath[m].Y
      //         var PointID = PipePartInfo[j].PointsPath[m].PointID
      //         var Name = PipePartInfo[j].PointsPath[m].Name
      //         var IsPipeWell = PipePartInfo[j].PointsPath[m].IsPipeWell //是否为管井
      //         var poi = new BMap.Point(X, Y)
      //         pois.push(poi)
      //         //添加管井,排除三种情况，出去第一个每个管段的最后一个删除，出去最后一个管段的，其他管段最后一个删除，非管井点删除
      //         if (m != 0 && m == PipePartInfo[j].PointsPath.length - 1 && j != PipePartInfo.length - 1 || !IsPipeWell) continue //管段间有重复的起始点，不重复记录管段的最后一个点
      //         var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
      //         var marker = new BMap.Marker(new BMap.Point(X, Y), {
      //           icon: myIcon
      //         })
      //         marker.Type = 'GJ'
      //         marker.id = PointID
      //         marker.name = Name
      //         marker.setZIndex(666)
      //         //marker.setSize(new BMap.Size(30,30));
      //         //鼠标悬停,切换图片，触发事件
      //         marker.addEventListener('mouseover', function () {
      //           var that = this
      //           clearMouseOverTimer()
      //           mouseOverTimer = setTimeout(function () {
      //             //   var myIcon = self.InitIcon('icon_well_hover.png', 20, 20, 15, 15)
      //             //   that.setIcon(myIcon)
      //             that.openInfoWindow(TriggerMouseOver(that.Type, that.id))
      //           }, mouseOverTimes)
      //         })
      //         //鼠标离开切换图标
      //         marker.addEventListener('mouseout', function () {
      //           // var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
      //           // this.setIcon(myIcon)
      //           this.closeInfoWindow()
      //           clearMouseOverTimer()
      //         })
      //         marker.addEventListener('click', function () {
      //
      //           if (self.currentGJMarker != null) {
      //             self.currentGJMarker.setIcon(self.InitIcon('icon_well_normal.png', 20, 20, 15, 15))
      //           }
      //           self.currentGJMarker = this
      //           self.currentGJMarker.setIcon(self.InitIcon('icon_well_selected.png', 20, 20, 15, 15))
      //           //厂房图标点击事件
      //           this.openInfoWindow(TriggerMouseClick(this.Type, this.id))
      //         })
      //
      //         marker.addEventListener('dblclick', function () {
      //           this.openInfoWindow(TriggerMouseDbClick(this.Type, this.id))
      //         })
      //         self.GJArray.push(marker)
      //         map.addOverlay(marker)
      //       }
      //
      //     }
      //     var lineColoer
      //     if (Load %3 == 1 ) {
      //       lineColoer = '#00FF00'
      //     } else if (Load %3 == 2) {
      //       lineColoer = '#FFFF00'
      //     } else{
      //       lineColoer = '#FF0000'
      //     }
      //     //添加管线
      //     var polyline = new BMap.Polyline(pois, {
      //       enableEditing: false, //是否启用线编辑，默认为false
      //       enableClicking: true, //是否响应点击事件，默认为true
      //       //icons:[icons],
      //       strokeWeight: '4', //折线的宽度，以像素为单位
      //       strokeOpacity: 1.0, //折线的透明度，取值范围0 - 1
      //       // strokeColor: '#306bd8' //折线颜色
      //       strokeColor: lineColoer //折线颜色
      //     })
      //     polyline.id = PnID
      //     polyline.Name = PnName
      //     polyline.Type = 'GX'
      //     //管线滑过效果
      //     // polyline.addEventListener('mouseover', function (e) {
      //     //   var that = this
      //     //   clearMouseOverTimer()
      //     //   mouseOverTimer = setTimeout(function () {
      //     //     that.map.openInfoWindow(TriggerMouseOver(that.Type, that.id, e.point, e.pixel))
      //     //   }, mouseOverTimes)
      //     // })
      //     // polyline.addEventListener('mouseout', function (e) {
      //     //   this.map.closeInfoWindow()
      //     //   clearMouseOverTimer()
      //     // })
      //
      //     polyline.addEventListener('click', function (e) {
      //       this.map.openInfoWindow(TriggerMouseClick(this.Type, this.id, e.point, e.pixel))
      //     })
      //     polyline.addEventListener('dblclick', function (e) {
      //       this.map.openInfoWindow(TriggerMouseDbClick(this.Type, this.id, e.point, e.pixel))
      //     })
      //     self.GXArray.push(polyline)
      //     map.addOverlay(polyline)
      //
      //   }
      // })
      //添加管段
      $.getJSON('绘图点.json', function (result) {
        var wbData = result
        var PnID, PipePartInfo, Name
        for (var i = 0; i < wbData.length; i++) {
          PnID = wbData[i].PnID
          PnName = wbData[i].Name
          PipePartInfo = wbData[i].PipePartInfo
          for (var j = 0; j < PipePartInfo.length; j++) {
            var PipePartID = PipePartInfo[j].PipePartID
            var PipePartName = PipePartInfo[j].PipePartName
            var Load = PipePartInfo[j].Load
            var pois = []
            for (var m = 0; m < PipePartInfo[j].PointsPath.length; m++) {
              var X = PipePartInfo[j].PointsPath[m].X
              var Y = PipePartInfo[j].PointsPath[m].Y
              var PointID = PipePartInfo[j].PointsPath[m].PointID
              var Name = PipePartInfo[j].PointsPath[m].Name
              var IsPipeWell = PipePartInfo[j].PointsPath[m].IsPipeWell //是否为管井
              var poi = new BMap.Point(X, Y)
              pois.push(poi)
              //添加管井,排除三种情况，出去第一个每个管段的最后一个删除，出去最后一个管段的，其他管段最后一个删除，非管井点删除
              if (m != 0 && m == PipePartInfo[j].PointsPath.length - 1 && j != PipePartInfo.length - 1 || !IsPipeWell) continue //管段间有重复的起始点，不重复记录管段的最后一个点
              var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
              var marker = new BMap.Marker(new BMap.Point(X, Y), {
                icon: myIcon
              })
              marker.Type = 'GJ'
              marker.id = PointID
              marker.name = Name
              marker.setZIndex(555)
              //marker.setSize(new BMap.Size(30,30));
              //鼠标悬停,切换图片，触发事件
              marker.addEventListener('mouseover', function () {
                var that = this
                hoverGJ = true
                clearMouseOverTimer()
                mouseOverTimer = setTimeout(function () {
                  //   var myIcon = self.InitIcon('icon_well_hover.png', 20, 20, 15, 15)
                  //   that.setIcon(myIcon)
                  that.openInfoWindow(TriggerMouseOver(that.Type, that.id))
                }, mouseOverTimes)
              })
              //鼠标离开切换图标
              marker.addEventListener('mouseout', function () {
                hoverGJ = false
                // var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
                // this.setIcon(myIcon)
                this.closeInfoWindow()
                clearMouseOverTimer()
              })
              marker.addEventListener('click', function () {
                if (self.currentGJMarker != null) {
                  self.currentGJMarker.setIcon(self.InitIcon('icon_well_normal.png', 20, 20, 15, 15))
                }
                self.currentGJMarker = this

                self.currentGJMarker.setIcon(self.InitIcon('icon_well_selected.png', 20, 20, 15, 15))
                //厂房图标点击事件
                this.openInfoWindow(TriggerMouseClick(this.Type, this.id))
              })
              marker.addEventListener('dblclick', function (e) {
                this.openInfoWindow(TriggerMouseDbClick(this.Type, this.id))
              })
              self.GJArray.push(marker)
              map.addOverlay(marker)
            }
            var lineColoer
            if (Load < 0.66) {
              lineColoer = '#00FF00'
            } else if (Load > 0.66 && Load <= 0.88) {
              lineColoer = '#FFFF00'
            } else {
              lineColoer = '#FF0000'
            }
            //添加管段
            var polyline = new BMap.Polyline(pois, {
              enableEditing: false,
              enableClicking: true,
              //icons:[icons],
              strokeWeight: '4',
              strokeOpacity: 1.0,
              strokeColor: lineColoer
            })
            polyline.id = PipePartID
            polyline.Name = PipePartName
            polyline.Load = Load
            polyline.Type = 'GD'
            self.GDArray.push(polyline)//添加管段索引
            //管线滑过效果
            polyline.addEventListener('mouseover', function (e) {

              var that = this
              if(hoverGJ == false){
                console.log('0,2 管线 mouseover=>')
                clearMouseOverTimer()
                mouseOverTimer = setTimeout(function () {
                  that.map.openInfoWindow(TriggerMouseOver(that.Type, that.id, e.point, e.pixel))
                }, mouseOverTimes)
              }

            })
            polyline.addEventListener('mouseout', function (e) {
              this.map.closeInfoWindow()
              clearMouseOverTimer()
            })
            polyline.addEventListener('click', function (e) {
              this.map.openInfoWindow(TriggerMouseClick(this.Type, this.id, e.point, e.pixel))
            })
            polyline.addEventListener('dblclick', function (e) {
              this.map.openInfoWindow(TriggerMouseDbClick(this.Type, this.id, e.point, e.pixel))
            })
            self.GDArray.push(polyline)
            map.addOverlay(polyline)
          }
        }
      })
    }
    else if (this.Type == 2) { //合同管理  //添加厂房

      $.getJSON('厂房.json', function (result) {
        var wbData = result.WorkBuildingInfoTree
        for (var i = 0; i < wbData.length; i++) {
          var myIcon = self.InitIcon('icon_house_normal.png', 30, 30, 0, 0)
          var marker = new BMap.Marker(new BMap.Point(wbData[i].X, wbData[i].Y), {
            icon: myIcon
          })
          marker.WorkBuildingID = wbData[i].WorkBuildingID
          marker.Type = 'CF'
          // var LabelStyle = JSON.parse(JSON.stringify(self.CFbeforeLabelStyle))
          var LabelStyle = self.CFbeforeLabelStyle
          var LabelStr = '<div style="position: absolute;z-index:8888;font-size: 16px;">施洛特园区厂房 <br></div><div style=\'\n' +
            '    content: "";\n' +
            '  width: 0px;\n' +
            '  height: 0px;\n' +
            '  border-width: 0 26px 26px;\n' +
            '  border-style: solid;\n' +
            '  border-color: transparent transparent #000000; /*透明 透明  灰*/\n' +
            '  margin: 0px auto;\n' +
            '  position: absolute;\n' +
            '  transform: rotate(110deg);\n' +
            '  margin-left: -20.5px;\n' +
            '  left: calc( 10px );\n' +
            '  bottom: -6px;\n' +
            '\'></div>'
          LabelStyle.width = '130px'
          LabelStyle.height = '20px'
          LabelStyle.borderRadius = '8px'
          LabelStyle.position = 'absolute'
          LabelStyle.padding = '10px 15px'
          LabelStyle.marginTop = '-30px'
          LabelStyle.marginLeft = '-10px'
          LabelStyle.backgroundColor = '#000000'
          // var label = new BMap.Label(wbData[i].Name, {
          //   offset: new BMap.Size(20, -20)
          // })
          var label = new BMap.Label(LabelStr, {
            offset: new BMap.Size(20, -20)
          })
          label.WorkBuildingID = wbData[i].WorkBuildingID
          label.Type = 'CF'
          // label.setStyle(self.CFbeforeLabelStyle)
          label.setStyle(LabelStyle)
          //标签点击事件
          // label.addEventListener("click", function(){
          //         this.map.openInfoWindow(CfClick(this.Type,this.WorkBuildingID),point);   //提示信息
          //      });
          marker.setLabel(label)
          marker.setZIndex(555)
          //鼠标悬停,切换图片
          marker.addEventListener('mouseover', function () {
            var that = this
            clearMouseOverTimer()
            mouseOverTimer = setTimeout(function () {
              //   var myIcon = self.InitIcon('icon_house_hover.png', 30, 30, 0, 0)
              //   that.setIcon(myIcon)
              that.openInfoWindow(TriggerMouseOver(that.Type, that.WorkBuildingID))
            }, mouseOverTimes)
          })
          //鼠标离开切换图标
          marker.addEventListener('mouseout', function () {
            // var myIcon = self.InitIcon('icon_house_normal.png', 30, 30, 0, 0)
            // this.setIcon(myIcon)
            this.closeInfoWindow()
            clearMouseOverTimer()
          })
          marker.addEventListener('click', function () {
            self.MarkerClickd = true
            //厂房点击图标
            if (self.currentCFMarker != null) {
              self.currentCFMarker.setIcon(self.InitIcon('icon_house_normal.png', 30, 30, 0, 0))
            }
            self.currentCFMarker = this
            self.currentCFMarker.setIcon(self.InitIcon('icon_house_selected.png', 30, 30, 0, 0))
            if (self.currentLabel != null) {
              // self.currentLabel.setStyle(self.CFbeforeLabelStyle) //还原到以前状态
            }
            self.currentLabel = this.getLabel()
            // self.currentLabel.setStyle(self.CFafterLabelStyle)
            //厂房图标点击事件
            this.openInfoWindow(TriggerMouseClick(this.Type, this.WorkBuildingID))
          })

          marker.addEventListener('dblclick', function (e) {
            this.openInfoWindow(TriggerMouseDbClick(this.Type, this.WorkBuildingID))
          })
          self.CFArray.push(marker)
          map.addOverlay(marker)
        }
      })
      //添加管段
      $.getJSON('绘图点.json', function (result) {
        var wbData = result
        var PnID, PipePartInfo, Name
        for (var i = 0; i < wbData.length; i++) {
          PnID = wbData[i].PnID
          PnName = wbData[i].Name
          PipePartInfo = wbData[i].PipePartInfo
          for (var j = 0; j < PipePartInfo.length; j++) {
            var PipePartID = PipePartInfo[j].PipePartID
            var PipePartName = PipePartInfo[j].PipePartName
            var Load = PipePartInfo[j].Load
            var pois = []
            for (var m = 0; m < PipePartInfo[j].PointsPath.length; m++) {
              var X = PipePartInfo[j].PointsPath[m].X
              var Y = PipePartInfo[j].PointsPath[m].Y
              var PointID = PipePartInfo[j].PointsPath[m].PointID
              var Name = PipePartInfo[j].PointsPath[m].Name
              var IsPipeWell = PipePartInfo[j].PointsPath[m].IsPipeWell //是否为管井
              var poi = new BMap.Point(X, Y)
              pois.push(poi)
              //添加管井,排除三种情况，出去第一个每个管段的最后一个删除，出去最后一个管段的，其他管段最后一个删除，非管井点删除
              if (m != 0 && m == PipePartInfo[j].PointsPath.length - 1 && j != PipePartInfo.length - 1 || !IsPipeWell) continue //管段间有重复的起始点，不重复记录管段的最后一个点
              var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
              var marker = new BMap.Marker(new BMap.Point(X, Y), {
                icon: myIcon
              })
              marker.Type = 'GJ'
              marker.id = PointID
              marker.name = Name
              marker.setZIndex(666)
              //marker.setSize(new BMap.Size(30,30));
              //鼠标悬停,切换图片，触发事件
              marker.addEventListener('mouseover', function () {
                console.log('管井 mouseover=>')
                hoverGJ = true
                var that = this
                clearMouseOverTimer()
                mouseOverTimer = setTimeout(function () {
                  //   var myIcon = self.InitIcon('icon_well_hover.png', 20, 20, 15, 15)
                  //   that.setIcon(myIcon)
                  that.openInfoWindow(TriggerMouseOver(that.Type, that.id))
                }, mouseOverTimes)
              })
              //鼠标离开切换图标
              marker.addEventListener('mouseout', function () {
                console.log('管井 mouseout=>')
                hoverGJ = false
                // var myIcon = self.InitIcon('icon_well_normal.png', 20, 20, 15, 15)
                // this.setIcon(myIcon)
                this.closeInfoWindow()
                clearMouseOverTimer()
              })
              marker.addEventListener('click', function () {
                if (self.currentGJMarker != null) {
                  self.currentGJMarker.setIcon(self.InitIcon('icon_well_normal.png', 20, 20, 15, 15))
                }
                self.currentGJMarker = this
                console.log('管井=> self.currentGJMarker',self.currentGJMarker)
                self.currentGJMarker.setIcon(self.InitIcon('icon_well_selected.png', 20, 20, 15, 15))
                //厂房图标点击事件
                this.openInfoWindow(TriggerMouseClick(this.Type, this.id))
              })
              marker.addEventListener('dblclick', function (e) {
                this.openInfoWindow(TriggerMouseDbClick(this.Type, this.id))
              })
              self.GJArray.push(marker)
              map.addOverlay(marker)
            }
            var lineColoer
            if (Load < 0.33) {
              lineColoer = '#00FF00'
            } else if (Load < 0.66 && Load >= 0.33) {
              lineColoer = '#FFFF00'
            } else if (0.66 <= Load) {
              lineColoer = '#FF0000'
            }
            //添加管段
            var polyline = new BMap.Polyline(pois, {
              enableEditing: false,
              enableClicking: true,
              //icons:[icons],
              strokeWeight: '4',
              strokeOpacity: 1.0,
              strokeColor: lineColoer
            })
            // console.log('polyline=>',polyline,polyline.setZIndex())
            polyline.id = PipePartID
            polyline.Name = PipePartName
            polyline.Load = Load
            polyline.Type = 'GD'
            self.GDArray.push(polyline)//添加管段索引
            //管线滑过效果
            polyline.addEventListener('mouseover', function (e) {
              // console.log('管线 mouseover=>')
              var that = this
              if(hoverGJ  === false){
                clearMouseOverTimer()
                mouseOverTimer = setTimeout(function () {
                  that.map.openInfoWindow(TriggerMouseOver(that.Type, that.id, e.point, e.pixel))
                }, mouseOverTimes)
              }
            })
            polyline.addEventListener('mouseout', function (e) {
              this.map.closeInfoWindow()
              clearMouseOverTimer()
            })
            polyline.addEventListener('click', function (e) {
              this.map.openInfoWindow(TriggerMouseClick(this.Type, this.id, e.point, e.pixel))
            })
            polyline.addEventListener('dblclick', function (e) {
              this.map.openInfoWindow(TriggerMouseDbClick(this.Type, this.id, e.point, e.pixel))
            })
            self.GDArray.push(polyline)
            map.addOverlay(polyline)
          }
        }
      })
    }

    this.map.addEventListener('click', function () {
      if (self.currentLabel == null) return
      if (self.MarkerClickd == true) {
        self.MarkerClickd = false
        return
      }
      self.currentLabel.setStyle(self.CFbeforeLabelStyle)
    })
  }
  return TfMap
}())

function BMapInit (Type) {
  // 如果css的属性名中包含连字符，需要将连字符
  // 去掉并将其后的字母进行大写处理，例如：背景色属性要写成：backgroundColor
  var CFbeforeLabelStyle = new Object() //点击前厂房样式
  CFbeforeLabelStyle.color = 'red',
    CFbeforeLabelStyle.fontSize = '12px',
    CFbeforeLabelStyle.opacity = 0.5,
    CFbeforeLabelStyle.borderStyle = 'none',
    CFbeforeLabelStyle.width = '60px',
    CFbeforeLabelStyle.height = '15px',
    CFbeforeLabelStyle.textAlign = 'center',
    CFbeforeLabelStyle.color = 'white',
    CFbeforeLabelStyle.backgroundColor = '#648a94'
  var CFafterLabelStyle = new Object() //点击后厂房样式
  CFafterLabelStyle.color = 'red',
    CFafterLabelStyle.fontSize = '12px',
    CFafterLabelStyle.opacity = 1.0,
    CFafterLabelStyle.borderStyle = 'none',
    CFafterLabelStyle.width = '70px',
    CFafterLabelStyle.height = '20px',
    CFafterLabelStyle.textAlign = 'center',
    CFafterLabelStyle.color = 'white',
    CFafterLabelStyle.backgroundColor = '#648a94'
  tfMap = new TfMap(Type, CFbeforeLabelStyle, CFafterLabelStyle)
}

function init (callbackObj) {
  callbackClick = callbackObj.click
  callbackDbclick = callbackObj.dbclick
  callbackHover = callbackObj.hover
}
