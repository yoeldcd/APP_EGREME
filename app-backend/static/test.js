
var xhr = new XMLHttpRequest()
xhr.open('POST', 'http://127.0.0.1:8000/edit/');

var data = new FormData()

data.append('username','uname')
data.append('first_name','uname')
data.append('last_name','uname')
data.append('email','uname')

xhr.send(data);