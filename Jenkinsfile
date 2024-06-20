pipeline {
    agent any

    tools {
        nodejs '21.6.2'
        dockerTool 'docker'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'mangatoon', url: 'https://gitlab.com/datnmptit/mangatoon-api.git'
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
                dir('./user-api') {
                    sh 'yarn test'
                    junit 'test-results/jest/junit.xml'
                }
                dir('./story-api') {
                    sh 'yarn test'
                    junit 'test-results/jest/junit.xml'
                }
                dir('./comment-api') {
                    sh 'yarn test'
                    junit 'test-results/jest/junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose -f compose.yaml up -d'
            }
        }
    }

}