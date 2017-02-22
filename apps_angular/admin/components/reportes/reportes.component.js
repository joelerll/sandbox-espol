angular.module('reportes').component('reportes', {
  templateUrl: './components/reportes/reportes.template.html',
  controller: ReportesController
})

ReportesController.$inyect = ['Reportes']

function ReportesController (Reportes) {
  var vm = this;
  vm.nombre = 'sad'
  vm.labels = []
  vm.series = []
  vm.form = {
    mes1: '',
    mes2: '',
    dia1: '',
    dia2: '',
    hora1: '',
    hora2: ''
  }

  vm.send = () => {
    vm.labels = []
    vm.series = []
    getGrafico(vm.form.mes1,vm.form.mes2,vm.form.dia1,vm.form.dia2,vm.form.hora1,vm.form.hora2);
  }

  var getGrafico = (mes1,mes2,dia1,dia2,hora1,hora2) => {
    console.log(vm.form)
    Reportes.getDias(mes1,mes2,dia1,dia2,hora1,hora2, (res) => {
      console.log(res.data.dias)
      res.data.dias.forEach((dia) => {
        vm.labels.push(dia.dia)
        vm.series.push(dia.cantidad)
      })
      console.log(vm.labels)
      console.log(vm.series)
      grafico()
    })
  }
  getGrafico('02','02','22','22','04','06')

  var grafico = () => {
    var data = {
      labels: [],
      series: []
    };

    var data = {
      labels: vm.labels,
      series: vm.series
    };
    var options = {
      distributeSeries: true
    };

    var responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
  }
  // var myChart = new Chart()

}
