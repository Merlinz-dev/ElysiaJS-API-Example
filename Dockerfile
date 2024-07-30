# Stage 1: Build
FROM oven/bun as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy the rest of the application files
COPY . .


# Stage 2: Run
FROM oven/bun

WORKDIR /app

# Install tzdata for setting the timezone
RUN apt-get update && apt-get install -y tzdata

# Set the timezone to Asia/Bangkok
ENV TZ=Asia/Bangkok
RUN echo "Asia/Bangkok" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Copy built files from builder stage
COPY --from=builder /app /app

# Start the application
CMD ["bun", "run", "src/index.ts"]
