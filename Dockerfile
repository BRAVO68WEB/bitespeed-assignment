FROM oven/bun:slim

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 4000

CMD ["bun", "run", "--hot", "index.ts"]