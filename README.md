# Proyecto de DAW Segundo Parcial
Sandox App

# Planeacion
https://drive.google.com/file/d/0B5eV7W42S7ndSmxmWkV1OW9sUDg/view?usp=sharing
https://docs.google.com/document/d/1OEPf2grkh8Xj7Lj5Eg4XPSGT95-k8aebi553okkpzsg/edit?usp=sharing
https://drive.google.com/file/d/0B5eV7W42S7ndSVNUSFNSalRjcDg/view?usp=sharing

# APIS
- El prefix es /api/v1

## Admin /admin
path  |method   |accion  
--|---|--|
/login  |POST   |loggear profesor  
## Profesores-admin
- Ejemplo GET http://localhost:4000/api/v1/profesores

path  |method   |acccion   |devuelve   |  recibe (body)|
--|---|---|---|--|
/profesores  |GET   |obtiene la lista de profesores   |da un success(booleano) y la lista de profesores en profesores   |  nada
/profesores  |POST   |crear un profesor   |el profesor creado y un booleano   |objeto profesor
/profesores/:id  |PUT   |editar un profesor   |el profesor editado en profesor y un booleano   | el objeto profesor a editar
/profesores/:id| DELETE| borrar un profesor| un booleano (succcess) si el profesor fue eliminado| nada

## Ayudantes-admin


## Estudiantes-admin

## Profesores

## Estudiantes

## Ayudantes

## Metricas

## Otros
