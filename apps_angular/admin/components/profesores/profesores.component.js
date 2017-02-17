angular.module('profesores').component('profesores', {
   templateUrl: './components/profesores/profesores.template.html',
   controller: ProfesoresController
 });

ProfesoresController.$inyect = ['$css','$http','Profesores'];


function ProfesoresController($css,$http,Profesores) {
  var self = this;
  $css.add('./css/profesores.css');

  self.profesores = [];

  self.profesor = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    correo: ''
  };

  Profesores.getAll((res) => {
    self.profesores = res.data.profesores;
  })

  //TODO: enviar mensajes de error al form, no cerrar el form cuando de crear y hay errores
  //TODO: angular messajes para form de profesor
  self.newProfesor = () => {
    Profesores.create(self.profesor,(res) => {
      if (!res.data.success) {
        notie.alert('error', 'Hubo un error al intentar crear', 2);
        return;
      }
      notie.alert('success', 'Profesor creado correctamente', 2);
      self.profesores.push(res.data.profesor);
      self.profesor = {};
    })
  }

  //tabla botones
  self.deleteProfesor = (id) => {
    self.profesores.forEach((profesor) => {
      if (profesor._id == id) {
        self.profesor_borrar = profesor;
      }
    })
  }

  self.deleteConfirmar = () => {
    Profesores.del(self.profesor_borrar._id,(res) => {
      //TODO: error mongoose cant not createAt and updateAt at the same time
      if (!res.data.success) {
        notie.alert('error', 'No se pudo borrar', 2);
        return;
      }
      Profesores.getAll((res) => {
        self.profesores = res.data.profesores;
      })
      //FIXME: no se borra de la lista directamente, si no que lo borra el anterior y no el que es
      // self.profesores.splice(self.profesores.indexOf(self.profesor_borrar) + 1, 1);
      notie.alert('success', 'Borrado Exitosamente', 2);
    })
    //self.profesor_borrar = {};
  }

  self.editProfesor = (profesor, id) => {
    self.profesores.forEach((profesor) => {
      if (profesor._id == id) {
        Profesores.edit(id,profesor, (res) => {
          if (!res.data.success) {
            notie.alert('error', 'Hubo un error al querer actualizar', 2);
            return;
          }
          Profesores.getAll((res) => {
            if (res.data.success) {
              self.profesores.profesores = res.data.profesores;
              notie.alert('success', 'Actualizado Exitosamente', 2);
            } else {
              notie.alert('error', 'Hubo un error en servidor', 2);
            }
          })
        })
      }
    })
  }

  // check edit on table
  //TODO: mostrar en rojo cuando las validaciones no sean validaciones
  //TODO: que sea con ngFormas con one way live
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
