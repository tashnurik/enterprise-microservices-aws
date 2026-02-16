# 🚀 Enterprise Microservices Platform on AWS

A production-grade microservices platform demonstrating DevOps best practices with full CI/CD, GitOps, monitoring, and Infrastructure as Code.

## 🏗️ Architecture Overview

![Architecture Diagram](docs/diagrams/architecture.png)

## 🛠️ Tech Stack

**Infrastructure & Orchestration:**
- AWS EKS (Kubernetes)
- AWS ECS (Fargate)
- Terraform (IaC)
- Helm (K8s Package Manager)

**CI/CD & GitOps:**
- Jenkins (Continuous Integration)
- Argo CD (GitOps Continuous Deployment)
- Docker & AWS ECR

**Monitoring & Observability:**
- Prometheus (Metrics)
- Grafana (Dashboards)

**Security:**
- AWS Secrets Manager
- External Secrets Operator

## 📦 Microservices

1. **user-service** - User management and authentication
2. **order-service** - Order processing
3. **payment-service** - Payment handling (deployed to ECS)
4. **product-service** - Product catalog
5. **notification-service** - Notification system
6. **gateway-service** - API Gateway

## 🗂️ Repository Structure
```
├── microservices/          # Source code for 6 microservices
├── helm-charts/            # Kubernetes Helm charts
├── gitops-manifests/       # GitOps deployment manifests
├── terraform/              # Infrastructure as Code
├── jenkins/                # CI pipeline configurations
├── monitoring/             # Prometheus & Grafana configs
└── docs/                   # Documentation and diagrams
```

## 🚀 Deployment Flow
```
Developer → Push Code → GitHub
                          ↓
                      Jenkins (CI)
                          ↓
                   Build Docker Image
                          ↓
                    Push to AWS ECR
                          ↓
              Update GitOps Manifests
                          ↓
            Argo CD Detects Change
                          ↓
              Deploy to EKS Cluster
                          ↓
          Prometheus Scrapes Metrics
                          ↓
            Grafana Visualizes Data
```

## 📊 Features Implemented

- [x] Infrastructure provisioned with Terraform
- [x] 6 containerized microservices
- [x] CI pipeline with Jenkins
- [x] GitOps with Argo CD
- [x] EKS cluster deployment
- [x] ECS Fargate deployment (payment-service)
- [x] Secrets management with AWS Secrets Manager
- [x] Monitoring with Prometheus & Grafana
- [x] Horizontal Pod Autoscaling (HPA)
- [x] Ingress with AWS ALB

## 🔧 Prerequisites

- AWS Account
- Terraform >= 1.0
- Docker
- kubectl
- Helm >= 3.0
- AWS CLI configured

## 📝 Setup Instructions

Detailed setup instructions available in [docs/SETUP.md](docs/SETUP.md)

## 📸 Screenshots

### Architecture
![Architecture](docs/screenshots/architecture.png)

### CI/CD Pipeline
![Jenkins Pipeline](docs/screenshots/jenkins-pipeline.png)

### Argo CD Dashboard
![Argo CD](docs/screenshots/argocd.png)

### Grafana Monitoring
![Grafana](docs/screenshots/grafana-dashboard.png)

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 📄 License

This project is for educational and portfolio purposes.
