#!/bin/bash
set -e

# Usage: ./rollback.sh <service> <version>
# Example: ./rollback.sh backend v1.2.3

SERVICE=$1
VERSION=$2

if [ -z "$SERVICE" ] || [ -z "$VERSION" ]; then
  echo "Usage: ./rollback.sh <service> <version>"
  exit 1
fi

echo "Rolling back $SERVICE to version $VERSION"

# Update the image tag in Terraform variables
sed -i "s/$SERVICE_image=.*/\"$SERVICE_image=yourorg/qaid-product-$SERVICE:$VERSION\"/" infrastructure/terraform.tfvars

# Apply the changes
cd infrastructure
terraform apply -auto-approve

echo "Rollback of $SERVICE to $VERSION complete"
