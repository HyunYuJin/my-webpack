// loader는 함수 형태로 작성한다.
module.exports = function myWebpackLoader(content) {
    console.log('myWebpackLoader가 동작합니다.')
    return content
}