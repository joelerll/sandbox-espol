echo "GET"
http GET http://localhost:7000/api/v1/profesores
sleep 2
echo "POST"
 http POST http://localhost:7000/api/v1/profesores
sleep 2
echo "PUT"
  http PUT http://localhost:7000/api/v1/profesores/123456
sleep 2
echo "DELETE"
  http DELETE http://localhost:7000/api/v1/profesores/123456
sleep 2
echo "LIKE"
  http GET http://localhost:7000/api/v1/profesores?like=joel
  sleep 2
