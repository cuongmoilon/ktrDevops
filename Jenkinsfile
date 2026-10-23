pipeline {
    agent any
    environment {
        PROJECT = 'ktrDevops'
        DEPLOY_DIR = 'C:\\devops-deploy\\website'
        WEBSITE_URL = 'http://localhost:3000'
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Deploy Started') {
            steps {
                withCredentials([
                    string(credentialsId: 'telegram-token', variable: 'BOT_TOKEN'),
                    string(credentialsId: 'telegram-chat-id', variable: 'CHAT_ID')
                ]) {
                    powershell '''
                      $msg = "🚀 DEPLOY STARTED`nProject: $env:PROJECT`nBranch: main"
                      Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$env:BOT_TOKEN/sendMessage" -Body @{chat_id=$env:CHAT_ID; text=$msg} | Out-Null
                    '''
                }
            }
        }
        stage('Install Dependencies') { steps { bat 'npm ci' } }
        stage('Build') { steps { bat 'npm run build' } }
        stage('Deploy') {
            steps {
                powershell '''
                    New-Item -ItemType Directory -Force -Path $env:DEPLOY_DIR | Out-Null
                    Copy-Item -Path 'dist\\*' -Destination $env:DEPLOY_DIR -Recurse -Force
                    if (-not (Test-Path (Join-Path $env:DEPLOY_DIR 'index.html'))) { throw 'Deploy failed: index.html missing' }
                    Write-Host 'DEPLOY SUCCESS'
                '''
            }
        }
    }
    post {
        success {
            withCredentials([
                string(credentialsId: 'telegram-token', variable: 'BOT_TOKEN'),
                string(credentialsId: 'telegram-chat-id', variable: 'CHAT_ID')
            ]) {
                powershell '''
                    $msg = "✅ DEPLOY SUCCESS NHÉ`nProject: $env:PROJECT`nBranch: main`nURL: $env:WEBSITE_URL"
                    Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$env:BOT_TOKEN/sendMessage" -Body @{chat_id=$env:CHAT_ID; text=$msg} | Out-Null
                '''
            }
        }
        failure {
            withCredentials([
                string(credentialsId: 'telegram-token', variable: 'BOT_TOKEN'),
                string(credentialsId: 'telegram-chat-id', variable: 'CHAT_ID')
            ]) {
                powershell '''
                    $msg = "❌ DEPLOY FAILED RỒI`nProject: $env:PROJECT`nBranch: main`nPlease check Jenkins."
                    Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$env:BOT_TOKEN/sendMessage" -Body @{chat_id=$env:CHAT_ID; text=$msg} | Out-Null
                '''
            }
        }
    }
}
