FROM amazon/aws-lambda-nodejs:12

ARG FUNCTION_DIR="/var/task"

RUN mkdir -p ${FUNCTION_DIR}

COPY index.js ${FUNCTION_DIR}

CMD [ "index.handler" ]