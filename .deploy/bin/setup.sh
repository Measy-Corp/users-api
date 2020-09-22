#!/bin/bash
if [[ \
    "$VERSION" && "$AWS_DEFAULT_REGION" && "$AWS_SECRET_ACCESS_KEY" && "$AWS_ACCESS_KEY_ID" && \
    "$S3_BUCKET" && "$PORT" && "$DATABASE_DIALECT" && "$DATABASE_ENDPOINT" && "$DATABASE_NAME" && \
    "$DATABASE_USERNAME" && "$DATABASE_PASSWORD" \
]]; then

    echo \
        "PORT=${PORT}" \
        "DATABASE_DIALECT=${DATABASE_DIALECT}" \
        "DATABASE_ENDPOINT=${DATABASE_ENDPOINT}" \
        "DATABASE_NAME=${DATABASE_NAME}" \
        "DATABASE_USERNAME=${DATABASE_USERNAME}" \
        "DATABASE_PASSWORD=${DATABASE_PASSWORD}" \
        | tr " " "\n" \
        > .env

    echo "Starting deployment of application with version ${VERSION}"

    zip -r deployment-${VERSION}.zip ./

    aws s3 cp deployment-${VERSION}.zip s3://${S3_BUCKET}

    aws elasticbeanstalk create-application-version --application-name tempao-users-api \
        --version-label ${VERSION} --source-bundle S3Bucket=${S3_BUCKET},S3Key="deployment-${VERSION}.zip"

    aws elasticbeanstalk update-environment --application-name tempao-users-api \
        --environment-name staging1 --version-label ${VERSION}

    echo "Application was deployed"

else
  echo "Missing values! You must define all:" \
       "VERSION, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, S3_BUCKET," \
       "PORT, DATABASE_DIALECT, DATABASE_ENDPOINT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD"
  exit 1
fi