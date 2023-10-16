// /* groovylint-disable CompileStatic */
// node {
//     stage('SCM') {
//         checkout scm
//     }
//     stage('SonarQube Analysis') {
//         def scannerHome = tool 'SonarQube-Scanner'
//         withSonarQubeEnv() {
//             sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=rentility-pipeline -Dsonar.sources=."
//         }
//     }
// }

// With Sonarqube Quality Gate

/* groovylint-disable CompileStatic */
node {
    stage('SCM') {
        checkout scm
    }
    stage('SonarQube Analysis') {
        def scannerHome = tool 'SonarQube-Scanner'
        withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=rentility-pipeline -Dsonar.sources=."
        }
    }
    stage('Wait for SonarQube Analysis') {
        timeout(time: 1, unit: 'HOURS') { // adjust the timeout as needed
            def qg = waitForQualityGate() // This will pause the pipeline until SonarQube analysis is done
            if (qg.status != 'OK') {
                error "SonarQube Quality Gate failure: ${qg.status}"
            }
        }
    }
}
