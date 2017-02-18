angular.module('nuevoEjercicio',['ngTagsInput','xeditable','ui.bootstrap','ngSanitize'])
.run(function(editableOptions,editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
   editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});
