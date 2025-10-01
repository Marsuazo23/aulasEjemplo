# Convención de Nombres y Reglas para Objetos de Infraestructura en AWS

## Introducción

Este documento establece las convenciones de nombres y reglas para los objetos de infraestructura en AWS que se desplegarán utilizando Terraform. El objetivo es garantizar la consistencia, la trazabilidad y el cumplimiento de las mejores prácticas en ciberseguridad, así como las normativas de cumplimiento como HIPAA, SOC2 y GDPR.

La convención de nombres propuesta es: `<entorno abreviado de 3 caracteres>-<código del proyecto>-<nombre de la característica o dominio>`. Esto facilita la identificación rápida de los recursos, su entorno y su propósito o dominio funcional.

- **Entorno abreviado (3 caracteres)**: Ejemplos: `dev` (desarrollo), `stg` (staging), `prd` (producción).
- **Código del proyecto**: Un identificador único para el proyecto, por ejemplo, `myproj`.
- **Nombre de la característica o dominio**: Una descripción breve del propósito funcional o dominio del recurso, como `api` para API Gateway, `queue` para SQS, `processor` para Lambda, etc.

Reglas generales:
- Todos los nombres deben ser en minúsculas.
- No se permiten caracteres especiales excepto guiones (`-`).
- Los nombres deben ser únicos dentro del mismo entorno y proyecto.
- Se deben aplicar etiquetas (tags) obligatorias para cumplir con las normativas de ciberseguridad y cumplimiento.

## Convención de Nombres

La estructura obligatoria para todos los objetos de infraestructura es:  
`<entorno>-<código-proyecto>-<nombre-característica-dominio>`

Ejemplos:
- API Gateway: `dev-myproj-api`
- Función Lambda: `dev-myproj-processor`
- Cola SQS: `dev-myproj-queue`
- Cola Dead Letter: `dev-myproj-dlq`

Esta convención se aplica a recursos como VPC, EC2, S3, RDS, Lambda, API Gateway, SQS, SNS, entre otros. Para recursos que requieren nombres globales (como buckets S3), se puede agregar un sufijo único si es necesario, manteniendo la estructura base.

## Etiquetas Requeridas (Tags)

Las etiquetas son obligatorias para todos los recursos y deben cumplir con las mejores prácticas de AWS para ciberseguridad y cumplimiento normativo (HIPAA, SOC2, GDPR). Estas etiquetas facilitan la auditoría, la asignación de costos, la clasificación de datos y la gestión de riesgos.

Las etiquetas y sus valores posibles deben estar en inglés. A continuación, se listan las etiquetas requeridas y sus valores posibles:

| Tag Key              | Description                                                                 | Possible Values                          | Required |
|----------------------|-----------------------------------------------------------------------------|------------------------------------------|----------|
| Environment         | Indica el entorno del recurso.                                             | dev, staging, prod                       | Yes     |
| Project             | Código o nombre del proyecto.                                              | Ej: myproj, app1                         | Yes     |
| Owner               | Propietario o equipo responsable.                                          | Ej: dev-team, security-team              | Yes     |
| CostCenter          | Centro de costos para facturación.                                         | Ej: IT-001, Finance-002                  | Yes     |
| DataClassification  | Clasificación de los datos manejados (para cumplimiento GDPR/HIPAA).       | Public, Internal, Confidential, Restricted | Yes     |
| PII                 | Indica si contiene información personalmente identificable (GDPR/HIPAA).   | Yes, No                                  | Yes     |
| SensitiveData       | Indica si maneja datos sensibles (SOC2).                                   | Yes, No                                  | Yes     |
| Compliance          | Normativas aplicables al recurso.                                          | HIPAA, SOC2, GDPR, None                  | Yes     |
| Backup              | Indica si el recurso requiere respaldo.                                    | Yes, No                                  | Yes     |
| Encryption          | Indica si los datos están encriptados.                                     | Yes, No                                  | Yes     |

Estas etiquetas deben aplicarse en todos los recursos Terraform mediante el bloque `tags`. Para cumplimiento:
- En recursos que manejen datos sensibles (PII=Yes o SensitiveData=Yes), se debe asegurar encriptación (Encryption=Yes) y backups (Backup=Yes).
- Auditorías SOC2 requieren trazabilidad mediante Owner y CostCenter.
- GDPR y HIPAA enfatizan en DataClassification y PII para proteger datos personales.

## Ejemplos de Scripts Terraform

