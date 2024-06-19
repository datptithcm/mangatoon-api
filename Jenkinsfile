pipeline {
    agent any

    tools {
        nodejs '21.6.2'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/datptithcm/mangatoon-api.git'
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
            junit 'test-results/jest/junit.xml'
            archiveArtifacts artifacts: '**/dist/*.js', allowEmptyArchive: true
        }
    }
}