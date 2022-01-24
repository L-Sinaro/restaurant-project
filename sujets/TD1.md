# TD1 - NPM, React, Modules

Contrairement au TD0, nous allons à présent mettre en place un environnement complet de développement Javascript et étudier les notions de base. Pour les débutants, accrochez-vous😣

## Installation de Node.js

_Node.js_ est à l'origine un serveur d'application Javascript pour le développement backend. Il a été utilisé par tous les frameworks frontend pour gérer les dépendances (grâce à son outil intégré _NPM_) et exécuter les applications en local.

**Si vous n'avez pas Node.js sur votre PC :**
Télécharger et installer la version LTS https://Node.js.org/en/download/

**Si vous avez déjà installé Node.js :**
Vérifier la version avec la commande `node -v` : la version doit être 16 ou plus. Si ce n'est pas le cas réinstaller une version plus récente avec le lien ci-dessus.

## Initialisation du projet React

On va initialiser une application from scratch dans un nouveau répertoire.
Se positionner dans le répertoire parent du projet actuel et lancer :

```
npx create-react-app restaurant
```

  > La commande _npx_, inclue dans l'installation de _Node.js_, qui signifie installe & éxecute
  > _npx_ a lancé _create-react-app_ qui est le générateur de code React
  > cela a créé le projet dans le répertoire _restaurant_


Une fois terminé, ouvrir ce dossier avec VSCode.
Ouvrir un terminal intégré et lancer :

```
npm run start
```

  > _npm run start_ a démarré un server Node.js pour publier l'application _restaurant_

Vous devriez voir s'afficher :

```
You can now view restaurant in the browser.      

  Local:            http://localhost:3000   
```

Ouvrir la page indiquée qui affiche l’application d’exemple dans le navigateur.

## Problèmes possibles 

Si vous avez un espace dans le répertoire à votre nom 😤, par exemple :
`c:\users\Benjamin Caure`

Vous aurez sans doute l'erreur suivante :
`Error: EPERM: operation not permitted, mkdir 'C:\Users\Benjamin'`

Dans ce cas il faut récupérer le nom cours du répertoire

```
dir /x c:\Users
04/01/2021  10:48     BENJAM~1     benjamin caure
```

et modifier le chemin d'accès de npm :

```
npm config set cache C:\Users\BENJAM~1\AppData\Roaming\npm-cache
npm config set prefix C:\Users\BENJAM~1\AppData\Roaming\npm
```

## Structure du projet

L'application d’exemple contient les répertoires suivants:
-  **_public_** : les ressources statiques, c'est à dire tout ce qui est publié à la racine du site: html, css importé par le html, images importées par le html
- **_src_** : tout ce qui est javascript ou importé dans un fichier javascript (.js, .json, images et .css). Ces fichiers sont compilés[^1] en .js.
- **_node_modules_** : toutes les dépendances javascript, c'est-à-dire tout ce que React a besoin pour fonctionner. On ne doit jamais modifier manuellement ces fichiers, c'est NPM qui les gèrent.

Nous travaillerons uniquement dans le répertoire _src_.

### public/index.html

Dans le cadre de ces TDs, on ne modifiera pas index.html. 

Cependant, si un projet nécessite d'ajouter des lib Javascript ou CSS qui n'existent pas sous forme de dépendances NPM, on peut les inclure dans ce fichier.

Les seules personalisation utiles de ce fichier sont la modification du _favicon_ et du titre qui s'affichent dans l'onglet du navigateur.


### src/index.js

Même s'il n'est pas présent dans _index.html_, _index.js_ sera ajouté à la compilation[^1] 

En observant le contenu de ce dernier, on voit qu'il inject le composant `<App />` dans `<div id="root"></div>` de index.html.

### src/App.js

Dans `App.js`, on voit le composant principal de l'application qui est une simple fonction qui renvoyant du code HTML.
Avec React, on peut mettre du HTML dans du Javascript : cela s'appelle la syntaxe **JSX**.

```
import logo from './logo.svg'; // <== on peut importer des images  
import './App.css';            //     ou du css

function App() {               // <== Simple fonction
  return (
    <div className="App">      // JSX
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;           // Important, ne pas oublier d'exporter les composants!
```

Ce code HTML sera compilé[^1] et codé sous forme d'objets et de chaine de caractère Javascript, puis injecté dynamiquement dans le fichier _index.html_.

C'est pour cela qu'on parle de Single Page App (SPA) pour les sites Angular, React et Vue. La seule page HTML réellement présente est _index.html_. Tous les éléments sont ensuite injectés lorsque l'utilisateur intéragit avec la page.

## ⚠ Les pièges de base de JSX ⚠

### Retourner plusieurs éléments

Dans `App.js`, remplacer le JSX comme suit et sauvegarder. 
Vous devriez avoir une erreur dans le navigateur et la console:

```
     ...
    // fonctions index.js
    ...
    function App() {
        // La balise vide <> permet de s'assurer que les parenthèses contiennent une seule racine dans l'arbre HTML
        return (
          <h1>Mon Restaurant</h1>
          <p>est le meilleur sur les Cézeaux</p>
        );
    }
```

En effet, on ne peut pas retourner plusieurs éléments en React.

Il faut utiliser l'élément fictif `<> ... </>`. Cela permet d'encapsuler plusieurs éléments:

```
  return (
    <>
      <h1>Restauration Rapide </h1>
      <p>Le meilleur endroit où manger sur les Cézeaux!</p>
    </>
  );
```

