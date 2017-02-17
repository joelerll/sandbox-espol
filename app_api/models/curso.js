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
  profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' },
  numero_paralelo: {
    type: String,
    required: [true, 'numero paralelo es requerido'],
    unique: true
  },
  _estudiantes : [{ type: Schema.Types.ObjectId, ref: 'Estudiante' }]
},{collection: 'cursos', versionKey: false, timestamps: true})

CursoSchema.plugin(uniqueValidator);
