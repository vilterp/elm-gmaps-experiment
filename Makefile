all:
	elm make Main.elm --output elm.js

serve: all
	http-server
