FROM jenkins/jenkins:lts

USER root

# Install Docker CLI and dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    docker.io

# Optional: verify Docker install
RUN docker --version

# Add Jenkins user to Docker group so it can run docker commands
RUN usermod -aG docker jenkins

USER jenkins
