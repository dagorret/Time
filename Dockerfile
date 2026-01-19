# Usamos Debian Slim para tener el control total
FROM debian:trixie-slim AS base

# Instalamos lo mínimo indispensable: Node.js y herramientas de red
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    vim \
    && curl -fsSL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ahora sí creamos nuestro usuario 'time' sin conflictos
ARG USER_ID=1000
RUN groupadd -g $USER_ID time && \
    useradd -u $USER_ID -g time -m -s /bin/bash time

WORKDIR /app

# Copiamos solo los archivos de configuración
COPY package*.json ./

# Aseguramos que 'time' sea dueño de TODO en /app
RUN chown -R time:time /app

USER time

FROM base AS development
# Vite necesita este comando para arrancar
CMD ["npm", "run", "dev"]
