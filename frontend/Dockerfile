FROM node:24

WORKDIR /home/root/app

COPY package.json package-lock.json ./

# Install from the lock file
# This would need to be periodically updated but done manually
RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]