output "s3_bucket_name" {
  value = aws_s3_bucket.uploads.bucket
}

output "frontend_ecr_url" {
  value = aws_ecr_repository.frontend.repository_url
}

output "backend_ecr_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "worker_ecr_url" {
  value = aws_ecr_repository.worker.repository_url
}

output "postgres_endpoint" {
  value = aws_db_instance.postgres.address
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}