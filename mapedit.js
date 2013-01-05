var map = null;
var markerLayer = null;
var featuresLayer = null;
var layer = null;
//初始化地图
function onPageLoad() {
    layer = new SuperMap.Layer.CloudLayer();
    markerLayer = new SuperMap.Layer.Markers("maker");
    featuresLayer = new SuperMap.Layer.Vector();
    drawLine = new SuperMap.Control.DrawFeature(featuresLayer, SuperMap.Handler.Path, { multi: true });
    drawLine.events.on({ "featureadded": drawCompleted });
    drawPoint = new SuperMap.Control.DrawFeature(featuresLayer, SuperMap.Handler.Point, { multi: true });
    drawPoint.events.on({ "featureadded": drawCompleted });
    drawPolygon = new SuperMap.Control.DrawFeature(featuresLayer, SuperMap.Handler.Polygon, { multi: true });
    drawPolygon.events.on({ "featureadded": drawCompleted });
    map = new SuperMap.Map("mapDiv", { controls: [
                      new SuperMap.Control.PanZoomBar(),
                      new SuperMap.Control.Navigation({
                          dragPanOptions: {
                              enableKinetic: true
                          }
                      }), drawLine, drawPoint, drawPolygon], allOverlays: true
    });
    map.addLayer(layer);
    map.addLayer(featuresLayer);
    map.addLayer(markerLayer);
    map.setCenter(new SuperMap.LonLat(12958399.4681885, 4852082.44060595), 11);
}

function drawLines() {
    drawLine.activate();
}

function drawPoints() {
    var fillColor = document.getElementById("color1").value;
    if (fillColor.indexOf("#") != 0) {
        alert("填充颜色为非法值!");
        return false;
    }
    var strokeColor = document.getElementById("color2").value;
    if (strokeColor.indexOf("#") != 0) {
        alert("边线颜色为非法值!");
        return false;
    }
    var opacity = document.getElementById("txtOpacity").value;
    if (isNaN(opacity)) {
        alert("透明度的范围在【0-1.0】之间!");
        return false;
    }
    var lineWidth = document.getElementById("txtLineWidth").value;
    if (isNaN(lineWidth)) {
        alert("边线宽度应该是数值型");
        return false;
    }
    featuresLayer.style = { fillColor: fillColor, strokeColor: strokeColor, strokeWidth: lineWidth, pointRadius: 6, strokeOpacity: opacity, fillOpacity: opacity, strokeWidth: lineWidth };
    drawPoint.activate();
}
function drawPolygons() {
    drawPolygon.activate();
}

var feature;
function drawCompleted(drawGeometryArgs) {
    var fillColor = document.getElementById("color1").value;
    if (fillColor.indexOf("#") != 0) {
        alert("填充颜色为非法值!");
        return false;
    }
    var strokeColor = document.getElementById("color2").value;
    if (strokeColor.indexOf("#") != 0) {
        alert("边线颜色为非法值!");
        return false;
    }
    var opacity = document.getElementById("txtOpacity").value;
    if (isNaN(opacity)) {
        alert("透明度的范围在【0-1.0】之间!");
        return false;
    }
    var lineWidth = document.getElementById("txtLineWidth").value;
    if (isNaN(lineWidth)) {
        alert("边线宽度应该是数值型");
        return false;
    }
    featuresLayer.style = { fillColor: fillColor, strokeColor: strokeColor, strokeWidth: lineWidth, pointRadius: 6, strokeOpacity: opacity, fillOpacity: opacity, strokeWidth: lineWidth };
    drawLine.deactivate();
    drawPoint.deactivate();
    drawPolygon.deactivate();
    var geometry = drawGeometryArgs.feature.geometry;
    feature = new SuperMap.Feature.Vector(geometry);
}
function clearAll() {
    featuresLayer.removeAllFeatures();
}

function zoomIn() {
    map.zoomIn();
}

function zoomOut() {
    map.zoomOut();
}

//将绘制的图形加载到矢量要素图层上。绘制点、线和面结束后传回的回调函数中都是DrawGeometryArgs类型的参数，而绘制圆后传回的回调函数的参数为 DrawCircleArgs，因此以下这个函数不能将圆加载到矢量图层上

function addScaleBar() {
    //单线比例尺控件样式
    var simpleScaleBarStyle = new SuperMap.Web.Controls.ScaleBarStyle();
    simpleScaleBarStyle.color = "black";
    simpleScaleBarStyle.fontSize = 1;
    simpleScaleBarStyle.mode = SuperMap.Web.Controls.ScaleBarMode.SIMPLE;

    //单线比例尺控件
    var simpleScaleBar = $create(SuperMap.Web.Controls.ScaleBar, { scaleBarStyle: simpleScaleBarStyle, map: map }, null, null, document.getElementById("simpleScaleBarContainer"));

}

//编辑操作，必设指定编辑的地图和矢量图层
function editEntity() {
    var drawAction = $create(SuperMap.Web.Actions.EditFeature, { map: map, featuresLayer: featuresLayer }, null, null, null);
    //drawAction.add_actionCompleted(function (arg) { debugger});
    map.set_action(drawAction);
}



//获取地图当前可视范围
function getMapViewBounds() {
    var objViewBounds = document.getElementById("divViewBounds");
    var view = map.getExtent();
    objViewBounds.innerHTML = "LeftBottom坐标为,<br/>x:" + view.left + "<br/>y:" + view.bottom + "<br/>";
    objViewBounds.innerHTML += "RightTop坐标为，<br/>x:" + view.right + ",<br/>y:" + view.top;
}

//调整窗口大小
function mapResize() {
    var width = document.getElementById("txtWidth").value;
    var height = document.getElementById("txtHeight").value;
    if (isNaN(width) || isNaN(height)) {
        alert("宽和高必须为数值类型");
        return false;
    }
    map.resize(parseInt(width), parseInt(height));
}
//恢复窗口大小
function mapRecovery() {
    map.resize(880, 580);
}

var isshow = false;
function showLegend() {
    if (isshow) {
        document.getElementById("maplegend").style.display = "none";
        isshow = false;
    } else {
        document.getElementById("maplegend").style.display = "block";
        isshow = true;
    }
}