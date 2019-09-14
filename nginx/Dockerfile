FROM openresty/openresty:latest

EXPOSE 80

WORKDIR /web

RUN mkdir files && cd files && \
    dd if=/dev/urandom of=1mb.bin bs=1000000 count=1 && \
    dd if=/dev/urandom of=20mb.bin bs=20000000 count=1 && \
    dd if=/dev/urandom of=10kb.bin bs=10000 count=1 && \
    dd if=/dev/urandom of=100kb.bin bs=100000 count=1 && \
    dd if=/dev/urandom of=800kb.bin bs=800000 count=1

COPY index.html index.html
COPY ./nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]