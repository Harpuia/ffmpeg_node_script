var ffmpeg = require('fluent-ffmpeg');
var chalk = require('chalk');

var VIDEO_NAME = '01.rmvb'

var timeFormat = function (time,flag) {
  var h = Math.floor(time / 3600)
  var m = Math.floor(time / 60) % 60
  var s = time % 60

  h = h<10?"0"+h:h
  m = m<10?"0"+m:m
  s = s<10?"0"+s:s

  if(flag)
    return h + ':'+ m + ':' + s
  else
    return h + '_'+ m + '_' + s
}
var screenShot = function(time){
  ffmpeg(VIDEO_NAME)
  .on('error', function(err, stdout, stderr) {
    console.log(chalk.red.bold('Cannot process video: '),timeFormat(time,true), err.message);
  })
  .on('end', function() {
    console.log( chalk.green.bold('Screenshots taken'),timeFormat(time,true))
  })
  .screenshots({
    timestamps: [timeFormat(time,true)],
    filename: timeFormat(time) + '.jpeg',
    folder: 'C:/Users/nemo6/Documents/scripts/ffmpeg/screenshot'
  });
}

ffmpeg.ffprobe(VIDEO_NAME, function(err, metadata) {
  var videoDuration = metadata.format.duration 
  
  for(var i=1;i<Math.round(videoDuration);i++){
    screenShot(i)
  }
});
