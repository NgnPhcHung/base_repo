# Project setting

## Does not forget to run build command

- to create repo

```bash
turbo gen workspace
```

```bash
pnpm add typescript @types/node --save-dev

#then
npx tsc --init
```

After run all of these commands, opened created repo's `package.json`

```JSON

"dependencies": {
    "@repo/typescript-config": "workspace:*"
},

"scripts": {
    "check": "tsc --noEmit",
    "build": "tsc",
    "watch": "tsc -w"
}

"main": "./dist/index.js",

```

Then go to tsconfig.json, update extends files
sample tsconfig.json is in `packages/shared/tsconfig.json`

```json
"extends": "@repo/typescript-config/base.json"
...rest
```

After that, to use in other repo, run command in repo that just modified:
**Build command**

```bash
    pnpm build
```

# Project setup

## Installation

**install dependence**

```bash
    pnpm i
```
because of using Nestjs it's point to dist(build folder), but now I can not config to build automatic when install, so you have to navigate to each workspace and build one by one until I can config it build auto in installation step 
```
``

run this command to generate an initial configuration for `Synapse`

```bash
cd apps/api

docker run -it --rm \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  -v $(pwd)/data:/data \
  matrixdotorg/synapse:v1.96.0 generate
```

run docker compose in `apps/api`

```bash
 docker-compose up -d

 #down
 docker-compose down
```

to run synapse, go to `api/data/homeserver.yml`
at line bind bind_addresses, change it to

```
    ...
    bind_addresses: ['0.0.0.0']
    ...
```

> NOTE: if you can not save `api/data/homeserver.yml` after modified, in terminal run command

```bash
sudo chmod -R 777 ./data
```

seed data is in `src/seed-data`
in `apps/api/`, run

```bash
# to seed database
pnpm run schema:seed

#to clear database
pnpm run schema:down
```
