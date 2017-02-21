angular.module('estudiantes').component('estudiantes', {
  templateUrl: './components/estudiantes/estudiantes.template.html',
  controller: EstudianteController
})

EstudianteController.$inyect = ['$css', '$http', 'Estudiante'];
/*
function EstudianteController ($http) {
      var vm = this
      vm.nombre = 'joel'
      vm.getEjercicios = ()=>{
        console.log('get ejercicios')
        $http.post('/api/v1/ejercicios', {titulo: 'uno', etiquetas: ['joel','carlos'], descripcion: 'la casa', entradas: ['joel', 'casita'], salidas: ['casotas', 'casa'], dificultad: 'intermedio'}, (res)=> {
          console.log(res.data)
        })
      }
}*/

function EstudianteController($css, $http, Estudiante){
  var self = this;
  $css.remove('./css/profesores.css');
  $css.remove('./css/ayudantes.css');
  /*css.add('./css/estudiantes.css');*/

  self.estudiantes = [];

  self.estudiante = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    correo: ''
  };

  Estudiante.getAll((res) => {
    console.log(res);
    self.estudiantes = res.data.estudiantes;
  })

  self.newEstudiante = () => {
    Estudiante.create(self.estudiante,  (res)=>{
      if (!res.data.success) {
        notie.alert('error', 'Hubo un error al intentar crear', 2);
        return;
      }
      notie.alert('success', 'Estudiante creado correctamente', 2);
      self.estudiantes.push(res.data.estudiante);
      self.estudiante = {};
    })
  }

  self.deleteEstudiante = (id) => {
    self.estudiantes.forEach((estudiante) => {
      if (estudiante._id == id) {
        self.estudiante_borrar = estudiante;
      }
    })
  }

  self.deleteConfirmar = () => {
    Estudiante.del(self.estudiante_borrar._id, (res) => {
      if (!res.data.success) {
        notie.alert('error', 'No se pudo borrar', 2);
        return;
      }
      Estudiante.getAll((res) => {
        self.estudiantes = res.data.estudiantes;
      })
      $('.modal').modal('hide');
      notie.alert('error', 'Borrado exitosamente', 2);
    })
  }


  self.editEstudiante = (estudiante, id) => {
    self.estudiantes.forEach((estudiante) => {
      if (estudiante._id == id) {
        Estudiante.edit(id, estuiante, (res) => {
          if (!res.data.success) {
            notie.alert('error', 'Hubo un error al querer actualizar', 2);
            return;
          }
          Estudiante.getAll((res) => {
            if (res.data.success) {
              self.estudiantes.estudiantes = res.data.etudiantes;
              notie.alert('success', 'Actualizado exitosamente', 2);
            }else{
              notie.alert('error', 'Hubo un error en servidor', 2);
            }
          })
        })
      }
    })
  }
  self.checkIdentificacion = (identificacion) => {
    if ( !identificacion ) {
      return "identificacion vacio";
    }
    if ( identificacion.length != 10 ) {
      return "tamano no valido";
    }
  }

  self.checkNombres = (nombres) => {
    if (!nombres) {
      return "nombres vacio";
    }
  }

  self.checkApellidos = (apellidos) => {
    if (!apellidos) {
      return "apellidos vacio";
    }
  }

  self.checkCorreo = (correo) => {
    if (!correo) {
      return "correo vacio";
    }
    if(!validator.isEmail(correo)) {
      return "no es correo";
    }
  }

}
