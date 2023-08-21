FROM node:16 AS builder

ARG auth_token
ARG environment
ARG ipfs_token
ARG commit

ADD . /build

WORKDIR /build

ENV NODE_OPTIONS --max_old_space_size=8192
ENV REACT_APP_NEAR_ENV $environment
ENV REACT_APP_TWITTER_URL https://twitter.com/pitchtalk_com
ENV REACT_APP_MEDIUM_URL https://medium.com/pitchtalk
ENV REACT_APP_TELEGRAM_URL https://t.me/pitchtalk_official
ENV REACT_APP_IPFS_TOKEN $ipfs_token

RUN npm config set @pitchtalk:registry https://gitlab.com/api/v4/projects/31325447/packages/npm/ && npm config set -- '//gitlab.com/api/v4/projects/31325447/packages/npm/:_authToken' $auth_token

RUN npm install && npm run build && echo ${commit:-unknown} > /build/build/.commit

FROM nginx:1-alpine AS deploy

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build/build ./dist

CMD ["nginx"]
