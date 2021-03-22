pipeline {
    agent any
    tools { nodejs "NodeJs" }
    stages {
        stage('Install & Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Create Image') {
            steps {
                sh 'docker build -t jojozhuang/file-server-angular .'
                sh 'docker push jojozhuang/file-server-angular'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker rm $(docker stop $(docker ps -a -q --filter="name=file-server-angular"))'
                sh 'docker run --name file-server-angular -p 12021:80 -d jojozhuang/file-server-angular'
            }
        }
    }
}