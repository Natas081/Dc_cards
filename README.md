https://youtu.be/TvEmkGkODfM  <<-- Video do projeto

# Interactive Cards

Projeto frontend desenvolvido em **React** que explora cards interativos com animações, efeitos 3D e revelação dinâmica de imagens através do movimento do cursor.

A proposta do projeto é transformar cards estáticos em elementos visuais interativos, explorando animações modernas para criar uma experiência fluida e responsiva.

O projeto está sendo desenvolvido de forma incremental, com foco não apenas no resultado visual, mas também no aprendizado dos conceitos utilizados durante sua construção.

---

## Sobre o projeto

O Interactive Cards utiliza duas imagens em cada card.

Inicialmente, uma das imagens é exibida normalmente enquanto a segunda permanece escondida.

Ao movimentar o cursor sobre o card, uma máscara circular acompanha o mouse e revela parcialmente a segunda imagem.

Ao clicar no card, ocorre uma animação de **flip 3D de 180°**, fazendo com que a imagem anteriormente escondida se torne a imagem principal.

O comportamento do reveal também é invertido:

- Frente → imagem principal A + reveal da imagem B
- Verso → imagem principal B + reveal da imagem A

Além disso, o card possui um efeito de **tilt 3D**, reagindo à posição do cursor e criando uma maior sensação de profundidade.

---

## Funcionalidades atuais

- Reveal circular seguindo o cursor
- Movimento suavizado através de Spring
- Entrada e saída suave do efeito de reveal
- Flip 3D ao clicar no card
- Duas faces independentes
- Inversão das imagens após o flip
- Tilt 3D baseado na posição do cursor
- Retorno suave do card à posição original
- Perspectiva e profundidade 3D
- Componente reutilizável em React

---

## Como funciona

### Circular Reveal

A posição do cursor é calculada em relação ao próprio card.

```js
const x = ((event.clientX - rect.left) / rect.width) * 100
const y = ((event.clientY - rect.top) / rect.height) * 100
```

Esses valores representam a posição horizontal e vertical do cursor dentro do card.

A posição é armazenada utilizando `MotionValue`, evitando atualizações constantes no estado do React durante o movimento do mouse.

```js
mouseX.set(x)
mouseY.set(y)
```

Os valores passam por uma Spring para suavizar o movimento:

```js
const smoothX = useSpring(mouseX, {
  stiffness: 300,
  damping: 30,
  mass: 0.4
})
```

A posição suavizada é utilizada em uma máscara CSS baseada em `radial-gradient`.

```css
radial-gradient(
  circle radius at x y,
  black 0%,
  black 78%,
  transparent 100%
)
```

Isso permite revelar apenas uma região circular da segunda imagem.

---

### Reveal Radius

O tamanho do círculo também é controlado através de um `MotionValue`.

Quando o cursor entra no card:

```text
0px → 90px
```

Quando o cursor sai:

```text
90px → 0px
```

Uma Spring suaviza essa transição, fazendo com que o reveal apareça e desapareça gradualmente.

---

### Flip 3D

O card possui duas faces:

```text
Card
└── Scene
    ├── Front
    │   ├── Imagem principal
    │   └── Imagem revelada
    │
    └── Back
        ├── Imagem principal
        └── Imagem revelada
```

Na frente:

```text
Batman → principal
Joker  → reveal
```

No verso:

```text
Joker  → principal
Batman → reveal
```

O estado do flip é controlado pelo React:

```js
const [isFlipped, setIsFlipped] = useState(false)
```

Ao clicar:

```js
setIsFlipped((current) => !current)
```

O Motion utiliza esse estado para determinar a rotação:

```js
rotateY: isFlipped ? 180 : 0
```

Assim, o React controla **qual é o estado do card**, enquanto o Motion controla **como a transição acontece visualmente**.

---

### Tilt 3D

Além do flip, o card reage à posição do cursor.

A posição do mouse é convertida em pequenos valores de rotação:

```js
const rotateY = (x - 50) * 0.12
const rotateX = (50 - y) * 0.12
```

No centro do card:

```text
rotateX = 0°
rotateY = 0°
```

Nas extremidades, a rotação chega aproximadamente a:

```text
-6° ← 0° → +6°
```

O movimento também utiliza Spring, evitando mudanças bruscas de rotação.

---

## Arquitetura das animações

O projeto separa o estado lógico das animações contínuas.

### React State

Utilizado para mudanças discretas de estado:

```text
isFlipped
```

Determina se o card está mostrando sua frente ou verso.

### MotionValue

Utilizado para valores atualizados constantemente:

```text
mouseX
mouseY
revealRadius
tiltX
tiltY
```

Dessa forma, o movimento do cursor não depende de constantes re-renderizações do componente React.

A estrutura pode ser resumida como:

```text
React
└── Estado do componente
    └── Front / Back

Motion
└── Animações
    ├── Cursor tracking
    ├── Circular reveal
    ├── Springs
    ├── Flip
    └── Tilt 3D
```

---

## Tecnologias

- React
- JavaScript
- Vite
- CSS
- Motion for React
- Git
- GitHub

---

## Estrutura atual

```text
src/
├── assets/
│   └── cards/
│       ├── Batman.jpeg
│       └── Joker.jpeg
│
├── components/
│   └── Card/
│       ├── Card.jsx
│       └── Card.css
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Executando o projeto

Clone o repositório:

```bash
git clone <URL-DO-REPOSITORIO>
```

Entre na pasta:

```bash
cd interactive-cards
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite irá disponibilizar o projeto localmente, normalmente em:

```text
http://localhost:5173
```

---

## Próximos passos

O projeto ainda está em desenvolvimento.

As próximas etapas planejadas são:

### Aperfeiçoamento do card atual

Continuar refinando as interações e animações do card, explorando melhorias como:

- comportamento do tilt durante o flip;
- iluminação dinâmica acompanhando o cursor;
- sombras e profundidade;
- refinamento das Springs;
- microinterações;
- melhorias de responsividade;
- adaptação da experiência para dispositivos sem mouse;
- acessibilidade;
- otimizações e refatoração do componente.

### Novo card

Após finalizar e aperfeiçoar o card atual, será desenvolvido um **segundo card**, explorando uma nova ideia de interação e animação.

O objetivo é que cada card possua uma identidade visual e uma experiência própria, em vez de simplesmente repetir o mesmo efeito com imagens diferentes.

---

## Objetivo

Além do resultado visual, este projeto também funciona como um estudo prático de desenvolvimento frontend moderno.

Durante seu desenvolvimento estão sendo explorados conceitos como:

- componentização em React;
- props;
- estado;
- eventos;
- MotionValues;
- animações baseadas em física;
- manipulação de coordenadas do cursor;
- máscaras CSS;
- transformações 3D;
- perspectiva;
- organização de componentes;
- performance em interfaces interativas.

A ideia é evoluir o projeto progressivamente enquanto novos conceitos são aprendidos e aplicados.

---

## Status

**Em desenvolvimento**

Card 01:

```text
Circular Reveal  ✓
Spring Motion    ✓
Flip 3D          ✓
Image Inversion  ✓
3D Tilt          ✓
Polimento        Em andamento
```

Card 02:

```text
Planejamento     Futuramente
Desenvolvimento  Futuramente
```