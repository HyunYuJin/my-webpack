# my-webpack
나만의 빌드 시스템을 만들어봅니다.

## npm을 이용한 프로젝트 개발 프로젝트 세팅
```bash
npm init
```
명령어를 실행하면 프로젝트의 모든 정보를 기록하는 **package.json**을 생성할 수 있습니다.
  
* name: 프로젝트 이름
* version: 프로젝트 버전 정보
* description: 프로젝트 설명
* main: 노드 어플리케이션일 경우 진입점 경로. 프론트엔드 프로젝트일 경우 사용하지 않는다.
* scripts: 프로젝트 명령어를 등록할 수 있다.초기화시 test 명령어가 샘플로 등록되어 있다
* author: 프로그램 작성자
* license: 라이센스

  
## 프로젝트 실행 방법
실행 명령어를 package.json의 script 부분에 등록해줍니다. (build script를 작성)
```json
{
  "scripts": {
    "build": "webpack"
  }
}
```
  
그리고 다음처럼 커스텀 명령어로 실행할 수 있습니다.
```bash
npm run build
```

  
## Webpack
브라우저에 영향을 받지 않고 모듈 시스템을 사용하기 위해서는 여러개의 파일을 하나로 합쳐주는 번들러가 필요합니다. 다양한 번들러가 있지만 Webpack을 사용하겠습니다.
엔트리 포인트로부터 의존적인 모든 모듈들을 찾아 하나의 파일로 번들링 해주는 역할을 합니다.
```bash
npm install -D webpack webpack-cli
```

설치를 마치게되면, node-modules라는 폴더가 생기고 .bin이라는 폴더에 실행 가능한 명령어를 확인할 수 있습니다. 

webpack 또는 webpack-cli 둘 중 하나를 실행합니다.   
```bash
node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path dist/
```

실행 결과, dist/main.js에 번들링된 결과가 나오게 됩니다.

* mode: 웹팩 실행 모드를 의미. 개발 버전인 development 지정
* entry: 시작점 경로를 지정하는 옵션
* output: 번들링 결과물을 위치할 경로
  
  
### webpack.config.js 설정

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: { // 모듈의 시작점
        // 이름은 main
        main: './src/app.js'
    },
    // 모든 js를 하나로 만들어서 output이라는 곳에 넣어준다.
    output: {
        // [name]에 해당하는 곳은 entry에 추가한 main이 문자열로 들어오는 방식이다.
        filename: '[name].js',
        // 절대 경로를 계산해주는 resolve 함수를 사용해준다.
        // dist 폴더에 결과물을 저장한다.
        path: path.resolve('./dist')
    }
}
```
  

### Webpack 실행을 위한 커스텀 명령어 추가
package.json에 설정해준대로 번들링 작업을 시켜주기 위해 커스텀 명령어를 추가합니다.

```json
{
  "scripts": {
    "build": "./node_modules/.bin/webpack"
  }
}
```
이제 실행시킬 때 간단하게 커스텀 명령어만 실행해주면 번들링 작업을 할 수 있게 됩니다.


[참고: 김정환의 블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)