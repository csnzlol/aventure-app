## Fitness App

Dit is een complete fitness-app, ontwikkeld met React Native en Expo, waar gebruikers hun voortgang kunnen bijhouden, workouts kunnen voltooien, prestaties kunnen behalen, hun profiel kunnen beheren en meer. De app is ontworpen om een gebruiksvriendelijke en motiverende ervaring te bieden aan fitnessliefhebbers.

## Functies

## Gebruikersbeheer: 
Gebruikers kunnen inloggen, zich registreren en hun profiel bewerken, inclusief de profielfoto.

## BMI Calculator: 
Bereken en sla de Body Mass Index (BMI) van de gebruiker op.

## Workouts: 
Verschillende workouts beschikbaar zoals push-ups, squats, lunges en planken. Gebruikers kunnen sets voltooien, hun voortgang volgen en motiverende citaten ontvangen tijdens hun sessies.

## Prestaties: 
Gebruikers kunnen prestaties vrijspelen zoals het voltooien van 10 workouts of 50 squats. Bij het voltooien van een prestatie wordt er een animatie afgespeeld en de gebruiker ontvangt visuele feedback.

## Profielbeheer: 
Gebruikers kunnen hun profielfoto wijzigen, hun naam bijwerken en hun e-mailadres beheren.

## AsyncStorage: 
Slaat gebruikersgegevens en voortgang lokaal op met behulp van AsyncStorage.

## Expo Image Picker: 
Gebruikers kunnen een profielfoto kiezen vanuit hun galerij.

## Verwijderaccount: 
Gebruikers kunnen hun account verwijderen via de privacy-instellingen.


## Installatie

Volg de onderstaande stappen om het project lokaal te draaien:

Kloon de repository:
``` bash
Copy code
git clone https://github.com/jouw-username/fitness-app.git ```

Installeer de dependencies:
``` bash
Copy code
cd fitness-app
npm install ```

Start de app met Expo:
``` bash
Copy code
expo start ```


API-configuratie

Dit project maakt gebruik van een externe API om gebruikersgegevens, BMI en workout-prestaties op te slaan en op te halen. Zorg ervoor dat je de juiste API-eindpunten hebt ingesteld voor login, registratie en gegevensbeheer.

login.php: Voor het inloggen van gebruikers.
register.php: Voor gebruikersregistratie.
getUser.php: Haalt gebruikersinformatie op.
saveBMI.php: Slaat de BMI van de gebruiker op.
deleteAccount.php: Verwijdert het account van de gebruiker.
Projectstructuur

bash
Copy code
/assets           # Bevat afbeeldingen en workout-foto's
/components       # Reusable components zoals StepCounter
/screens          # Verschillende schermen zoals login, instellingen, prestaties
/api              # Bevat PHP-bestanden voor de backend-API
Functiepagina's

Workouts
De app bevat vier hoofdpagina's voor verschillende workouts:

Push-ups: Houdt sets en herhalingen bij voor push-ups.
Squats: Houdt sets en herhalingen bij voor squats.
Lunges: Volgt de voortgang voor lunges.
Planks: Volgt de tijd en sets voor planken.
Elke workoutpagina bevat een motiverende timer, willekeurige citaten, en het aantal voltooide sets en herhalingen.

Prestaties
Op de Achievements-pagina kunnen gebruikers hun vrijgespeelde prestaties bekijken. Een animatie en trilling geven feedback wanneer een prestatie is behaald. De prestaties worden lokaal opgeslagen met AsyncStorage.
