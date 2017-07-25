(function() {
  if (navigator.serviceWorker != null) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      console.log('Registered events at scope: ', registration.scope);
    });
  }
  var time = new Date();
  document.getElementById("time").innerHTML = time.getHours() + ':' + ((time.getMinutes() + '').length === 1 ? `0${time.getMinutes()}` : time.getMinutes());


  const host = 'smartsvcdemo.mqtt.iot.gz.baidubce.com';
  const port = 8884;
  const clientId = `DeviceId-${Date.parse(new Date())}`;
  var client = new Mqtt.Client(host, port, clientId);
  client.onConnectionLost = function() {
    console.log('disconnect');
  }
  client.onMessageArrived = function(message) {
    console.log(message.payloadString);
    var re = /^[0-9]+\.?[0-9]*$/;
    if (message.destinationName === 'controlDoor' && message.payloadString === 'open') {
      document.getElementById('opendoor').click();
    } else if (message.destinationName === 'controlDoor' && message.payloadString === 'close') {
      document.getElementById('closedoor').click();
    } else if (message.destinationName === 'controlWindow' && message.payloadString === 'open') {
      document.getElementById('openwindow').click();
    } else if (message.destinationName === 'controlWindow' && message.payloadString === 'close') {
      document.getElementById('closewindow').click();
    } else if (message.destinationName === 'controlLight' && message.payloadString === 'open') {
      document.getElementById('openlamp').click();
    } else if (message.destinationName === 'controlLight' && message.payloadString === 'close') {
      document.getElementById('closelamp').click();
    } else if (message.destinationName === 'regulateTemperature' && message.payloadString === 'open') {
      document.getElementById('temperature').style.display = 'none';
      document.getElementById('temperature1').style.display = 'block';
    } else if (message.destinationName === 'regulateTemperature' && message.payloadString === 'close') {
      document.getElementById('temperature').style.display = 'block';
      document.getElementById('temperature1').style.display = 'none';
    } else if (message.destinationName === 'regulateTemperature') {
      if (re.test(message.payloadString)) {
        document.getElementById('tmp1').innerHTML = `${message.payloadString}℃`;
        document.getElementById('tmp1').style.height = `${message.payloadString/50*100}%`;
      }
    } else if (message.destinationName === 'PSI01' && re.test(message.payloadString)) {
      document.getElementById('lun1').innerHTML = `${message.payloadString}MP`;
      if (parseFloat(message.payloadString) > 2.0 && parseFloat(message.payloadString) < 3.0) {
        document.getElementById('lun1').style.background = '#5c5858';
      } else {
        document.getElementById('lun1').style.background = 'red';
      }
    } else if (message.destinationName === 'PSI02' && re.test(message.payloadString)) {
      document.getElementById('lun2').innerHTML = `${message.payloadString}MP`;
      if (parseFloat(message.payloadString) > 2.0 && parseFloat(message.payloadString) < 3.0) {
        document.getElementById('lun2').style.background = '#5c5858';
      } else {
        document.getElementById('lun2').style.background = 'red';
      }
    } else if (message.destinationName === 'PSI03' && re.test(message.payloadString)) {
      document.getElementById('lun3').innerHTML = `${message.payloadString}MP`;
      if (parseFloat(message.payloadString) > 2.0 && parseFloat(message.payloadString) < 3.0) {
        document.getElementById('lun3').style.background = '#5c5858';
      } else {
        document.getElementById('lun3').style.background = 'red';
      }
    } else if (message.destinationName === 'PSI04' && re.test(message.payloadString)) {
      document.getElementById('lun4').innerHTML = `${message.payloadString}MP`;
      if (parseFloat(message.payloadString) > 2.0 && parseFloat(message.payloadString) < 3.0) {
        document.getElementById('lun4').style.background = '#5c5858';
      } else {
        document.getElementById('lun4').style.background = 'red';
      }
    } else if (message.destinationName === 'compressor') {
      if (message.payloadString == 'warn') {
        document.getElementById('yasuoji').innerHTML = '压缩机异常';
        document.getElementById('yasuoji').style.color = 'red';
      } else if (message.payloadString == 'ok') {
        document.getElementById('yasuoji').innerHTML = '压缩机正常';
        document.getElementById('yasuoji').style.color = '#fff';
      }
    } else if (message.destinationName === 'refrigerant') {
      if (message.payloadString == 'warn') {
        document.getElementById('lengdongji').innerHTML = '冷媒异常';
        document.getElementById('lengdongji').style.color = 'red';
      } else if (message.payloadString == 'ok') {
        document.getElementById('lengdongji').innerHTML = '冷媒正常';
        document.getElementById('lengdongji').style.color = '#fff';
      }
    } else if (message.destinationName === 'esm' && re.test(message.payloadString)) {
      document.getElementById('esm').innerHTML = `${message.payloadString}km`;
    } else if (message.destinationName === 'dog') {
      if (message.payloadString == 'in') {
        document.getElementById('dog').style.display = 'block';
      } else if (message.payloadString == 'out') {
        document.getElementById('dog').style.display = 'none';
      }
    } else if (message.destinationName === 'baby') {
      if (message.payloadString == 'in') {
        document.getElementById('baby').style.display = 'block';
      } else if (message.payloadString == 'out') {
        document.getElementById('baby').style.display = 'none';
      }
    }
  }
  var options = {
    timeout: 3,
    keepAliveInterval: 90,
    cleanSession: true,
    useSSL: true,
    onSuccess: () => {
      console.log('success');
      client.subscribe('controlDoor', { qos: 0 });
      client.subscribe('controlWindow', { qos: 0 });
      client.subscribe('controlLight', { qos: 0 });
      client.subscribe('regulateTemperature', { qos: 0 });
      client.subscribe('controlDoor', { qos: 0 });
      client.subscribe('PSI04', { qos: 0 });
      client.subscribe('PSI01', { qos: 0 });
      client.subscribe('PSI02', { qos: 0 });
      client.subscribe('PSI03', { qos: 0 });
      client.subscribe('compressor', { qos: 0 });
      client.subscribe('refrigerant', { qos: 0 });
      client.subscribe('esm', { qos: 0 });
      client.subscribe('dog', { qos: 0 });
      client.subscribe('baby', { qos: 0 });
    },
    onFailure: () => { alert('fail'); }
  };
  options.userName = 'smartsvcdemo/carweb';
  options.password = 'RKP0pH8leTcdKwNO6M2k985izrIYROfHqhogR3vn010=';
  try {
    client.connect(options);
  } catch (err) {
    alert(err);
  }

})(window);