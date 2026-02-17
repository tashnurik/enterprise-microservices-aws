  }
# AWS Secrets Manager Secret
resource "aws_secretsmanager_secret" "db_password" {
  name                    = "${var.project_name}-db-password"
  description             = "Database password for microservices"
  recovery_window_in_days = 7

  tags = {
    Name = "${var.project_name}-db-password"
}

# Secret Value
resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    username = "admin"
    password = var.db_password
  })
}
