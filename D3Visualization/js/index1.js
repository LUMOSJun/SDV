const SVG_HEIGHT = 300;    //常量
const SVG_WIDTH = 930;     //常量
const MARGIN = { TOP: 20, RIGHT: 20, LEFT: 30, BOTTOM: 20 } //间距


function btnAction1() {
    d3.select("#bar").selectAll("*").remove();//清空画布
    var datalist = [2, 11, 26, 89, 68, 56, 51, 49, 40, 39, 34, 35,
        45, 58, 63, 53, 46, 52, 34, 28, 52, 852, 474, 401, 329, 12]

    let ticks = ["19-Dec", "20-Jan", "20-Feb", "20-Mar", "20-Apr", "20-May", "20-Jun",
        "20-Jul", "20-Aug", "20-Sep", "20-Oct", "20-Nov", "20-Dec", "21-Jan", "21-Feb",
        "21-Mar", "21-Apr", "21-May", "21-Jun", "21-Jul", "21-Aug", "21-Sep", "21-Oct",
        "21-Nov", "21-Dec", "22-Jan"];
    console.log(datalist);//模拟数据
    console.log(ticks);
    inti(datalist, ticks);
};

function btnAction2() {
    d3.select("#bar").selectAll("*").remove();
    //var datalist = [6,11,17,20,19,26,9,1,0,1,2,1,1,0]
    //let ticks = ["20-Dec", "21-Jan", "21-Feb",
    //    "21-Mar", "21-Apr", "21-May", "21-Jun", "21-Jul", "21-Aug", "21-Sep", "21-Oct",
    //    "21-Nov", "21-Dec", "22-Jan"];
    
    d3.csv("data/A.csv").than(function(data) {
        console.log(data);
    });
    var ticks = data.map(function(d) { return d.Month }) ;
    var datalist = data.map(function(d) { return d.Alpha }) ;
       
    console.log(datalist);//模拟数据
    console.log(ticks);
    inti(datalist, ticks);
};

function btnAction3() {
    d3.select("#bar").selectAll("*").remove();
    var datalist = [1, 21, 26, 89, 68, 56, 51, 49, 40, 39, 34, 35,
        45, 58, 63, 53, 6, 52, 34, 28, 52, 52, 74, 40, 29, 12]
    console.log(datalist);//模拟数据
    inti(datalist);
};

function btnAction4() {
    d3.select("#bar").selectAll("*").remove();
    var datalist = [12, 21, 26, 89, 68, 56, 51, 49, 4, 9, 4, 35,
        45, 58, 63, 53, 46, 52, 34, 28, 52, 52, 74, 40, 9, 12]
    console.log(datalist);//模拟数据
    inti(datalist);
};

function inti(datalist, ticks) {
    var svg = d3.select("#bar").append("svg")
        .attr("height", SVG_HEIGHT)
        .attr("width", SVG_WIDTH);

    //序数比例尺    宽度计算
    const xScale = d3.scaleBand()
        .domain(d3.range(datalist.length)) //[0,1,2,3,4]
        .range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
        .paddingInner(0.1)    //每个柱之间的横向间隙

    //线性比例尺   高度计算
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(datalist)])
        .range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0])

    //水平方向坐标轴
    var axisBottom = d3.axisBottom(xScale)
    //  svg.append('g').call(axisBottom)
    axisBottom(
        svg.append('g')
            .attr('class', 'xaxis')
            .attr("transform", `translate(${MARGIN.LEFT},${SVG_HEIGHT - MARGIN.TOP})`)
            .style("font-size", "9px")

    )

    //垂直方向坐标轴
    var axisLeft = d3.axisLeft(yScale)
    axisLeft(
        svg.append("g")
            .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
    )

    //更新水平方向tick值


    d3.select('.xaxis').selectAll('text').data(ticks)
        .text((d) => {
            return d;
        })

    svg.selectAll('rect')   //寻找rect标签
        .data(datalist)           //绑定数据源
        .enter()
        .append('rect')         //添加rect标签
        .classed('bar', true)     //样式名
        .attr('x', function (d, i) {         //x坐标
            return xScale(i) + MARGIN.LEFT;  //根据比例尺计算加上一个常量
        })
        .attr('y', function (d, i) {       //y坐标
            return SVG_HEIGHT - MARGIN.TOP;
        })
        .attr('width', function (d, i) {   //宽度
            return xScale.bandwidth();
        })
        .attr('height', function (d) {     //高度
            return 0;   //一开始是0
        })

        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return 500 * i;
        })
        .attr('y', function (d, i) {
            return yScale(d) + MARGIN.TOP;
        })
        .attr('height', function (d) {
            return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d);
        })

    //文本
    svg.append('g').attr('class', 'textGrop')    //添加一个分组
    svg.select('.textGrop')
        .selectAll('text')   //文本
        .data(datalist)
        .enter()
        .append('text')
        .attr("text-anchor", "middle")    //居中
        .text(function (d, i) {
            return d;
        })
        .attr('x', function (d, i) {   //文本x轴 在柱的中间
            return xScale(i) + MARGIN.LEFT + xScale.bandwidth() / 2;
        })
        .attr('y', function (d, i) {     //文本y轴
            return SVG_HEIGHT - MARGIN.TOP - 10;  //-10让文本在柱体上方10px
        })
        .style("font-size", "10px")
        //动画过渡
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return 500 * i;
        })
        .attr('x', function (d, i) {
            return xScale(i) + MARGIN.LEFT + xScale.bandwidth() / 2;
        })
        .attr('y', function (d, i) {
            return yScale(d) + MARGIN.TOP - 10;
        });

}
