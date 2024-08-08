const { BedrockRuntimeClient, ConverseCommand } = require("@aws-sdk/client-bedrock-runtime");

module.exports.BedrockTranslate = async (originalTxt) => {
  const bedrockRuntimeClient = new BedrockRuntimeClient({
    region: "us-east-1"
  });
  const input = {
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    messages: [
      {
        role: "user",
        content: [
          {
            text: "You are a interpreter translating a AWS big data presentation. And will translate the Korean presentation into English. Please only output the translated text, do not include xml tags, do not include formatting.  The text is as follows: <content>" + originalTxt + "</content>"
          }
        ]
      }
    ]
  }
  try {
  const command = new ConverseCommand(input);
  const response = await bedrockRuntimeClient.send(command);
  console.log(JSON.stringify(response.output.message.content));
  return response.output.message.content[0].text;
  } catch (error) {
    throw new Error("Error in bedrock translation: " + error);
  }
}

// this.BedrockTranslate("리모트 셔플 서비스라는 게 있는데요. 이게 팝 스파 삼 점 영부터 제 셔플 트레킹 이라는 기능이 나오면서 이게 바로 이 케이스 에서 본격적으로 사 사용할 수 있는 환경 됐다라고 생각하시면 해도 될 것 같아요. 네, 이 이게 어떤 특징을 가지고 있냐하면 셔플 데이터를 보유하고 있는 노드를 이기 스크 종료하지 않고 이 셔플 데이터 사용이 끝날 때까지 기다려 줌으로써 어 어느 정도의 기능을 셔플 기능을 현제 확보하는 기능인데. 이 여전히 비율 비효율적인 거의 주요 원인은 우리가 그, 그러니까 어, 그 더블 스 같은 클라우드 프로 바이는 어떤 타입의 노드 있냐가 굉장히 코스의 중요한 역할을 하게 될 텐데요. 이 컴퓨터로 그냐 네트워킹 도 그냐 아이오 인턴 시에 노드 아니면 디스크 가 뭘로 많이 붙어 있는 거냐 뭐 예를 들면 이런 타입 들이 있을거예요. 근데 이제 셔플 서비스라는 거는 정보가 집중 됐다가 흩어지는 역할을 하기 때문에 아이오 성능이 그때 어디 하는 어, 이 노드 의 셔플 서비스가 동작하는 것이 굉장히 중요한 이슈 이고 요런 것들을 해주는 거, 이 아마존에서 조만간 나올 거예요. 현재는 인 웨이팅 단계 때문에 이게 안정화 되면 저희도 어 도입을 해서 사용을 해 볼 예정입니다. 인플레 스 파서 리 사이즈 이라는 거는 테스크 리 사이즈 없이 메모리 프레시 가 강한 환경을 에서 다이나믹 칼리 리퍼 사이즈를 조정을 해 줌으로써 어 에러를 방지하고 또한 스테이지가 다시 실행 됨으로써 발생하는 시간적인 단계를 막아 주는 그런 기능이 어요. 이것도 도입할 예정입니다. 그리고 어 엔드 플리 환경에서 아마 AD 에치 분들 돌입 혹은 엘 많이 사용하 계실 텐데요. 어 우리가 이 M 말 해서 엘 앱의 사용자는 뭐 그룹 정보들을 통해서 그 권한 관리 어 테이블 스키마 뭐 컬럼에 대한 권한 접근에 대한 권한 관리를 제대로 할 수가 이제 없는 게 굉장히 큰 문제를 나가고 있어요. 일반 사용자들이 그냥 트리 노라는 어 커리 엔진을 저희가 레인 아파트 레이저 와의 복합 환경으로 어 제공을 하고 있기 때문에 여기서는 문제가 없는데 데이터 플리 이이 개발하는 개발자 분들이라든지 어 뭐 특 특정한 케이스 의석 배어 들끼리 의 통신의 경우에 어 이 스파이 제대로 된 권한 관리를 할수 있는 방법이 좀 없는 편이라서 레이크 포메이션 에서 이 애들 과의 상공 운용을 제공을 하고 있고 이 M 말로 이 케 스 드 에서도 M 어 애드 레 포메이션 이 어 지원 기능으로 들어갈 예정이었습니다. 이 이렇게 되면 어 좀 더 운전한 애 환경의 권한 제어 도움이 될 것이다. 이 케이스 N 이면은 어 IDCN 오프 레 미 에에 있는 자원들을 이 케이스 클라스로 같이 이제 활용을 할 수 있는 어 개념이라고 보시면 될 것 같아요. 저희가 어 우리 코로나 나 시국에 GPU 가 싹 말라서 우리 아마존에서 GPU 사용 원하는 만큼 사용할 수 없는 환경에 모였던 경우가 많을 거예요. 그 시절에 저희도 에 백 어 GPU 를 도입을 했었고 아 DC 어 그 자원들을 어 어 저희가 바 그 상식 운영하는 테스크 들에서 다 같이 활용하기 위해서 디 QS 웨어 플로 해 놓고 어, 그 하이브리드 클럽 라고 하죠. 하이브 하이 브리 클라우드 형태를 운영을 하고 있습니다. 앞으로는 내도 성능은 중요하지 않지만 G 피 성능이 중요하고 지 필 성능과 더불어서 GP 를 필요로 하는 테스크 들을 이 하이브 리드 클라우드 상에서 운영 할 수 있도록 어 진행할 시 계 계획입니다. 야 정리하자면 어 EM 만 원 이케 S 가 민 많이 확보하게 해 준다 비용도 세이 할 수 있게 해 준다. 그리고 운영이 굉장히 극대화 되기 때문에 다 이. 그 좀 감춰 놓 아까 이제 오포 터를 많이 만들어 가지고 그 러닝 컵을 감추고 어 많은 팀들이 공통 환경을 사용할 수 있도록 어 쉽게 사용할 수 있 있도록 이런 환경 든다고 말씀드렸었는데 이렇게 함으로써 어 많은 데이터 관련 작업을 하고 싶은 팀들이 좀 더 쉬 쉽게 데이터 빌 케이션 만들고 배포할 수 있는 환경을 만들어서 전자적 데이터 반에 자가 좀 발사는 도움을 줄 수 있었다. 이제 라고 하면서 저희 오늘 어 코먼 소리를 내는 발표를 마비 하도록 하겠습니다. 감사합니다.")

// node app/bedrock.js