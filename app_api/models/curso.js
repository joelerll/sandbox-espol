var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');

var CursoSchema = mongoose.Schema({
  _id: {
	    type: String,
	    unique: true,
	    'default': shortId.generate
	},
  _profesor: { type: String, ref: 'Profesor', default: ''},
  numero_paralelo: {
    type: String,
    required: [true, 'numero paralelo es requerido'],
    unique: true
  },
  _estudiantes : [{ type: String, ref: 'Estudiante' }]
},{collection: 'cursos', versionKey: false, timestamps: true})

CursoSchema.plugin(uniqueValidator);

CursoSchema.methods.create = function(cb) {
  this.save(cb)
}

CursoSchema.statics.getById = function(id, cb) {
  this.model('Curso').findOne({_id: id}, cb)
}

CursoSchema.statics.addProfesorById = function(id_curso,id_profesor, cb) {
  this.model('Curso').findOneAndUpdate({_id: id_curso}, {$set: {_profesor: id_profesor}}, cb)
}

CursoSchema.statics.addEstudianteById = function(id_curso,id_estudiante, cb) {
  console.log(id_curso)
  console.log(id_estudiante)
  console.log(typeof id_estudiante)
  this.model('Curso').findOneAndUpdate({_id: id_curso}, {$addToSet: {"_estudiantes": id_estudiante}},{safe: true, upsert: true}, cb)
}

CursoSchema.statics.populateCurso = function(id_curso, cb) {
  this.model('Curso').find({_id: id_curso}).populate({path: '_estudiantes _profesor', select: '-clave -_desafios -desafios -_ejercicios'}).exec(cb)
}

CursoSchema.statics.delete = function(id_curso, cb) {
  this.model('Curso').findByIdAndRemove(id_curso).exec(cb)
}

CursoSchema.statics.getAll = function(cb) {
  this.model('Curso').find({}, cb)
}

CursoSchema.statics.update = function (id,curso,cb) {
  this.model('Curso').findOneAndUpdate({_id: id}, {$set: {numero_paralelo: curso.numero_paralelo, _profesor: curso.profesor}},cb)
}

CursoSchema.statics.deleteEstudiante = function(id_curso,id_estudiante,cb) {
  this.model('Curso').findOneAndUpdate({_id: id_curso}, {$pull: {'_estudiantes': id_estudiante}},{ safe: true },cb)
}

CursoSchema.statics.deleteProfesor = function(id_curso,id_profesor,cb) {
  this.model('Curso').findOneAndUpdate({_id: id_curso}, {$set: {'_profesor': ''}},{ safe: true },cb)
}

module.exports = mongoose.model('Curso', CursoSchema)
