pipeline {
    agent any

    tools {
        nodejs '22.3.0'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'mangatoon-gitlab', url: 'https://gitlab.com/datnmptit/mangatoon.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install -g yarn'
                dir('./user-api') {
                    sh 'yarn install'
                    sh 'yarn build'
                }
                dir('./story-api') {
                    sh 'yarn install'
                    sh 'yarn build'
                }
                dir('./comment-api') {
                    sh 'yarn install'
                    sh 'yarn build'
                }
            }
        }

        stage('Test') {
             steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {

        }
    }

    post {
        always {
            junit 'test-results/jest/junit.xml'
            archiveArtifacts artifacts: '**/dist/*.js', allowEmptyArchive: true
        }
    }
}