
//页面一进来就发送ajax请求,获取真实的月新增文章数
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/data/article',
    success: function (backData) {
        // console.log(backData);

        var oChart = echarts.init($('#curve_show')[0]);

        if (backData.code == 200) {
            let aCount = [];
            let aDate = [];

            for (var i = 0; i < backData.date.length; i++) {
                aCount.push(backData.date[i].count);
                aDate.push(backData.date[i].date);
            }

            //设置配置项, 调用方法
            var chartopt = {
                title: {
                    text: '月新增文章数',
                    left: 'center',
                    top: '10'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新增文章'],
                    top: '40'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    name: '日',
                    type: 'category',
                    boundaryGap: false,
                    data: aDate
                }],
                yAxis: [{
                    name: '月新增文章数',
                    type: 'value'
                }],
                series: [{
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            },
                            color: 'skyblue'
                        },
                        lineStyle: {
                            color: 'pink'
                        }
                    },
                    data: aCount
                }],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        }, {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])

                    }
                },
                grid: {
                    show: true,
                    x: 50,
                    x2: 50,
                    y: 80,
                    height: 220
                }
            };

            oChart.setOption(chartopt);

        }
    }

});

//发送ajax请求，获取文章数量信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/data/info',
    success: function (response) {
        //查看后台返回数据
        // console.log(response);
        var html = template('countTpl', response);
        // // console.log(html);//查看拼接好的字符串

        // // 3-渲染到页面
        $('#countBox').html(html);
    }
});



$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/data/category',
    success: function (response) {
        console.log(response);

        var oPie = echarts.init(document.getElementById('pie_show'));
        var oPieopt = {
            title: {
                top: 10,
                text: '分类文章数量比',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: [],
            legend: {
                x: 'center',
                top: 65,
                data: []
            },
            toolbox: {
                show: true,
                x: 'center',
                top: 35,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '65%'],
                data: []
            }]
        };
        for (var i = 0; i < response.date.length; i++) {
            // console.log(response.data[i].day_count);
            oPieopt.legend.data.push(response.date[i].name);

            var getRandomColor = function(){    
                return  '#' + (function(color){    
                     return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
                     && (color.length == 6) ?  color : arguments.callee(color);    
                })('');    
             } 

            oPieopt.color.push(getRandomColor());
        };
        // console.log(oPieopt.legend.data);
        // console.log(oPieopt.color);

        for (var j = 0; j < response.date.length; j++) {
            // console.log(response.data[i].day_count);
            oPieopt.series[0].data.push({ 'value': response.date[j].articles, 'name': response.date[j].name })
        };
        // console.log(oPieopt.series[0].data);

        oPie.setOption(oPieopt);
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/admin/data/visit',
            success: function (response03) {
                console.log(response03);
                var oColumn = echarts.init(document.getElementById('column_show'));
                var oColumnopt = {
                    title: {
                        text: '文章访问量',
                        left: 'center',
                        top: '10'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [],
                        top: '40'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月']
                    }],
                    yAxis: [{
                        name: '访问量',
                        type: 'value'
                    }],
                    series: [],
                    grid: {
                        show: true,
                        x: 50,
                        x2: 30,
                        y: 80,
                        height: 260
                    },
                    dataZoom: [ //给x轴设置滚动条
                        {
                            start: 0, //默认为0
                            end: 100 - 1000 / 31, //默认为100
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            handleSize: 0, //滑动条的 左右2个滑动条的大小
                            height: 8, //组件高度
                            left: 45, //左边的距离
                            right: 50, //右边的距离
                            bottom: 26, //右边的距离
                            handleColor: '#ff3040', //h滑动图标的颜色
                            handleStyle: {
                                borderColor: "skyblue",
                                borderWidth: "1",
                                shadowBlur: 2,
                                background: "#ff3040",
                                shadowColor: "#fff",
                            }
                        }
                    ]
                };

                for (var i = 0; i < response.date.length; i++) {
                    oColumnopt.legend.data.push(response.date[i].name);
                    oColumnopt.series.push({
                        name: response.date[i].name,
                        type: 'bar',
                        barWidth: 100 / response.date.length,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                },
                                color: oPieopt.color[i]
                            }
                        },
                        data: []
                    });
                    for (var k in response03.data) {
                        oColumnopt.series[i].data.push(response03.data[k])
                    }
                }

                // for (var i = 0; i < response.date[0].all_count.length; i++) {
                //     // console.log(response.data[i].day_count);
                //     oColumnopt.legend.data.push(response.date[0].all_count[i].type);

                //     if (i % 2 == 0) {
                //         oColumnopt.series.push({
                //             name: response03.data[0].all_count[i].type,
                //             type: 'bar',
                //             barWidth: 100 / response03.data[0].all_count.length,
                //             itemStyle: {
                //                 normal: { areaStyle: { type: 'default' }, color: '#fc30' + 'a' + i }
                //             },
                //             data: []
                //         });
                //         for(var j=0;j<response03.data.length;j++){
                //             oColumnopt.series[i].data.push(response03.data[j].all_count[i].count)
                //         }

                //     } else {
                //         oColumnopt.series.push({
                //             name: response03.data[0].all_count[i].type,
                //             type: 'bar',
                //             barWidth: 100 / response03.data[0].all_count.length,
                //             itemStyle: {
                //                 normal: { areaStyle: { type: 'default' }, color: '#20fd' + '3' + i }
                //             },
                //             data: []
                //         });
                //         for(var j=0;j<response03.data.length;j++){
                //             oColumnopt.series[i].data.push(response03.data[j].all_count[i].count)
                //         }
                //     }
                // };
                console.log(oColumnopt.legend.data);
                console.log(oColumnopt.series);

                oColumn.setOption(oColumnopt);
                oColumn.setOption(oColumnopt)

            }
        })
    }
})