### Attributs _style_ et _class_

Par rapport à du HTML standard, il faut remplacer `class="..."` par `className="..."` (spécificité React).

De même, `style="..."` ne fonctionne pas. Il faut déclarer le style sous forme d'objet javascript. `style={{...}}"` (cf. [article](https://www.w3schools.com/react/react_css.asp))

## NPM et package.json

Le fichier `package.json` est le fichier dont se sert NPM pour gérer les dépendances (ou librairies, ou lib) qui sont installées dans `node_modules`. 

La liste complète des dépendances que l'on peut ajouter est sur https://npmjs.com

On y trouve les commandes pour installer les dépendances, par exemple:

`npm install myDependency` : copie _myDependency_ dans node_modules et l'ajoute à la liste _dependencies_ de `package.json`. 

ou

`npm install --save-dev myDependency` : copie _myDependency_ dans node_modules et l'ajoute à la liste _devDependencies_ de `package.json`. La différence est que _myDependency_ sera utilisée uniquement pour le développement. C'est le cas des outils de test.

### Exercice

1) Déplacer les dépendances _@testing_library_ du bloc _dependencies_ vers _devDependencies_.
2) Arrêter l'application (ctrl+c dans le terminal)
3) Exécuter `npm install`
4) Redémarrer l'application avec `npm run start`: cela devrait prendre en compte vos modifications, bien que concrêtement rien ne devrait changer et l'application doit s'afficher correctement.

### Plusieurs remarques

> Le répertoire `node_modules` fait plusieurs centaines de Mo et contient des dizaines de milliers de fichier, c'est pourquoi il ne faut en aucun cas le commit sur git! le fichier .gitignore est là pour éviter ce drame.

> Vous verrez peut-être des tutos proposer `yarn` comme gestionnaire de dépendances. Il gère les dépendances de la même façon que NPM, la seule différence est qu'il utilise le fichier `yarn.lock` au lieu de `package-lock.json` 

> `yarn.lock` ou `package-lock.json` sont utilisés pour fixer les versions très précises des dépendances importées. Il est modifier à chaque fois qu'on fait `npm install` ou `yarn add` et doit être commité sous git.

### Exercice
1) Vérifier que le fichier .gitignore est présent à la racine du projet et qu'il contient le nom du répertoire _node_modules_
2) Constater que le fichier `package-lock.json` a bien été généré à la racine du projet
3) Supprimer le ficher `yarn.lock` car nous n'utiliserons pas Yarn dans les TDs
4) Rechercher la dépendance "bootstrap" sur https://npmjs.com 
5) Installer-la avec NPM en suivant les instructions
6) Vérifier que la dépendance est bien présente dans `package.json` et `package-lock.json`
7) Redémarrer l'application

## Importer et exporter des modules Javascript

Comme dans tous les langages, on peut importer et exporter le code Javascript d'un autre fichier.

Il existe plusieurs types de syntaxe (require, define) mais la plus standard et la plus simple est ESM (Ecma Script Module), parfois appelé modules ES6.

### Import/export simples

On peut exporter des classes, des fonctions ou des variables:

```
export const MyClass { /* ... */ }
export function myFunction { return 2; }
export const myVariable = 2;
```

Ensuite, on les importe en spécifiant le chemin relatif vers le fichier, sans l'extension .js:

```
import { myFunction } from './my-file';
```

### Import/export par défaut

1 seul `export default` par fichier:

```
export default myFunction { return 2; }
```

Puis, sans les accolades:

```
import myFunction from './my-file';
```

### Import depuis node_modules

Si on doit importer une lib installée via NPM (donc présente dans _node_modules_), il faut se renseigner sur la syntaxe exacte de l'import. En général, on la retrouve sur https://npmjs.com

On ne spécifie jamais le chemin relatif vers le répertoire _node_modules_.

Exemple avec la lib _React_ qui est un `export default`, donc à importer sans les accolades:

```
import React from 'react';
```

Exemple avec les fonctions _useState_ et _useEffect_ qui ne sont pas des `export default` :

```
import { useState, useEffect } from 'react';
```

Si on veut importer les 2:

```
import React, { useState, useEffect } from 'react';
```

Pour info, certaines lib qui ne sont pas packagées avec ESM doivent s'importer ainsi:

```
import * as ceQueJeVeux from 'myLib';
```

### Importer le CSS

Comme on a vu dans _App.js_, l'import de fichier CSS se fait comme ceci:

```
import from './App.css';
```

Pour du CSS présent dans une lib, comme bootstrap, on importera par le chemin relatif depuis _node_modules_.

**Exercice :**

1) Importer bootstrap dans _App.js_:

```
import 'bootstrap/dist/css/bootstrap.css';
```
2) Après avoir sauvegardé, vous devriez voir que le style a légèrement changé

### Importer les images

Comme on a vu dans _App.js_, l'import de fichier image se fait comme ceci:

```
import logo from './Logo.png';
<img alt="logo" src={logo} />
```

**Exercice :**

1) Créer un logo avec le site https://fr.freelogodesign.org/ et exporter-le

2) Copier le fichier dans `src` et l'afficher dans la page


---

[^1] Pour les puristes, Javascript n'est pas compilé en code machine comme C++, C# ou Java. Cependant, React utilise des pré-processeurs Javascript qui remagnent le code en profondeur. Les fichiers de sortie sont toujours codés en Javascript, mais impossible à interpréter par un développeur.

