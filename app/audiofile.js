const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe")

const input = {
  TranscriptionJobName: "audio9",
  LanguageCode: "ko-KR",
  Media: {
    MediaFileUri: "s3://textractdemo-11202023/audio9.flac"
  },
  OutputBucketName: "textractdemo-11202023",
};

async function startTranscriptionRequest() {
  const transcribeConfig = {
    region: "ap-southeast-2"

  };
  
  const transcribeClient = new TranscribeClient(transcribeConfig);
  const transcribeCommand = new StartTranscriptionJobCommand(input);
  try {
    const transcribeResponse = await transcribeClient.send(transcribeCommand);
    console.log("Transcription job created, the details:");
    console.log(transcribeResponse.TranscriptionJob);
  } catch(err) {
    console.log(err);
  }
}

startTranscriptionRequest();

// ffmpeg -i audio9.m4a -sample_fmt s16 -acodec flac -compression_level 12 -ac 2 -f flac "audio9.flac"
// aws s3 cp audio9.flac s3://textractdemo-11202023/audio9.flac
// node app/audiofile.js