angular.module('reportes').component('reportes', {
  templateUrl: './components/reportes/reportes.template.html',
  controller: ReportesController
})

ReportesController.$inyect = ['Reportes','$css']

function ReportesController (Reportes,$css) {
  var vm = this;
  $css.add('./css/reportes.css')
  vm.labels = []
  vm.series = []
  vm.cursoChartData = {
    legend: [],
    data: [],
    x: []
  }

  Reportes.getCursosEjercicios((res) => {
    if (res.data.success) {
      res.data.cantidad.forEach((curso) => {
        vm.cursoChartData.legend.push(parseInt(curso.cantidad));
        vm.cursoChartData.x.push('Curso ' + curso.curso.numero_paralelo);
        vm.cursoChartData.data.push({xAxis:0, y: 350,name: curso.curso.numero_paralelo,symbolSize:20, symbol: ''})
      })
      vm.EjerciciosPorCurso()
    } else {
      console.log('sad');
    }
  })

  vm.EjerciciosPorCurso = () => {
    var cursoChart = echarts.init(document.getElementById('curso'));
        option = {
        title: {
            x: 'center',
            text: 'Cursos',
            subtext: 'Cantidad ejercicios por curso',
            link: ''
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true,lang:['spanish'],title : 'restaurar'},
                saveAsImage: {show: true,lang:['spanish'],title : 'descargar'}
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: vm.cursoChartData.x
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: 'Cantidad ejercicios por curso',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'bottom',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: vm.cursoChartData.legend,
            }
        ]
    };
    //     option = {
    //     title : {
    //         text: 'Ejercicios resuelto por curso sobre el total',
    //         subtext: 'por curso',
    //         x:'center'
    //     },
    //     tooltip : {
    //         trigger: 'item',
    //         formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },
    //     legend: {
    //         orient : 'vertical',
    //         x : 'left',
    //         data:  vm.cursoChartData.legend
    //     },
    //     toolbox: {
    //     },
    //     calculable : true,
    //     series : [
    //         {
    //             name:'Curso',
    //             type:'pie',
    //             radius : '55%',
    //             center: ['50%', '60%'],
    //             data:   vm.cursoChartData.data
    //         }
    //     ]
    // };
    cursoChart.setOption(option);
  }

  vm.form2 = {
    anio1: moment(vm.dt).format('YYYY'),
    anio2: moment(vm.dt2).format('YYYY'),
    mes1: moment(vm.dt).format('MM'),
    mes2: moment(vm.dt2).format('MM'),
    dia1: moment(vm.dt).format('DD'),
    dia2: moment(vm.dt2).format('DD')
  }

  vm.send = () => {
    vm.labels = []
    vm.series = []
    vm.form2 = {
      anio1: moment(vm.dt).format('YYYY'),
      anio2: moment(vm.dt2).format('YYYY'),
      mes1: moment(vm.dt).format('MM'),
      mes2: moment(vm.dt2).format('MM'),
      dia1: moment(vm.dt).format('DD'),
      dia2: moment(vm.dt2).format('DD')
    }
    getGrafico(vm.form2.anio1,vm.form2.anio2,vm.form2.mes1,vm.form2.mes2,vm.form2.dia1,vm.form2.dia2);
  }

  var getGrafico = (mes1,mes2,dia1,dia2,hora1,hora2) => {
    Reportes.getDias(mes1,mes2,dia1,dia2,hora1,hora2, (res) => {
      res.data.dias.forEach((dia) => {
        vm.labels.push(dia.dia)
        vm.series.push(dia.cantidad)
      })
      grafico()
    })
  }
  var now = moment();
  vm.hoy = moment(now).format('YYYY-DD-MM')
  getGrafico(moment(now).format('YYYY'),moment(now).format('YYYY'),moment(now).format('MM'),moment(now).format('MM'),moment(now).format('DD'),moment(now).format('DD'))
  var grafico = () => {
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
        title: {
            text: 'Ejercicios resueltos'
        },
        tooltip: {},
        toolbox: {
          show : true,
          feature : {
             dataView : {show: true, readOnly: true, title: 'ver data', lang:['spanish']},
             saveAsImage : {show: true, title : 'descargar',}
         }
       },

        xAxis: {
            data: vm.labels
        },
        yAxis: {},
        series: [{
          itemStyle: {
              normal: {
                  color: function(params) {
                      // build a color map as your need.
                      var colorList = [
                        '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                         '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                         '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                      ];
                      return colorList[params.dataIndex]
                  },
                  label: {
                      show: true,
                      position: 'bottom',
                      formatter: '{b}\n{c}'
                  }
              }
          },
            name: 'Ejercicios',
            type: 'bar',
            data: vm.series
        }]
    };
    myChart.setOption(option);
  }

  //date pickers
  vm.open1 = function() {
    vm.popup1.opened = true;
  };
  vm.open2 = function() {
    vm.popup2.opened = true;
  };

  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    startingDay: 1
  };
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  vm.popup1 = {
    opened: false
  };

  vm.popup2 = {
    opened: false
  };

  vm.clear = function() {
    vm.dt = null;
  };


  vm.today = function() {
    vm.dt = new Date();
  };

  vm.clear2 = function() {
    vm.dt2 = null;
  };

  vm.today2 = function() {
    vm.dt2 = new Date();
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.altInputFormats = ['M!/d!/yyyy'];

}
