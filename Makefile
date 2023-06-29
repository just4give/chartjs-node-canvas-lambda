include ${ENVFILE}
export $(shell sed 's/=.*//' ${ENVFILE})

DOCKER_IMAGE_NAME="node-chart"
DOCKER_IMAGE_TAG="$(shell npm pkg get version)-${ARCH}"
DOCKER_IMAGE_WITH_TAG="${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
ECR_IMAGE_REPO="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${DOCKER_IMAGE_WITH_TAG}"

.PHONY: build publish scan all

build:
	@echo "building docker image with tag  ${DOCKER_IMAGE_TAG}"
	docker build -t ${DOCKER_IMAGE_WITH_TAG} --build-arg ARCH=${ARCH} .

publish:
	@echo "ECR REPO ${ECR_IMAGE_REPO}"
	aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com
	docker tag ${DOCKER_IMAGE_WITH_TAG} ${ECR_IMAGE_REPO}
	docker push ${ECR_IMAGE_REPO}
	

scan:
	SCAN_ID=$(shell aws ecr start-image-scan --repository-name ${DOCKER_IMAGE_NAME} --image-id imageTag=${DOCKER_IMAGE_TAG} --region ${REGION} --query 'imageScanStatus.status')
	@echo "SCAN ID ${SCAN_ID}"

all: 
	build publish scan
