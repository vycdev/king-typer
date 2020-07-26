# King Typer

King Typer este un site web creat pentru concursul de infoeducatie și obiectivul principal este să concurezi cu site-urile de dactilografiere actuale care au designuri vechi, UX proaste sau chiar ambele și să devină un mediu plăcut pentru învățarea și practicarea tastării tactile.

Dezvoltarea pentru King Typer va continua chiar și după concurs, până când voi fi mulțumit de rezultate.

Acesta este un monorepo, care conține atât API-ul cât și front-end-ul, care sunt găzduite separat pe heroku.

- Puteți accesa site-ul [aici](https://king-typer.herokuapp.com/).
- Puteți vedea link-uri pentru alte informatii [aici](main.md).

## De ce este totul în engleză?

Am ales să scriu totul în engleză, deoarece obiectivul principal al acestui proiect este de a ajuta cât mai mulți oameni să poată exersa tastarea tactilă, iar scrierea proiectului în limba engleză va deschide proiectul pentru mult mai multe persoane de pe internet.

Dar intenționez să scriu traduceri pe pagini pentru cât mai multe țări în viitor, dar rețineți că intenționez să păstrez testele de dactilografiere în limba engleză, deoarece este cea mai bună limbă în care puteți practica tastarea.

## Arhitectură

### Per total:
Aplicația este scrisă folosind TypeScript, un strongly-typed superset de Javascript care este combinat cu React pentru a crea o aplicație web responsive.

### Structura fișierelor
Depozitul este un mono-depozit, ceea ce înseamnă că servește două părți ale aplicației care sunt conectate între ele, API (interfață de programare a aplicației) și SPA (aplicație de o singură pagină).

În folderul rădăcină veți găsi un dosar `packages` care conține folderul` web`, A.K.A. SPA și folderul `api`.

#### Folderul `api`.

Folderul `api` conține server-ul api, nu numai ca acesta contine rutele care pot fi accesate prin requesturi HTTP, dar contine si migratille si seedurile pentru baza de date.

#### Folderul `web`.

Folderul `web` conține tot ce are legătură cu SPA. În rădăcina acestui folder veți găsi folderul `src` care conține tot codul pentru SPA. Există, de asemenea, un dosar `public` care conține fișierul` index.html`, de asemenea mai este si configurațiile pentru babel, eslint, heroku, typecript și webpack, precum și un fișier `package.json` care ține evidența tuturor dependencyurilor din folder.

Folderul `src` este structurat în:
- `index.tsx`: care conține aplicația principală.
- `style.tsx`: care conține exporturile de stil pentru aplicația principală.
- `server.ts`: care este serverul care rulează aplicația ca si SPA.
- `utils`: un folder care conține importuri pentru fișierele de mai sus.
- `components`: ​​un folder care conține componente care sunt importate în aplicația principală care va fi redată.

Folderul `components` poate conține alte foldere utilizate pentru structurarea fișierelor de componente. Aceste alte foldere pot conține fișiere și foldere precum: fișiere `style.tsx` `<component>.tsx`, alte foldere `components ', foldere` helpers` cu fișiere de ajutor.

Aceasta este o reprezentare grafică a structurii fișierelor:
![files](https://cdn.discordapp.com/attachments/485859146558865408/736890481753063474/unknown.png)


## Cerințe și compatibilitate

Acest proiect este optimizat pentru a rula pe toate browserele cu cât mai puțină memorie și putere de calcul posibil. Rularea proiectului pe orice browser actualizat va fi in regula.

# Instrumente si limbaje de programare
- `semantic-release`: Semantic-release este un package care determin versiunile releaseurilor și generează o fila changelog pe baza commiturilor mele folosind commituri convenționale (Folosing GitHub Actions).
- `all-contributors`: All-contributors este un package care imi permite să generez un paragraf frumos cu toți contribuitorii in fila README.

## Instrumente și limbaje de programare (front end)

Vreau să menționez că multe dintre elementele enumerate mai jos nu ajung in buildul final.

- `emotion`: Emotion este folosit pentru crearea componentelor react css deja aplicat. Este un instrument foarte bun, care imi permite să profit de avantajele Typescriptului și React în același timp pentru a-mi stila componentele.
- `koa`: Koa este un web framework pentru node js, este ca expres, dar mult mai optimizat și mai concentrat pe middleware. Îl folosesc pentru crearea unui server SPA care să găzduiască SPA-ul pe heroku.
- `react`: React este o bibliotecă js pentru crearea interfeței de utilizator. Este foarte bun pentru gestionarea proiectării și stării aplicației. Si in plus are o comunitate mare plina de oameni care creeaza dependencyuri pentru react care au fost de folos in construirea aplicației.
- `typecript`: Typescript este un superset de JavaScript strongly-typed. Foarte util în scrierea unui cod fara errori din runtime si erori in general.
- `babel`: Babel este un instrument pentru a converti codul scris de mine in cod compatibil cu majoritatea browserelor.
- `webpack`: Webpack este un module bundler,iar combinat cu typescrip si babel si alte plugin-uri, pot sa rulez cu ușurință codul live pentru dezvoltare.
## Instrumente si limbaje de programare (back end)

De asemenea, pentru back end folosim alte tool-uri specifice. Chiar daca acestea nu sunt compilate cu scopul de a ii oferi utilizatorului cea mai buna performanta, ele sunt esentiale pentru crearea si mentinerea API-ului.

- `koa` - Mentionat si in partea de frontend, Koa este stalpul de rezistenta al API-ului. Koa creaza un server HTTP dinamic din care API-ul prinde viata.

- `postgres` - PostgresSQL este o baza de date SQL, unde toti userii, textele si restul datelor sunt stocate.

- `knex` - In loc sa interactionam cu baza de date insusi, noi folosim Knex pe post de query builder, putem sa creeam migratii, seeduri, si cel mai important, sa interactionam cu baza de date mult mai usor. Knex sanitizeaza inputul si creeaza o metoda usoara, bazata pe functii, de a interactiona cu baza de date.

- `mocha/chai` - Pentru a scrie teste, folosim mocha, mocha este o librarie de testare asemanatare cu Jest. Aceste teste sunt completate de chai, o librarie de asertii.

- `joi` - Cand facem requesturi, de multe ori este nevoide de validare. Joi este un middleware creator care efectuaza validarea pentru tine, in acest mod poti sa the asiguri ca primesti datele corecte fara mult effort.

- `ws` - Browserul are websocketurile deja implementate, dar Node.JS nu le are. Pentru a implementa websocketurile am folosit modulul pentru websocketuri. Nu este nevoie de Socket.io de asemenea este prea incarcat.

## Testare

Pe partea de front end nu am folosit teste de integrare, (încă) pentru că nu este necesar, deoarece o mulțime de oameni au testat aplicația mea inclusiv eu (puteți vedea cine a testat aplicația mea în fișierul README, btw persoanele enumerate în README fișierul nu sunt toți oamenii care mi-au testat aplicația, aceștia sunt doar cei care au testat aplicația mea și au un cont GitHub) și, de asemenea, cu ajutorul instrumentelor enumerate mai sus, am putut sa evit majoritatea erorilor înainte de a da push pe github (Am și github actions configurat.)

Pe partea de back end am folosit unit tests cu Mocha si Chai. Acestea acopera majoritatea rutelor si a actiunilor, asigurand toata functionalitatea dupa cum este de asteptat.


# Updateuri de la faza Online 2020 si pana acum.

## Am adaugat teme

Acum avem 2 teme. Tema default, care este modul light, si tema de noapte pentru iubitorii de "dark mode". Temele pot fi schimbate in pagina de profil.


![Light Theme](https://cdn.discordapp.com/attachments/658679294515478534/737009277075456010/unknown.png)
![Dark Theme](https://cdn.discordapp.com/attachments/658679294515478534/737009486342127637/unknown.png)


## Am sters pagina "statistics"

Dar inca este acolo, lafel si toate datele din pe care le-am stocat. Doar ca tabul nu mai exista deoarece am considerat ca nu mai este nevoie de el, pagina era invechita, iar designul era facut pentru a arata doar date din localstorate.

## Inbunatatire pe pagina "Start Typing"

### O noua pagina default pentru pagina de "Start Typing"

Noua pagina de Start Typing are acum ca si default, o pagina care iti arata ultimele scoruri si ultimele recorduri personale. (De asemena poti sa dai click pe numele membrilor din lista pentru a le vizita profilil)

![latestScoresAndPersonalBests](https://cdn.discordapp.com/attachments/658679294515478534/737010038891216906/unknown.png)

De asmenea am adaugat si o bara de navigatie noua pentru aceasta pagina

![NavigationBar](https://cdn.discordapp.com/attachments/658679294515478534/737010074324566036/unknown.png)

Dupa cum poti vedea acum avem 2 categorii. Practice mode si Multiplayer mode

#### In Practice mode

Modul easy care contine un tests de tastare de 60 de secunde care are cuvinte la intamplare care nu au punctuatie sau capitalizare.

Modul normal care contine un test de tastare de 60 de secunde care are un text la intmplare luat din baza de date care poate sa fie de exmplu dintr-o carte sau un joc, poate un film etc.

Tutorialele despre care o sa vorbesc un pic mai traziu.

![NewFunctionalities to the typing box](https://cdn.discordapp.com/attachments/658679294515478534/737010108671852594/unknown.png)
![NewFunctionalities to the typing box](https://cdn.discordapp.com/attachments/658679294515478534/737010161389928488/unknown.png)

#### In modul multiplayer

Acesta este exact ca si modurile normal si easy doar ca este multiplayer. Despre asta o sa vorbest mai detaliat un pic mai jos.


### Tutoriale

Da, acum avem tutorial, care, practic sunt lafel ca si modul easy say normal, dar ai mai mult timp sa termini testul iar continutul este facut special pentru a iti imbunatatii scrierea.

De asemean, tutoriale are requirements. Daca nu ai cel putin un anumit scor si accuratete, nu se va pune ca si tutorial completat. Poti sa reincerci tutorialele de cate ori vrei tu.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010206797463593/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010254482767892/unknown.png)

### In final multiplayerul

Cand intri pe unul dint-re modurile de multiplayer vei fi pus intr-o lista de asteptare, cand acea lista ajunge a 2 playery atunci meciul va incepe pentru acei 2 playeri. (Acesta este locul in care am folosit websocketurile)

![](https://cdn.discordapp.com/attachments/658679294515478534/737010299810611281/unknown.png)

![](https://cdn.discordapp.com/attachments/658679294515478534/737014557318447244/Screenshot_3.png)


# Sistemul de conturi


Acum avem si un sistem de login/register/forgotpassword.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010958299299850/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737011045142626365/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737011089249927259/unknown.png)

De asemenea am implementat verificare email, iar userii care nu au emailul verificat vor avea rolul "unverified", cei cu email verificat vor fi "member". De asemenea mai exista si un rol "admin", dar despre asta voi vorbi putin mai tarziu.


# Pagina de profil

De asemenea avem pagini de profil, si este posibil sa poti vedea si profilele altor persoane.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010349768966334/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010382824276019/unknown.png)

Dupa cum poti vedea sunt multe lucruri despre care putem sa vorbim.

- un nume
- user role si xp (avem sistem de leveling si xp)
- idul userului
- date generale despre user cum ar fi average wpm accuracy etc
- butoane cu setari care nu apar decat in profilul tau
- descriere, iar daca este profilul tau poti sa apesi click pe ea si sa o schimbi
- steguletul din fata numelui care poate fi schimbat din setare (Am folosit un api public pentru numele tarilor si steaguri)
- Schimbarea parolei, odata ce ai dat click pe ea va aparea un element din care poti sa iti schimbi parola.
- butonul pentru schimbare a temei
- buton de logout pentru delogare
- ultimele n meciuri/teste cu un graf
- toate recordurile personale cu un graf, astfel e usor sa vezi progresul tau
- si in final achievementurile

![](https://cdn.discordapp.com/attachments/658679294515478534/737010419922763786/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010459601010768/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010506212180028/unknown.png)

# Dashboard

Ultima functionalitate noua adaugata (care este la vedere pe frontend cel putin :) ) este dashboardul. Aici ai access la editarea multor lucruri de asemean poti sa si adaugi si sa stergi.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010622159388702/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010660520493146/unknown.png)

Dupa cum poti vedea exista 3 pannel-uri.

Iar pentru a acessa functia de editare trebuie decat sa dai click pe una din liniile pe care vrei sa le editezi din table. Iar pentru a adauga ceva nou apasa butonul de la sfarsitul listei.

- Panoul 1 este pentru useri, poti sa ii editezi/stergi.
- Panoul 2 este pentru texte, poti sa adaugi/editezi/stergi textele. De asemean toate textele sunt acolo, mod easy, normal sau tutorial.
- Panoul 3 este pentru achievementuri, te lasa sa adaugi/editezi/stergi achievementuri.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010839113957517/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010697027715182/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010731563614270/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010766892236830/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010799230451812/unknown.png)


# Si acestea sunt noile functionalitate ale aplicatiei King Typer

As vrea sa ii multumesc lui Brandon pentru ca m-a ajutat sa termin proiectul si a facut parte din echipa. Nu as fi putut sa termin fara el din cauza unor probleme personale. Nu mai aveam deca cam 2 saptamani pentru a lucra la proiect.

As vrea sa multumes si tututror testarilor care mi-au oferit feedback in timp ce adaugam functionalitati noi si le editam pe cele vechi.

Mai este cale lunga pana cand as putea sa numesc acest proiect terminat, mi-ar fi placut sa am mai mult time pentru a polisa frontendul si backendul pentru ca a fost destul de greu sa cresc aplicatia datorita codului mei vechi si in acelasi timp datorita timpului putin nu am reusit sa fac un design de care sa fiu multumit. O sa continui sa lucrez la proiect chiar si dupa infoeducatie, dar pe moment am vrut sa termin functionalitatea.

Si in final as vrea sa iti multumesc tie pentru ca ai citi pana aici, mi-a luat ceva timp sa scriu totul hehe :)