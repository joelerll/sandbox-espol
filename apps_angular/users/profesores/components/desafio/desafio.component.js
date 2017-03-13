angular.module('desafio').component('desafio', {
  templateUrl: './components/desafio/desafio.template.html',
  controller: Controller
})

Controller.$inyect = ['Ayudante']

function Controller(Ayudante) {
  var vm = this
  vm.tiempo = {
    fecha: '',
    hora: ''
  }
  vm.todosEjercicios = []
  vm.tiempo.fecha = '';
  vm.tiempo.hora = ''
  vm.desafio = {
    ejercicios: [],
    titulo: [],
    tiempo_limite: '',
    curso: ''
  }
  Ayudante.todoLosEjercicios((res) => {
    if (res.data.success) {
      vm.todosEjercicios = res.data.ejercicios
    }
  })

  Ayudante.perfil((res)=> {
    if(res.data.success) {
      vm.cursos = res.data.profesor._cursos
    }
    console.log(res.data)
  })

  // date picker
  vm.open1 = function() {
    vm.popup1.opened = true;
  };
  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
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
  vm.clear = function() {
    vm.tiempo.fecha = null;
  };
  vm.today = function() {
    vm.tiempo.fecha = new Date();
  };
  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.altInputFormats = ['M!/d!/yyyy'];

  //time picker
  vm.hstep = 1;
  vm.mstep = 10;
  vm.ismeridian = true;
  vm.tiempo.hora = new Date();
  vm.update = function() {
    var d = new Date();
    d.setHours( 12 );
    d.setMinutes( 0 );
    vm.tiempo.hora = d;
  };

  vm.crear = function() {
    var fecha = moment([moment(vm.tiempo.fecha).format('YYYY'),moment(vm.tiempo.fecha).format('MM'),moment(vm.tiempo.fecha).format('DD'),moment(vm.tiempo.hora).format('hh'),moment(vm.tiempo.hora).format('mm')])
    vm.desafio.tiempo_limite = fecha.toISOString()
    Ayudante.createDesafio(vm.desafio,(res) => {
      console.log(res)
    })
  }
}
