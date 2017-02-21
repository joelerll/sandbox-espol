angular.module('nuevoEjercicio',['ngTagsInput','xeditable','ui.bootstrap','ngSanitize','angularCSS'])
.run(function(editableOptions,editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
   editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});
