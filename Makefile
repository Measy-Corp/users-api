install:
	npm install

run:
	docker-compose up

run/dev:
	docker-compose -f docker-compose.dev.yml up --detach
	npm start

down:
	docker-compose down --remove-orphans
