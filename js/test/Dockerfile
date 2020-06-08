FROM node:12.7.0-alpine

ENV SERVICE_NAME=automation-testing
ENV WORKING_DIR=var/opt/${SERVICE_NAME}
ENV TZ=Asia/Ho_Chi_Minh

RUN mkdir -p ${WORKING_DIR}
WORKDIR ${WORKING_DIR}

COPY package.json package.json
# Add source files
COPY . .

RUN apk update && apk add \
    bash \
    && npm install --production --quiet

EXPOSE 9999

# Silent start because we want to have our log format as the first log
CMD ["npm", "start"]
