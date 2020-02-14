const http = require('http');
const fs = require('fs');
const path = require('path');
const msg = require('./msg');
const url = require('url');
const querystring = require('querystring');
const TYPE_MAP = {
    '.html': 'text/html;charset=utf-8',
    '.css': 'text/css;charset=utf-8',
    '.jpg': 'image/jpg',
    '.png': 'image/png',
    '.js': 'application/javascript',
}


const server = http.createServer((req, res) => {

    // -------------------------------
    let obj = url.parse(req.url)

    //    ----------------------获取数据
    if (obj.pathname === '/getmsg' && req.method === 'GET') {

        let rs = msg.getmsg();

        let result = {
            code: 200,
            data: rs
        }
        console.log(result)

        // --------------------设置响应头
        // if (TYPE_MAP[ext]) {
        //     res.setHeader('content-type', TYPE_MAP[ext])
        // }
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(result));
    }
    // ------------------------------添加数据
    else if (obj.pathname === '/addmsg' && req.method === 'POST') {

        let result = "";
        req.on('data', function (buf) {
            result += buf;
        })
        req.on('end', function () {
            let {
                name,
                content
            } = querystring.parse(result);
            msg.addmsg(name, content);
            let rs = {
                code: 200,
                data: '添加成功'
            }
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(rs));
        })



    } else {
        let pathFile = path.join(__dirname, 'public', req.url);

        try {
            let rs = fs.readFileSync(pathFile);

            const ext = path.extname(req.url)
            res.setHeader('content-type', TYPE_MAP[ext])
            res.end(rs);

        } catch {
            res.end('404')

        }
    }



});
server.listen(8080, () => {
    console.log('服务器启动成功，端口号：8080:')
})