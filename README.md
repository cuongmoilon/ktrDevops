# ktrDevops

Bài kiểm tra thực hành DevOps: GitHub → Jenkins → Build → Deploy → Telegram.

## Chạy thử

```powershell
npm ci
npm run build
node server.js
```

Website được phục vụ ở http://localhost:3000 sau khi Jenkins deploy vào `C:\devops-deploy\website`.

## Jenkins

- Pipeline from SCM: Git, branch `*/main`, script `Jenkinsfile`.
- Credentials Secret text: `telegram-token`, `telegram-chat-id`.
- Agent Windows có Node.js và npm, quyền ghi `C:\devops-deploy\website`.
- Bật GitHub hook trigger for GITScm polling.
- Webhook GitHub: `https://<public-jenkins-host>/github-webhook/`.
- Đổi `WEBSITE_URL` trong Jenkinsfile thành URL website công khai sau khi cấu hình ngrok.

## Debug

Sửa script `build` trong `package.json` thành `node missing-build.js`, commit và push để Jenkins Failed. Sau đó sửa lại `node build.js`, commit và push để Jenkins Success.
