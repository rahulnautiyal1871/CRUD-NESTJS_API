# CRUD-NESTJS_API

#go to the directory of project
step 1st => npm start 

#description => TO CREATE A NEW USER
#Method => POST 
#URL    => http://localhost:3000/users

#data => 
{
    "username"   : "rahulnautiyal11",
    "phoneNumber": "+918755940461",
    "password"   : "123456",
    "address"    : "sainik calony kasheru khera",
    "dateOfBirth": "12/07/1997",
    "age"        :24,
    "gender"     :"male" 
}


#description => TO get all users
#Method => GET
#URL => http://localhost:3000/users

#description => TO update a user data
#Method => PATCH
#URL => http://localhost:3000/users/{userId}
#data =>
{
    "username"   : "rahulnautiyal11",
    "phoneNumber": "+918755940461",
    "password"   : "123456",
    "address"    : "sainik calony kasheru khera",
    "dateOfBirth": "12/07/1997",
    "age"        :24,
    "gender"     :"male" 
}


#description => TO get  single user data
#Method => GET
#URL => http://localhost:3000/users/{userId}


#description => TO delete single user data
#Method => DELET
#URL => http://localhost:3000/users/{userId}


#description => User login
#Method => POST
#URL => localhost:3000/auth/login
#data  => 
{
    "username":"rohitnautiyal077",
    "password":"123456"
}