A continuación, se proporcionan ejemplos de código Terraform (HCL) para crear los recursos solicitados. Estos ejemplos incluyen la convención de nombres actualizada y las etiquetas requeridas. Asumimos que el código de las funciones Lambda (en TypeScript) se empaqueta en un ZIP y se sube a S3 o se referencia directamente. Los ejemplos usan módulos estándar de Terraform para AWS.

### Ejemplo 1: API Gateway con Lambda en TypeScript

Este ejemplo crea una API Gateway REST con integración a una función Lambda en TypeScript. La Lambda se asocia a una ruta específica (ej: `/hello`).

```hcl
provider "aws" {
  region = "us-east-1"
}

# Función Lambda (asumiendo código TypeScript empaquetado en ZIP)
resource "aws_lambda_function" "api_lambda" {
  function_name = "dev-myproj-processor"
  runtime       = "nodejs20.x"  # Para TypeScript compilado a Node.js
  handler       = "index.handler"  # Asumiendo index.ts compilado
  role          = aws_iam_role.lambda_role.arn
  filename      = "lambda-api.zip"  # ZIP con el código TypeScript compilado

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Internal"
    PII               = "No"
    SensitiveData     = "No"
    Compliance        = "SOC2"
    Backup            = "Yes"
    Encryption        = "Yes"
  }
}

# Rol IAM para Lambda
resource "aws_iam_role" "lambda_role" {
  name = "dev-myproj-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Internal"
    PII               = "No"
    SensitiveData     = "No"
    Compliance        = "SOC2"
    Backup            = "No"
    Encryption        = "No"
  }
}

# API Gateway
resource "aws_apigatewayv2_api" "api_gw" {
  name          = "dev-myproj-api"
  protocol_type = "HTTP"

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Internal"
    PII               = "No"
    SensitiveData     = "No"
    Compliance        = "SOC2"
    Backup            = "Yes"
    Encryption        = "Yes"
  }
}

# Integración Lambda con API Gateway (ruta /hello)
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.api_gw.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.api_lambda.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "hello_route" {
  api_id    = aws_apigatewayv2_api.api_gw.id
  route_key = "GET /hello"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# Despliegue de API Gateway
resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.api_gw.id
  name        = "$default"
  auto_deploy = true
}
```

### Ejemplo 2: Cola SQS con Lambda en TypeScript, Dead Letter Queue y Mecanismo de Reintento

Este ejemplo crea una cola SQS principal, una Dead Letter Queue (DLQ), y una función Lambda en TypeScript que se activa por SQS. Incluye reintentos (redrive policy) con máximo de 3 reintentos antes de mover a DLQ.

```hcl
# Cola SQS Principal
resource "aws_sqs_queue" "main_queue" {
  name                       = "dev-myproj-queue"
  delay_seconds              = 0
  max_message_size           = 2048
  message_retention_seconds  = 86400
  receive_wait_time_seconds  = 10
  redrive_policy             = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 3  # Reintentos antes de DLQ
  })

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Confidential"
    PII               = "Yes"
    SensitiveData     = "Yes"
    Compliance        = "HIPAA,GDPR"
    Backup            = "Yes"
    Encryption        = "Yes"
  }
}

# Dead Letter Queue
resource "aws_sqs_queue" "dlq" {
  name                      = "dev-myproj-dlq"
  delay_seconds             = 0
  max_message_size          = 2048
  message_retention_seconds = 604800  # 7 días

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Confidential"
    PII               = "Yes"
    SensitiveData     = "Yes"
    Compliance        = "HIPAA,GDPR"
    Backup            = "Yes"
    Encryption        = "Yes"
  }
}

# Función Lambda para SQS
resource "aws_lambda_function" "sqs_lambda" {
  function_name = "dev-myproj-processor"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  role          = aws_iam_role.lambda_role.arn  # Reutilizando rol del ejemplo anterior o crear uno nuevo
  filename      = "lambda-sqs.zip"

  tags = {
    Environment       = "dev"
    Project           = "myproj"
    Owner             = "dev-team"
    CostCenter        = "IT-001"
    DataClassification = "Confidential"
    PII               = "Yes"
    SensitiveData     = "Yes"
    Compliance        = "HIPAA,GDPR"
    Backup            = "Yes"
    Encryption        = "Yes"
  }
}

# Event Source Mapping: Lambda activada por SQS
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.main_queue.arn
  function_name    = aws_lambda_function.sqs_lambda.arn
  batch_size       = 10
}
```