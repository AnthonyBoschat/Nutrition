Changer l'origine du dépôt :

	git remote remove origin
	git remote add origin chemin_nouveau_depot

Installer les dépendance :
	Frontend :
		npm install
		npm ci

	Backend :
		Créer un nouvel environnement virtuel : python3 -m venv env
		Activer le nouvel environnement virtuel : source env/bin/activate
		Installer les dépendances : pip install -r requirements.txt


	
		

        Créer une nouvelle base de donnée pour le projet :

		psql -U postgres -h 172.31.215.127 -p 5432
		CREATE DATABASE BDDname;



		Initialiser un fichier .env a la racine de backend : 

		DB_NAME=BDDname
		DB_USER=username
		DB_PASSWORD=password
		DB_HOST=172.31.215.127
		DB_PORT=5432




		Créer un nouvel utilisateur pour accéder à djangoAdmin : 

		source env/bin/activate
		python manage.py createsuperuser