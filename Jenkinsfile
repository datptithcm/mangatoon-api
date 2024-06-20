pipeline {
    agent any

    tools {
        nodejs '21.6.2'
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
                }
                dir('./story-api') {
                    sh 'yarn test'
                }
                dir('./comment-api') {
                    sh 'yarn test'
                }
            }
        }

        // stage('Deploy') {
        //     steps {

        //     }
        // }
    }

    post {
        always {
            junit './user-api/test-results/jest/junit.xml'
            junit './story-api/test-results/jest/junit.xml'
            junit './comment-api/test-results/jest/junit.xml'
            archiveArtifacts artifacts: '**/dist/*.js', allowEmptyArchive: true
        }
    }
}