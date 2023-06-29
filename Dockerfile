ARG ARCH=arm64
FROM public.ecr.aws/lambda/nodejs:18-${ARCH}

#architecture -x86_64 or arm64
# copy function code
COPY . ${LAMBDA_TASK_ROOT}


RUN yum update -y
RUN yum groupinstall "Development Tools" -y
RUN yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel librsvg2-devel pango-devel bzip2-devel jq python3 -y
RUN mkdir ${LAMBDA_TASK_ROOT}/lib

RUN npm install canvas --build-from-source
RUN npm install

# set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]

