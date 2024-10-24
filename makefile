up:
	@docker compose up
down:
	@docker compose down
exec:
	@docker compose exec server ash
build-gradle:
	@android/gradlew build
