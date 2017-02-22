angular.module('profesores').component('profesores', {
   templateUrl: './components/profesores/profesores.template.html',
   controller: ProfesoresController
 });

ProfesoresController.$inyect = ['$css','$http','Profesores'];


function ProfesoresController($css,$http,Profesores, $scope) {
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
    if(validarNombreApellido($('#nombres-profesor').val())){
      console.log($('#nombres-profesor').val() + ' es un nombre valido');
     
      //$('#nombres-profesor').$setValidity('validezNombre', true);
      if (validarNombreApellido($('#apellidos-profesor').val())) {
        console.log($('#apellidos-profesor').val() + ' es un apellido valido');
        if(validator.isEmail($('#correo-profesor').val())) {
          console.log($('#correo-profesor').val() + ' es un correo valido');
          Profesores.create(self.profesor,(res) => {
            if (!res.data.success) {
              notie.alert('error', 'Hubo un error al intentar crear', 2);
              //$('#profesorNuevo').modal('hide');
              return;
            }
            //$('#profesorNuevo').modal('hide');
            notie.alert('success', 'Profesor creado correctamente', 2);
            self.profesores.push(res.data.profesor);
            self.profesor = {};
          });
        }else{
          console.log($('#correos-profesor').val() + 'no es un correo valido');
          notie.alert('error', $('#correo-profesor').val() + ' no es un correo valido', 2);
        }
      }else{
        console.log($('#apellidos-profesor').val() + ' no es un apellido valido');  
        notie.alert('error', $('#apellidos-profesor').val() + ' no es un apellido valido', 2);
      }
    }else{
      console.log($('#nombres-profesor').val() + ' no es un nombre valido');
      notie.alert('error', $('#nombres-profesor').val() + ' no es un nombre valido', 2);

      
    }
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
        $('.modal').modal('hide');
        return;
      }
      Profesores.getAll((res) => {
        self.profesores = res.data.profesores;
      })
      $('.modal').modal('hide');
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

  self.cancelarDelete = () => {
    $('.modal').modal('hide');
  }

}


function validarNombreApellido(palabra){
  var regex = '/^[a-zA-Z]+$/';
  return /^[a-zA-Z]+$/.test(palabra);
}