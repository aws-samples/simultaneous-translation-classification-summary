const mic = require("mic");
const TranscribeUtil = require("./transcribe");
var fs = require('fs');
const BedrockUtil = require("./bedrock");

async function realtimeTranslate(bufferedData) {
  var buffer = Buffer.concat(bufferedData);
  const transcribedTxt = await TranscribeUtil.Transcribe(buffer);
  // console.log(transcribedTxt);
  const translatedTxt = await BedrockUtil.BedrockTranslate(transcribedTxt);
  console.log(JSON.stringify(translatedTxt));
}

var bufferedData = [];
async function startRequest() {

  // Create microphone instance
  const microphone = mic({
    rate: "16000",
    channels: "1",
    debug: false,
    exitOnSilence: 10,
  });

  const micInputStream = microphone.getAudioStream();

  micInputStream.on("data", async function (chunk) {
    // if(chunk.length > 0 && silenceStartTime !== null) {
    //   clearTimeout(silenceTimeout1);
    //   clearTimeout(silenceTimeout2);
    //   silenceStartTime = null;
    // }
    // combine all the chunks:
    bufferedData.push(chunk);
    //console.log("Recieved Input Stream: " + bufferedData.length);
  });
  micInputStream.on('silence', async function () {
    // console.log("translating...");
    console.log("<translating>")
    if (bufferedData.length > 0) {
      await realtimeTranslate(bufferedData);
      console.log("</translated>")
      bufferedData = [];
    }
  });
  micInputStream.on('pauseComplete', async function () {
  });
  micInputStream.on('resumeComplete', function () {
    console.log("Got SIGNAL resumeComplete");

  });
  micInputStream.on('stopComplete', async function () {
    console.log("Got SIGNAL stopComplete");
    // await realtimeTranslate(bufferedData);
    // bufferedData = [];
  });

  micInputStream.on('resumeComplete', function () {
    console.log("Got SIGNAL resumeComplete");
    setTimeout(function () {
      microphone.stop();
    }, 3000);
  });

  microphone.start();
  // Start recording from microphone
}

startRequest();
