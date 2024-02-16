FROM oven/bun:slim

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "--hot", "index.ts"]