# TD4 - React Hooks: useState et useEffects

## Gestion de l'état avec useState

L'état d'une application (_state_) est l'ensemble des données de la "session" utilisateur, et qui sont conservées tout au long de la navigation.
Dans une application front, ce sont les variables javascript qui sont utilisées dans les composants, exceptées : 
- celles qui ne sont utiles qu'à des calculs intermédiaires
- celles qui contiennent des éléments JSX

Avec React, on doit créer ces variables grâce à la fonction _useState_. 

> Toutes les fonctions commençant par _use_ sont appelées des **_Hooks_**

Exemple d'utilisation avec une variable _foo_ :

```
const MyComponent = () => {
  const [foo, setFoo] = useState(null);
  console.log(foo); // foo est initialisée à null
  setFoo('bar');    // fonction qui permet de mettre à jour foo
  return <div>{foo}</div>;
};
```

Ces variables sont spéciales car chaque appelle à `setFoo` déclenche la mise à jour du composant. L'exécution se déroule donc comme ceci:
- la 1ère fois:
  * l'état _foo_ est initialisé à null
  * la console affiche 'null'
  * _setFoo_ modifie l'état _foo_ avec la valeur `bar`
  * la fonction retourne `<div>null</div>`
  * la fonction est relancée car _setFoo_ a modifié l'état
  * **l'instruction _useState_ est ignorée** car c'est une fonction lancée uniquement à la création du composant
  * la console affiche 'bar'
  * _setFoo_ modifie l'état _foo_ avec la valeur `bar`
  * la fonction retourne `<div>bar</div>`
  * la fonction est relancée car _setFoo_ a modifié l'état
  * (...)

> A ce point, on rentre dans une boucle infinie qui est interrompue par React avec l'erreur:
>
> _Error: Too many re-renders. React limits the number of renders to prevent an infinite loop._


## Contrôle du cycle de vie du composant avec useEffect

Pour éviter cette boucle infinie, les appels à la fonction _setFoo_ ne doivent pas être effectués dans le corps de la fonction _MyComponent_.
Ils doivent être effectués uniquement lors d'un évènement utilisateur ou à l'intérieur d'un hook comme _useEffect_.

Exemple d'un évènement utilisateur :

```
const MyComponent = () =>  {
  
  const [foo, setFoo] = useState(null);
  
  return (
    <div onClick={() => setFoo('bar)}>{ foo }</div>
  );
}
```

Exemple avec la fonction _useEffect_ :

```
const MyComponent = () =>  {
  
  const [foo, setFoo] = useState(null);
  useEffect(() => setFoo('bar'), []);

  return (
    <div>{ foo }</div>
  );
}
```

_useEffect_ est un hook qui est exécuté en parallèle de la fonction _MyComponent_. 

Comme _useState_, _useEffect_ est exécuté la 1ère fois puis est ignorée par la suite.

Il prend en paramètre une fonction `() => setFoo('bar')` et un tableau de variables `[]`.

La fonction sera exécutée la 1ère fois et à chaque fois qu'une des variables du tableau change.
Etant donné qu'on a passé un tableau vide, la fonction n'est exécutée qu'une fois à la création du composant.
Cela en fait un endroit idéal pour initialiser l'état depuis une API avec _useState_.

### Exercice

1. Utiliser _useEffect_ pour afficher la liste dans _food.js_

```
import { useState, useEffect } from 'react';

export const Food = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    setFoodList([{ name: 'Donut' }, { name: 'Pizza'}]);
  }, []);

  console.log('foodList', foodList);  
  return 'Carte';
};
```

> Vous devriez voir dans la console un tableau vide `array []` puis un tableau avec les données `array(2) [{...}, {...}]`


