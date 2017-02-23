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
  getGrafico('2017','2017','02','02','23','23')
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
        legend: {
            data:['Ejercicios']
        },
        xAxis: {
            data: vm.labels
        },
        yAxis: {},
        series: [{
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
