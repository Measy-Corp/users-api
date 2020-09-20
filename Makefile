install:
	npm install

run:
	make up
	node -r dotenv/config src/main/server.js

up:
	docker-compose up --detach

down:
	docker-compose down
