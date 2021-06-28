module.exports = function myBabelPlugin() {
    return {
      visitor: {
        // Identifier(path) {
            // const name = path.node.name
    
            // 바벨이 만든 AST 노드를 출력한다
            // console.log("Identifier() name:", name)
    
            // 변환작업: 코드 문자열을 역순으로 변환한다.
            // 파싱 되어진 token들이 다 역순으로 뒤집진다. (const trela = gsm => wodniw.trela(gsm);)
            // path.node.name = name.split("").reverse().join("")

        // },
        VariableDeclaration(path) {
            console.log("VariableDeclaration() kind:", path.node.kind) // const

            if (path.node.kind === "const") {
                path.node.kind = "var"
            }
            // var alert = msg => window.alert(msg);
        },
    },
}
}