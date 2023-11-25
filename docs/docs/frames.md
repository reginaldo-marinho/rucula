```js
export interface frame{
    name: string,
    type: string,
    objectDto: string,
    vertical:boolean
    sequence:number
    fields?:Array<field>
    line?:Array<line>
}
```

|Propriedade|Tipo|Tefault|Descrição|
|-|-|-|-|
|`name`|`string`||Nome descritivo do frame|
|`type`|`string`|`block`|tipo do frame|
|`objectDto`|`string`||nome do objeto que será representado pelo frame|
|`vertical`|`string`|`true`|Inidica o sentido em que os grupos de inputs serão criados|
|`sequence`|`number`||Ajuda na ordenação dos frames|
|`fields`|`Array`||Configuração dos campos - Para frame do tipo `block` |
|`line`|`Array`||Configuração dos campos - Para frame do tipo `line` |

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|