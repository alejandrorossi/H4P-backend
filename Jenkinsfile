
pipeline {
  agent any
 
  tools {nodejs "nodejs:12.16.2"}

  environment {
    CI = 'true'
  }


  stages {
    // No funciona con Jenkins en un contenedor Docker
    // stage('Init') {
    //   steps {
    //     sh './jenkins/scripts/init.sh'
    //   }
    // }
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
  }
}