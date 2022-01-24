# TD2 - Templates JSX dynamiques

## Les variables dans les templates JSX

### Introduction

JSX permet de construire des pages HTML dynamiques en y ajoutant des variables.

Exemple d'une variable texte simple : 

```
const foo = 'bar';
return (
  <div>{foo}</div>   ===> devient <div>bar</div>
);
```

Exemple d'une variable utilisée en propriété : 

```
const foo = 'bar';
return (
  <div className={foo}></div>   ===> devient <div class="bar"></div>
);
```

Exemple d'une variable utilisée dans la propriété style : 

```
const foo = { height: '10px' };
return (
  <div style={foo}></div>   ===> devient <div style="height: 10px"></div>
);
```

Exemple d'une variable contenant un élément JSX : 

```
const foo = <div>bar</div>;
return (
  <article>{foo}</article>   ===> devient <article><div>bar</div></article>
);
```

Exemple d'une variable contenant un tableau d'éléments JSX : 

```
const foo = [
  <div>bar</div>,
  <div>bar2</div>
];
return (
  <article>{foo}</article>   ===> devient <article><div>bar</div><div>bar2</div></article>
);
```

### Exercice

Dans App.js, créer une NavBar Bootstrap: https://getbootstrap.com/docs/5.1/components/navbar/

```
<nav className="navbar navbar-expand-md navbar-light bg-light">
  <img src={logo} alt="logo" width="120" className="navbar-brand mx-5" href="#" />
</nav>
```

On voit que l'image {logo} est une variable car elle est entre accolades.

## Boucler sur les données

### Introduction

Lorsque l'on a un tableau javascript, on veut pouvoir le parcourir et générer un élément HTML pour chaque élément. 

Exemple en programmation procédurale : 

```
const list = ['banane', 'pomme', 'poire'];

const htmlElements = [];

for (const element of list) {
  htmlElements.push(<div>{element}</div>);
}

return (
  <article>{htmlElements}</article>
);
```

Exemple en programmation fonctionnelle : 

```
const htmlElements = list.map(element => {
  return <div>{element}</div>
});
```

> La fonction `map` transforme un tableau d'éléments X en tableau d'éléments Y

Pour simplifier, si on a une seule instruction dans le corps de la fonction lambda, on peut mettre entre parenthèse l'élément retourné :

```
const htmlElements = list.map(element => (<div>{element}</div>));
```

### Exercice

1. Dans App.js, définissez un tableau contenant le nom des menus de la navbar et leur addresse :

```
const menus = [
  {
    name: 'Accueil',
    url: '/home',
  },
  {
    name: 'Carte',
    url: '/food',
  },
  {
    name: 'Menus',
    url: '/menu',
  },
  {
    name: 'Commande',
    url: '/order',
  },
];
```

2. Exécuter la fonction `.map()` sur le tableau pour transformer chaque ligne en un élément `<nav>` :

```
  const navItems = menus.map(menu => {
    return (
      <li className="nav-item mx-3" key={menu.url}>
        <a className="nav-link active" aria-current="page" href={menu.url}>{menu.name}</a>
      </li>
    );
  });
```

Remplacer "url" et "name" par les valeurs du tableau.

3. Placer la variable `navItems` dans la navbar :

```
<nav className="navbar navbar-light bg-light w-100 d-flex walign-items-center">
  <img src={logo} alt="logo" width="120" className="navbar-brand mx-5" href="#" />
  <ul className="navbar-nav flex-grow-1 d-flex flex-row justify-content-end mx-5 mb-2">
    // Placer les navItems ici
  </ul>
</nav>
```

Vous devriez constater que les menus s'affichent correctement:

![](./TD2-screenshot.png "Maquette")

Par contre le clic sur les menus affiche une erreur, car nous implémenterons la navigation dans le TD3.

4. Si vous observez la console javascript, vous verrez que React vous averti de l'absence de l'attribut _key_ : 

```
Warning: Each child in a list should have a unique "key" prop.

Check the render method of `App`. See https://reactjs.org/link/warning-keys for more information.
```

La propriété _key_ doit être unique pour chaque élément (comme la propriété _id_). Elle est utilisée par React pour savoir quels éléments de l'arbre HTML (le _DOM_) doivent être regénérés. 

Renseignez cette propriété dans la balise `<li>` en utilisant l'url présent dans les _menus_.
Sauvegarder.

> L'erreur doit avoir disparu de la console javascript.

