pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook')  // The Render deploy hook (webhook)
        MYSQL_ROOT_PASSWORD = credentials('MYSQL_ROOT_PASSWORD') // Secret Text credentials for MySQL root password
        MYSQL_USER = credentials('MYSQL_USER')                   // Secret Text credentials for MySQL user
        MYSQL_PASSWORD = credentials('MYSQL_PASSWORD')           // Secret Text credentials for MySQL password
        MYSQL_DATABASE = credentials('MYSQL_DATABASE')           // Secret Text credentials for MySQL database name
        MYSQL_HOST = credentials('MYSQL_HOST')                   // Secret Text credentials for MySQL host
        MYSQL_PORT = credentials('MYSQL_PORT')                   // Secret Text credentials for MySQL port
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
                script {
                    sh """
                    export MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
                    export MYSQL_DATABASE=$MYSQL_DATABASE
                    export MYSQL_USER=$MYSQL_USER
                    export MYSQL_PASSWORD=$MYSQL_PASSWORD
                    export MYSQL_HOST=$MYSQL_HOST
                    export MYSQL_PORT=$MYSQL_PORT
                    docker-compose -f docker-compose.yml up --build -d
                    docker ps
                    """
                }
            }
        }

        stage('Trigger Deploy to Render') {
            steps {
                script {
                    sh 'curl -X GET "$RENDER_DEPLOY_HOOK"'
                }
            }
        }
    }

    post {
        always {
            script {
                // Shut down Docker Compose containers
                sh 'docker-compose -f docker-compose.yml down'
            }
        }
    }
}
