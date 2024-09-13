# CLI

_Requirements_

- docker-compose version `docker-compose version 1.23.1`

**start project**

in root directory run

```bash
docker-compose up -d
```

```bash
  pnpm run start:dev
```

build docker

```bash
docker-compose up --build
```

---

**CLI**

```bash
  # Seed db
  pnpm run schema:seed

  # Clear db data
  pnpm run schema:down
```
