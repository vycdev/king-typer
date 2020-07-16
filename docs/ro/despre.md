# King Typer

King Typer este un site web creat pentru concursul de infoeducatie și obiectivul principal este să concurezi cu site-urile de dactilografiere actuale care au designuri vechi, UX proaste sau chiar ambele și să devină un mediu plăcut pentru învățarea și practicarea tastării tactile.

Dezvoltarea pentru King Typer va continua chiar și după concurs, până când voi fi mulțumit de rezultate.

Acesta este un monorepo, care conține atât API-ul cât și front-end-ul, care sunt găzduite separat pe heroku.

- Puteți accesa site-ul [aici](https://king-typer.herokuapp.com/).
- Puteți vedea link-uri pentru alte informatii [aici](https://github.com/Vyctor661/king-typer/blob/docs/docs/ro/main.md).

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

Folderul `api` conține un simplu server api, care încă nu a fost dezvoltat, dar este planificat să fie utilizat în viitor pentru a gestiona conturile, testele de tipărire mutiplayer, tot ce tine de baza de date etc. API-ul va fi găzduit pe un server diferit și acesta va comunica cu SPA prin requesturi simple HTTP.

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
![File](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/gourcefiletree.png)

## Cerințe și compatibilitate

Acest proiect este optimizat pentru a rula pe toate browserele cu cât mai puțină memorie și putere de calcul posibil. Rularea proiectului pe orice browser actualizat va fi in regula.

## Instrumente și limbaje de programare

Vreau să menționez că multe dintre elementele enumerate mai jos nu ajung in buildul final.

- `emotion`: Emotion este folosit pentru crearea componentelor react css deja aplicat. Este un instrument foarte bun, care imi permite să profit de avantajele Typescriptului și React în același timp pentru a-mi stila componentele.
- `koa`: Koa este un web framework pentru node js, este ca expres, dar mult mai optimizat și mai concentrat pe middleware. Îl folosesc pentru crearea unui server SPA care să găzduiască SPA-ul pe heroku.
- `react`: React este o bibliotecă js pentru crearea interfeței de utilizator. Este foarte bun pentru gestionarea proiectării și stării aplicației. Si in plus are o comunitate mare plina de oameni care creeaza dependencyuri pentru react care au fost de folos in construirea aplicației.
- `typecript`: Typescript este un superset de JavaScript strongly-typed. Foarte util în scrierea unui cod fara errori din runtime si erori in general.
- `babel`: Babel este un instrument pentru a converti codul scris de mine in cod compatibil cu majoritatea browserelor.
- `webpack`: Webpack este un module bundler,iar combinat cu typescrip si babel si alte plugin-uri, pot sa rulez cu ușurință codul live pentru dezvoltare.
- `semantic-release`: Semantic-release este un package care determin versiunile releaseurilor și generează o fila changelog pe baza commiturilor mele folosind commituri convenționale (Folosing GitHub Actions).
- `all-contributors`: All-contributors este un package care imi permite să generez un paragraf frumos cu toți contribuitorii in fila README.

1020/5000
- `eslint`: Eslint este un linter care îmi analizează codul pentru a găsi rapid probleme. Îmi poate repara automat erorile și îl pot personaliza pentru a respecta regulile pe care le doresc pentru codul meu. (de exemplu, probabil că vreau ghilimele pentru fiecare șir în loc de apostrof, eslint va avea grijă de asta, chiar dacă folosesc accidental apostrof, le va schimba automat atunci când salvez fișierul)
- `prettier`: Prettier este un formatator de cod care atunci când este combinat cu ESlint poate economisi mult timp și energie.

## Testare

Nu folosesc teste de integrare, (încă) pentru că nu este necesar, deoarece o mulțime de oameni au testat aplicația mea inclusiv eu (puteți vedea cine a testat aplicația mea în fișierul README, btw persoanele enumerate în README fișierul nu sunt toți oamenii care mi-au testat aplicația, aceștia sunt doar cei care au testat aplicația mea și au un cont GitHub) și, de asemenea, cu ajutorul instrumentelor enumerate mai sus, am putut sa evit majoritatea erorilor înainte de a da push pe github (Am și github actions configurat.)