      ManagedBy   = "Terraform"
# Terraform version and provider configuration
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }

  # Backend for state storage (optional - for production use S3)
  # backend "s3" {
  #   bucket = "my-terraform-state-bucket"
  #   key    = "microservices/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "Enterprise-Microservices"
      Environment = var.environment
    }
  }
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}
