provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "uploads" {
  bucket = "${var.project_name}-prod-uploads-example"
}

resource "aws_ecr_repository" "frontend" {
  name = "${var.project_name}-frontend"
}

resource "aws_ecr_repository" "backend" {
  name = "${var.project_name}-backend"
}

resource "aws_ecr_repository" "worker" {
  name = "${var.project_name}-worker"
}

resource "aws_db_instance" "postgres" {
  identifier             = "${var.project_name}-postgres"
  engine                 = "postgres"
  engine_version         = "16.3"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  publicly_accessible    = false
  skip_final_snapshot    = true
  backup_retention_period = 7
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "${var.project_name}-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}