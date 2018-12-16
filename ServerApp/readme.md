
## Web services to get, add, update and delete grades

### List of web services


 |Url format | Method | Description|
 ------------|-------------|-----------
 localhost:3600/api/grades | GET | Get list of all the grades.
 localhost:3600/api/grades/create | POST | Add new grade ( name, course , grade)
 localhost:3600/api/grades/update/:id | PUT | Update existing grade.
 localhost:3600/api/grades/delete/:id | DELETE | Delete existing grade.