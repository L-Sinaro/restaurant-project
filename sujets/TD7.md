# TD7 - Gestion des évènements dans les composants

## Evènements utilisateur

On entend par évènement utilisateur tout ce qui est fait avec la souris, le clavier, l'écran tactile, la voix, l'appareil photo, etc.
Avec React, il faut utiliser l'attribut `onXXX` correspondant à l'évènement recherché, et lui passer la fonction _callback_ à exécuter entre accolades :
Par exemple :
`<button onClick={data => console.log(data)} />` 

**Attention à la majuscule :** en javascript pur, l'évènement s'appelle `onclick`, React les surcharge avec `onClick`

### Exercice 1

1. Lorsque l'on clic sur "Ajouter à la commande" dans _food_, capturer l'évènement `onClick` qui exécutera une fonction `addToCart(food)`. Celle-ci fera un `console.log` de l'objet `food`.

2. Faire la même chose pour le bouton "Ajouter à la commande" dans _menu_

## Passer l'évènement au composant parent

Nous souhaitons à présent passer le plat ou le menu choisi dans _MenuCard_ ou _FoodCard_ au composant parent _App_.

Cela nous permettra de mettre à jour l'état, qui est géré par ce composant.

Pour faire cela, nous devons passer dans les _props_ le fonction _addToCard_ depuis le composant parent vers les composants enfant.

### Exercice 2

1. Dans _MenuCard_, supprimer la fonction _addToCart_ définie dans l'exercice précédent et ajouter la propriété _addToCart_ en paramètre:

```
const MenuCard = ({menu, foodList, addToCart}) => {
```

2. Dans _Menu_, ajouter la propriété _addToCart_ en paramètre:

```
export const Menu = ({ foodList, menuList, addToCart}) => {
```

Passer cette propriété à _MenuCard_ :

```
    <MenuCard
      key={`menu-${menu.id}`}
      menu={menu}
      foodList={foodList}
      addToCart={addToCart}
    />
```

3. Dans _App_, définissez la fonction `addMenuToCart`:

```
  const addMenuToCart = (menu) => console.log('addMenuToCart', menu);
```

Passer cette fonction en paramètre de _Menu_:

```
<Menu foodList={foodList} menuList={menuList} addToCart={addMenuToCart} />
```

Lorsque vous choisissez un menu, vous devriez voir dans la console `addMenuToCart {...}`.

4. De la même façon, créer dans _App_ une fonction `addFoodToCart` et passer la en paramètre de _Menu_, _MenuCard_ et à la propriété  _onClick_ du _button_.

Lorsque vous choisissez un plat ou un dessert, vous devriez voir dans la console `addFoodToCart {...}`.

## Création du panier du client

Dans le composant _App_, nous avons les données _foodList_ et _menuList_, qui proviennent du backend et qui ne sont pas modifiables :

```
const [foodList, setFoodList] = useState([]);
const [menuList, setMenuList] = useState([]);
```

Nous allons créer un nouvel état _cart_ qui contiendra le panier du client.

A chaque clic sur "Ajouter à ma commande", on ajoutera à _cart_ les plats et menus choisis.

### Exercice 3

1. Dans _App.js_, Initialiser _cart_ avec un objet Javascript contenant la liste des menus choisis (attribut _selectedMenus_) et la liste des plats à la carte choisis (attribut _selectedFoods_) :

```
const [cart, setCart] = useState({selectedFoods: [], selectedMenus: []});
```

2. Modifier les fonctions _addMenuToCart_ et _addFoodToCart_.

A chaque fois que vous ajouterez un plat ou un menu, il ne faut pas écraser l'état existant.
Le nouvel état devra contenir les anciennes valeurs en plus des nouvelles.

## Conclusion

Dans ce TD, nous pouvons observer que propager des données depuis des composants enfants vers les composants parents est nécessaire pour gérer l'état.

Cependant, le code est devenu complexe, car nous devons passer en paramètre les données et les fonctions à tous les composants enfants.

Dans le prochain TD, nous verrons comment résoudre ce problème.


