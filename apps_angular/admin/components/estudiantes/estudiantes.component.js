angular.module('estudiantes').component('estudiantes', {
  templateUrl: './components/estudiantes/estudiantes.template.html',
  controller: EstudianteController
})

EstudianteController.$inyect = ['$css', '$http', 'Estudiante','$rootScope'];

function EstudianteController($css, $http, Estudiante,$rootScope){
  var self = this;
  $css.remove('./css/profesores.css');
  $css.remove('./css/ayudantes.css');
  /*css.add('./css/estudiantes.css');*/

  self.estudiantes = [];

  self.estudiante = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    correo: '',
    carrera: ''
  };

  Estudiante.getAll((res) => {
    self.estudiantes = res.data.estudiantes;
  })

  $rootScope.getAllEstudiantes = () => {
    Estudiante.getAll((res) => {
      self.estudiantes = res.data.estudiantes;
    })
  }


  self.newEstudiante = () => {
    self.sanitizar();
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
        $('.modal').modal('hide');
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
    self.sanitizar();
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

  self.cancelarDelete = () => {
    $('.modal').modal('hide');
  }


  self.sanitizar = () => {
    self.estudiante.identificacion = filterXSS(self.estudiante.identificacion)
    self.estudiante.nombres = filterXSS(self.estudiante.nombres)
    self.estudiante.apellidos = filterXSS(self.estudiante.apellidos)
    self.estudiante.correo = filterXSS(self.estudiante.correo)
    self.estudiante.carrera = filterXSS(self.estudiante.carrera)
  }

}



angular.module('estudiantes').directive('validacionNombresApellidosEst', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(/[&<>%#()/''""\\/$^!-_]/.test(ngModelValue)){
          ctrl.$setValidity('specialCharVal', false);
        }else{
          ctrl.$setValidity('specialCharVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        if(/[\d]/.test(ngModelValue)){
          ctrl.$setValidity('numberVal', false);
        }else{
          ctrl.$setValidity('numberVal', true);
          //console.log('No se permiten numeros');
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})

angular.module('estudiantes').directive('validacionEmailEst', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(validator.isEmail(ngModelValue)){
          ctrl.$setValidity('emailVal', true);
        }else{
          ctrl.$setValidity('emailVal', false);
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})

angular.module('estudiantes').directive('validacionIdentificacionEst', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(ngModelValue.length==9){
          ctrl.$setValidity('lengthVal', true);
        }else{
          ctrl.$setValidity('lengthVal', false);
        }
        if(/[\W]/.test(ngModelValue)){
          ctrl.$setValidity('specialCharVal', false);
        }else{
          ctrl.$setValidity('specialCharVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        if(/[A-Za-z]/.test(ngModelValue)){
          ctrl.$setValidity('letterVal', false);
        }else{
          ctrl.$setValidity('letterVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})