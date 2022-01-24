# TD8 : simplifier la gestion de l'état avec useContext 

Dans le précédent TD, nous avons dû passer beaucoup de propriétés aux composants.
Cela nécessite beaucoup de code, car seul le composant racine _App_ détient l'état: nous avons appliqué le principe "lifting state up".

A partir de maintenant, nous allons avoir besoin d'accéder au panier du client depuis plusieurs endroit de l'application.
Plutôt que de passer manuellement les props à chaque niveau de l'arbre des composants, nous allons considérer que cet état est _global_ à l'application. Cet état fera donc partie d'un _contexte_ qui sera partagé à travers toute l'application.

Un contexte React permet de partager les données d'un state d'un composant X.

Les données sont fournies par le composant X à l'aide d'un _context provider_ et utilisé par les autres composants avec des _context consumers_.

# Exercice

1. Création du contexte
Le contexte est dans un fichier à part car il sera importer par plusieurs composants, et on ne veut pas créer de dépendances circulaires entre eux.

Créer un répertoire `context` à la racine du projet et y placer un nouveau fichier `cart-context.js`.
Exporter le contexte comme ceci :

```
import { createContext } from 'react';

export const CartContext = createContext();
```

2. Utiliser le _provider_ du contexte dans _App_

Le provider est un élement HTML qui doit englober toute l'arborescence des composants qui auront besoin du contexte.

Il prend en paramètre une valeur, qui est fournie par le state _cart_ du composant _App_  :

```
    <BrowserRouter>
      <CartContext.Provider value={[cart, setCart]}>
        ...
      </CartContext.Provider>
    </BrowserRouter>
```

3. Utiliser le _consumer_ du contexte dans _Header_

Nous allons afficher le nombre d'éléments du panier dans le _header_. Nous aurons besoin de l'icône du panier:

`npm i bootstrap-icons`

Redémarrer l'application.

Importer le CSS dans _App_:

``` 
import 'bootstrap-icons/font/bootstrap-icons.css';
```

Enfin, ajouter l'icône avec l'indicateur à _header.js_ :

```
<i className="bi-basket position-relative fs-3">
  <span className="position-absolute badge rounded-pill bg-primary" style={{fontSize: '0.4em'}}>
    {12}
  </span>
</i>_
```

Remplacer le "12" par la valeur du _context consumer_ comme ceci :

```
import { useContext } from 'react';
import { CartContext } from './context/cart-context';

...
const [cart, setCart] = useContext(CartContext);
...

<span className="position-absolute badge rounded-pill bg-primary" style={{fontSize: '0.4em'}}>
  { cart.selectedFoods.length + cart.selectedMenus.length }
</span>
```

Vous devriez voir s'incrémenter le compteur à chaque fois que vous ajoutez un plat ou un menu.


4. Refactoring

Nous allons à présent faire un refactoring pour utiliser uniquement _cart_ et _setCart_ fournis par _useContext_ dans les autres composants _Menu_ et _Food_ (suppression des paramètres _addToCart_)

