.PHONY: build up down debug start stop restart logs ps login

build:
	docker-compose build

up:
	docker-compose up -d

watch:
	WATCH_FILES=1 docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

restart: down up

logs:
	docker-compose logs --tail=10 -f

ps:
	docker-compose ps

login:
	docker-compose run -w /application portal-frontend /bin/bash

setup:
	docker-compose run -w /application portal-frontend bash -c "npm install && gulp setup"

run:
ifdef command
	docker-compose exec -w /application portal-frontend bash -c "$(command)"
else
	@printf "\n"
	@printf '\e[1;34m%-6s\e[m' 'Passe um comando como parâmetro. Faça make run command="<comando>"'
	@printf "\n\n"
endif

test:
ifdef file
	docker-compose exec -w /application portal-frontend bash -c "npm run test:unit $(file)"
else
	@printf "\n"
	@printf '\e[1;34m%-6s\e[m' '>>>>> Você pode passar um arquivo como parâmetro. Faça make test file="<nome_do_arquivo>" <<<<<'
	@printf "\n\n"
	docker-compose exec -w /application portal-frontend bash -c "npm run test:unit"
endif
