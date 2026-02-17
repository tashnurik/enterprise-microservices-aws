  description = "Name of the EKS cluster"
# General Variables
variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "microservices"
}

# VPC Variables
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.20.0/24"]
}

# EKS Variables
variable "eks_cluster_name" {
  type        = string
  default     = "microservices-eks-cluster"
  type        = number
}

variable "eks_cluster_version" {
  description = "Kubernetes version for EKS"
  type        = string
  default     = "1.28"
}

variable "eks_node_instance_types" {
  description = "Instance types for EKS worker nodes"
  type        = list(string)
  default     = ["t3.medium"]
}

variable "eks_desired_size" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 2
}

variable "eks_min_size" {
  description = "Minimum number of worker nodes"
  type        = number
  default     = 1
}

variable "eks_max_size" {
  description = "Maximum number of worker nodes"
  default     = 4
}

# ECS Variables
variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "microservices-ecs-cluster"
}

# ECR Variables
variable "ecr_repositories" {
  description = "List of ECR repository names"
  type        = list(string)
  default = [
    "user-service",
    "order-service",
    "payment-service",
    "product-service",
    "notification-service",
    "gateway-service"
  ]
}

# Secrets Variables
variable "db_password" {
  description = "Database password for Secrets Manager"
  type        = string
  sensitive   = true
  default     = "ChangeMe123!Secure"
}
