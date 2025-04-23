pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook')
    }

    stages {
        stage('Clone Repo') {
            steps {
                sshagent(['github-ssh']) {
                    git branch: 'main', url: 'git@github.com:aditya-goyal1694/FoodieFiesta.git'
                }
            }
        }

        stage('Build & Test with Docker Compose') {
            steps {
                sh 'docker-compose -f docker-compose.yml up --build -d'
                sh 'docker ps'
            }
        }

        stage('Trigger Deploy to Render') {
            steps {
                sh 'curl -X GET "$RENDER_DEPLOY_HOOK"'
            }
        }
    }

    post {
        always {
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}
