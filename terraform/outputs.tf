}
# VPC Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

# EKS Outputs
output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "eks_cluster_security_group_id" {
  description = "Security group ID attached to EKS cluster"
  value       = aws_security_group.eks_cluster.id
}

output "eks_cluster_oidc_issuer_url" {
  description = "OIDC issuer URL for EKS cluster"
  value       = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

# ECS Outputs
output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name

output "ecs_cluster_arn" {
# IAM Outputs
  description = "ECS cluster ARN"
  value       = aws_ecs_cluster.main.arn
}

# ECR Outputs
output "ecr_repository_urls" {
  description = "ECR repository URLs"
  value = {
    for k, v in aws_ecr_repository.microservices : k => v.repository_url
  }
}

# ALB Outputs
output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "ALB zone ID"
  value       = aws_lb.main.zone_id
}

output "payment_target_group_arn" {
  description = "Payment service target group ARN"
  value       = aws_lb_target_group.payment_service.arn
}

output "ecs_task_execution_role_arn" {
  description = "ECS task execution role ARN"
  value       = aws_iam_role.ecs_task_execution.arn
}

output "ecs_task_role_arn" {
  description = "ECS task role ARN"
  value       = aws_iam_role.ecs_task.arn
}

output "external_secrets_role_arn" {
  description = "External Secrets Operator IAM role ARN"
  value       = aws_iam_role.external_secrets.arn
}

# Secrets Manager Outputs
output "secrets_manager_secret_arn" {
  description = "Secrets Manager secret ARN"
  value       = aws_secretsmanager_secret.db_password.arn
}

# Region
output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}
