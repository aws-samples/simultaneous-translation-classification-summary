const {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} = require("@aws-sdk/client-transcribe-streaming");

// Replace with your actual AWS credentials

// Configuration for AWS Transcribe
const LanguageCode = "ko-KR";
const MediaEncoding = "pcm"; // AWS Transcribe supports PCM format
const MediaSampleRateHertz = 16000;

async function* bufferToAsyncIterable(buffer, chunkSize) {
  for (let i = 0; i < buffer.length; i += chunkSize) {
    yield buffer.slice(i, i + chunkSize);
  }
}

module.exports.Transcribe = async (bufferedData) => {
  // convert bufferedData into stream:
  const stream = await bufferToAsyncIterable(bufferedData, 2048);
  const client = new TranscribeStreamingClient({
    region: "us-east-1"
  });

  const params = {
    LanguageCode,
    MediaEncoding,
    MediaSampleRateHertz,
    AudioStream: (async function* () {
      for await (const chunk of stream) {
        yield {AudioEvent: {AudioChunk: chunk}};
      }
    })(),
  };
  const command = new StartStreamTranscriptionCommand(params);
  // Send transcription request
  const response = await client.send(command);
  // Start to print response
  try {
    for await (const event of response.TranscriptResultStream) {
      // console.log(JSON.stringify(event) + "===");
      const results = event.TranscriptEvent.Transcript.Results;
      if(results.length > 0) {
        if(!results[0].IsPartial) {
          const transcribedTxt = results[0].Alternatives[0].Transcript;
          // call bedrock to translate this:
          console.log(results[0].Alternatives[0].Transcript)
          return results[0].Alternatives[0].Transcript;
        }
    }
  }
  } catch(err) {
    console.log("error")
    console.log(err)
  }
}