resource "aws_s3_bucket" "b" {
  bucket = "mi-bucket785474"
  acl    = "private"

  versioning {
    enabled = true
  }

  tags = {
    Name        = "stw bucket"
    Environment="Dev"
}
}