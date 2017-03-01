angular.module('ayudantes').component('ayudantes', {
   templateUrl: './components/ayudantes/ayudantes.template.html',
   controller: AyudantesController
 });

AyudantesController.$inyect = ['$css','$http','Ayudantes'];


function AyudantesController($css,$http,Ayudantes) {
  
  var self = this;
  $css.remove('./css/profesores.css');
  $css.add('./css/ayudantes.css');

  self.ayudantes = [];

  self.ayudante = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    correo: '',
    carrera: ''
  };

  Ayudantes.getAll((res) => {
    self.ayudantes = res.data.ayudantes;
  })

  //TODO: enviar mensajes de error al form, no cerrar el form cuando de crear y hay errores
  //TODO: angular messajes para form de ayudante
  self.newAyudante = () => {
    self.sanitizar();
    Ayudantes.create(self.ayudante,(res) => {
      if (!res.data.success) {
        notie.alert('error', 'Hubo un error al intentar crear', 2);
        $('.modal').modal('hide');
        return;
      }
      notie.alert('success', 'Ayudante creado correctamente', 2);
      self.ayudantes.push(res.data.ayudante);
      self.ayudante = {};
    })
  }

  //tabla botones
  self.deleteAyudante = (id) => {
    self.ayudantes.forEach((ayudante) => {
      if (ayudante._id == id) {
        self.profesor_borrar = ayudante;
      }
    })
  }

  self.deleteConfirmar = () => {
    Ayudantes.del(self.profesor_borrar._id,(res) => {
      //TODO: error mongoose cant not createAt and updateAt at the same time
      if (!res.data.success) {
        notie.alert('error', 'No se pudo borrar', 2);
        return;
      }
      Ayudantes.getAll((res) => {
        self.ayudantes = res.data.ayudantes;
      })
      $('.modal').modal('hide');
      //FIXME: no se borra de la lista directamente, si no que lo borra el anterior y no el que es
      // self.ayudantes.splice(self.ayudantes.indexOf(self.profesor_borrar) + 1, 1);
      notie.alert('success', 'Borrado Exitosamente', 2);
    })
    //self.profesor_borrar = {};
  }

  self.editAyudante = (ayudante, id) => {
    self.sanitizar();
    self.ayudantes.forEach((ayudante) => {
      if (ayudante._id == id) {
        Ayudantes.edit(id,ayudante, (res) => {
          if (!res.data.success) {
            notie.alert('error', 'Hubo un error al querer actualizar', 2);
            return;
          }
          Ayudantes.getAll((res) => {
            if (res.data.success) {
              self.ayudantes.ayudantes = res.data.ayudantes;
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

  self.checkCarrera = (carrera) =>{
    if (!carrera) {
      return "carrera vacia";
    }
  }

  self.prueba = () => {
    /*
    console.log('Sin sanitizar: ' + self.ayudante.nombres)
    console.log('Sanitizado: ' + $sanitize(self.ayudante.nombres))
    console.log('Sanitizado2: ' + filterXSS(self.ayudante.nombres))
    */
    console.log('Antes')
    console.log(self.ayudante)
    self.sanitizar();
    console.log('Despues')
    console.log(self.ayudante)
  }


  self.sanitizar = () => {
    self.ayudante.identificacion = filterXSS(self.ayudante.identificacion)
    self.ayudante.nombres = filterXSS(self.ayudante.nombres)
    self.ayudante.apellidos = filterXSS(self.ayudante.apellidos)
    self.ayudante.correo = filterXSS(self.ayudante.correo)
    self.ayudante.carrera = filterXSS(self.ayudante.carrera)
  }

}


angular.module('ayudantes').directive('validacionNombresApellidosAyudante', function(){
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

angular.module('ayudantes').directive('validacionEmailAyudante', function(){
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

angular.module('ayudantes').directive('validacionIdentificacionAyudante', function(){
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