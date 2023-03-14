function checkHundredPercent(valueList, total){
	var percentList=[];
	var index = 1;
	
	for(var i=0; i<4; i++){
		percentList[i] = 0;
		for(var j=0; j<valueList.length; j++){
			percentList[i] += parseFloat(((parseFloat(valueList[j]) * 100) / total).toFixed(i));
		}
	}
	var order = [1,2,0,3];
	for(var i=0; i<order.length; i++){
		if(percentList[order[i]] == 100){
			index = order[i];
			break;
		}
	}
	
	return index;
}

/*
 *  누적 검사수 = 누적 검사완료수(결과양성 + 결과음성) + 검사진행중
 *  누적 확진률 = (결과양성 / 누적 검사완료수) * 100
 *  누적 확진환자수(결과양성) = 치료중 환자 + 완치(격리해제) + 사망자
 */

/*
 *  검사현황(Inspect Status : IS) - 검사진행중(inspect), 결과양성(positive), 결과음성(negative)
 *  Chart - Donut : label, figure, bgColor, total
 */
var IS_data = {};
//var IS_data = {
//    label: ['결과음성', '검사중', '결과양성'],
//    figure: [403882, 17885, 9976]
//};

function ISChart() {
	var IS_total = IS_data.figure.reduce(function(a, b){return parseInt(a) + parseInt(b)}, 0);
	var i = checkHundredPercent(IS_data.figure, IS_total);
	
    new Chart(document.getElementById('inspect_status'), {
        type: 'doughnut',
        data: {
            labels: IS_data.label,
            datasets: [
                {
                    data: IS_data.figure,
                    backgroundColor: ['#10b4e9', '#ededed', '#96a8ac']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            display: false,
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: function(a) {
                                var leng = a.chart.config.data.datasets[0].data.length;
                                var value = a.chart.config.data.datasets[0].data[a.dataIndex];
                                var total = IS_total;
                                if (((value * 100) / total) < 25) {
                                    if ((leng - 1) === a.dataIndex) {
                                        return 12;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    return 0;
                                }
                            },
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                return (
                                    ' ' + b.chart.data.labels[b.dataIndex] + ' ' + a.toLocaleString() + '/' + ((a * 100) / IS_total).toFixed(i) + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}

/*
 *  주간환자동향(Weekly Patient Status : WPS) - 치료중(cure), 완치(complete), 사망(die)
 *  Chart - Bar + Line
 */
var WPS_data = {};
//var WPS_data = {
//    date: ['3.27','3.28', '3.29', '3.30', '3.31','4.1', '4.2'],
//    complete_day:[384,283,222,195,180,159,261],
//    confirm_day:[91,146,105,78,125,101,89],
//    cure_total:[4665,4523,4398,4275,4216,4155,3979],
//    complete_total:[4528,4811,5033,5228,5408,5567,5828]
//};

function WPSChart() {
    new Chart(document.getElementById('weekly_patient_status'), {
        type: 'bar',
        data: {
            labels: WPS_data.date,
            datasets: [
                {
                    type: 'line',
                    data: WPS_data.complete_day,
                    pointStyle: "circle",
                    pointRadius: "4",
                    /*pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    },*/
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#00add8",
                    borderColor: "#00add8",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: WPS_data.confirm_day,
                    pointStyle: 'rect',
                    pointRadius: "5",
                    /*pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    },*/
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#65cc33",
                    borderColor: "#65cc33",
                    borderDash:[3,3],
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            animation: {
                duration: 1,
                //easing: "easeOutQuart",
                onComplete: function() {
                    var ctx = this.chart.ctx;
                    ctx.font = "bold 12px 'Lato'";
                    ctx.fontSize
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var firstDataset = this.data.datasets[0];
                    var secondDataset = this.data.datasets[1];
                    this.data.datasets.forEach(function(dataset, loop) {
                        for(var i=0; i < dataset.data.length - 1; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                            ctx.fillStyle = dataset.borderColor;
                            var y_pos = 0;
                            if(loop === 0) {
                                var secondModel = secondDataset._meta[Object.keys(secondDataset._meta)[0]].data[i]._model;
                                if(model.y > secondModel.y) {
                                    y_pos = model.y + 20;
                                } else {
                                    y_pos = model.y - 5;
                                }
                            } else {
                                var firstModel = firstDataset._meta[Object.keys(secondDataset._meta)[0]].data[i]._model;
                                if(model.y > firstModel.y) {
                                    y_pos = model.y + 20;
                                } else {
                                    y_pos = model.y - 5;
                                }
                            }
                            ctx.fillText(dataset.data[i], model.x, y_pos);
                        }
                    })
                }
            },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            events: false,
            hover: { animationDuration: 0 },
            layout: {
                padding: {
                    left: 0,
                    right: 10,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            stepSize: 200,
                            callback: function(a, b, c) {
                                return a.toLocaleString();
                            }
                        },
                        position: 'left',
                        gridLines: {
                            display: true,
                            zeroLineColor: '#000'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 10
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                tooltip:{usePointStyle: true},
                datalabels: {
                    display: function(a) {
                        if (a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    align: function(a) {
                        if (a.dataset.type === 'line') {
                            return 'right';
                        } else {
                            return 'end';
                        }
                    },
                    anchor: function(a) {
                        if (a.dataset.type === 'line') {
                            return 'center';
                        } else {
                            return 'end';
                        }
                    },
                    textAlign: 'center',
                    offset:  function(a) {
                        if (a.dataset.type === 'line') {
                            return 4;
                        } else {
                            return 0;
                        }
                    },
                    font: {
                        family: 'Lato',
                        size: 13,
                        weight: 'bold'
                    },
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return '#00add8';
                        } else if (a.datasetIndex === 1) {
                            return '#65cc33';
                        } 
                    },
                    formatter: function(a, b) {
                        return a.toLocaleString();
                    }
                }
            }
        }
    });

    $(".ccl_complete_day").prepend("<span class='hdn'>(하늘색 라인(동그라미))</span>");
    $(".ccl_confirm_day").prepend("<span class='hdn'>(연두색 점선라인(네모))</span>");
}

/*
 *  국가별 확진환자 추세(National Patient Trend) - 대한민국(Korea), 중국(China), 이탈리아(Italy), 이란(Iran), 스페인(Spain), 프랑스(France), 독일(Germany), 미국(America), 스위스(Switzerland), 영국(UK)
 *  Chart - Line
 */

var NPT_data = {};
//var NPT_data = {
//	date: ['3.27','3.28', '3.29', '3.30', '3.31', '4.1', '4.2'],
//	korea:[9332,9478, 9583, 9661,9786,9887,9976],
//  china:[81340,81394,81439,81470,81518,81518,81518],
//  italy:[80539,86498,92472,97689,101739,105792,110574],
//  iran:[29406,32332,35408,38309,41495,44606,47593],
//  spain:[56188,64059,72248,78797,85159,94417,102136],
//  france:[29155,32964,37575,40174,44550,52128,56989],
//  germany:[43938,50871,57695,62095,66885,71690,77872],
//  america:[83507,101657,121117,139675,161807,186265,213372],
//  switzerland:[10714,12161,13213,14336,15475,16176,17139],
//  uk:[10658,14543,17089,19522,22141,25150,29474]
//};

function NPTChart() {
    new Chart(document.getElementById('national_patient_trend'), {
        type: 'bar', // bar 타입을 넣어야 Line Point가 중앙정렬 된다.
        data: {
            labels: NPT_data.date,
            datasets: [
                {
                    type: 'line',
                    data: NPT_data.korea,
                    pointStyle: 'circle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#4f4f4f',
                    pointBorderColor: '#4f4f4f',
                    borderColor: '#4f4f4f',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.china,
                    pointStyle: 'rect',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#e92828',
                    pointBorderColor: '#e92828',
                    borderColor: '#e92828',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.italy,
                    pointStyle: 'triangle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#15399e',
                    pointBorderColor: '#15399e',
                    borderColor: '#15399e',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.iran,
                    pointStyle: 'circle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#ff12ff',
                    borderColor: '#ff12ff',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.spain,
                    pointStyle: 'triangle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#197b30',
                    borderColor: '#197b30',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.france,
                    pointStyle: 'rect',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#e92828',
                    borderColor: '#e92828',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.germany,
                    pointStyle: 'rectRot',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#0606ff',
                    borderColor: '#0606ff',
                    borderWidth: 2,
                    borderDash: [2, 1],
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.america,
                    pointStyle: 'rectRot',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#e92828',
                    pointBorderColor: '#e92828',
                    borderColor: '#e92828',
                    borderWidth: 2,
                    borderDash: [2, 1],
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.switzerland,
                    pointStyle: 'circle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#721dca',
                    pointBorderColor: '#721dca',
                    borderColor: '#721dca',
                    borderWidth: 2,
                    borderDash: [2, 1],
                    fill: false,
                },
                {
                    type: 'line',
                    data: NPT_data.uk,
                    pointStyle: 'circle',
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return '4';
                        } else {
                            return '0';
                        }
                    },
                    pointBackgroundColor: '#00b8ce',
                    pointBorderColor: '#00b8ce',
                    borderColor: '#00b8ce',
                    borderWidth: 2,
                    borderDash: [2, 1],
                    fill: false,
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { 
                enabled: true,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
             },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 32,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            stepSize: 20000,
                            callback: function(value, index, values) {
//                                console.log(value, index, values);
                                if (value >= 1e4) {
                                    var units = ['만', 'B', 'T'];
                                    var order = Math.floor(Math.log(value) / Math.log(10000));
                                    var unitname = units[(order - 1)];
                                    var num = Math.floor(value / 10000 * order);
                                    return num + unitname;
                                }
                            }
                        },
                        gridLines: {
                            display: true,
                            zeroLineColor: '#000'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false,
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: function(a) {
                        if (a.dataIndex === (a.chart.config.data.labels.length - 1)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    align: 'right',
                    anchor: 'center',
                    textAlign: 'left',
                    offset: 8,
                    font: {
                        family: 'Lato',
                        size: 11,
                        weight: 'bold'
                    },
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return '#4f4f4f';
                        } else if (a.datasetIndex === 1) {
                            return '#e92828';
                        } else if (a.datasetIndex === 2) {
                            return '#15399e';
                        } else if (a.datasetIndex === 3) {
                            return '#ff12ff';
                        } else if (a.datasetIndex === 4) {
                            return '#197b30';
                        } else if (a.datasetIndex === 5) {
                            return '#e92828';
                        } else if (a.datasetIndex === 6) {
                            return '#0606ff';
                        } else if (a.datasetIndex === 7) {
                            return '#e92828';
                        } else if (a.datasetIndex === 8) {
                            return '#721dca';
                        } else if (a.datasetIndex === 9) {
                            return '#00b8ce';
                        }
                    },
                    formatter: function(a, b) {
                    	return a.toLocaleString();
                    }
                }
            }
        }
    });
}

/*
 *  지역별확진환자현향(Regional Patient Status : RPS) - 지역명(name), 지역별 확진환자(patient), 지역별 전일대비(compare)
 *  Chart - Map
 */

function RPSAChart() {

	var region = $('.regional_patient_status_A .rpsa_map .rpsam_graph svg path');
    var btn = $('.regional_patient_status_A .rpsa_map .rpsam_graph button');
    var detail = $('.regional_patient_status_A .rpsa_detail > div');

    btn.click(function(){
        var thDataCity = $(this).attr('data-city');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
        return false;
    });

    region.click(function(){
        var thDataCity = $(this).attr('class');
        btn.removeClass('select');
        $('.regional_patient_status_A .rpsa_map .rpsam_graph button[data-city="' + thDataCity + '"]').addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
    });
    
    // 권우주 - 21.05.27 - zone_popup 클릭 시 class=open 기능 - 작업3 START
    var btn_pop = $('.regional_patient_status_A .rpsa_detail .mapview .menuinfo a');
    btn_pop.click(function(){
        var thDataPop = $(this).attr('data-popup');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('zone_popup open');
        $('#' + thDataPop).addClass('zone_popup open');
        return false;
    });
    // END3
    
}


/*
 *  지역별단계현향(Regional Step Status : RPS) - 지역명(name), 지역별 단계(step), 지역별 전일대비(compare)
 *  Chart - Map
 */

function RSSChart() {

    var region = $('.regional_step_status .rss_map .rssm_graph svg path');
    var btn = $('.regional_step_status .rss_map .rssm_graph button');
    var detail = $('.regional_step_status .rss_detail > div');

    btn.click(function(){
        var thDataCity = $(this).attr('data-city');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
        return false;
    });

    region.click(function(){
        var thDataCity = $(this).attr('class');
        btn.removeClass('select');
        $('.regional_step_status .rss_map .rssm_graph button[data-city="' + thDataCity + '"]').addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
    });
}

/*
 *  지역발생비율(Regional Incidence Ratio : RIR) - 총 확진환자(total), 지역 확진환자(patient)
 *  Chart - Donut Gauge
 */

function RIRChart(a, b) {
    var RIR = $('#' + a).find('.regional_incidence_ratio');
    var RIR_path = RIR.find('.rir_path').get(0);
    var RIR_data = b;
    var RIR_length = RIR_path.getTotalLength();
    RIR_path.style.strokeDasharray = RIR_length + ' ' + RIR_length;
    RIR_path.style.strokeDashoffset = RIR_length * (1 - (RIR_data / 100));
    RIR.find('.rir_figure').text(RIR_data + '%');
}

function RPSACityRatio() {

    var detail = $('.regional_patient_status_A .rpsa_detail > div > div');

    // 권우주 - 21.05.27 - detail스타일 제거 - 작업1 START
    /*detail.css({
	    'opacity'   : 0,
	    'display'   : 'block',
	    'position'  : 'absolute'
	});*/
    // END1

    detail.each(function(){

	    var 
	        id = $(this).attr('id'),
	        data = Number($(this).find('.regional_incidence_ratio').attr('data-percentage'));
	    	
	    if("zone_popup"!=id.substring(0, 10)){	// 권우주 - 21.05.27 - zone_popup도 필터링해야 RIRChart보임 - 작업2
	    	if (id !== 'mapAll') {
	            RIRChart(id, data);
	        }
	    }
    });

    detail.removeAttr('style');
    
}

/*
 *  지역별확진환자현향(Regional Patient Status : RPS) - 지역별 확진환자(patient)
 *  Chart - Horizontal Bar
 */
var RPSBaseData = [];
//var RPSBaseData = [
//	{name: '서울', count: 488},
//	{name: '부산', count: 122},
//	{name: '대구', count: 6725},
//	{name: '인천', count: 73},
//	{name: '광주', count: 25},
//	{name: '대전', count: 36},
//	{name: '울산', count: 40},
//	{name: '세종', count: 46},
//	{name: '경기', count: 516},
//	{name: '강원', count: 39},
//	{name: '충북', count: 44},
//	{name: '충남', count: 133},
//	{name: '전북', count: 14},
//	{name: '전남', count: 14},
//	{name: '경북', count: 1304},
//	{name: '경남', count: 106},
//	{name: '제주', count: 9},
//	{name: '검역', count: 242}
//	];

function RPSBChart() {
	var newArray = RPSBaseData.sort(function(a, b){
	    return b.count - a.count;
	});
	var newName = newArray.map(function(a){return a.name});
	var newCount = newArray.map(function(a){return a.count});

	var RPS_B_data = {
	    label: newName,
	    figure: newCount
	};
	
    new Chart(document.getElementById('regional_patient_status_B'), {
        type: 'horizontalBar',
        data: {
            labels: RPS_B_data.label,
            datasets: [
                {
                    data: RPS_B_data.figure,
                    backgroundColor:'#15a8de',
                    categoryPercentage: 0.75,
                    barPercentage: 0.75
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            layout: {
                padding: {
                    left: 0,
                    right: 35,
                    top: 0,
                    bottom: 0
                }
            },            
            hover: { mode: null },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 11,
                            fontFamily: "'Noto Sans CJK kr'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                xAxes: [
                    {
                        ticks: {
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: true,
                            zeroLineColor: '#000'
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    offset: 2,
                    font: {
                        family: 'Lato',
                        size: 11,
                        weight: 'bold'
                    },
                    textAlign: 'left',
                    color: '#15a8de',
                    formatter: function(a, b) {
                    	return a.toLocaleString();
                    }
                }
            }
        }
    });
}

/*
 *  지역별확진환자비율 A(Regional Patient Ratio A : RPR_A) - 지역별 확진환자(patient) - 구분 : 대구, 경북, 서울, 경기, 기타
 *  Chart - Pie
 */

var RPR_A_MAIN_data = {};
//var RPR_A_MAIN_data = {
//    label: ['대구\n', '기타', 서울\n', '경기\n', '경북'],
//    figure:  [6983,3714,3120,2684,1444]
//};

function RPRAMainChart() {
	var RPR_A_MAIN_total  = RPR_A_MAIN_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);
	var i = checkHundredPercent(RPR_A_MAIN_data.figure, RPR_A_MAIN_total);

	var status	=	wCatch(); //pc 일때 label 2줄 정리
	if (status == 'p') {	
		RPR_A_MAIN_data.label[0] += "\n"; //대구
		RPR_A_MAIN_data.label[2] += "\n"; //서울
		RPR_A_MAIN_data.label[3] += "\n"; //경기
	}		
	
    new Chart(document.getElementById('regional_patient_ratio_A'), {
        type: 'pie',
        data: {
            labels: RPR_A_MAIN_data.label,
            datasets: [
                {
                    data: RPR_A_MAIN_data.figure,
                    backgroundColor: ['#10b4e9', '#eaeceb', '#9fa1a0', '#656565', '#babcbb'],
                    borderWidth: 0
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 40,
                    bottom: 40
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: function(a) {
                                var leng = a.chart.config.data.datasets[0].data.length;
                                var value = a.chart.config.data.datasets[0].data[a.dataIndex];
                                var total = RPR_A_MAIN_total;
                                if (((value * 100) / total) < 25) {
                                    if ((leng - 1) === a.dataIndex) {
                                    	return 4;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    return 0;
                                }
                            },
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                //console.log(a, b.chart.config.data);
                                return (
                                    b.chart.config.data.labels[b.dataIndex] + ' ' + ((a * 100) / RPR_A_MAIN_total).toFixed(i) + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}

/*
 *  지역별확진환자비율 A(Regional Patient Ratio A : RPR_A) - 지역별 확진환자(patient) - 구분 : 대구, 경북, 서울, 경기, 기타
 *  Chart - Pie
 */
var  RPR_A_data = {};
//var RPR_A_data = {
//    label: ['대구\n', '기타', '서울\n', '경기\n', '경북'],
//    figure: [6983,3714,3120,2684,1444]
//};

function RPRAChart() {
	var RPR_A_total  = RPR_A_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);
	var i = checkHundredPercent(RPR_A_data.figure, RPR_A_total);
	
	var status	=	wCatch(); //tablet 일때 label 2줄 정리
	if (status == 't') {	
		RPR_A_data.label[0] += "\n"; //대구		
		RPR_A_data.label[2] += "\n"; //서울
		RPR_A_data.label[3] += "\n"; //경기
	}

	new Chart(document.getElementById('regional_patient_ratio_A'), {
        type: 'pie',
        data: {
            labels: RPR_A_data.label,
            datasets: [
                {
                    data: RPR_A_data.figure,
                    backgroundColor: ['#00c2ff', '#eaeceb', '#9fa1a0', '#656565', '#babcbb']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 40
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: function(a) {
                                var leng = a.chart.config.data.datasets[0].data.length;
                                var value = a.chart.config.data.datasets[0].data[a.dataIndex];
                                var total = RPR_A_total;
                                if (((value * 100) / total) < 25) {
                                    if ((leng - 2) === a.dataIndex) {
                                        return 4;
                                    } else if ((leng - 1) === a.dataIndex) {
                                        return 0;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    return 0;
                                }
                            },
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                return (
                                    b.chart.config.data.labels[b.dataIndex] + ' ' + ((a * 100) / RPR_A_total).toFixed(i) + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}

/*
 *  지역별확진환자비율 B(Regional Patient Ratio B : RPR_B) - 지역별 확진환자(patient) - 구분 : 대구, 경북, 기타
 *  Chart - Donut
 */
var RPR_B_data = {};
//var RPR_B_data = {
//    label: ['대구', '기타', '경북', '서울', '경기'],
//    figure: [67.4,19.5,13.1]
//};

function RPRBChart() {
	var RPR_B_total = RPR_B_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);
	var i = checkHundredPercent(RPR_B_data.figure, RPR_B_total);
	
	var status	=	wCatch(); //mobile 일때 label 2줄 정리
	if (status == 'm') {
		RPR_B_data.label[0] += "\n"; //대구
		RPR_B_data.label[2] += "\n"; //서울
		RPR_B_data.label[3] += "\n"; //경기
	}

    webAccess($('.rpr_b_chart_text > ul'), RPR_B_data, "RPR_B", i);
	
    new Chart(document.getElementById('regional_patient_ratio_B'), {
        type: 'doughnut',
        data: {
            labels: RPR_B_data.label,
            datasets: [
                {
                    data: RPR_B_data.figure,
                    backgroundColor: ['#d84c4a', '#e3e3e3', '#e87473', '#ee9190', '#f4c8c8']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 32,
                    bottom: 30
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: 0,
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                return (
                                    b.chart.data.labels[b.dataIndex] + ' ' + ((a * 100) / RPR_B_total).toFixed(i) + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}

/*
 *  집단발생비율(Group Incidence Ratio : GIR) - 총 확진환자(total), 집단별 확진환자(patient)
 *  Chart - Donut
 */
var GIR_data = {};
//var GIR_data = {
//    label: ['신천지 관련', '기타 집단발생', '산발적 발생'],
//    figure: [52.3, 31.2, 16.5]
//};

function GIRChart() {
	var GIR_total = GIR_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);

    new Chart(document.getElementById('group_incidence_ratio'), {
        type: 'doughnut',
        data: {
            labels: GIR_data.label,
            datasets: [
                {
                    data: GIR_data.figure,
                    backgroundColor: ['#009c96', '#2fc9c3', '#e3e3e3']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 32,
                    bottom: 8
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: 0,
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                return (
	                                   b.chart.data.labels[b.dataIndex] + '\n' + a + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}

/*
 *  확진환자추세(Patient Trend) - 누적(total), 일일(daily)
 *  Chart - Bar + Line
 */

var PT_data = {};
//var PT_data = {
//	date: ['3.27','3.28', '3.29', '3.30', '3.31','4.1', '4.2'],
//  total: [9332,9478,9583,9661,9786,9887,9976],
//  daily: [91,146,105,78,125,101,89]
//};

function PTChart() {
    new Chart(document.getElementById('patient_trend'), {
        type: 'bar',
        data: {
            labels: PT_data.date,
            datasets: [
                {
                    type: 'line',
                    data: PT_data.daily,
                    pointStyle: 'circle',
                    pointRadius: '6',
                    pointBackgroundColor: '#ff8400',
                    pointBorderColor: '#fff',
                    borderColor: '#ff8400',
                    borderWidth: 2,
                    fill: false,
                    yAxisID: 'yAxes_right'
                },
                {
                    type: 'bar',
                    data: PT_data.total,
                    backgroundColor: '#3571cc',
                    categoryPercentage: 0.6,
                    barPercentage: 0.6,
                    yAxisID: 'yAxes_left'
                }
            ]
        },
        options: {
            animation: {
                duration: 1,
                //easing: "easeOutQuart",
                onComplete: function () {
                    var ctx = this.chart.ctx;
                    ctx.font = "bold 11px 'Lato'";
                    ctx.fontSize
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, loop) {
                        if(dataset.type === 'bar') {
                            for (var i = 0; i < dataset.data.length - 1; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                    scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                                ctx.fillStyle = dataset.backgroundColor;
                                var y_pos = 0;
                                if (loop === 0) {
                                    y_pos = model.y + 20;
                                    if ((scale_max - model.y) / scale_max >= 0.93)
                                        y_pos = model.y + 30;
                                } else {
                                    y_pos = model.y - 5;
                                    if ((scale_max - model.y) / scale_max >= 0.93)
                                        y_pos = model.y + 20;
                                }
                                ctx.fillText(parseInt(dataset.data[i]).toLocaleString(), model.x, y_pos);
                            }
                        }
                    })
                }
            },
            events: false,
            hover: { animationDuration: 0 },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            max: (function(){
                                var maxValue = Math.max.apply(null, PT_data.daily),
                                axisMaxValue = parseInt(maxValue * 1.5),
                                maxLength = String(axisMaxValue).length - 2,
                                squared = Math.pow(10, maxLength);
                                return Math.floor(axisMaxValue / squared) * squared;
                            })(),
                            callback: function(a, b, c) {
                            	return a.toLocaleString();
                            }
                        },
                        position: 'right',
                        id: 'yAxes_right',
                        gridLines: {
                            display: false
                        }
                    },
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
//                            min: (function(){
//                                var minValue = Math.min.apply(null, PT_data.total),
//                                maxLength = String(minValue).length - 1,
//                                squared = Math.pow(10, maxLength);
//                                return Math.floor(minValue / squared) * squared;
//                            })(),
//                            stepSize: (function(){                                
//                                var minValue = Math.min.apply(null, PT_data.total),
//                                maxValue = Math.max.apply(null, PT_data.total),
//                                axisMaxValue = parseInt(maxValue * 1.125),
//                                maxLength = 0,
//                                squared = 0;
//
//                                if (minValue.length !== axisMaxValue.length) {
//                                    maxLength = String(minValue).length - 1;
//                                    squared = Math.pow(10, maxLength);
//                                } else {
//                                    if (String(minValue)[0] !== String(axisMaxValue)[0]) {
//                                        maxLength = String(minValue).length - 1;
//                                        squared = Math.pow(10, maxLength);
//                                    } else {
//                                        maxLength = String(minValue).length - 2;
//                                        squared = Math.pow(10, maxLength);
//                                    }
//                                }
//                                
//                                return squared;
//                            })(),
//                            max: (function(){
//                                var maxValue = Math.max.apply(null, PT_data.total),
//                                axisMaxValue = parseInt(maxValue * 1.125),
//                                maxLength = String(axisMaxValue).length - ,
//                                squared = Math.pow(10, maxLength);
//                                return Math.floor(axisMaxValue / squared) * squared;
//                            })(),
                            callback: function(a, b, c) {
                            	return a.toLocaleString();
                            }
                        },
                        position: 'left',
                        id: 'yAxes_left',
                        gridLines: {
                            display: true,
                            zeroLineColor: '#000'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                	display: function(a) {
                        if (a.datasetIndex === 1) {
                            if (a.dataIndex === a.chart.config.data.labels.length - 1) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    },                  	
                    align: 'end',
                    anchor: 'end',
                    textAlign: 'center',
                    offset: 0,
                    font: {
                        family: 'Lato',
                        size: 12,
                        weight: 'bold'
                    },
                    textStrokeColor: 'rgba(255,255,255,0.8)',
                    textStrokeWidth: 3,
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return '#d43011';
                        } else {
                            return '#3571cc';
                        }
                    },
                    formatter: function(a, b) {
                    	var a = Number(a);
                    	return a.toLocaleString();
                    }
                }
            }
        }
    });
}

/*
 *  격리해제추세(Complete Trend) - 누적(total), 일일(daily)
 *  Chart - Bar + Line
 */

var CT_data = {};
//var CT_data = {
//		date: ['3.27','3.28', '3.29', '3.30', '3.31','4.1', '4.2'],
//	    total: [4528,4811,5033,5228,5408,5567,5828],
//	    daily: [384,283,222,195,180,159,261]
//};

function CTChart() {
    new Chart(document.getElementById('complete_trend'), {
        type: 'bar',
        data: {
            labels: CT_data.date,
            datasets: [
                {
                    type: 'line',
                    data: CT_data.daily,
                    pointStyle: 'circle',
                    pointRadius: '6',
                    pointBackgroundColor: '#1f7ccb',
                    pointBorderColor: '#fff',
                    borderColor: '#1f7ccb',
                    borderWidth: 2,
                    fill: false,
                    yAxisID: 'yAxes_right'
                },
                {
                    type: 'bar',
                    data: CT_data.total,
                    backgroundColor: '#e0217b',
                    categoryPercentage: 0.6,
                    barPercentage: 0.6,
                    yAxisID: 'yAxes_left'
                }
            ]
        },
        options: {
            animation: {
                duration: 1,
                //easing: "easeOutQuart",
                onComplete: function () {
                    var ctx = this.chart.ctx;
                    ctx.font = "bold 11px 'Lato'";
                    ctx.fontSize
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, loop) {
                        console.log(dataset)
                        if(dataset.type === 'bar') {
                            for (var i = 0; i < dataset.data.length - 1; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                    scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                                ctx.fillStyle = dataset.backgroundColor;
                                var y_pos = 0;
                                if (loop === 0) {
                                    y_pos = model.y + 20;
                                    if ((scale_max - model.y) / scale_max >= 0.93)
                                        y_pos = model.y + 30;
                                } else {
                                    y_pos = model.y - 5;
                                    if ((scale_max - model.y) / scale_max >= 0.93)
                                        y_pos = model.y + 20;
                                }
                                ctx.fillText(parseInt(dataset.data[i]).toLocaleString(), model.x, y_pos);
                            }
                        }
                    })
                }
            },
            events: false,
            hover: { animationDuration: 0 },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            max: (function(){
                                var maxValue = Math.max.apply(null, CT_data.daily),
                                axisMaxValue = parseInt(maxValue * 1.5),
                                maxLength = String(axisMaxValue).length - 2,
                                squared = Math.pow(10, maxLength);
                                return Math.floor(axisMaxValue / squared) * squared;
                            })(),
                            callback: function(a, b, c) {
                            	return a.toLocaleString();
                            }
                        },
                        position: 'right',
                        id: 'yAxes_right',
                        gridLines: {
                            display: false
                        }
                    },
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
//                            min: (function(){
//                                var minValue = Math.min.apply(null, CT_data.total),
//                                maxLength = String(minValue).length - 1,
//                                squared = Math.pow(10, maxLength);
//                                return Math.floor(minValue / squared) * squared;
//                            })(),
//                            stepSize: (function(){                                
//                                var minValue = Math.min.apply(null, CT_data.total),
//                                maxValue = Math.max.apply(null, CT_data.total),
//                                axisMaxValue = parseInt(maxValue * 1.1),
//                                maxLength = 0,
//                                squared = 0;
//
//                                if (minValue.length !== axisMaxValue.length) {
//                                    maxLength = String(minValue).length - 1;
//                                    squared = Math.pow(10, maxLength);
//                                } else {
//                                    if (String(minValue)[0] !== String(axisMaxValue)[0]) {
//                                        maxLength = String(minValue).length - 1;
//                                        squared = Math.pow(10, maxLength);
//                                    } else {
//                                        maxLength = String(minValue).length - 2;
//                                        squared = Math.pow(10, maxLength);
//                                    }
//                                }
//                                
//                                return squared;
//                            })(),
//                            max: (function(){
//                                var maxValue = Math.max.apply(null, CT_data.total),
//                                axisMaxValue = parseInt(maxValue * 1.1),
//                                maxLength = String(axisMaxValue).length - 2,
//                                squared = Math.pow(10, maxLength);
//                                console.log(Math.floor(axisMaxValue / squared) * squared);
//                                return Math.floor(axisMaxValue / squared) * squared;
//                            })(),
                            callback: function(a, b, c) {
                            	return a.toLocaleString();
                            }
                        },
                        position: 'left',
                        id: 'yAxes_left',
                        gridLines: {
                            display: true,
                            zeroLineColor: '#000'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                	display: function(a) {
                        if (a.datasetIndex === 1) {
                            if (a.dataIndex === a.chart.config.data.labels.length - 1) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    },                	
                    align: 'end',
                    anchor: 'end',
                    textAlign: 'center',
                    offset: 0,
                    font: {
                        family: 'Lato',
                        size: 13,
                        weight: 'bold'
                    },
                    textStrokeColor: 'rgba(255,255,255,0.8)',
                    textStrokeWidth: 3,
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return '#1f7ccb';
                        } else {
                            return '#e0217b';
                        }
                    },
                    formatter: function(a, b) {
                    	var a = Number(a);
                    	return a.toLocaleString();
                    }
                }
            }
        }
    });
}

/*
 *  집단발생비율(Transmission Case : TC)
 *  Chart - Donut
 */
var TC_data = {};
//var TC_data = {
//    label: [],
//    figure: []
//};

function TCChart() {
	var TC_total = TC_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);
	var i = checkHundredPercent(TC_data.figure, TC_total);
	
	var status	=	wCatch(); //mobile 일때 label 3줄 정리, padding정리
	var padding_left,
	padding_right,
	padding_top,
	padding_bottom;
	
	if (status == 'm') { //mobile 일때 padding값 조절
		padding_left = '45';
		padding_right = '45';
		padding_top = '60';
		padding_bottom = '40';
	}else{
		padding_left = '20';
		padding_right = '20';
		padding_top = '48';
		padding_bottom = '30';		
	}

    webAccess($('.gir_chart_text > ul'), TC_data, "GIR", i);

    new Chart(document.getElementById('group_incidence_ratio'), {
        type: 'doughnut',
        data: {
            labels: TC_data.label,
            datasets: [
                {
                    data: TC_data.figure,
                    backgroundColor: ['#009c96', '#44cfcb', '#184745', '#579593', '#7aa646', '#adadad']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: padding_left,
                    right: padding_right,
                    top: padding_top,
                    bottom: padding_bottom  
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'top',
                            anchor: 'end',
                            textAlign: 'right',
                            offset: function(a, b) {
                            	//console.log(a.dataset.data.length);
                            	if (a.dataIndex === (a.dataset.data.length - 1)) { //마지막 값
                            		if (status == 'm') { //mobile 일때 위치값 조절
                            			return 40;
                            		}else{
                            			return 30;
                            		}                            		
                            	} else if (a.dataIndex === (a.dataset.data.length - 2)) {
                            		return -10;
                            	}
                            	 else if (a.dataIndex === (a.dataset.data.length - 3)) {
                             		return 16;
                             	} else if (a.dataIndex === (a.dataset.data.length - 4)) {
                             		return 3;
                             	} else {
                            		return -1;
                            	}
                            },
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 11,
                                lineHeight: '14px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                            	var a = Number(a);
                            	if (status == 'm') { //mobile 일때 3줄 처리
                            		if (b.dataIndex < 5){
                            			return b.chart.data.labels[b.dataIndex] + "" + a.toLocaleString() + "명 (" + ((a * 100) / TC_total).toFixed(i) + ' %)';
                            		}else{
                            			return b.chart.data.labels[b.dataIndex] + "" + a.toLocaleString() + "명 (" + ((a * 100) / TC_total).toFixed(i) + ' %)';
                            		}
                            	}else{                            		
                                	if (b.dataIndex < 5) {
                                		return b.chart.data.labels[b.dataIndex] + "" + a.toLocaleString() + "명 (" + ((a * 100) / TC_total).toFixed(i) + ' %)';
                                	} else {
                                		return b.chart.data.labels[b.dataIndex] + " " + a.toLocaleString() + "명 (" + ((a * 100) / TC_total).toFixed(i) + ' %)';
                                	}
                            	}                            	

                            }
                        }
                    }
                }
            }
        }
    });
}



























/*
 * point style - triangle, rect, rectRot, circle
 * point color - pointBackgroundColor, pointBorderColor
 * line style - borderColor, borderWidth, borderDash
 * colors - #4f4f4f, #e92828, #15399e, #ff12ff, #197b30, #0606ff, #721dca, #00b8ce
 * #ffffff
 */

var N_Data = {
    USA: { kr: "미국", en: "USA", cn: "美国", pointStyle: "triangle", borderDash: [0, 0], backgroundColor: "#ff12ff", pointColor: "#ff12ff", lineColor: "#ff12ff", fontColor: "#ff12ff" },
    Brazil: { kr: "브라질", en: "Brazil", cn: "巴西", pointStyle: "rect", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#4f4f4f", lineColor: "#4f4f4f", fontColor: "#4f4f4f" },
    Russia: { kr: "러시아", en: "Russia", cn: "俄罗斯", pointStyle: "rectRot", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#e92828", lineColor: "#e92828", fontColor: "#e92828" },
    UK: { kr: "영국", en: "UK", cn: "英国", pointStyle: "circle", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#15399e", lineColor: "#15399e", fontColor: "#15399e" },
    Spain: { kr: "스페인", en: "Spain", cn: "西班牙", pointStyle: "triangle", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#ff12ff", lineColor: "#ff12ff", fontColor: "#ff12ff" },
    Italy: { kr: "이탈리아", en: "Italy", cn: "意大利", pointStyle: "rect", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#197b30", lineColor: "#197b30", fontColor: "#197b30" },
    India: { kr: "인도", en: "India", cn: "印度", pointStyle: "rectRot", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#0606ff", lineColor: "#0606ff", fontColor: "#0606ff" },
    Germany: { kr: "독일", en: "Germany", cn: "德国", pointStyle: "circle", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#721dca", lineColor: "#721dca", fontColor: "#721dca" },
    Peru: { kr: "페루", en: "Peru", cn: "秘鲁", pointStyle: "triangle", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#00b8ce", lineColor: "#00b8ce", fontColor: "#00b8ce" },
    Turkey: { kr: "터키", en: "Turkey", cn: "土耳其", pointStyle: "rect", borderDash: [0, 0], backgroundColor: "#4f4f4f", pointColor: "#4f4f4f", lineColor: "#4f4f4f", fontColor: "#4f4f4f" },
    Iran: { kr: "이란", en: "Iran", cn: "伊朗", pointStyle: "rectRot", borderDash: [0, 0], backgroundColor: "#e92828", pointColor: "#e92828", lineColor: "#e92828", fontColor: "#e92828" },
    France: { kr: "프랑스", en: "France", cn: "法国", pointStyle: "circle", borderDash: [2, 1], backgroundColor: "#15399e", pointColor: "#15399e", lineColor: "#15399e", fontColor: "#15399e" }
};

var NPTB_data = {
    date: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14"],
    USA: ["1786593", "1808291", "1830066", "1849560", "1870156", "1894753", "1917080", "1938842", "1956499", "1973803", "1997636", "2018875", "2044572", "2071782"],
    Brazil: ["514849", "526447", "555383", "584016", "614941", "630708", "657783", "676695", "692349", "739503", "772416", "802828", "828810", "850514"],
    Russia: ["405843", "414878", "423741", "432277", "441108", "449834", "458689", "467673", "476658", "485253", "493657", "502436", "511423", "520129"],
    UK: ["274762", "276332", "277985", "279856", "281661", "283311", "284868", "286194", "287399", "289140", "290143", "291409", "297535", "308993"],
    Spain: ["239429", "239638", "239932", "240326", "240660", "240978", "241310", "246628", "256611", "266598", "276583", "286579", "292950", "294375"],
    Italy: ["233019", "233197", "233515", "233836", "234013", "234531", "236657", "241550", "241717", "241966", "242280", "242707", "243209", "243605"],
    India: ["182143", "190535", "198706", "207615", "216919", "226770", "234801", "234998", "235278", "235561", "235763", "236142", "236305", "236651"],
    Germany: ["183410", "183594", "183879", "184121", "184472", "187400", "191758", "196515", "199696", "203736", "208823", "214788", "214788", "220749"],
    Peru: ["164476", "170039", "170039", "178914", "183198", "184924", "185450", "185750", "186109", "186506", "186522", "186691", "187226", "187267"],
    Turkey: ["163942", "164769", "165555", "166422", "167410", "168340", "169425", "171789", "173832", "175927", "177938", "180176", "182545", "184955"],
    Iran: ["151466", "154445", "157562", "160696", "164270", "167156", "169218", "170132", "171121", "172114", "173036", "174023", "175218", "176677"],
    France: ["151753", "152091", "151325", "151677", "152444", "153055", "153634", "153977", "154188", "154591", "155136", "155561", "156287", "156813"]
};

function NPTBChart() {
    new Chart(document.getElementById("national_patient_trend_B"), {
        type: "bar", // bar 타입을 넣어야 Line Point가 중앙정렬 된다.
        data: {
            labels: NPTB_data.date,
            datasets: [
                {
                    type: "line",
                    data: NPTB_data.USA,
                    label: N_Data.USA.kr,
                    pointStyle: N_Data.USA.pointStyle,
                    pointBackgroundColor: N_Data.USA.backgroundColor,
                    pointBorderColor: N_Data.USA.pointColor,
                    borderColor: N_Data.USA.lineColor,
                    borderDash: N_Data.USA.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Brazil,
                    label: N_Data.Brazil.kr,
                    pointStyle: N_Data.Brazil.pointStyle,
                    pointBackgroundColor: N_Data.Brazil.backgroundColor,
                    pointBorderColor: N_Data.Brazil.pointColor,
                    borderColor: N_Data.Brazil.lineColor,
                    borderDash: N_Data.Brazil.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Russia,
                    label: N_Data.Russia.kr,
                    pointStyle: N_Data.Russia.pointStyle,
                    pointBackgroundColor: N_Data.Russia.backgroundColor,
                    pointBorderColor: N_Data.Russia.pointColor,
                    borderColor: N_Data.Russia.lineColor,
                    borderDash: N_Data.Russia.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.UK,
                    label: N_Data.UK.kr,
                    pointStyle: N_Data.UK.pointStyle,
                    pointBackgroundColor: N_Data.UK.backgroundColor,
                    pointBorderColor: N_Data.UK.pointColor,
                    borderColor: N_Data.UK.lineColor,
                    borderDash: N_Data.UK.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Spain,
                    label: N_Data.Spain.kr,
                    pointStyle: N_Data.Spain.pointStyle,
                    pointBackgroundColor: N_Data.Spain.backgroundColor,
                    pointBorderColor: N_Data.Spain.pointColor,
                    borderColor: N_Data.Spain.lineColor,
                    borderDash: N_Data.Spain.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Italy,
                    label: N_Data.Italy.kr,
                    pointStyle: N_Data.Italy.pointStyle,
                    pointBackgroundColor: N_Data.Italy.backgroundColor,
                    pointBorderColor: N_Data.Italy.pointColor,
                    borderColor: N_Data.Italy.lineColor,
                    borderDash: N_Data.Italy.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.India,
                    label: N_Data.India.kr,
                    pointStyle: N_Data.India.pointStyle,
                    pointBackgroundColor: N_Data.India.backgroundColor,
                    pointBorderColor: N_Data.India.pointColor,
                    borderColor: N_Data.India.lineColor,
                    borderDash: N_Data.India.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Germany,
                    label: N_Data.Germany.kr,
                    pointStyle: N_Data.Germany.pointStyle,
                    pointBackgroundColor: N_Data.Germany.backgroundColor,
                    pointBorderColor: N_Data.Germany.pointColor,
                    borderColor: N_Data.Germany.lineColor,
                    borderDash: N_Data.Germany.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Peru,
                    label: N_Data.Peru.kr,
                    pointStyle: N_Data.Peru.pointStyle,
                    pointBackgroundColor: N_Data.Peru.backgroundColor,
                    pointBorderColor: N_Data.Peru.pointColor,
                    borderColor: N_Data.Peru.lineColor,
                    borderDash: N_Data.Peru.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Turkey,
                    label: N_Data.Turkey.kr,
                    pointStyle: N_Data.Turkey.pointStyle,
                    pointBackgroundColor: N_Data.Turkey.backgroundColor,
                    pointBorderColor: N_Data.Turkey.pointColor,
                    borderColor: N_Data.Turkey.lineColor,
                    borderDash: N_Data.Turkey.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.Iran,
                    label: N_Data.Iran.kr,
                    pointStyle: N_Data.Iran.pointStyle,
                    pointBackgroundColor: N_Data.Iran.backgroundColor,
                    pointBorderColor: N_Data.Iran.pointColor,
                    borderColor: N_Data.Iran.lineColor,
                    borderDash: N_Data.Iran.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTB_data.France,
                    label: N_Data.France.kr,
                    pointStyle: N_Data.France.pointStyle,
                    pointBackgroundColor: N_Data.France.backgroundColor,
                    pointBorderColor: N_Data.France.pointColor,
                    borderColor: N_Data.France.lineColor,
                    borderDash: N_Data.France.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: true, position: "bottom", labels: { usePointStyle: true, boxWidth: 6, fontFamily: "Lato", fontSize: 11 } },
            tooltips: {
                enabled: true,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 60,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#666",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: true,
                            zeroLineColor: "#000"
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: "#333",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: function(a) {
                        if (a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    align: "right",
                    anchor: "center",
                    textAlign: "left",
                    offset: 8,
                    font: {
                        family: "Lato",
                        size: 11,
                        weight: "bold"
                    },
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return N_Data.USA.fontColor;
                        } else if (a.datasetIndex === 1) {
                            return N_Data.Brazil.fontColor;
                        } else if (a.datasetIndex === 2) {
                            return N_Data.Russia.fontColor;
                        } else if (a.datasetIndex === 3) {
                            return N_Data.UK.fontColor;
                        } else if (a.datasetIndex === 4) {
                            return N_Data.Spain.fontColor;
                        } else if (a.datasetIndex === 5) {
                            return N_Data.Italy.fontColor;
                        } else if (a.datasetIndex === 6) {
                            return N_Data.India.fontColor;
                        } else if (a.datasetIndex === 7) {
                            return N_Data.Germany.fontColor;
                        } else if (a.datasetIndex === 8) {
                            return N_Data.Peru.fontColor;
                        } else if (a.datasetIndex === 9) {
                            return N_Data.Turkey.fontColor;
                        } else if (a.datasetIndex === 10) {
                            return N_Data.Iran.fontColor;
                        } else if (a.datasetIndex === 11) {
                            return N_Data.France.fontColor;
                        }
                    },
                    formatter: function(a, b) {
                        return a.toLocaleString();
                    }
                }
            }
        }
    });
}

var NPTD_data = {
    date: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14"],
    USA: ["16817", "21698", "21775", "19494", "20596", "24597", "22327", "21762", "17657", "17304", "23833", "21239", "25697", "27210"],
    Brazil: ["16409", "11598", "28936", "28633", "30925", "15767", "27075", "18912", "15654", "47154", "32913", "30412", "25982", "21704"],
    Russia: ["9268", "9035", "8863", "8536", "8831", "8726", "8855", "8984", "8985", "8595", "8404", "8779", "8987", "8706"],
    UK: ["1936", "1570", "1653", "1871", "1805", "1650", "1557", "1326", "1205", "1741", "1003", "1266", "10956", "11458"],
    Spain: ["201", "209", "294", "394", "334", "318", "332", "9971", "9983", "9987", "9985", "9996", "1541", "1425"],
    Italy: ["355", "178", "318", "321", "177", "518", "9887", "240", "167", "249", "314", "427", "502", "396"],
    India: ["8380", "8392", "8171", "8909", "9304", "9851", "270", "197", "280", "283", "202", "379", "163", "346"],
    Germany: ["221", "184", "285", "242", "351", "4202", "4358", "4757", "3181", "4040", "5087", "5965", "0", "5961"],
    Peru: ["8805", "5563", "0", "8875", "4284", "452", "526", "300", "359", "397", "16", "169", "535", "41"],
    Turkey: ["839", "827", "786", "867", "988", "930", "2269", "2364", "2043", "2095", "2011", "2238", "2369", "2410"],
    Iran: ["2516", "2979", "3117", "3134", "3574", "2886", "878", "914", "989", "993", "922", "987", "1195", "1459"],
    France: ["257", "338", "-766", "352", "767", "611", "579", "343", "211", "403", "545", "425", "726", "526"]
};

function NPTDChart() {
    new Chart(document.getElementById("national_patient_trend_daily"), {
        type: "bar", // bar 타입을 넣어야 Line Point가 중앙정렬 된다.
        data: {
            labels: NPTD_data.date,
            datasets: [
                {
                    type: "line",
                    data: NPTD_data.USA,
                    label: N_Data.USA.kr,
                    pointStyle: N_Data.USA.pointStyle,
                    pointBackgroundColor: N_Data.USA.backgroundColor,
                    pointBorderColor: N_Data.USA.pointColor,
                    borderColor: N_Data.USA.lineColor,
                    borderDash: N_Data.USA.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Brazil,
                    label: N_Data.Brazil.kr,
                    pointStyle: N_Data.Brazil.pointStyle,
                    pointBackgroundColor: N_Data.Brazil.backgroundColor,
                    pointBorderColor: N_Data.Brazil.pointColor,
                    borderColor: N_Data.Brazil.lineColor,
                    borderDash: N_Data.Brazil.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Russia,
                    label: N_Data.Russia.kr,
                    pointStyle: N_Data.Russia.pointStyle,
                    pointBackgroundColor: N_Data.Russia.backgroundColor,
                    pointBorderColor: N_Data.Russia.pointColor,
                    borderColor: N_Data.Russia.lineColor,
                    borderDash: N_Data.Russia.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.UK,
                    label: N_Data.UK.kr,
                    pointStyle: N_Data.UK.pointStyle,
                    pointBackgroundColor: N_Data.UK.backgroundColor,
                    pointBorderColor: N_Data.UK.pointColor,
                    borderColor: N_Data.UK.lineColor,
                    borderDash: N_Data.UK.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Spain,
                    label: N_Data.Spain.kr,
                    pointStyle: N_Data.Spain.pointStyle,
                    pointBackgroundColor: N_Data.Spain.backgroundColor,
                    pointBorderColor: N_Data.Spain.pointColor,
                    borderColor: N_Data.Spain.lineColor,
                    borderDash: N_Data.Spain.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Italy,
                    label: N_Data.Italy.kr,
                    pointStyle: N_Data.Italy.pointStyle,
                    pointBackgroundColor: N_Data.Italy.backgroundColor,
                    pointBorderColor: N_Data.Italy.pointColor,
                    borderColor: N_Data.Italy.lineColor,
                    borderDash: N_Data.Italy.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.India,
                    label: N_Data.India.kr,
                    pointStyle: N_Data.India.pointStyle,
                    pointBackgroundColor: N_Data.India.backgroundColor,
                    pointBorderColor: N_Data.India.pointColor,
                    borderColor: N_Data.India.lineColor,
                    borderDash: N_Data.India.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Germany,
                    label: N_Data.Germany.kr,
                    pointStyle: N_Data.Germany.pointStyle,
                    pointBackgroundColor: N_Data.Germany.backgroundColor,
                    pointBorderColor: N_Data.Germany.pointColor,
                    borderColor: N_Data.Germany.lineColor,
                    borderDash: N_Data.Germany.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Peru,
                    label: N_Data.Peru.kr,
                    pointStyle: N_Data.Peru.pointStyle,
                    pointBackgroundColor: N_Data.Peru.backgroundColor,
                    pointBorderColor: N_Data.Peru.pointColor,
                    borderColor: N_Data.Peru.lineColor,
                    borderDash: N_Data.Peru.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Turkey,
                    label: N_Data.Turkey.kr,
                    pointStyle: N_Data.Turkey.pointStyle,
                    pointBackgroundColor: N_Data.Turkey.backgroundColor,
                    pointBorderColor: N_Data.Turkey.pointColor,
                    borderColor: N_Data.Turkey.lineColor,
                    borderDash: N_Data.Turkey.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.Iran,
                    label: N_Data.Iran.kr,
                    pointStyle: N_Data.Iran.pointStyle,
                    pointBackgroundColor: N_Data.Iran.backgroundColor,
                    pointBorderColor: N_Data.Iran.pointColor,
                    borderColor: N_Data.Iran.lineColor,
                    borderDash: N_Data.Iran.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                },
                {
                    type: "line",
                    data: NPTD_data.France,
                    label: N_Data.France.kr,
                    pointStyle: N_Data.France.pointStyle,
                    pointBackgroundColor: N_Data.France.backgroundColor,
                    pointBorderColor: N_Data.France.pointColor,
                    borderColor: N_Data.France.lineColor,
                    borderDash: N_Data.France.borderDash,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: function(a) {
                        if (a.dataIndex === 0 || a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return "4";
                        } else {
                            return "0";
                        }
                    }
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: true, position: "bottom", labels: { usePointStyle: true, boxWidth: 6, fontFamily: "Lato", fontSize: 11 } },
            tooltips: {
                enabled: true,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 40,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#666",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: true,
                            zeroLineColor: "#000"
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: "#333",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: function(a) {
                        if (a.dataIndex === a.chart.config.data.labels.length - 1) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    align: "right",
                    anchor: "center",
                    textAlign: "left",
                    offset: 8,
                    font: {
                        family: "Lato",
                        size: 11,
                        weight: "bold"
                    },
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return N_Data.USA.fontColor;
                        } else if (a.datasetIndex === 1) {
                            return N_Data.Brazil.fontColor;
                        } else if (a.datasetIndex === 2) {
                            return N_Data.Russia.fontColor;
                        } else if (a.datasetIndex === 3) {
                            return N_Data.UK.fontColor;
                        } else if (a.datasetIndex === 4) {
                            return N_Data.Spain.fontColor;
                        } else if (a.datasetIndex === 5) {
                            return N_Data.Italy.fontColor;
                        } else if (a.datasetIndex === 6) {
                            return N_Data.India.fontColor;
                        } else if (a.datasetIndex === 7) {
                            return N_Data.Germany.fontColor;
                        } else if (a.datasetIndex === 8) {
                            return N_Data.Peru.fontColor;
                        } else if (a.datasetIndex === 9) {
                            return N_Data.Turkey.fontColor;
                        } else if (a.datasetIndex === 10) {
                            return N_Data.Iran.fontColor;
                        } else if (a.datasetIndex === 11) {
                            return N_Data.France.fontColor;
                        }
                    },
                    formatter: function(a, b) {
                        return a.toLocaleString();
                    }
                }
            }
        }
    });
}

var DP_data = {
    date: ["3.27", "3.28", "3.29", "3.30", "3.31", "4.1", "4.2"],
    oversea: ["11", "3", "12", "12", "5", "2", "3"],
    region: ["68", "55", "27", "15", "30", "36", "46"]
};

function createDiagonalPattern() {
    var shape = document.createElement('canvas');
    shape.width = 10;
    shape.height = 10;
    var c = shape.getContext('2d');
    c.fillStyle = '#e0217b';
    c.fillRect(0, 0, 10, 10);

    c.strokeStyle = '#ffffff';
    c.beginPath();
    c.moveTo(2, 0);
    c.lineTo(10, 8);
    c.stroke();
    c.beginPath();
    c.moveTo(0, 8);
    c.lineTo(2, 10);
    c.stroke();
    return c.createPattern(shape, 'repeat');
}

function DPChart() {

    webAccess($('.daily_patient_text > ul'), DP_data, 'DAILY_PATIENT');

    new Chart(document.getElementById("daily_patient"), {
        type: "bar", // bar 타입을 넣어야 Line Point가 중앙정렬 된다.
        data: {
            labels: DP_data.date,
            datasets: [
                {
                    data: DP_data.oversea,
                    label: "해외유입",
                    //backgroundColor: "#e0217b",
                    backgroundColor: createDiagonalPattern(),
                    borderWidth: 0,
                    categoryPercentage: 0.6,
                    barPercentage: 0.6,
                    fill: true
                },
                {
                    data: DP_data.region,
                    label: "국내발생",
                    backgroundColor: "#3571cc",
                    borderWidth: 0,
                    categoryPercentage: 0.6,
                    barPercentage: 0.6,
                    fill: true
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: true, position: "bottom", labels: { usePointStyle: true, boxWidth: 8, fontFamily: "Noto Sans CJK KR", fontSize: 12 } },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        stacked: true,
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#666",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: true,
                            zeroLineColor: "#000"
                        }
                    }
                ],
                xAxes: [
                    {
                        stacked: true,
                        display: true,
                        ticks: {
                            fontColor: "#333",
                            fontSize: 10,
                            fontFamily: "'Lato'"
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: true,
                    align: "end",
                    anchor: "end",
                    textAlign: "center",
                    offset: 0,
                    textStrokeColor: "rgba(255,255,255,0.72)",
                    textStrokeWidth: 3,
                    font: {
                        family: "Lato",
                        size: 11,
                        weight: "bold"
                    },
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return "#e0217b";
                        } else if (a.datasetIndex === 1) {
                            return "#3571cc";
                        }
                    },
                    formatter: function(a, b) {
                        return a.toLocaleString();
                    }
                }
            }
        }
    });
}


function ncovTabCommon(wrapClass) {

	var
		tabWrap 	= $(wrapClass)
	, 	DotDltChar 	= wrapClass.replace('.', '')
	, 	tabList 	= tabWrap.find('.ncov_tab_list li')
	, 	tabContent 	= tabWrap.find('.ncov_tab_content')
	;

	tabList.each(function () {
		if ($(this).find('a').attr('href') === undefined) {
			$(this).find('a').attr('href', '#' + DotDltChar + ($(this).index() + 1));
		}
	});

	tabContent.each(function () {
		$(this).attr('id', DotDltChar + ($(this).index() + 1));
    });

    tabList.removeClass('on');
    tabList.first().addClass('on');
    tabContent.removeClass('on');
    tabContent.first().addClass('on');

	tabList.click(function () {

        var
            isOn = $(this).hasClass('on'),
            isLink = $(this).find('a').attr('href');


        if (!isOn) {
            tabList.removeClass('on');
            $(this).addClass('on');
            tabContent.removeClass('on');
            $(isLink).addClass('on');
        }

		return false;

	});

    tabList.each(function () {
       var t = $(this);
        if(t.hasClass("on")){
            t.find(">a").attr("title","활성된 메뉴").parent().siblings().find(">a").attr("title","비활성메뉴");
        }
    });

    tabList.on("click focusin",function(){
        var t = $(this),
            isOn = t.hasClass('on'),
            isLink = t.find('a').attr('href');

        t.addClass("on").find(">a").attr("title","활성된 메뉴").parent().siblings().removeClass("on").find(">a").attr("title","비활성메뉴");
        $(".ncov_tab_content").removeClass("on");
        t.find(".ncov_tab_content").addClass("on");

        // $(".live_right").height(t.find(".ncov_tab_content").height() + t.closest("ul").height());

        return false;
    });

}
function ncovListTgl() {

    var
        ltLink 	=   $('.ncov_lt_l');

        ltLink.click(function(){

            var
                thP = $(this).parents('.ncov_lt_p');
                isOpen = thP.hasClass('open');

            if (!isOpen) {
                thP.addClass('open');
            } else {
                thP.removeClass('open');
            }

            return false;

        });

}

function liveRegionalContentHeight() {

    var
        status = wCatch(),
        lrcWrap = $('.ncov_lt_p .ncov_lt_c'),
        lrc = $('.ncov_lt_p .ncov_lt_c > div');
    
    lrcWrap.each(function(){});

    if (status === 'm') {

    }
}

var RSS_COLOR_DATA = {
    //step1 : '#d2f0fc',
    step1 : '#4088da',
    step2 : '#ffb911',
    step3 : '#fc7001',
    step4 : '#e60000'
};
var RSS_DATA = [];
function liveRegionalStepCheck() {
    RSS_DATA.forEach(function(a, b, c) {
        var stepStr = 'step_map_city' + (b + 1);
        if (a.caution) {
            $('[data-city="' + stepStr + '"]').find('.name').addClass('caution');
            $('[data-city="' + stepStr + '"]').find('.name').append('<em class="hdn"> 지역 내 상세단계 있음 </em>');
        }
        $('[data-city="' + stepStr + '"]').find('.num').text(a.value);
        var stepColorCalc = a.value;
        var stepColor = 'step' + stepColorCalc;
        $('.' + stepStr).attr('fill', RSS_COLOR_DATA[stepColor]);
    });
}

/*
 *  주간환자동향(Weekly Patient Status : WPS) - 치료중(cure), 완치(complete), 사망(die)
 *  Chart - Bar + Line
 */
var WITH_data = {};
// baseDate:느 ["10.12", "10.13", "10.14", "10.15", "10.16", "10.17", "10.18"],
// smj: [6, 15, 8, 11, 11, 13, 8],
// smj7: [8, 8, 10, 10, 10, 10, 11],
// wjj: [384, 377, 371, 364, 359, 371, 371],
// wjj7: [355, 361, 366, 369, 362, 372, 372],
// hjj: [1953, 1594, 1297, 1347, 1583, 1939, 1684],
// hjj7: [2029, 1987, 1916, 1863, 1831, 1767, 1698]
var withChartObj = null;
function WITHChart() {
    withChartObj = new Chart(document.getElementById('with_status'), {
        type: 'bar',
        data: {
            labels: WITH_data.date,
            datasets: [{
                label: '일일사망자수',
                backgroundColor: "#6E7071",
                type: 'bar',
                order: 5,
                data: WITH_data.smj
            }, {
                label: '일일위중증자수',
                backgroundColor: "r#4EA5A8",
                type: 'bar',
                order: 6,
                data: WITH_data.wjj
            }, {
                label: '일일확진자수',
                backgroundColor: "#2164C9",
                type: 'bar',
                order: 7,
                data: WITH_data.hjj
            }, {
                label: '일일입원자수',
                backgroundColor: "#706092",
                type: 'bar',
                order: 8,
                data: WITH_data.iwj
            },
                {
                    type: 'line',
                    data: WITH_data.smj7,
                    pointStyle: "circle",
                    pointRadius: "4",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#4D4D4D",
                    borderColor: "#6E7071",
                    borderWidth: 2,
                    order: 1,
                    fill: false,
                },
                {
                    type: 'line',
                    data: WITH_data.wjj7,
                    pointStyle: 'rect',
                    pointRadius: "5",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#39787A",
                    borderColor: "#4ea5a8",
                    borderDash:[3,3],
                    borderWidth: 2,
                    order: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    data: WITH_data.hjj7,
                    pointStyle: "triangle",
                    pointRadius: "4",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#0045AC",
                    borderColor: "#2164C9",
                    borderWidth: 2,
                    order: 3,
                    fill: false,
                },
                {
                    type: 'line',
                    data: WITH_data.iwj7,
                    pointStyle: "rectRot",
                    pointRadius: "4",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#46346B",
                    borderColor: "#706092",
                    borderWidth: 2,
                    order: 4,
                    fill: false,
                }
            ]
        },
        options: {
            animation: {
                duration: 1,
                //easing: "easeOutQuart",
                onComplete: function() {
                    var ctx = this.chart.ctx;
                    ctx.font = "bold 8px 'Lato'";
                    ctx.fontSize
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var firstDataset = this.data.datasets[0];
                    var secondDataset = this.data.datasets[1];
                    console.log(ctx);
                    this.data.datasets.forEach(function(dataset, loop) {
                        if("line" === dataset.type) {
                            for(var i=0; i < dataset.data.length ; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                    scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                                ctx.fillStyle = dataset.borderColor;
                                var y_pos = 0;
                                if(loop === 0) {
                                    var secondModel = secondDataset._meta[Object.keys(secondDataset._meta)[0]].data[i]._model;
                                    y_pos = model.y - 8;
                                    // if(model.y > secondModel.y) {
                                    //     y_pos = model.y + 20;
                                    // } else {
                                    //     y_pos = model.y - 5;
                                    // }
                                } else {
                                    var firstModel = firstDataset._meta[Object.keys(secondDataset._meta)[0]].data[i]._model;
                                    y_pos = model.y - 8;
                                    // if(model.y > firstModel.y) {
                                    //     y_pos = model.y + 20;
                                    // } else {
                                    //     y_pos = model.y - 5;
                                    // }
                                }

                                ctx.fillText(dataset.data[i], model.x, y_pos);
                            }
                        }
                    })
                }
            },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato'",
                bodyFontFamily: "'Lato'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            events: false,
            hover: { animationDuration: 0 },
            layout: {
                padding: {
                    left: 0,
                    right: 10,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        type: 'logarithmic',
                        display: true,
                        ticks: {
                            autoSkip: true,
                            fontColor: '#666',
                            fontSize: 10,
                            min: 1,
                            max: 10000,
                            callback: function (value, index, values) {
                                if( value==1 || value==10 || value==100 || value==1000 || value==10000 || value==100000  || value==1000000){
                                    return value;
                                }
                            }
                        },
                        position: 'left',
                        gridLines: {
                            display: true
                        }

                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#333',
                            fontSize: 12
                        },
                        gridLines: {
                            display: false
                        },
                        barPercentage: 0.6

                    }
                ]
            },
            plugins: {
                tooltip:{usePointStyle: true},
                datalabels: {
                    display: function(a) {
                        if (a.dataIndex === (a.chart.config.data.labels.length )) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    });
}


/*
    RPR_B: 확진환자 지역별 비율
    GIR: 감염경로별 확진자 비율
    DAILY_PATIENT: 감염경로 구분에 따른 신규확진자 현황
*/
function webAccess($parent, dataGroup, type, fixedSize) {

    var total = 0;

    var baseLoopItems;
    if(type === 'DAILY_PATIENT') {
        baseLoopItems = dataGroup.date;
    } else {
        baseLoopItems = dataGroup.figure;

        $.each(dataGroup.figure, function(index, item) {
            total += parseInt(item);
        });
    }

    var tag = [];
    $.each(baseLoopItems, function(index, baseLoop) {
        var tempLabel = "";
        switch(type) {
            case "RPR_B":
                tempLabel = dataGroup.label[index] + " " + (parseInt(baseLoop) / total * 100).toFixed(fixedSize) + "%";
                break;
            case "GIR":
                tempLabel = dataGroup.label[index] + " " + baseLoop + "명 | " + (parseInt(baseLoop) / total * 100).toFixed(fixedSize) + "%";
                break;
            case "DAILY_PATIENT":
                tempLabel = baseLoop + " (국내발생 " + dataGroup.region[index] + " / 해외유입 " + dataGroup.oversea[index] + ")";
        }

        tag.push(tempLabel);
    });

    $.each(tag, function(index, item) {
        $parent.append($('<li></li>').text(item));
    });
}




function chartSeries(canvas, baseColor, pointColor, pointType, weeklyData) {
    new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {

            labels: weeklyData.date,
            datasets: [
                {
                    type: 'line',
                    data: weeklyData.daily,
                    pointStyle: pointType,
                    pointRadius: '4',
                    pointBackgroundColor: '#fff' ,
                    pointBorderColor: pointColor,
                    borderColor: baseColor,
                    borderWidth: 3,
                    fill: false,
                    yAxisID: 'yAxes_right',
                    lineTension:0
                },
                {
                    type: 'bar',
                    data: weeklyData.total,
                    backgroundColor: baseColor,
                    categoryPercentage: 0.6,
                    barPercentage: 0.3,
                    yAxisID: 'yAxes_left'
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 800,
                easing: "easeOutQuart",

            },
            events: false,
            hover: { animationDuration: 0 },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato' 'Noto Sans CJK kr'",
                bodyFontFamily: "'Lato' 'Noto Sans CJK kr'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {

                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            min:0,
                            callback: function(a, b, c) {
                                return a.toLocaleString();
                            },
                            maxTicksLimit: 8,
                            precision: 1
                        },
                        position: 'right',
                        id: 'yAxes_right',
                        gridLines: {
                            display: false
                        }
                    },
                    {
                        display: true,
                        ticks: {
                            autoSkip: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            maxTicksLimit: 8,
                            min: 0,
                            callback: function(a, b, c) {
                                return a.toLocaleString();
                            }

                        },
                        position: 'left',
                        id: 'yAxes_left',
                        gridLines: {
                            display: true,
                            zeroLineColor: '#ddd'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#555',
                            fontSize: 13,
                            fontFamily: "'Noto Sans KR'"
                        },
                        gridLines: {
                            display: false,
                            offsetGridLines: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: function(a) {
                        if (a.datasetIndex === 1) {
                            if (a.dataIndex === a.chart.config.data.labels.length) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    },
                    align: 'end',
                    anchor: 'end',
                    textAlign: 'center',
                    offset: 0,
                    font: {
                        family: 'Lato',
                        size: 13,
                        weight: 'bold'
                    },
                    textStrokeColor: 'rgba(255,255,255,1)',
                    textStrokeWidth: 3,
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return pointColor;
                        } else {
                            return pointColor;
                        }
                    },
                    formatter: function(a, b) {
                        var a = Number(a);
                        return a.toLocaleString();
                    }
                }
            }
        }
    });
}

function chartHdnData(chartDataName,chartHdnBox){
    for (var i = 0; i < chartDataName.date.length; i++) {
        var j = i + 1;
        var el = $(".chart_hdn_data."+ chartHdnBox);
        el.find("thead tr th:eq(" + j + ")").html(chartDataName.date[i]);
        el.find("tbody tr:nth-of-type(1) td:eq(" + j + ")").html(chartDataName.total[i]);
        el.find("tbody tr:nth-of-type(2) td:eq(" + j + ")").html(chartDataName.daily[i]);
    }
}