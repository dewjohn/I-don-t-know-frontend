var data = [];

for (var i = 0; i < 3; i++) {
  console.log('index', i)
  data[i] = function () {
    console.log(i);
  };
}


data[0]();
data[1]();
data[2]();